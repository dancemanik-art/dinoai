import Reveal from "./Reveal";
import Avatar from "./Avatar";
import { LeadButton } from "./LeadModal";
import { ArrowRightIcon } from "./icons";

export default function CTA() {
  return (
    <section id="cta" className="section-spacing">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <div className="card card-edge relative overflow-hidden px-6 py-12 text-center sm:px-12 sm:py-16">
            {/* glows */}
            <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[28rem] -translate-x-1/2 rounded-full bg-gold/15 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 left-1/2 h-64 w-[28rem] -translate-x-1/2 rounded-full bg-gold/10 blur-3xl" />

            <div className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center">
              <span className="absolute inset-0 rounded-full bg-gold/20 blur-xl" />
              <Avatar size={80} className="relative ring-2" />
            </div>

            <span className="relative inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-light">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Testovací provoz
            </span>

            <h2 className="relative mx-auto mt-5 max-w-2xl text-balance text-3xl font-extrabold leading-[1.1] tracking-tight text-cream sm:text-4xl md:text-5xl">
              Začněte dělat{" "}
              <span className="text-gold-gradient">chytřejší rozhodnutí</span>{" "}
              už dnes
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              DINO AI je v testovacím provozu. Zanechte nám kontakt a dáme vám
              vědět, jakmile bude připraveno k vyzkoušení.
            </p>

            <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <LeadButton
                source="cta"
                className="btn-gold group flex w-full items-center justify-center gap-2 rounded-xl px-8 py-4 text-base font-semibold sm:w-auto"
              >
                Mám zájem o DINO AI
                <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </LeadButton>
              <LeadButton
                source="cta-poradce"
                className="btn-ghost flex w-full items-center justify-center rounded-xl px-8 py-4 text-base font-semibold text-cream sm:w-auto"
              >
                Jsem poradce
              </LeadButton>
            </div>

            <p className="relative mt-5 text-xs text-muted">
              Bez závazků · Ozveme se, jakmile bude DINO AI připraveno
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
