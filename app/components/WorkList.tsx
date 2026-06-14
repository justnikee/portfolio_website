"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

type Project = {
  title: string;
  year: string;
  meta: string;
  image: string;
  link: string;
};

const projects: Project[] = [
  {
    title: "Export Ready",
    year: "2025",
    meta: "Next.js · Supabase · Golang",
    image: "/erbattery.png",
    link: "https://export-ready.vercel.app/",
  },
  {
    title: "Vyoma Studio",
    year: "2025",
    meta: "Astro · GSAP · Tailwind",
    image: "/vyoma-studio.png",
    link: "https://vyoma-studio-iota.vercel.app/",
  },
  {
    title: "SS-Aevi",
    year: "2025",
    meta: "Next.js · Supabase · Prisma",
    image: "/Aevi.png",
    link: "https://ss-aevi.vercel.app/",
  },
  {
    title: "State of Kind",
    year: "2024",
    meta: "Next.js Storefront",
    image: "/main_images/stateofkind.png",
    link: "https://github.com/justnikee/next.stateofkind",
  },
  {
    title: "PlanetDesert",
    year: "2023—",
    meta: "Shopify · Maintained",
    image: "/main_images/planetdesert.png",
    link: "https://planetdesert.com",
  },
  {
    title: "Paufashion",
    year: "2023",
    meta: "Shopify · Built from scratch",
    image: "/main_images/pau-fashion.png",
    link: "https://paufashion.com/",
  },
  {
    title: "Knovus",
    year: "2023",
    meta: "Shopify · End to end",
    image: "/main_images/knovus.png",
    link: "https://www.knovus.com.au/",
  },
  {
    title: "E-commerce API",
    year: "2024",
    meta: "Node · Express · MongoDB",
    image: "/main_images/rb_2149379656.png",
    link: "https://github.com/justnikee/Backend",
  },
];

const WorkList = () => {
  const root = useRef<HTMLDivElement>(null);
  const hoverRef = useRef<HTMLDivElement>(null);
  const imgRefs = useRef<(HTMLImageElement | null)[]>([]);
  const active = useRef<number>(-1);

  useGSAP(
    () => {
      if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches)
        return;

      const hover = hoverRef.current!;
      // GSAP owns the full transform; keep the image centered on the cursor.
      gsap.set(hover, { xPercent: -50, yPercent: -50, scale: 0.8, opacity: 0 });
      const xTo = gsap.quickTo(hover, "x", { duration: 0.55, ease: "power3" });
      const yTo = gsap.quickTo(hover, "y", { duration: 0.55, ease: "power3" });

      const onMove = (e: MouseEvent) => {
        xTo(e.clientX);
        yTo(e.clientY);
      };
      window.addEventListener("mousemove", onMove);
      return () => window.removeEventListener("mousemove", onMove);
    },
    { scope: root }
  );

  const showImage = (i: number) => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    active.current = i;
    imgRefs.current.forEach((img, idx) =>
      gsap.to(img, { opacity: idx === i ? 1 : 0, duration: 0.3 })
    );
    gsap.to(hoverRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.5,
      ease: "power3.out",
    });
  };

  const hideImage = () => {
    active.current = -1;
    gsap.to(hoverRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 0.4,
      ease: "power3.out",
    });
  };

  return (
    <div ref={root} className="work-list">
      {projects.map((p, i) => (
        <Link
          key={p.title}
          href={p.link}
          target="_blank"
          data-work-row
          data-cursor="text"
          data-cursor-label="View"
          className="work-row group"
          onMouseEnter={() => showImage(i)}
          onMouseLeave={hideImage}
        >
          <span className="work-row__index">({String(i + 1).padStart(2, "0")})</span>
          <span className="work-row__title">{p.title}</span>
          <span className="work-row__meta">
            {p.meta}
            <br />
            <span className="text-[--ink-faint]">{p.year}</span>
          </span>
          <span className="work-row__thumb">
            <Image src={p.image} width={600} height={400} alt={p.title} />
          </span>
        </Link>
      ))}

      {/* floating cursor-follow preview */}
      <div ref={hoverRef} className="work-hover">
        {projects.map((p, i) => (
          <Image
            key={p.title}
            ref={(el) => {
              imgRefs.current[i] = el;
            }}
            src={p.image}
            width={680}
            height={800}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-0"
          />
        ))}
      </div>
    </div>
  );
};

export default WorkList;
