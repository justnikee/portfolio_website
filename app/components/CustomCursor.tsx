"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/** An immediate four-point marker and an elastic ink trail; no React work per frame. */
export default function CustomCursor() {
  const markerRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const surfaceRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const media = gsap.matchMedia();
    media.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const marker = markerRef.current!;
      const follower = followerRef.current!;
      const surface = surfaceRef.current!;
      const caption = captionRef.current!;
      gsap.set([marker, follower, surface], { xPercent: -50, yPercent: -50 });
      const markerX = gsap.quickSetter(marker, "x", "px");
      const markerY = gsap.quickSetter(marker, "y", "px");
      const followerX = gsap.quickSetter(follower, "x", "px");
      const followerY = gsap.quickSetter(follower, "y", "px");
      const rotate = gsap.quickSetter(surface, "rotation", "deg");
      const scaleX = gsap.quickSetter(surface, "scaleX");
      const scaleY = gsap.quickSetter(surface, "scaleY");
      let x = 0, y = 0, trailX = 0, trailY = 0;
      let visible = false, pressed = false;
      let mode: "idle" | "link" | "project" = "idle";
      let target: Element | null = null;
      let idleTimer: ReturnType<typeof setTimeout> | null = null;
      let angle = 0, stretchX = 1, stretchY = 1;

      const cancelIdle = () => {
        if (idleTimer !== null) clearTimeout(idleTimer);
        idleTimer = null;
      };

      const hide = () => {
        cancelIdle();
        visible = false;
        pressed = false;
        marker.style.opacity = "0";
        follower.style.opacity = "0";
        document.body.classList.remove("has-custom-cursor");
      };

      const commitTarget = (next: Element | null) => {
        if (next === target) return;
        target = next;
        mode = next?.matches('.project-card, .featured-project__visual, [data-cursor="project"]')
          ? "project" : next ? "link" : "idle";
        follower.dataset.mode = mode;
        marker.dataset.mode = mode;
        const customLabel = next?.getAttribute("data-cursor-label");
        const href = next?.getAttribute("href") || "";
        const label = customLabel || (mode === "project" ? "View project" :
          href.startsWith("mailto:") ? "Email" : next?.tagName === "BUTTON" ? "Click" : "Explore");
        caption.textContent = `${label.slice(0, 24)}${next?.tagName === "BUTTON" ? "" : " ↗"}`;
      };

      const updateTarget = (element: Element | null) => {
        const next = element?.closest("a, button, [data-cursor], [data-cursor-label]") || null;
        if (next) {
          cancelIdle();
          commitTarget(next);
        } else if (target && idleTimer === null) {
          // Crossing a small gap between links should not collapse the badge.
          idleTimer = setTimeout(() => {
            idleTimer = null;
            commitTarget(null);
          }, 120);
        }
      };

      const onMove = (event: PointerEvent) => {
        if (event.pointerType === "touch") return;
        const element = event.target instanceof Element ? event.target : null;
        // Leave text editing and native form controls to the operating system.
        if (element?.closest('input, textarea, select, iframe, [contenteditable]:not([contenteditable="false"])')) {
          hide();
          return;
        }
        x = event.clientX;
        y = event.clientY;
        updateTarget(element);
        if (!visible) {
          visible = true;
          trailX = x;
          trailY = y;
          marker.style.opacity = "1";
          follower.style.opacity = "1";
          document.body.classList.add("has-custom-cursor");
        }
        markerX(x);
        markerY(y);
      };

      const render = (_time: number, delta: number) => {
        if (!visible) return;
        const offsetX = mode === "link" ? 46 : 0;
        const offsetY = mode === "link" ? 30 : 0;
        // Offset badges away from the pointer, keeping them inside the viewport.
        const goalX = mode === "link" ? Math.min(x + offsetX, window.innerWidth - 60)
          : mode === "project" ? Math.max(60, Math.min(x, window.innerWidth - 60)) : x;
        const goalY = mode === "link" ? Math.min(y + offsetY, window.innerHeight - 24)
          : mode === "project" ? Math.max(60, Math.min(y, window.innerHeight - 60)) : y;
        const smoothing = 1 - Math.pow(mode === "idle" ? 0.82 : 0.65, Math.min(delta / 16.67, 3));
        trailX += (goalX - trailX) * smoothing;
        trailY += (goalY - trailY) * smoothing;
        followerX(trailX);
        followerY(trailY);
        const dx = x - trailX, dy = y - trailY;
        const stretch = mode === "idle" ? Math.min(Math.hypot(dx, dy) / 70, 0.85) : 0;
        const compression = pressed ? 0.86 : 1;
        const response = 1 - Math.pow(0.72, Math.min(delta / 16.67, 3));
        const desiredAngle = mode === "idle" && Math.hypot(dx, dy) > 2
          ? Math.atan2(dy, dx) * 180 / Math.PI : mode === "project" ? -8 : 0;
        // Settle through the shortest angle; avoid noisy rotation at rest.
        angle += (((desiredAngle - angle + 540) % 360) - 180) * response;
        stretchX += ((1 + stretch) * compression - stretchX) * response;
        stretchY += ((1 - stretch * 0.3) * compression - stretchY) * response;
        rotate(angle);
        scaleX(stretchX);
        scaleY(stretchY);
      };
      const onDown = () => { pressed = true; };
      const onUp = () => { pressed = false; };
      const onScroll = () => {
        if (visible) updateTarget(document.elementFromPoint(x, y));
      };
      const onOut = (event: PointerEvent) => {
        if (!event.relatedTarget || (event.relatedTarget instanceof Element && event.relatedTarget.tagName === "IFRAME")) hide();
      };

      gsap.ticker.add(render);
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerdown", onDown, { passive: true });
      window.addEventListener("pointerup", onUp, { passive: true });
      window.addEventListener("pointercancel", onUp);
      window.addEventListener("pointerout", onOut);
      window.addEventListener("blur", hide);
      window.addEventListener("scroll", onScroll, { passive: true });
      document.addEventListener("pointerleave", hide);

      return () => {
        hide();
        gsap.ticker.remove(render);
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerdown", onDown);
        window.removeEventListener("pointerup", onUp);
        window.removeEventListener("pointercancel", onUp);
        window.removeEventListener("pointerout", onOut);
        window.removeEventListener("blur", hide);
        window.removeEventListener("scroll", onScroll);
        document.removeEventListener("pointerleave", hide);
      };
    });
    return () => media.revert();
  }, []);

  return (
    <>
      <div ref={markerRef} className="cursor-marker" aria-hidden="true" style={{ opacity: 0 }}>
        <svg viewBox="0 0 24 24" width="18" height="18"><path d="M12 0C13.5 8.4 15.6 10.5 24 12C15.6 13.5 13.5 15.6 12 24C10.5 15.6 8.4 13.5 0 12C8.4 10.5 10.5 8.4 12 0Z" /></svg>
      </div>
      <div ref={followerRef} className="cursor-follower" data-mode="idle" aria-hidden="true" style={{ opacity: 0 }}>
        <div ref={surfaceRef} className="cursor-surface" />
        <div ref={captionRef} className="cursor-caption" />
      </div>
    </>
  );
}
