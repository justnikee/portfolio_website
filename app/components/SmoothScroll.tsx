"use client";
import { ReactLenis, useLenis } from "@studio-freight/react-lenis";
import { ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { usePathname } from "next/navigation";

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
  const pathname = usePathname();
  // Articles and admin pages use native scrolling and skip the Lenis ticker.
  if (pathname?.startsWith("/posts") || pathname?.startsWith("/admin")) return <>{children}</>;
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
