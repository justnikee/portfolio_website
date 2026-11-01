"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

type Props = { onReveal: () => void; onComplete: () => void };

export default function Preloader({ onReveal, onComplete }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const backdrop = useRef<HTMLDivElement>(null);
  const word = useRef<HTMLDivElement>(null);

  useGSAP(
    (context) => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        onComplete();
        return;
      }

      let active = true;
      // Measure with the real display font so the final word fits the logo.
      document.fonts.ready.then(() => {
        if (!active) return;
        context.add(() => {
          const letters = root.current!.querySelectorAll("[data-preloader-letter]");
          const logo = document.querySelector<HTMLElement>("[data-preloader-logo]");
          const timeline = gsap.timeline({ onComplete });

          if (logo) gsap.set(logo, { visibility: "hidden" });
          gsap.set(word.current, { transformOrigin: "top left" });
          timeline.fromTo(letters,
            { y: 0, yPercent: 115, rotation: 5, autoAlpha: 0 },
            { y: 0, yPercent: 0, rotation: 0, autoAlpha: 1, duration: 0.7, stagger: 0.055, ease: "power4.out" },
            0.05
          );

          if (logo) {
            // Resolve destination at the moment of travel, including mobile layout.
            timeline.to(word.current, {
              x: () => logo.getBoundingClientRect().left - word.current!.getBoundingClientRect().left,
              y: () => logo.getBoundingClientRect().top - word.current!.getBoundingClientRect().top,
              scale: () => logo.getBoundingClientRect().width / word.current!.getBoundingClientRect().width,
              duration: 0.85,
              ease: "expo.inOut",
            }, 1.05);
          } else {
            timeline.to(word.current, { opacity: 0, duration: 0.6 }, 1.05);
          }

          timeline.call(onReveal, [], 1.15)
            .to(backdrop.current, { opacity: 0, duration: 0.65, ease: "power2.inOut" }, 1.15);
          if (logo) timeline.set(logo, { visibility: "visible" }, 1.9);
        });
      });

      return () => { active = false; };
    },
    { scope: root }
  );

  return (
    <div ref={root} className="preloader" role="status" aria-label="Loading portfolio">
      <div ref={backdrop} className="preloader__backdrop" />
      <div ref={word} className="preloader__word" aria-hidden="true">
        {"NIKHIL".split("").map((letter, index) => (
          <span key={index} className="preloader__mask"><span data-preloader-letter className="preloader__letter">{letter}</span></span>
        ))}
        <span className="preloader__mask"><span data-preloader-letter className="preloader__letter accent-text">.</span></span>
      </div>
    </div>
  );
}
