import Hero from "./ui/Hero";
import About from "./ui/About";
import Experience from "./ui/Experience";
import Work from "./ui/Work";
import Contact from "./ui/Contact";
import Ticker from "./components/Ticker";
import Heisenberg from "./components/Heisenberg";
import JsonLd from "./components/JsonLd";
import { author, siteUrl } from "./lib/site";

export const metadata = { alternates: { canonical: "/" } };

export default function Home() {
  return (
    <main id="main-content">
      <JsonLd data={{ "@context": "https://schema.org", "@type": "ProfilePage", "@id": `${siteUrl}/#profile`, url: siteUrl, mainEntity: author }} />
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
