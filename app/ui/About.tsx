"use client";

import React from "react";
import { ElementTile } from "../components/ElementTile";

const capabilities = [
  { n: "01", title: "Frontend Engineering", desc: "Next.js · React · TypeScript" },
  { n: "02", title: "E-commerce Builds", desc: "Shopify · Liquid · Headless" },
  { n: "03", title: "Motion & Interaction", desc: "GSAP · ScrollTrigger · Lenis" },
  { n: "04", title: "Performance & Access", desc: "Core Web Vitals · A11y · SEO" },
];

const headingLines = [
  "I treat the browser",
  "like a kitchen —",
  "raw ideas in,",
  "something worth",
  "serving out.",
];

const About = () => {
  return (
    <section id="About" className="px-5 py-24 sm:px-8 sm:py-32">
      <div className="m-auto max-w-[1400px]">
        <div className="mb-12 flex items-center gap-4">
          <ElementTile symbol="C" number={6} name="Carbon" className="text-[0.6rem]" />
          <span className="eyebrow">About</span>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <h2 className="col-span-1 font-[MainFont] text-[2.2rem] uppercase leading-[1.02] tracking-[-0.01em] sm:text-[3.4rem] lg:col-span-7 lg:text-[4.4rem]">
            {headingLines.map((line, i) => (
              <span
                key={i}
                className={`block ${
                  line === "serving out." ? "accent-text" : ""
                }`}
              >
                {line}
              </span>
            ))}
          </h2>

          <div className="col-span-1 flex flex-col justify-end lg:col-span-5">
            <p className="mb-6 font-[outfit] body-text">
              I&apos;m a frontend developer from India with three-plus years of
              experience building engaging, accessible web experiences. I work
              mostly in Next.js, React and Node, and I care as much about how a
              thing feels as how it&apos;s built.
            </p>
            <p className="font-[outfit] body-text">
              Design and engineering aren&apos;t separate courses to me — they go
              on the same plate.
            </p>
          </div>
        </div>

        {/* capabilities */}
        <div className="mt-20">
          {capabilities.map((c) => (
            <div key={c.n} className="cap-row" data-cursor="hover">
              <span className="cap-row__fill" aria-hidden="true" />
              <span className="font-[outfit] text-sm tracking-[0.1em] text-[--ink-faint]">
                {c.n}
              </span>
              <h3 className="cap-row__title flex-1 px-4 font-[MainFont] text-2xl uppercase tracking-[-0.01em] sm:px-8 sm:text-4xl">
                {c.title}
              </h3>
              <span className="hidden text-right font-[outfit] text-sm text-[--ink-soft] sm:block">
                {c.desc}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
