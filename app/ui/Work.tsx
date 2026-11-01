import Link from "next/link";
import WorkList from "../components/WorkList";
import PassportVisual from "../components/PassportVisual";

export default function Work() {
  return (
    <section id="Work" className="portfolio-section">
      <div className="portfolio-container">
        <div className="section-intro">
          <div>
            <span className="eyebrow">01 / Selected work</span>
            <h2 className="section-heading">From interfaces<br />to entire products.</h2>
          </div>
          <p className="body-text">Independent builds, experiments, and the product I&apos;m taking further.</p>
        </div>

        <article className="featured-project">
          <Link href="/work/anviora" className="featured-project__visual" aria-label="Explore the Anviora case study" data-cursor-label="Case study">
            <PassportVisual />
            <span className="visual-link" aria-hidden="true">Explore the build ↗</span>
          </Link>
          <div className="featured-project__copy">
            <div className="flex flex-wrap items-center gap-3">
              <span className="eyebrow">Flagship / Independent product</span>
              <span className="status-pill"><span />In development</span>
            </div>
            <h3 className="project-heading">Anviora<span className="accent-text">.</span></h3>
            <p className="project-subtitle">Battery digital product passports.</p>
            <p className="body-text">A platform I&apos;m building solo for Indian battery manufacturers and exporters. My move from delivering websites to developing a product end to end.</p>
            <dl className="project-facts">
              <div><dt>My role</dt><dd>Solo developer</dd></div>
              <div><dt>Focus</dt><dd>Full-stack product development</dd></div>
            </dl>
            <Link href="/work/anviora" className="button-link">Read the case study <span aria-hidden="true">↗</span></Link>
            <p className="fine-print">Anviora is the working name. The product is still evolving.</p>
          </div>
        </article>

        <div className="mt-16 flex items-center justify-between gap-4 border-b border-[--line] pb-5">
          <h3 className="eyebrow">More web projects</h3>
          <span className="fine-print">A few earlier builds</span>
        </div>
        <WorkList />
      </div>
    </section>
  );
}
