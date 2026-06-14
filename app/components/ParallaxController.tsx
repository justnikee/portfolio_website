"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useLoading } from "./LoadingProvider";

gsap.registerPlugin(ScrollTrigger);

/**
 * Global "floating" parallax. Any element tagged with
 *   data-parallax data-speed="60"
 * drifts vertically as it travels through the viewport — positive speed
 * floats up, negative floats down. A smoothed scrub gives it the premium,
 * weighty feel. Honors prefers-reduced-motion.
 */
export default function ParallaxController() {
  const { isLoading } = useLoading();

  useEffect(() => {
    if (isLoading) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const els = gsap.utils.toArray<HTMLElement>("[data-parallax]");
      els.forEach((el) => {
        const speed = parseFloat(el.dataset.speed || "40");
        gsap.fromTo(
          el,
          { y: speed },
          {
            y: -speed,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.1,
            },
          }
        );
      });
    });

    // Recalculate once everything (fonts/images) has settled.
    const t = setTimeout(() => ScrollTrigger.refresh(), 200);

    return () => {
      clearTimeout(t);
      ctx.revert();
    };
  }, [isLoading]);

  return null;
}
