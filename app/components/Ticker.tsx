import React from "react";

const items = [
  "Next.js",
  "React",
  "Shopify",
  "GSAP",
  "Node",
  "TypeScript",
  "Liquid",
  "Tailwind",
];

const Star = () => <span className="ticker__star">✦</span>;

const Ticker = () => {
  // duplicated track for a seamless -50% loop
  const group = (
    <div className="ticker__item">
      {items.map((it, i) => (
        <React.Fragment key={i}>
          <span>{it}</span>
          <Star />
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <div className="ticker py-2" aria-hidden="true">
      <div className="ticker__track">
        {group}
        {group}
      </div>
    </div>
  );
};

export default Ticker;
