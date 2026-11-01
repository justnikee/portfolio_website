import Image from "next/image";

const projects = [
  { title: "Vyoma Studio", meta: "Astro · GSAP · Tailwind", image: "/vyoma-studio.png", link: "https://vyoma-studio-iota.vercel.app/", label: "Live site" },
  { title: "SS-Aevi", meta: "Next.js · Supabase · Prisma", image: "/Aevi.png", link: "https://ss-aevi.vercel.app/", label: "Live site" },
  { title: "State of Kind", meta: "Next.js storefront", image: "/main_images/stateofkind.png", link: "https://github.com/justnikee/next.stateofkind", label: "Source code" },
];

export default function WorkList() {
  return (
    <div className="project-grid">
      {projects.map((project, index) => (
        <a key={project.title} href={project.link} target="_blank" rel="noopener noreferrer" className="project-card" data-cursor-label={project.label === "Source code" ? "View code" : "Visit site"}>
          <div className="project-card__image">
            <Image src={project.image} width={1438} height={825} sizes="(max-width: 700px) 100vw, (max-width: 1024px) 50vw, 33vw" alt={`${project.title} website preview`} />
            <span className="project-card__arrow" aria-hidden="true">↗</span>
          </div>
          <div className="flex items-baseline justify-between gap-4"><h4>{project.title}</h4><span className="fine-print">0{index + 2}</span></div>
          <p className="fine-print mt-2">{project.meta}</p>
          <span className="text-link mt-4 inline-block">{project.label} <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></span>
        </a>
      ))}
    </div>
  );
}
