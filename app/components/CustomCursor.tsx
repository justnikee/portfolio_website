"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * A two-part cursor: a small instant dot + a smoothly-trailing ring.
 * Reacts to elements via data attributes:
 *   data-cursor="hover"  -> ring grows
 *   data-cursor="text"   -> ring fills (for big interactive type)
 *   data-cursor-label="View" -> shows a label next to the cursor
 * Disabled on touch / coarse-pointer devices.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isFinePointer =
      window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!isFinePointer) return;

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    const label = labelRef.current!;
    document.body.classList.add("has-custom-cursor");

    const xDotSet = gsap.quickSetter(dot, "x", "px");
    const yDotSet = gsap.quickSetter(dot, "y", "px");
    // Smoothed values for the trailing ring + label
    const ringX = gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3" });
    const labelX = gsap.quickTo(label, "x", { duration: 0.5, ease: "power3" });
    const labelY = gsap.quickTo(label, "y", { duration: 0.5, ease: "power3" });

    let visible = false;

    const onMove = (e: MouseEvent) => {
      if (!visible) {
        visible = true;
        gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
      }
      xDotSet(e.clientX);
      yDotSet(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
      labelX(e.clientX + 50);
      labelY(e.clientY);
    };

    const findTarget = (el: EventTarget | null) =>
      (el as HTMLElement)?.closest?.(
        "a, button, [data-cursor], [data-cursor-label]"
      ) as HTMLElement | null;

    const onOver = (e: MouseEvent) => {
      const target = findTarget(e.target);
      if (!target) return;
      const mode = target.getAttribute("data-cursor");
      const text = target.getAttribute("data-cursor-label");

      ring.classList.remove("is-hovering", "is-text");
      if (mode === "text") ring.classList.add("is-text");
      else ring.classList.add("is-hovering");

      if (text) {
        label.textContent = text;
        label.classList.add("is-visible");
      }
    };

    const onOut = (e: MouseEvent) => {
      const target = findTarget(e.target);
      if (!target) return;
      // ignore moves between children of the same interactive element
      const related = findTarget(e.relatedTarget);
      if (related === target) return;
      ring.classList.remove("is-hovering", "is-text");
      label.classList.remove("is-visible");
    };

    const onLeave = () => {
      visible = false;
      gsap.to([dot, ring], { opacity: 0, duration: 0.3 });
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.removeEventListener("mouseleave", onLeave);
      document.body.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" style={{ opacity: 0 }} />
      <div ref={ringRef} className="cursor-ring" style={{ opacity: 0 }} />
      <div ref={labelRef} className="cursor-label" />
    </>
  );
}
