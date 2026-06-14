"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const PANELS = 6;

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);

  useGSAP(
    () => {
      const counter = { value: 0 };
      const tl = gsap.timeline({
        defaults: { ease: "power3.inOut" },
        onComplete,
      });

      // intro lines rise
      tl.from("[data-pre-line]", {
        yPercent: 115,
        duration: 0.9,
        stagger: 0.08,
        ease: "power4.out",
      });

      // count + bar
      tl.to(
        counter,
        {
          value: 100,
          duration: 2.3,
          ease: "power2.inOut",
          onUpdate: () => setCount(Math.round(counter.value)),
        },
        0.2
      );
      tl.fromTo(
        barRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 2.3, ease: "power2.inOut" },
        0.2
      );

      // lift the content away
      tl.to(
        innerRef.current,
        { yPercent: -120, opacity: 0, duration: 0.7, ease: "power3.in" },
        "+=0.15"
      );

      // espresso panels sweep up, revealing the bone page
      tl.to(
        panelsRef.current?.children ?? [],
        {
          scaleY: 0,
          duration: 0.95,
          ease: "power4.inOut",
          stagger: 0.07,
          transformOrigin: "top",
        },
        "-=0.2"
      );
    },
    { scope: root }
  );

  return (
    <div ref={root} className="preloader">
      <div ref={panelsRef} className="reveal-panels">
        {Array.from({ length: PANELS }).map((_, i) => (
          <div key={i} className="reveal-panel" />
        ))}
      </div>

      <div ref={innerRef} className="preloader__inner">
        <div className="mb-6 flex items-center justify-end">
          <span className="preloader__meta overflow-hidden">
            <span data-pre-line className="inline-block">
              Chandigarh, IN
            </span>
          </span>
        </div>

        <div className="overflow-hidden">
          <h1 data-pre-line className="preloader__name inline-block">
            Nikhil
          </h1>
        </div>

        <div className="preloader__row mt-6">
          <span className="preloader__meta overflow-hidden">
            <span data-pre-line className="inline-block">
              Mise en place — plating the experience
            </span>
          </span>
          <span className="preloader__count">{count}</span>
        </div>
      </div>

      <div ref={barRef} className="preloader__bar" />
    </div>
  );
}
