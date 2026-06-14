"use client";

import React, { useRef } from "react";
import gsap from "gsap";

/**
 * Wraps a single child and gives it a magnetic pull toward the cursor.
 * Only active on fine-pointer devices; otherwise renders the child as-is.
 */
export default function Magnetic({
  children,
  strength = 0.4,
}: {
  children: React.ReactElement;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (e.clientX - (left + width / 2)) * strength;
    const y = (e.clientY - (top + height / 2)) * strength;
    gsap.to(el, { x, y, duration: 0.6, ease: "power3.out" });
  };

  const handleLeave = () => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.3)",
    });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ display: "inline-block", willChange: "transform" }}
    >
      {children}
    </div>
  );
}
