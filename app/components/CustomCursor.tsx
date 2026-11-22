"use client";

import { useEffect, useRef } from "react";

type Point = { x: number; y: number };
type Mode = "idle" | "link" | "project";

const interactive = 'a, button, [data-cursor], [data-cursor-label]';
const nativeCursor = 'input, textarea, select, iframe, [contenteditable]:not([contenteditable="false"])';
const projects = '.project-card, .featured-project__visual, [data-cursor="project"]';

function follow(point: Point, destination: Point, response: number) {
  point.x += (destination.x - point.x) * response;
  point.y += (destination.y - point.y) * response;
}

function place(element: HTMLElement, point: Point) {
  element.style.translate = `${point.x}px ${point.y}px`;
}

function drawRibbon(path: SVGPathElement, head: Point, shoulder: Point, tail: Point) {
  const dx = tail.x - head.x;
  const dy = tail.y - head.y;
  const length = Math.hypot(dx, dy);
  if (length < 1) {
    path.setAttribute("d", "");
    return;
  }

  // Cap the trail and its curve on fast moves or jumps across the window.
  const reach = Math.min(1, 56 / length);
  const tipX = dx * reach;
  const tipY = dy * reach;
  const shoulderX = shoulder.x - head.x;
  const shoulderY = shoulder.y - head.y;
  const bend = Math.min(reach, 40 / Math.max(1, Math.hypot(shoulderX, shoulderY)));
  const bendX = shoulderX * bend;
  const bendY = shoulderY * bend;
  const width = Math.min(3.4, length * 0.15);
  const normalX = (-dy / length) * width;
  const normalY = (dx / length) * width;

  path.setAttribute("d", `M ${normalX} ${normalY}
    Q ${bendX + normalX} ${bendY + normalY} ${tipX} ${tipY}
    Q ${bendX - normalX} ${bendY - normalY} ${-normalX} ${-normalY} Z`);
  path.style.opacity = String(Math.min(0.56, length / 42));
}

function badgePosition(pointer: Point, mode: Mode): Point {
  // Keep the label inside the viewport and out of the pointer's way.
  if (mode === "link") {
    return {
      x: Math.min(pointer.x + 49, window.innerWidth - 56),
      y: pointer.y + 48 <= window.innerHeight ? pointer.y + 28 : Math.max(20, pointer.y - 28),
    };
  }

  const inset = 52;
  return {
    x: Math.max(inset, Math.min(pointer.x, window.innerWidth - inset)),
    y: Math.max(inset, Math.min(pointer.y, window.innerHeight - inset)),
  };
}

