"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { useLoading } from "../components/LoadingProvider";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const root = useRef<HTMLElement>(null);
  const headline = useRef<HTMLHeadingElement>(null);
  const { isLoading } = useLoading();

  useGSAP(
    () => {
      if (isLoading) {
        gsap.set("[data-h-line]", { yPercent: 118, rotate: 3 });
        gsap.set(headline.current, { filter: "blur(12px)", scale: 1.06 });
        gsap.set("[data-h-fade]", { opacity: 0, y: 26 });
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: "expo.out" },
        delay: 0.15,
      });

      tl.fromTo(
        "[data-h-line]",
        { yPercent: 118, rotate: 3 },
        { yPercent: 0, rotate: 0, duration: 1.3, stagger: 0.12 }
      )
        .fromTo(
          headline.current,
          { filter: "blur(12px)", scale: 1.06 },
          { filter: "blur(0px)", scale: 1, duration: 1.5 },
          "<"
        )
        .fromTo(
          "[data-h-fade]",
          { opacity: 0, y: 26 },
          { opacity: 1, y: 0, duration: 1.1, stagger: 0.12, ease: "power3.out" },
          "-=1"
        );

      // headline drifts up subtly on scroll — desktop only, so mobile
      // sections stay put (no floating on scroll)
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        gsap.to(headline.current, {
          yPercent: -14,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    },
    { dependencies: [isLoading], scope: root }
  );

  return (
    <section
      ref={root}
      className="relative flex min-h-[100svh] flex-col px-5 pb-8 pt-[120px] sm:px-8 sm:pb-10"
    >
      <div className="m-auto flex w-full max-w-[1400px] flex-1 flex-col justify-between">
        {/* headline */}
        <h1
          ref={headline}
          className="my-8 font-[MainFont] uppercase leading-[0.84] tracking-[-0.01em]"
          style={{ fontSize: "clamp(3.4rem, 15.5vw, 17rem)" }}
        >
          <span className="line-mask">
            <span data-h-line className="reveal-up">
              I Cook
            </span>
          </span>
          <span className="line-mask">
            <span data-h-line className="reveal-up">
              Things <span className="">For</span>
            </span>
          </span>
          <span className="line-mask">
            <span data-h-line className="reveal-up outline-word">
              The Web
            </span>
          </span>
        </h1>

        {/* bottom row */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <p data-h-fade className="max-w-md font-[outfit] body-text">
            I&apos;m Nikhil — a frontend developer from India plating fast,
            accessible and story-driven interfaces with Next.js, React and
            Node. Three years in the kitchen and counting.
          </p>
          <a
            data-h-fade
            href="#Work"
            data-cursor="hover"
            className="group inline-flex w-fit items-center gap-3 font-[outfit] text-sm uppercase tracking-[0.18em]"
          >
            <span className="relative flex h-12 w-12 items-center justify-center rounded-full border border-[--ink] transition-colors duration-500 group-hover:bg-[--ink]">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                className="transition-colors duration-500 group-hover:stroke-[--bg]"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </span>
            View selected work
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
