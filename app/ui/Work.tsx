import React from "react";
import WorkList from "../components/WorkList";

const Work = () => {
  return (
    <section id="Work" className="px-5 py-24 sm:px-8 sm:py-32">
      <div className="m-auto max-w-[1400px]">
        <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div data-parallax data-speed="50">
            <span className="eyebrow mb-4 block">(02) — Selected Work</span>
            <h2 className="font-[MainFont] text-[2.6rem] uppercase leading-[0.92] tracking-[-0.01em] sm:text-[5rem]">
              Things <br className="hidden sm:block" />
              I&apos;ve cooked
            </h2>
          </div>
          <p
            data-parallax
            data-speed="-28"
            className="max-w-xs font-[outfit] text-sm leading-relaxed text-[--ink-soft]"
          >
            A short menu of recent builds — storefronts, custom Shopify themes
            and the odd backend. Hover a dish to preview it.
          </p>
        </div>

        <WorkList />
      </div>
    </section>
  );
};

export default Work;
