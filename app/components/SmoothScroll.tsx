"use client";
import { ReactLenis, useLenis } from "@studio-freight/react-lenis";
import { ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  children: ReactNode;
};

/** Keeps GSAP ScrollTrigger in sync with Lenis on every scroll frame. */
function LenisBridge() {
  useLenis(() => ScrollTrigger.update());
  return null;
}

function SmoothScrolling({ children }: Props) {
  return (
    <ReactLenis
      root
      options={{ lerp: 0.09, duration: 1.4, smoothWheel: true }}
    >
      <LenisBridge />
      {children}
    </ReactLenis>
  );
}

export default SmoothScrolling;
