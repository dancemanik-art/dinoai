import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import About from "@/components/About";
import { LeadButton } from "@/components/LeadModal";
import { ArrowRightIcon, SparklesIcon, ChatIcon, ShieldIcon } from "@/components/icons";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "O DINO AI",
  description:
    "DINO AI je váš osobní průvodce světem financí, investic a majetku. Pomáhá vám dělat chytřejší rozhodnutí — srozumitelně, moderně a lidsky.",
  path: "/o-dino-ai",
});

const pillars = [
  {
    icon: ChatIcon,
    title: "Mluví lidsky",
    desc: "Žádný odborný žargon. Vše vysvětlí jednoduše a srozumitelně.",
  },
  {
    icon: SparklesIcon,
    title: "Rozumí kontextu",
    desc: "Spojuje znalost financí s pochopením vaší konkrétní situace.",
  },
  {
    icon: ShieldIcon,
    title: "Je tu pro vás 24/7",
    desc: "Bezpečně, kdykoliv a kdekoliv — na webu i v mobilní aplikaci.",
  },
];

export default function ODinoAi() {
  return (
    <>
      {/* Page hero */}
      <section className="relative px-4 pt-28 pb-8 sm:pt-32">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal className="flex flex-col items-center gap-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold-light">
              O DINO AI
            </span>
            <h1 className="text-balance text-4xl font-extrabold leading-[1.1] tracking-tight text-cream sm:text-5xl md:text-6xl">
              Váš osobní průvodce{" "}
              <span className="text-gold-gradient">světem financí</span>
            </h1>
            <p className="max-w-2xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
              DINO AI je digitální průvodce pro finance, investice, hypotéky,
              pojištění a budování majetku. Pomáhá vám dělat lepší rozhodnutí —
              srozumitelně, moderně a lidsky.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Pillars */}
      <section className="relative px-4 py-12">
        <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 90}>
              <div className="card card-edge h-full p-6 text-center">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-gold/30 bg-gold/8 text-gold-light">
                  <p.icon className="h-7 w-7" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-cream">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Who is behind DINO AI */}
      <About />

      {/* CTA */}
      <section className="section-spacing pt-0">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal className="flex flex-col items-center gap-6">
            <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-cream sm:text-4xl">
              Vyzkoušejte{" "}
              <span className="text-gold-gradient">DINO AI</span> na vlastní kůži
            </h2>
            <LeadButton
              source="about"
              className="btn-gold inline-flex items-center justify-center gap-2 rounded-xl px-8 py-4 text-base font-semibold"
            >
              Vyzkoušet v testovacím provozu
              <ArrowRightIcon className="h-5 w-5" />
            </LeadButton>
          </Reveal>
        </div>
      </section>
    </>
  );
}
