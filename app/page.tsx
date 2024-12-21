import Header from "./ui/Header"
import Hero from "./ui/Hero";
import About from "./ui/About";
import TechOverview from "./ui/TechOverview"
import Experiance from "./ui/Experiance";
import Work from "./ui/Work";
import Contact from "./ui/Contact"
import Footer from "./ui/Footer";

export default function Home() {
  return (
    <>
          <Hero/>
          <About/>
          <TechOverview/>
          <Experiance/>
          <Work/>
          <Contact/>
    </>
  );
}
