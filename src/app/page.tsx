import Hero from "@/components/Hero";
import Features from "@/components/Features";
import ChatDemo from "@/components/ChatDemo";
import HowItHelps from "@/components/HowItHelps";
import WhyDino from "@/components/WhyDino";
import About from "@/components/About";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <ChatDemo />
      <HowItHelps />
      <WhyDino />
      <About />
      <CTA />
    </>
  );
}
