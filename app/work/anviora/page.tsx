import type { Metadata } from "next";
import Link from "next/link";
import PassportVisual from "@/app/components/PassportVisual";
import { anvioraPreviewUrl, defaultSocialImage } from "@/app/lib/site";
import PassportStory from "./PassportStory";

export const metadata: Metadata = {
  title: "Anviora — Battery DPP Case Study",
  description: "An in-progress look at Anviora, a battery digital product passport platform Nikhil Thakur is building solo for Indian manufacturers and exporters.",
  alternates: { canonical: "/work/anviora" },
  openGraph: { title: "Anviora — Battery DPP Case Study", description: "An independent battery digital product passport platform, built by Nikhil Thakur. Case study in progress.", url: "/work/anviora", type: "website", images: [defaultSocialImage] },
};

export default function AnvioraCaseStudy() {
  return (
    <main id="main-content" className="case-study">
      <div className="portfolio-container">
        <Link href="/#Work" className="text-link">← Back to selected work</Link>
        <div className="case-heading-row"><span className="eyebrow">Independent product / Case study in progress</span><span className="status-pill"><span />In development</span></div>
        <h1 className="case-title">Anviora<span className="accent-text">.</span></h1>
        <div className="case-lede">
          <h2>Giving battery information<br />a place to belong.</h2>
          <div className="space-y-5">
            <p className="body-text">A digital battery passport platform I&apos;m building solo for Indian manufacturers and exporters preparing to sell into Europe.</p>
            <a href={anvioraPreviewUrl} target="_blank" rel="noopener noreferrer" className="button-link">
              Preview Anviora <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </div>
        <dl className="case-facts"><div><dt>Role</dt><dd>Solo developer</dd></div><div><dt>Audience</dt><dd>Indian manufacturers & exporters</dd></div><div><dt>Focus</dt><dd>Battery digital product passports</dd></div><div><dt>Status</dt><dd>In development · Working name</dd></div></dl>
        <figure className="case-figure"><PassportVisual /><figcaption>Concept illustration of the product direction. This is not a screenshot of the application.</figcaption></figure>

        <nav aria-label="Case study sections" className="case-nav"><a href="#overview">Overview</a><a href="#direction">Passport workflow</a><a href="#ownership">My role</a><a href="#next">What&apos;s next</a></nav>

        <section id="overview" className="case-section">
          <div><span className="eyebrow">01 / Overview</span><h2>The product<br />I&apos;m working toward.</h2></div>
          <div className="case-prose">
            <p>Preparing battery information for an export buyer can mean piecing together product specifications, supplier certificates, and test reports from several sources.</p>
            <p>I&apos;m designing Anviora to map those records to passport fields, surface missing information before publication, and give buyers a QR link to the battery details they need.</p>
            <p>The product is in development, and I&apos;m exploring it as a standalone business.</p>
          </div>
        </section>

        <section id="direction" className="case-direction" aria-labelledby="passport-workflow-title">
          <div className="section-intro">
            <div>
              <span className="eyebrow">02 / Product direction</span>
              <h2 id="passport-workflow-title" className="section-heading">From product data<br />to a digital passport.</h2>
            </div>
            <p className="body-text">A concept walkthrough of how Anviora could turn battery records into a shareable passport.</p>
          </div>
          <PassportStory />
        </section>

        <section id="ownership" className="case-section"><div><span className="eyebrow">03 / My role</span><h2>One developer.<br />The whole picture.</h2></div><div className="case-prose"><p>I&apos;m building Anviora solo. That means thinking beyond individual screens: what the product needs to do, how information should move through it, and how the different parts fit together.</p><p>My professional background is in frontend development and building web experiences for clients. This project is where I&apos;m expanding that foundation into full-stack product work.</p><div className="case-note"><strong>A build in progress</strong><p>This case study currently documents the purpose and direction of the product. Implementation details, application screenshots, and results will be added as the build develops.</p></div></div></section>

        <section id="next" className="case-section"><div><span className="eyebrow">04 / What&apos;s next</span><h2>Build. Learn.<br /><span className="accent-text">Keep refining.</span></h2></div><div className="case-prose"><p>My next focus is to turn the product direction into a clear end-to-end experience and use feedback to refine it.</p><p>As the product develops, I&apos;ll share the technical decisions, tradeoffs, and lessons here. Anviora remains a working name.</p><p>If you work with battery manufacturing or exports, I&apos;d be interested in hearing how you handle product information today.</p><a href="mailto:contact@doitnikhil.in?subject=Let%27s%20talk%20about%20Anviora" className="button-link">Talk about the product <span aria-hidden="true">↗</span></a></div></section>
        <div className="case-end"><Link href="/#Work" className="text-link">← More selected work</Link><Link href="/#Contact" className="text-link">Get in touch ↗</Link></div>
      </div>
    </main>
  );
}
