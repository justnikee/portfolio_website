"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import BlogHeader from "../components/BlogHeader";

type NavItem = { label: string; href: string; id?: string };
const navItems: NavItem[] = [
  { label: "Work", href: "/#Work", id: "Work" },
  { label: "About", href: "/#About", id: "About" },
  { label: "Experience", href: "/#Experience", id: "Experience" },
  { label: "Posts", href: "/posts" },
];
const contactItem = { label: "Contact", href: "/#Contact", id: "Contact" };

export default function Header() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;
  if (pathname?.startsWith("/posts")) return <BlogHeader />;
  return <PortfolioHeader key={pathname} pathname={pathname} />;
}

function PortfolioHeader({ pathname }: { pathname: string | null }) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const menuButton = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      setHidden(y > lastScrollY.current && y > 160);
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    menu.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
      if (event.key === "Tab") {
        const links = menu.current?.querySelectorAll<HTMLAnchorElement>("a");
        const last = links?.[links.length - 1];
        if (event.shiftKey && document.activeElement === menuButton.current) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          menuButton.current?.focus();
        }
      }
    };
    const onResize = () => { if (window.innerWidth >= 640) setMenuOpen(false); };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen]);

  const handleNav = (event: React.MouseEvent<HTMLAnchorElement>, item: NavItem) => {
    setMenuOpen(false);
    if (!item.id || pathname !== "/" || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const element = document.getElementById(item.id);
    if (!element) return;
    event.preventDefault();
    window.history.replaceState(null, "", item.href);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    element.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
  };

  return (
    <header className={`site-header fixed top-0 z-30 w-full px-5 sm:px-8 ${scrolled ? "is-scrolled" : ""} ${hidden && !menuOpen ? "is-hidden" : ""}`}>
      <div className="m-auto flex max-w-[1440px] items-center justify-between py-4 sm:py-5">
        <Link href="/" aria-label="Nikhil — home" data-cursor="hover" className="relative z-30" onClick={() => setMenuOpen(false)} tabIndex={menuOpen ? -1 : undefined}>
          <span data-preloader-logo className={`site-wordmark ${menuOpen ? "text-[--bg]" : "text-[--ink]"}`} aria-hidden="true">Nikhil<span className="accent-text">.</span></span>
        </Link>
        <nav aria-label="Main navigation" className="hidden items-center gap-6 sm:flex">
          {navItems.map(item => <Link key={item.href} href={item.href} onClick={event => handleNav(event, item)} className="link-underline text-xs uppercase tracking-[0.06em]" data-cursor="hover">{item.label}</Link>)}
          <Link href={contactItem.href} onClick={event => handleNav(event, contactItem)} className="rounded-full bg-[--ink] px-5 py-2 text-sm text-[--bg]" data-cursor="hover">Let&apos;s talk ↗</Link>
        </nav>
        <button ref={menuButton} type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} aria-controls="mobile-navigation" className={`relative z-30 px-2 py-3 text-sm uppercase tracking-wider sm:hidden ${menuOpen ? "text-[--bg]" : "text-[--ink]"}`}>{menuOpen ? "Close ×" : "Menu +"}</button>
      </div>
      {menuOpen && <nav ref={menu} id="mobile-navigation" aria-label="Mobile navigation" className="fixed inset-0 z-20 flex h-[100dvh] flex-col justify-center gap-5 bg-[--ink] px-6 text-[--bg] sm:hidden">
        <span className="mb-3 text-xs uppercase tracking-[.2em] text-[#beb6a5]">Explore</span>
        {[...navItems, contactItem].map(item => <Link key={item.href} href={item.href} onClick={event => handleNav(event, item)} className="w-fit font-[MainFont] text-5xl uppercase">{item.label}</Link>)}
      </nav>}
    </header>
  );
}
