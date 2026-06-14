"use client";

import Link from "next/link";
import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import Magnetic from "../components/Magnetic";
import { useLoading } from "../components/LoadingProvider";
import { usePathname } from "next/navigation";
import BlogHeader from "../components/BlogHeader";

type NavItem = { label: string; href: string; id?: string };

const navItems: NavItem[] = [
  { label: "About", href: "/#About", id: "About" },
  { label: "Work", href: "/#Work", id: "Work" },
  { label: "Pantry", href: "/#Uses", id: "Uses" },
  { label: "Posts", href: "/posts" },
];

const Header = () => {
  const pathname = usePathname();

  // Skip header on admin routes
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  // Use specific header for blog pages
  if (pathname?.startsWith("/posts")) {
    return <BlogHeader />;
  }

  const { isLoading } = useLoading();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY;
      setScrolled(y > 12);
      if (y > lastScrollY.current && y > 160) setHidden(true);
      else setHidden(false);
      lastScrollY.current = y;
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const header = useRef<HTMLElement>(null);
  const navLinks = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    if (!header.current || isLoading) return;
    gsap.fromTo(
      header.current,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );
  }, [isLoading]);

  const scrollToId = (id?: string) => {
    if (!id) return;
    const el = document.getElementById(id);
    if (!el) return;
    window.scrollTo({ top: el.offsetTop - 90, behavior: "smooth" });
  };

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, item: NavItem) => {
    if (!item.id) return;
    e.preventDefault();
    scrollToId(item.id);
    setMenuOpen(false);
  };

  const handleContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setMenuOpen(false);
    scrollToId("Contact");
  };

  const toggleMenu = () => {
    const next = !menuOpen;
    setMenuOpen(next);
    if (next) {
      gsap.fromTo(
        navLinks.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, delay: 0.15, ease: "power3.out" }
      );
    }
  };

  return (
    <header
      ref={header}
      style={{ opacity: 0 }}
      className={`site-header fixed top-0 z-30 w-full ${
        scrolled ? "is-scrolled" : ""
      } ${hidden && !menuOpen ? "is-hidden" : ""}`}
    >
      <div className="m-auto flex max-w-[1500px] items-center justify-between px-5 py-4 sm:px-8 sm:py-5">
        <Link href="/" aria-label="Home" data-cursor="hover" className="relative z-30">
          <Image
            width={86}
            height={36}
            alt="Nikhil"
            src="/main_images/NIKHIL.png"
            className={menuOpen ? "brightness-0 invert sm:brightness-0 sm:invert-0" : "brightness-0"}
          />
        </Link>

        {/* desktop nav */}
        <nav className="hidden items-center gap-8 sm:flex">
          {navItems.map((item, i) => (
            <Link
              key={i}
              href={item.href}
              className="link-underline font-[outfit] text-sm uppercase tracking-[0.06em] text-[--ink]"
              data-cursor="hover"
              onClick={(e) => handleNav(e, item)}
            >
              {item.label}
            </Link>
          ))}
          <Magnetic strength={0.5}>
            <a
              href="#Contact"
              data-cursor="hover"
              onClick={handleContact}
              className="rounded-full bg-[--ink] px-5 py-2 font-[outfit] text-sm text-[--bg]"
            >
              Let&apos;s talk
            </a>
          </Magnetic>
        </nav>

        {/* mobile toggle */}
        <button
          onClick={toggleMenu}
          aria-label="Toggle menu"
          className="relative z-30 flex flex-col gap-[6px] sm:hidden"
        >
          <span
            className={`block h-[2px] w-6 rounded-full transition-all duration-300 ${
              menuOpen ? "translate-y-[4px] rotate-45 bg-[--bg]" : "bg-[--ink]"
            }`}
          />
          <span
            className={`block h-[2px] rounded-full transition-all duration-300 ${
              menuOpen ? "w-6 -translate-y-[4px] -rotate-45 bg-[--bg]" : "w-4 bg-[--ink]"
            }`}
          />
        </button>
      </div>

      {/* mobile drawer */}
      <div
        className={`fixed inset-0 z-20 h-screen w-full bg-[--ink] transition-[clip-path] duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] sm:hidden`}
        style={{
          clipPath: menuOpen
            ? "circle(150% at 100% 0)"
            : "circle(0% at 100% 0)",
        }}
      >
        <div className="flex h-full flex-col justify-end gap-2 px-6 pb-16">
          <span className="mb-4 font-[outfit] text-xs uppercase tracking-[0.25em] text-[rgba(231,225,211,0.5)]">
            Menu
          </span>
          {navItems.map((item, i) => (
            <Link
              key={i}
              href={item.href}
              ref={(el) => {
                navLinks.current[i] = el;
              }}
              onClick={(e) => handleNav(e, item)}
              className="font-[MainFont] text-5xl uppercase text-[--bg]"
            >
              {item.label}
            </Link>
          ))}
          <a
            ref={(el) => {
              navLinks.current[navItems.length] = el;
            }}
            href="#Contact"
            onClick={handleContact}
            className="font-[MainFont] text-5xl uppercase text-[--accent]"
          >
            Contact
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
