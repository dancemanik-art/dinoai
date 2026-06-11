import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { LeadButton } from "./LeadModal";
import {
  ChatIcon,
  SparklesIcon,
  ChartUpIcon,
  TargetIcon,
  ArrowRightIcon,
} from "./icons";

const steps = [
  {
    n: "1",
    icon: ChatIcon,
    title: "Položte dotaz",
    desc: "Napište, co vás zajímá — hypotéku, investici, nemovitost nebo cokoliv ze světa financí.",
  },
  {
    n: "2",
    icon: SparklesIcon,
    title: "DINO vysvětlí možnosti",
    desc: "Dostanete srozumitelné vysvětlení možností, pojmů a souvislostí bez odborného žargonu.",
  },
  {
    n: "3",
    icon: ChartUpIcon,
    title: "Získáte přehled",
    desc: "Uvidíte celkový obraz — výhody, rizika i to, co pro vás dává smysl.",
  },
  {
    n: "4",
    icon: TargetIcon,
    title: "Rozhodnete se lépe",
    desc: "S jasnými informacemi uděláte rozhodnutí, které podpoří váš majetek a klid.",
  },
];

export default function HowItHelps() {
  return (
    <section id="jak-funguje" className="section-spacing">
      <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-px max-w-5xl bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Jak funguje DINO AI"
          title={
            <>
              Od dotazu k rozhodnutí ve{" "}
              <span className="text-gold-gradient">čtyřech krocích</span>
            </>
          }
          subtitle="Zeptáte se, DINO vysvětlí — a vy máte jasno. Bez složitých formulářů a bez čekání."
        />

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 90} className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="relative">
                  <span className="flex h-20 w-20 items-center justify-center rounded-full border border-gold/40 bg-gold/8 text-gold-light shadow-[0_0_40px_-12px_rgba(201,162,75,0.6)]">
                    <s.icon className="h-8 w-8" />
                  </span>
                  <span className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border border-gold/40 bg-ink text-xs font-bold text-gold-light">
                    {s.n}
                  </span>
                </div>

                {i < steps.length - 1 && (
                  <ArrowRightIcon className="absolute -right-2 top-9 hidden h-5 w-5 text-gold/40 lg:block" />
                )}

                <h3 className="mt-5 text-base font-bold text-cream">{s.title}</h3>
                <p className="mt-2 max-w-[15rem] text-sm leading-relaxed text-muted">
                  {s.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120} className="mt-9 flex justify-center">
          <LeadButton
            source="how"
            className="btn-gold flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold"
          >
            Vyzkoušet v testovacím provozu
            <ArrowRightIcon className="h-4 w-4" />
          </LeadButton>
        </Reveal>
      </div>
    </section>
  );
}
