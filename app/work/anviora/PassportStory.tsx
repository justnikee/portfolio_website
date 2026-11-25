"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./PassportStory.module.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const chapters = [
  {
    id: "organise",
    label: "Organise",
    headline: "Start with the source records.",
    description: "Gather battery specifications, supplier certificates, and test reports for the same battery or batch.",
  },
  {
    id: "create",
    label: "Create",
    headline: "Give the battery a passport.",
    description: "Map the source records to passport fields and surface missing information before the passport is published.",
  },
  {
    id: "share",
    label: "Share",
    headline: "Put the passport in someone’s hands.",
    description: "Give buyers a QR link to a shared view with the battery’s identity and key product details.",
  },
] as const;

const records = ["Battery specs", "Supplier records", "Test reports"];

export default function PassportStory() {
  const story = useRef<HTMLDivElement>(null);
  const [chapterIndex, setChapterIndex] = useState(0);
  const activeChapter = chapters[chapterIndex];

  useGSAP(() => {
    const root = story.current;
    if (!root) return;

    const steps = [...root.querySelectorAll<HTMLLIElement>("[data-story-step]")];
    let activationPoints: number[] = [];
    let currentIndex = 0;

    const updateChapter = () => {
      const scrollPosition = window.scrollY;
      let nextIndex = 0;

      for (let index = 1; index < activationPoints.length; index++) {
        if (scrollPosition >= activationPoints[index]) nextIndex = index;
      }

      if (nextIndex !== currentIndex) {
        currentIndex = nextIndex;
        setChapterIndex(nextIndex);
      }
    };

    const measureChapters = () => {
      const scrollPadding = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
      const scrollPosition = window.scrollY;

      // Keep the scene in sync with where the browser stops on a chapter link.
      activationPoints = steps.map((step) => {
        const scrollMargin = parseFloat(getComputedStyle(step).scrollMarginTop) || 0;
        return step.getBoundingClientRect().top + scrollPosition - scrollPadding - scrollMargin - 12;
      });
      updateChapter();
    };

    ScrollTrigger.create({
      trigger: root,
      start: "top bottom",
      end: "bottom top",
      onRefresh: measureChapters,
      onUpdate: updateChapter,
    });
    measureChapters();
  }, { scope: story });

  return (
    <div className={styles.story} ref={story}>
      <div className={styles.display}>
        <div className={styles.stage} data-chapter={activeChapter.id} aria-hidden="true">
          <div className={styles.legend}>
            <span>Anviora / Battery passport</span>
            <span>0{chapterIndex + 1} <span className={styles.legendTotal}>/ 03</span></span>
          </div>

          <div className={styles.artwork}>
            <div className={styles.transfer} />
            <div className={styles.passport}>
              <div className={styles.documentHeader}><b>Anviora.</b><span>AV / 01</span></div>
              <strong>Battery passport</strong>
              <ul>
                {records.map((record, index) => (
                  <li key={record}><span>{record}</span><span>0{index + 1}</span></li>
                ))}
              </ul>
            </div>

            {records.map((record, index) => (
              <div key={record} className={styles.record} data-record={index}>
                <span>0{index + 1}</span>
                <strong>{record}</strong>
              </div>
            ))}

            <div className={styles.recipient}>
              <div className={styles.recipientScreen}>
                <span className={styles.documentHeader}>QR-linked buyer view</span>
                <strong>Battery passport</strong>
                <span className={styles.recipientField}>Product identity</span>
                <span className={styles.recipientField}>Battery data</span>
              </div>
            </div>
          </div>
        </div>

        <nav className={styles.controls} aria-label="Anviora workflow chapters">
          {chapters.map((chapter, index) => (
            <a
              key={chapter.id}
              href={`#anviora-${chapter.id}`}
              aria-current={index === chapterIndex ? "step" : undefined}
            >
              {chapter.label}
            </a>
          ))}
        </nav>
      </div>

      <ol className={styles.steps} role="list">
        {chapters.map((chapter) => (
          <li key={chapter.id} id={`anviora-${chapter.id}`} data-story-step className={styles.step}>
            <span className="eyebrow">{chapter.label}</span>
            <h3>{chapter.headline}</h3>
            <p>{chapter.description}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
