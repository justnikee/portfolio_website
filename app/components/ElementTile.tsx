import React from "react";

type TileProps = {
  symbol: string;
  number: number | string;
  name?: string;
  className?: string;
};

/**
 * Boxed periodic-table tile — a Breaking Bad / chemistry nod.
 * Scales with the surrounding font-size (everything in em).
 */
export function ElementTile({ symbol, number, name, className = "" }: TileProps) {
  return (
    <span
      className={`element-tile ${className}`}
      title={name ? `${name} · element ${number}` : `element ${number}`}
    >
      <span className="element-tile__num">{number}</span>
      <span className="element-tile__sym">{symbol}</span>
    </span>
  );
}

type MarkProps = {
  children: React.ReactNode;
  number: number | string;
  name?: string;
  className?: string;
};

/**
 * Inline element symbol — colours the letters and tucks the atomic
 * number as a small superscript. Used inside large display type.
 */
export function ElementMark({ children, number, name, className = "" }: MarkProps) {
  return (
    <span
      className={`element-mark ${className}`}
      data-num={number}
      title={name ? `${name} · element ${number}` : `element ${number}`}
    >
      {children}
    </span>
  );
}

export default ElementTile;
