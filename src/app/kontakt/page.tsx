import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import Contact from "@/components/Contact";

export const metadata: Metadata = {
  title: "Kontakt | DINO AI",
  description:
    "Spojte se s týmem DINO AI. Rádi vám pomůžeme s financemi, investicemi i vlastním AI asistentem pod vaší značkou.",
};

export default function Kontakt() {
  return (
    <>
      <section className="relative px-4 pt-32 pb-8 sm:pt-36">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal className="flex flex-col items-center gap-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold-light">
              Kontakt
            </span>
            <h1 className="text-balance text-4xl font-extrabold leading-[1.1] tracking-tight text-cream sm:text-5xl md:text-6xl">
              Pojďme si{" "}
              <span className="text-gold-gradient">promluvit</span>
            </h1>
            <p className="max-w-2xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
              Máte dotaz k DINO AI, nebo chcete vlastního AI průvodce pod svou
              značkou? Ozvěte se — obvykle odpovídáme do 24 hodin.
            </p>
          </Reveal>
        </div>
      </section>

      <Contact />
    </>
  );
}
