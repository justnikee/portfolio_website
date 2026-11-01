import TornPaperEdge from "../components/TornPaperEdge";

const contributions = [
  { title: "Design → interface", text: "Turn designs and client requirements into working web experiences." },
  { title: "Across screen sizes", text: "Build responsive interfaces that adapt from mobile to desktop." },
  { title: "Part of the team", text: "Contribute frontend development to shared client projects and delivery." },
];

export default function Experience() {
  return (
    <section id="Experience" className="portfolio-section experience-section">
      <div className="portfolio-container">
        <div className="experience-intro">
          <span className="eyebrow">03 / Professional experience</span>
          <h2>Real briefs.<br /><span>Working interfaces.</span></h2>
          <p>Client work has taught me to connect the details of an interface with the requirements behind it.</p>
        </div>

        <article className="employment">
          <div className="employment__rail"><span className="employment__dot" /><span>Currently</span></div>
          <div className="employment__content">
            <div className="employment__heading">
              <div><span className="employment__label">Company</span><h3>Cybergineer<br />Solutions<span className="accent-text">.</span></h3></div>
              <div className="employment__role"><span className="employment__label">My role</span><p>Frontend<br />development</p><span className="employment__arrow" aria-hidden="true">↗</span></div>
            </div>
            <p className="employment__summary">I work with the team to build responsive interfaces, turning designs and client requirements into working web experiences.</p>
            <div className="employment__contributions">
              {contributions.map((item, index) => <div key={item.title}><span className="employment__label">0{index + 1}</span><h4>{item.title}</h4><p>{item.text}</p></div>)}
            </div>
          </div>
        </article>
      </div>
      <TornPaperEdge position="bottom" />
    </section>
  );
}
