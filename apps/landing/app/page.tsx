import Nav from "../components/Nav";
import Hero from "../components/Hero";
import Why from "../components/Why";
import HowItWorks from "../components/HowItWorks";
import Features from "../components/Features";
import Architecture from "../components/Architecture";
import AgentMode from "../components/AgentMode";
import Remix from "../components/Remix";
import Compare from "../components/Compare";
import Setup from "../components/Setup";
import Roadmap from "../components/Roadmap";
import Faq from "../components/Faq";
import Cta from "../components/Cta";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Why />
      <HowItWorks />
      <Features />
      <Architecture />
      <AgentMode />
      <Remix />
      <Compare />
      <Setup />
      <Roadmap />
      <Faq />
      <Cta />
      <Footer />
    </>
  );
}
