"use client";

import React from "react";
import FooterLinks from "../components/FooterLinks";
import { links, socialLinks } from "../data/footerlinks";
import LocalTime from "../components/LocalTime";
import SpotifyEmbed from "../components/SpotifyEmbed";
import { usePathname } from "next/navigation";

const Footer: React.FC = () => {
  const pathname = usePathname();

  // Skip footer on admin routes
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="overflow-hidden px-5 pb-8 pt-24 sm:px-8 sm:pt-32">
      <div className="m-auto max-w-[1500px]">
        <div className="grid grid-cols-1 gap-12 border-t border-[--line] pt-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <h3 className="mb-3 font-[outfit] text-lg font-semibold">
              Nikhil Thakur
            </h3>
            <p className="mb-7 max-w-xs font-[outfit] leading-6 text-[--ink-soft]">
              Frontend developer at Cybergineer Solutions. Open for side-projects
              and collaborations.
            </p>
            <SpotifyEmbed />
          </div>

          <div className="md:col-span-4" />

          <div className="flex gap-16 sm:gap-24 md:col-span-4 md:justify-end">
            <div>
              <h4 className="eyebrow mb-5">Menu</h4>
              <FooterLinks links={links} />
            </div>
            <div>
              <h4 className="eyebrow mb-5">Connect</h4>
              <FooterLinks links={socialLinks} />
            </div>
          </div>
        </div>
      </div>

      {/* Full-bleed wordmark */}
      <div className="relative mt-16 w-screen -translate-x-5 overflow-hidden sm:-translate-x-8">
        <h2
          data-parallax
          data-speed="35"
          className="select-none whitespace-nowrap text-center font-[MainFont] uppercase leading-[0.74] tracking-[-0.02em] text-[--ink]"
          style={{ fontSize: "clamp(5rem, 27vw, 30rem)" }}
        >
          Nikhil<span className="accent-text">.</span>
        </h2>
      </div>

      <div className="m-auto max-w-[1500px]">
        <div className="flex flex-col items-start justify-between gap-3 border-t border-[--line] pt-6 sm:flex-row sm:items-center">
          <span className="font-[outfit] text-sm text-[--ink-soft]">
            © 2026 Nikhil Thakur
          </span>
          <span className="font-[outfit] text-sm text-[--ink-soft]">
            <LocalTime /> — Chandigarh, India
          </span>
          <span className="font-[outfit] text-sm text-[--ink-soft]">
            Cooked with Next.js &amp; GSAP
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
