import React from "react";
import WorkList from "../components/WorkList";
import { ElementTile } from "../components/ElementTile";

const Work = () => {
  return (
    <section id="Work" className="px-5 py-24 sm:px-8 sm:py-32">
      <div className="m-auto max-w-[1400px]">
        <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="mb-12 flex items-center gap-4">
              <ElementTile symbol="Au" number={79} name="Gold" className="text-[0.6rem]" />
              <span className="eyebrow">Selected Work</span>
            </span>
            <h2 className="font-[MainFont] text-[2.6rem] uppercase leading-[0.92] tracking-[-0.01em] sm:text-[5rem]">
              Things <br className="hidden sm:block" />
              I&apos;ve cooked
            </h2>
          </div>
          <p className="max-w-xs font-[outfit] body-text">
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
