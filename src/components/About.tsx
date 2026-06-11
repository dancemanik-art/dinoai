import Image from "next/image";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { LeadButton } from "./LeadModal";
import { ArrowRightIcon } from "./icons";

export default function About() {
  return (
    <section id="o-nas" className="section-spacing">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Autor projektu"
          title={
            <>
              Kdo stojí za{" "}
              <span className="text-gold-gradient">DINO AI</span>
            </>
          }
          subtitle="Za DINO AI stojí člověk, který roky pomáhá klientům rozumět financím — a chtěl tuto zkušenost zpřístupnit každému, kdykoliv to potřebuje."
        />

        <div className="mt-10 grid items-center gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
          {/* Photo */}
          <Reveal>
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-gold/10 blur-3xl" />
              <div className="card card-edge relative overflow-hidden">
                <div className="relative aspect-[4/5] sm:aspect-[3/4]">
                  <Image
                    src="/daniel-ilek.png"
                    alt="Daniel Ilek — Business & Investment Coach"
                    fill
                    sizes="(max-width: 1024px) 100vw, 480px"
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                  <p className="font-script text-3xl font-bold text-gold-gradient sm:text-4xl">
                    Daniel Ilek
                  </p>
                  <p className="mt-1 text-sm font-semibold uppercase tracking-[0.16em] text-gold-light">
                    Business & Investment Coach
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Bio */}
          <Reveal delay={120}>
            <div className="card card-edge relative h-full overflow-hidden p-8 sm:p-10">
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gold/10 blur-3xl" />

              <p className="text-base leading-relaxed text-muted">
                Jsem{" "}
                <span className="font-semibold text-cream">Mgr. Daniel Ilek, MSc.</span>{" "}
                — pomáhám lidem budovat majetek, investovat a dělat správná
                finanční rozhodnutí. Věřím, že člověk, který rozumí logice
                za rozhodnutím, dělá lepší volby — dnes i za pět let.
              </p>

              <p className="mt-5 text-base leading-relaxed text-muted">
                <span className="font-semibold text-cream">DINO AI</span> vzniklo
                proto, že klienti potřebují odpovědi hned — ne až na další schůzce.
                Chtěl jsem vytvořit digitálního průvodce, který vysvětluje finance
                srozumitelně, lidsky a bez zbytečného žargonu — stejně, jako to
                dělám osobně, jen dostupné kdykoliv.
              </p>

              <ul className="mt-7 flex flex-col gap-3 border-t border-white/8 pt-7">
                {[
                  "15+ let zkušeností ve financích a investicích",
                  "Praktický přístup založený na reálných číslech",
                  "Nezávislý pohled — bez tlaku na konkrétní produkt",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-cream">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                    {item}
                  </li>
                ))}
              </ul>

              <LeadButton
                source="about"
                className="btn-gold mt-8 inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold"
              >
                Chci vyzkoušet DINO AI
                <ArrowRightIcon className="h-4 w-4" />
              </LeadButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
