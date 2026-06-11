import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import ForAdvisors from "@/components/ForAdvisors";
import { LeadButton } from "@/components/LeadModal";
import { ArrowRightIcon, CheckIcon } from "@/components/icons";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Pro poradce",
  description:
    "Vytvoříme AI asistenta, který bude vystupovat pod vaším jménem, logem a vizuální identitou. Vaši klienti tak komunikují s vaším digitálním průvodcem, nikoliv s anonymní umělou inteligencí.",
  path: "/pro-poradce",
});

const benefits = [
  "Vystupuje pod vaším jménem a logem",
  "Posiluje vaši značku a důvěru klientů",
  "Šetří váš čas a zvyšuje kvalitu služeb",
];

export default function ProPoradce() {
  return (
    <>
      {/* Page hero */}
      <section className="relative px-4 pt-32 pb-12 sm:pt-36">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal className="flex flex-col items-center gap-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold-light">
              Pro poradce
            </span>
            <h1 className="text-balance text-4xl font-extrabold leading-[1.1] tracking-tight text-cream sm:text-5xl md:text-6xl">
              Vlastní AI asistent{" "}
              <span className="text-gold-gradient">pod vaší značkou</span>
            </h1>
            <p className="max-w-2xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
              Nabídněte svým klientům špičkový digitální zážitek — moderní AI
              průvodce, který nese vaše jméno a posiluje vaši značku.
            </p>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              <LeadButton
                source="poradci"
                className="btn-gold group flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold"
              >
                Chci vlastního AI asistenta
                <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </LeadButton>
              <LeadButton
                source="poradci-chat"
                className="btn-ghost flex items-center justify-center rounded-xl px-7 py-3.5 text-sm font-semibold text-cream"
              >
                Mám zájem o DINO AI
              </LeadButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Main advisor content (explanation + checklist + dashboard) */}
      <ForAdvisors />

      {/* Closing CTA */}
      <section className="section-spacing pb-8">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <div className="card card-edge relative overflow-hidden px-6 py-12 text-center sm:px-12 sm:py-16">
              <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[28rem] -translate-x-1/2 rounded-full bg-gold/15 blur-3xl" />
              <h2 className="relative mx-auto max-w-2xl text-3xl font-extrabold leading-tight tracking-tight text-cream sm:text-4xl">
                Posuňte své služby na{" "}
                <span className="text-gold-gradient">novou úroveň</span>
              </h2>
              <ul className="relative mx-auto mt-8 flex max-w-xl flex-col gap-3 text-left">
                {benefits.map((b) => (
                  <li key={b} className="flex items-center gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-gold-light">
                      <CheckIcon className="h-4 w-4" />
                    </span>
                    <span className="text-sm font-medium text-cream">{b}</span>
                  </li>
                ))}
              </ul>
              <LeadButton
                source="poradci"
                className="btn-gold relative mt-9 inline-flex items-center justify-center gap-2 rounded-xl px-8 py-4 text-base font-semibold"
              >
                Požádat o ukázku
                <ArrowRightIcon className="h-5 w-5" />
              </LeadButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
