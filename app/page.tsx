import Hero from "./ui/Hero";
import About from "./ui/About";
import TechOverview from "./ui/TechOverview";
import Experience from "./ui/Experience";
import Work from "./ui/Work";
import Contact from "./ui/Contact";
import Ticker from "./components/Ticker";
import Heisenberg from "./components/Heisenberg";

export default function Home() {
  return (
    <main>
      <Hero />
      <Ticker />
      <About />
      <Work />
      <Experience />
      <TechOverview />
      <Contact />
      <Heisenberg />
    </main>
  );
}
