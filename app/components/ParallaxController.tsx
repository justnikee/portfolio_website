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

    // Parallax floating runs on desktop only (>=768px) and respects
    // reduced-motion. gsap.matchMedia sets up/tears down automatically
    // as the viewport crosses the breakpoint, so on mobile the sections
    // sit still instead of drifting.
    const mm = gsap.matchMedia();

    mm.add(
      "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
      () => {
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
      }
    );

    // Recalculate once everything (fonts/images) has settled.
    const t = setTimeout(() => ScrollTrigger.refresh(), 200);

    return () => {
      clearTimeout(t);
      mm.revert();
    };
  }, [isLoading]);

  return null;
}
