import Hero from "./ui/Hero";
import About from "./ui/About";
import TechOverview from "./ui/TechOverview"
import Experience from "./ui/Experience";
import Work from "./ui/Work";
import Contact from "./ui/Contact"


export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <TechOverview />
      <Experience />
      <Work />
      <Contact />
    </>
  );
}
