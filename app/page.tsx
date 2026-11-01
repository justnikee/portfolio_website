import Hero from "./ui/Hero";
import About from "./ui/About";
import Experience from "./ui/Experience";
import Work from "./ui/Work";
import Contact from "./ui/Contact";
import Ticker from "./components/Ticker";
import Heisenberg from "./components/Heisenberg";

export default function Home() {
  return (
    <main id="main-content">
      <Hero />
      <Ticker />
      <Work />
      <About />
      <Experience />
      <Contact />
      <Heisenberg />
    </main>
  );
}
