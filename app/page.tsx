import Header from "./ui/Header"
import Hero from "./ui/Hero";
import About from "./ui/About";
import TechOverview from "./ui/TechOverview"
import Experiance from "./ui/Experiance";
import Work from "./ui/Work";

export default function Home() {
  return (
    <div>
          <Header/>
          <Hero/>
          <About/>
          <TechOverview/>
          <Experiance/>
          <Work/>
    </div>
  );
}
