"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";

type Props = {
  title: string;
  description: string;
  image: string;
  stack: string[];
  link: string;
  index?: string;
};

gsap.registerPlugin(ScrollTrigger);

const Card = ({ title, description, image, stack, link, index }: Props) => {
  const cardElement = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!cardElement.current) return;
    gsap.fromTo(
      cardElement.current,
      { opacity: 0, y: 90, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: cardElement.current,
          start: "top 88%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  // Subtle 3D tilt that follows the cursor.
  const handleMove = (e: React.MouseEvent) => {
    const el = cardElement.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const rx = ((e.clientY - top) / height - 0.5) * -6;
    const ry = ((e.clientX - left) / width - 0.5) * 6;
    gsap.to(el, {
      rotateX: rx,
      rotateY: ry,
      duration: 0.5,
      ease: "power2.out",
      transformPerspective: 900,
    });
  };

  const handleLeave = () => {
    if (!cardElement.current) return;
    gsap.to(cardElement.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.7,
      ease: "power3.out",
    });
  };

  return (
    <div
      ref={cardElement}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="project-card flex-1 px-6 py-6"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="relative z-[1]">
        <div className="mb-4 flex items-start justify-between">
          <Link
            className="hoverTitle"
            href={link}
            target="_blank"
            data-cursor="hover"
          >
            <h4 className="flex items-center gap-3 font-[Heading] text-2xl uppercase sm:text-3xl">
              {title}
              <svg
                className="hoverIcon h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 30 30"
                fill="none"
              >
                <path fill="currentColor" d="M0 0h29.998L30 7.058 0 7.06V.001Z" />
                <path fill="currentColor" d="M29.998 0 30 30h-7.06V0h7.058Z" />
                <path
                  fill="currentColor"
                  d="M27.452 6.757 4.992 29.218 0 24.227l22.46-22.46 4.992 4.99Z"
                />
              </svg>
            </h4>
          </Link>
          {index && (
            <span className="font-[outfit] text-xs tracking-[0.2em] text-[--muted]">
              {index}
            </span>
          )}
        </div>
        <p className="font-[outfit] text-sm leading-6 text-[--muted] sm:text-base">
          {description}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {stack.map((item, i) => (
            <span
              key={i}
              className="tag-pill rounded-3xl px-3 py-1 font-[outfit] text-[12px] text-[#f4f4f5]"
            >
              {item}
            </span>
          ))}
        </div>

        <Link
          href={link}
          target="_blank"
          data-cursor="text"
          data-cursor-label="View"
          className="project-card__media mt-5 block"
        >
          <Image
            className="h-full w-full rounded bg-white object-cover"
            src={image}
            width={600}
            height={400}
            alt={title}
          />
          <span className="project-card__view">
            <span>View Project</span>
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Card;
