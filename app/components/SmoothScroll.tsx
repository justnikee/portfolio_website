"use client";
import { ReactLenis } from "@studio-freight/react-lenis";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

function SmoothScrolling({ children }: Props) {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5 }}>
      {children}
    </ReactLenis>
  );
}

export default SmoothScrolling;