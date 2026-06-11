import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { LeadButton } from "./LeadModal";
import {
  ChartUpIcon,
  HomeIcon,
  CoinsIcon,
  ShieldIcon,
  TargetIcon,
  ArrowRightIcon,
} from "./icons";

const features = [
  {
    icon: ChartUpIcon,
    title: "Investice",
    desc: "Vysvětlím vaše investice, portfolio i zhodnocení a poradím, jak dál.",
  },
  {
    icon: HomeIcon,
    title: "Nemovitosti",
    desc: "Pomůžu s koupí, pronájmem i výnosy z investičních nemovitostí.",
  },
  {
    icon: CoinsIcon,
    title: "Hypotéky",
    desc: "Spočítám splátky, porovnám sazby a vysvětlím podmínky financování.",
  },
  {
    icon: ShieldIcon,
    title: "Pojištění",
    desc: "Zorientuji vás ve smlouvách a poradím, kde jste krytí a kde ne.",
  },
  {
    icon: TargetIcon,
    title: "Budování majetku",
    desc: "Pomůžu vám nastavit cíle a krok za krokem budovat dlouhodobý majetek.",
  },
];

export default function Features() {
  return (
    <section id="pomoc" className="section-spacing">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="S čím vám pomohu"
          title={
            <>
              Jeden průvodce pro{" "}
              <span className="text-gold-gradient">celý váš finanční svět</span>
            </>
          }
          subtitle="Zeptejte se na cokoliv ze světa financí. Vše vám vysvětlím srozumitelně, lidsky a kdykoliv to potřebujete."
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 80}>
              <article className="card card-hover card-edge group flex h-full flex-col p-6">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-gold/30 bg-gold/8 text-gold-light transition-transform duration-500 group-hover:scale-110">
                  <f.icon className="h-7 w-7" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-cream">{f.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                  {f.desc}
                </p>
                <LeadButton
                  source="features"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-light transition-colors group-hover:text-gold"
                >
                  Zeptat se Dina
                  <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </LeadButton>
              </article>
            </Reveal>
          ))}

          {/* invitation card to balance the grid */}
          <Reveal delay={420}>
            <article className="flex h-full flex-col justify-center rounded-[1.25rem] border border-dashed border-gold/25 bg-gold/[0.03] p-6">
              <h3 className="text-lg font-bold text-cream">A mnoho dalšího…</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Daně, úvěry, rozpočet i finanční rozhodnutí každodenního života.
                Stačí se zeptat.
              </p>
              <LeadButton
                source="features"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-light transition-colors hover:text-gold"
              >
                Vyzkoušet v testovacím provozu
                <ArrowRightIcon className="h-4 w-4" />
              </LeadButton>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
