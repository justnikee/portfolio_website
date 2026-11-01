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

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set("[data-h-line], [data-h-fade]", { clearProps: "all" });
        gsap.set(headline.current, { clearProps: "all" });
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
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
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
      return () => mm.revert();
    },
    { dependencies: [isLoading], scope: root }
  );

  return (
    <section
      ref={root}
      className="relative flex min-h-[85svh] flex-col px-5 pb-10 pt-[120px] sm:px-8 sm:pb-14"
    >
      <div className="m-auto flex w-full max-w-[1440px] flex-1 flex-col justify-between">
        <h1
          ref={headline}
          className="my-8 font-[MainFont] uppercase leading-[0.84] tracking-[-0.01em]"
          style={{ fontSize: "clamp(3.4rem, 14.5vw, 14rem)" }}
        >
          <span className="line-mask">
            <span data-h-line className="reveal-up">
              I build
            </span>
          </span>
          <span className="line-mask">
            <span data-h-line className="reveal-up">
              Things <span className="">For</span>
            </span>
          </span>
          <span className="line-mask">
            <span data-h-line className="reveal-up accent-text">
              The Web
            </span>
          </span>
        </h1>

        {/* bottom row */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <p data-h-fade className="max-w-xl font-[outfit] body-text">
            I&apos;m Nikhil, a frontend developer building full-stack products.
            I&apos;m currently developing a battery digital product passport
            platform for Indian manufacturers
            and exporters.
          </p>
          <a data-h-fade href="#Contact" className="text-link whitespace-nowrap">Get in touch ↗</a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
