import Hero from "./ui/Hero";
import About from "./ui/About";
import TechOverview from "./ui/TechOverview";
import Experiance from "./ui/Experiance";
import Work from "./ui/Work";
import Contact from "./ui/Contact";
import Ticker from "./components/Ticker";

export default function Home() {
  return (
    <main>
      <Hero />
      <Ticker />
      <About />
      <Work />
      <Experiance />
      <TechOverview />
      <Contact />
    </main>
  );
}
