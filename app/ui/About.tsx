"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { useLoading } from "../components/LoadingProvider";
import TornPaperEdge from "../components/TornPaperEdge";

gsap.registerPlugin(ScrollTrigger);

const principles = [
  { title: "Start with the experience.", text: "Responsive interfaces, reusable components, and interactions that feel considered. My frontend foundation is built on three-plus years of work for clients.", detail: "React / Next.js / TypeScript" },
  { title: "Look beyond the screen.", text: "An interface is one part of a product. Building Anviora solo is how I’m expanding into backend development and thinking through how the pieces fit together.", detail: "Full-stack development / Product thinking" },
  { title: "Stay a student.", text: "Build something, question the decisions, and improve it. I’m exploring system design and practical AI integrations through that same process.", detail: "Build / Learn / Refine" },
];

const lines = ["Think it through.", "Build with care.", "Keep improving."];

export default function About() {
  const root = useRef<HTMLElement>(null);
  const { isLoading } = useLoading();

  useGSAP((context) => {
    if (isLoading || !root.current) return;
    const section = root.current;
    const motion = gsap.matchMedia();
    motion.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo("[data-about-fill]",
        { clipPath: "inset(0 100% 0 0)" },
        { clipPath: "inset(0 0% 0 0)", stagger: 0.3, ease: "none", scrollTrigger: {
          trigger: section, start: "top 65%", end: "bottom 75%", scrub: 0.6,
        } }
      );
      const steps = context.selector?.("[data-about-step]") as HTMLElement[] | undefined;
      steps?.forEach(step => {
        gsap.fromTo(step, { y: 24 }, { y: 0, ease: "none", scrollTrigger: {
          trigger: step, start: "top 90%", end: "top 60%", scrub: 0.6,
        } });
        gsap.fromTo(step.querySelector("[data-about-rule]"), { scaleX: 0 }, {
          scaleX: 1, transformOrigin: "left", ease: "none", scrollTrigger: {
            trigger: step, start: "top 75%", end: "bottom 45%", scrub: 0.6,
          },
        });
      });
    });

    motion.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const previousContent = document.querySelector("#Work > .portfolio-container");
      if (!previousContent) return;
      // Let Work recede at a slower speed while the paper sheet passes over it.
      gsap.fromTo(previousContent, { y: 0 }, {
        y: 110,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "top top",
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });
    });

    return () => {
      motion.revert();
    };
  }, { scope: root, dependencies: [isLoading], revertOnUpdate: true });

  return (
    <section ref={root} id="About" className="portfolio-section about-section">
      <TornPaperEdge />
      <div className="portfolio-container">
        <span className="eyebrow">02 / About &amp; approach</span>
        <div className="about-editorial">
          <div className="about-manifesto">
            <h2 className="about-title">
              {lines.map((line, index) => (
                <span key={line} className={`about-title__line ${index === 2 ? "about-title__line--accent" : ""}`}>
                  <span>{line}</span>
                  <span data-about-fill className="about-title__fill" aria-hidden="true">{line}</span>
                </span>
              ))}
            </h2>
            <p className="about-intro">I care about what happens beyond the first impression: how an interface behaves, how the pieces fit together, and whether the product solves a useful problem.</p>
            <a href="https://github.com/justnikee" target="_blank" rel="noopener noreferrer" className="text-link">Follow the work on GitHub ↗<span className="sr-only"> (opens in a new tab)</span></a>
          </div>
          <div className="about-principles">
            {principles.map((item, index) => (
              <article key={item.title} className="about-principle" data-about-step>
                <div className="about-principle__rule" aria-hidden="true"><span data-about-rule /></div>
                <span className="about-principle__number" aria-hidden="true">0{index + 1}</span>
                <div><h3>{item.title}</h3><p>{item.text}</p><span className="about-principle__detail">{item.detail}</span></div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
