"use client";
import React, { useState, useRef } from "react";
import Magnetic from "../components/Magnetic";
import { ElementTile } from "../components/ElementTile";

const Contact = () => {
  const emailRef = useRef<HTMLSpanElement>(null);
  const [copyText, setCopyText] = useState("Copy");

  const handleCopy = () => {
    if (emailRef.current) {
      navigator.clipboard
        .writeText(emailRef.current.textContent || "")
        .then(() => {
          setCopyText("Copied");
          setTimeout(() => setCopyText("Copy"), 2000);
        })
        .catch((error) => console.log("Failed to copy:", error));
    }
  };

  return (
    <section id="Contact" className="portfolio-section">
      <div className="m-auto max-w-[1440px]">
        <div className="mb-12 flex items-center gap-4">
          <ElementTile symbol="Cu" number={29} name="Copper" className="text-[0.6rem]" />
          <span className="eyebrow">Contact</span>
        </div>

        <p className="mb-8 max-w-2xl font-[outfit] body-text">
          Have a product to build or an opportunity to share? I&apos;d love to
          talk about frontend and full-stack work, thoughtful web experiences,
          and practical uses of AI.
        </p>

        <h2 className="font-[MainFont] uppercase leading-[0.9] tracking-[-0.02em]">
          <span className="block" style={{ fontSize: "clamp(2.6rem, 11vw, 9rem)" }}>
            Let&apos;s make
          </span>
          <span className="block" style={{ fontSize: "clamp(2.6rem, 11vw, 9rem)" }}>
            something
          </span>
          <span
            className="block accent-text"
            style={{ fontSize: "clamp(2.6rem, 11vw, 9rem)" }}
          >
            that matters.
          </span>
        </h2>

        <div className="mt-14 flex flex-col items-start gap-6 border-t border-[--line] pt-10 sm:flex-row sm:items-center sm:justify-between">
          <a
            href="mailto:contact@doitnikhil.in"
            data-cursor="text"
            data-cursor-label="Email"
            className="link-underline font-[MainFont] text-2xl uppercase tracking-tight sm:text-5xl"
          >
            <span ref={emailRef}>contact@doitnikhil.in</span>
          </a>
          <Magnetic strength={0.4}>
            <button
              type="button"
              data-cursor-label={copyText}
              onClick={handleCopy}
              data-cursor="hover"
              className="copy_button rounded-full px-7 py-3 font-[outfit] text-sm uppercase tracking-[0.12em]"
            >
              <span aria-live="polite">{copyText}</span>
            </button>
          </Magnetic>
        </div>
      </div>
    </section>
  );
};

export default Contact;
