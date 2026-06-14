import React from "react";
import TechIconSection from "../components/TechIconSection";

const TechOverview = () => {
  return (
    <section id="Uses" className="px-5 py-24 sm:px-8 sm:py-32">
      <div className="m-auto max-w-[1400px]">
        <div
          className="mb-12 flex items-center gap-4"
          data-parallax
          data-speed="25"
        >
          <span className="eyebrow">(04) — The Pantry</span>
          <span className="rule flex-1" />
        </div>

        <h2
          data-parallax
          data-speed="50"
          className="max-w-[14ch] font-[MainFont] text-[2.4rem] uppercase leading-[0.98] tracking-[-0.01em] sm:text-[4.6rem]"
        >
          <span className="block">The tools I</span>
          <span className="block">keep sharp.</span>
        </h2>

        <TechIconSection />
      </div>
    </section>
  );
};

export default TechOverview;