export default function CustomCursor() {
  const rootRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const ribbonRef = useRef<SVGPathElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current!;
    const marker = markerRef.current!;
    const trail = trailRef.current!;
    const ribbon = ribbonRef.current!;
    const badge = badgeRef.current!;
    const caption = captionRef.current!;
    const motion = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");

    const pointer = { x: 0, y: 0 };
    const shoulder = { ...pointer };
    const tail = { ...pointer };
    const badgePoint = { ...pointer };
    let visible = false;
    let mode: Mode = "idle";
    let frame = 0;
    let previousTime = 0;
    let idleTimer: ReturnType<typeof setTimeout> | undefined;

    const cancelIdle = () => {
      clearTimeout(idleTimer);
      idleTimer = undefined;
    };

    const render = (time: number) => {
      frame = 0;
      const dt = previousTime ? Math.min(time - previousTime, 32) : 16;
      previousTime = time;

      let moving = false;
      if (mode !== "project") {
        follow(shoulder, pointer, 1 - Math.exp(-dt / 37));
        follow(tail, shoulder, 1 - Math.exp(-dt / 63));
        drawRibbon(ribbon, pointer, shoulder, tail);
        moving = Math.hypot(pointer.x - tail.x, pointer.y - tail.y) > 0.7
          || Math.hypot(pointer.x - shoulder.x, pointer.y - shoulder.y) > 0.7;
      }

      if (mode !== "idle") {
        const goal = badgePosition(pointer, mode);
        follow(badgePoint, goal, 1 - Math.exp(-dt / 42));
        place(badge, badgePoint);
        moving ||= Math.hypot(goal.x - badgePoint.x, goal.y - badgePoint.y) > 0.5;
      }

      if (moving) frame = requestAnimationFrame(render);
      else previousTime = 0;
    };

    const wake = () => {
      if (visible && !frame) frame = requestAnimationFrame(render);
    };

    const setMode = (next: Mode) => {
      if (next === mode) return;

      if (next === "idle" || mode === "project") {
        Object.assign(shoulder, pointer);
        Object.assign(tail, pointer);
        ribbon.setAttribute("d", "");
      }

      if (mode === "idle" && next !== "idle") {
        Object.assign(badgePoint, badgePosition(pointer, next));
        place(badge, badgePoint);
      }

      mode = next;
      root.dataset.mode = next;
      wake();
    };

    const hide = () => {
      cancelIdle();
      visible = false;
      root.dataset.visible = "false";
      root.dataset.pressed = "false";
      document.body.classList.remove("has-custom-cursor");
      cancelAnimationFrame(frame);
      frame = 0;
      previousTime = 0;
      setMode("idle");
    };

    const updateTarget = (element: Element | null) => {
      const target = element?.closest(interactive);
      if (target) {
        cancelIdle();
        const isProject = target.matches(projects);
        const isButton = target.tagName === "BUTTON";
        const label = target.getAttribute("data-cursor-label")
          || (isProject ? "View project" : isButton ? "Click" : target.getAttribute("href")?.startsWith("mailto:") ? "Email" : "Explore");
        const text = `${label.slice(0, 24)}${isButton ? "" : " ↗"}`;
        if (caption.textContent !== text) caption.textContent = text;
        setMode(isProject ? "project" : "link");
      } else if (mode !== "idle" && idleTimer === undefined) {
        // Keep the label steady when crossing small gaps between hover targets.
        idleTimer = setTimeout(() => {
          idleTimer = undefined;
          setMode("idle");
        }, 120);
      }
    };

    const onMove = (event: PointerEvent) => {
      if (!motion.matches || event.pointerType === "touch") return;
      const element = event.target instanceof Element ? event.target : null;
      if (element?.closest(nativeCursor)) {
        hide();
        return;
      }

      pointer.x = event.clientX;
      pointer.y = event.clientY;
      if (!visible) {
        Object.assign(shoulder, pointer);
        Object.assign(tail, pointer);
        ribbon.setAttribute("d", "");
        visible = true;
        root.dataset.visible = "true";
        document.body.classList.add("has-custom-cursor");
      }
      place(marker, pointer);
      place(trail, pointer);
      updateTarget(element);
      wake();
    };

    const onScroll = () => {
      if (!visible) return;
      const element = document.elementFromPoint(pointer.x, pointer.y);
      if (!element || element.closest(nativeCursor)) hide();
      else {
        updateTarget(element);
        wake();
      }
    };
    const onDown = (event: PointerEvent) => {
      if (event.pointerType === "touch") hide();
      else if (visible) root.dataset.pressed = "true";
    };
    const onUp = () => { root.dataset.pressed = "false"; };
    const onOut = (event: PointerEvent) => {
      if (!event.relatedTarget || (event.relatedTarget instanceof Element && event.relatedTarget.matches("iframe"))) hide();
    };
    const onVisibility = () => { if (document.hidden) hide(); };

    motion.addEventListener("change", hide);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    window.addEventListener("pointercancel", hide, { passive: true });
    window.addEventListener("pointerout", onOut, { passive: true });
    window.addEventListener("blur", hide);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      hide();
      motion.removeEventListener("change", hide);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", hide);
      window.removeEventListener("pointerout", onOut);
      window.removeEventListener("blur", hide);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div ref={rootRef} className="custom-cursor" data-mode="idle" data-visible="false" aria-hidden="true">
      <div ref={trailRef} className="cursor-trail">
        <svg width="1" height="1" overflow="visible" focusable="false">
          <path ref={ribbonRef} fill="currentColor" />
        </svg>
      </div>
      <div ref={markerRef} className="cursor-marker">
        <svg viewBox="0 0 24 24" width="15" height="15" focusable="false">
          <path d="M12 0C13.5 8.4 15.6 10.5 24 12C15.6 13.5 13.5 15.6 12 24C10.5 15.6 8.4 13.5 0 12C8.4 10.5 10.5 8.4 12 0Z" />
        </svg>
      </div>
      <div ref={badgeRef} className="cursor-badge">
        <span ref={captionRef} className="cursor-caption" />
      </div>
    </div>
  );
}
