import React from "react";
import TechIconSection from "../components/TechIconSection";
import { ElementTile } from "../components/ElementTile";

const TechOverview = () => {
  return (
    <section id="Uses" className="px-5 py-24 sm:px-8 sm:py-32">
      <div className="m-auto max-w-[1400px]">
        <div className="mb-12 flex items-center gap-4">
          <ElementTile symbol="Ti" number={22} name="Titanium" className="text-[0.6rem]" />
          <span className="eyebrow">The Pantry</span>
        </div>

        <h2 className="max-w-[14ch] font-[MainFont] text-[2.4rem] uppercase leading-[0.98] tracking-[-0.01em] sm:text-[4.6rem]">
          <span className="block">The tools I</span>
          <span className="block">keep sharp.</span>
        </h2>

        <TechIconSection />
      </div>
    </section>
  );
};

export default TechOverview;
