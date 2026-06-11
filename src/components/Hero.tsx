import Image from "next/image";
import Reveal from "./Reveal";
import { LeadButton } from "./LeadModal";
import {
  SparklesIcon,
  ChatIcon,
  ShieldIcon,
  ClockIcon,
  ArrowRightIcon,
} from "./icons";

const chips = [
  { icon: SparklesIcon, label: "Chytrý" },
  { icon: ChatIcon, label: "Srozumitelný" },
  { icon: ShieldIcon, label: "Bezpečný" },
  { icon: ClockIcon, label: "Vždy po ruce" },
];

export default function Hero() {
  return (
    <section id="top" className="relative px-4 pt-28 pb-14 sm:pt-32 md:pt-36">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6">
        {/* Copy */}
        <div className="order-2 lg:order-1">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold-light">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
              </span>
              AI průvodce financemi
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-6">
              <span className="block text-6xl font-extrabold leading-none tracking-tight sm:text-7xl md:text-8xl">
                <span className="text-cream">DINO</span>{" "}
                <span className="text-gold-gradient">AI</span>
              </span>
              <span className="mt-4 block text-2xl font-bold leading-tight tracking-tight text-cream sm:text-3xl md:text-[2.1rem]">
                Váš osobní <span className="text-gold-gradient">průvodce</span>{" "}
                světem financí, investic a majetku.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              Zeptejte se na hypotéku, investici, nemovitost nebo pojištění.
              DINO vám vše vysvětlí srozumitelně a okamžitě — a šetří váš čas.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <LeadButton
                source="hero"
                className="btn-gold group flex items-center justify-center gap-2 rounded-xl px-7 py-4 text-base font-semibold"
              >
                Vyzkoušet DINO AI
                <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </LeadButton>
              <LeadButton
                source="hero-poradce"
                className="btn-ghost flex items-center justify-center gap-2 rounded-xl px-7 py-4 text-base font-semibold text-cream"
              >
                Pro poradce
              </LeadButton>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <div className="mt-8 flex flex-wrap gap-2.5">
              {chips.map((c) => (
                <span
                  key={c.label}
                  className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-medium text-cream"
                >
                  <c.icon className="h-4 w-4 text-gold-light" />
                  {c.label}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Mascot — cut out, sitting directly on the page background */}
        <Reveal delay={120} className="order-1 lg:order-2">
          <div className="relative mx-auto max-w-md lg:max-w-none">
            {/* warm spotlight behind the figure for depth */}
            <div className="pointer-events-none absolute left-1/2 top-[38%] -z-0 h-[80%] w-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(201,162,75,0.20),transparent_68%)] blur-2xl" />
            {/* floor shadow under the chair */}
            <div className="pointer-events-none absolute bottom-1 left-1/2 h-9 w-[60%] -translate-x-1/2 rounded-[50%] bg-black/70 blur-2xl" />

            <Image
              src="/mascot/hero.png"
              alt="DINO AI maskot"
              width={635}
              height={962}
              priority
              className="relative z-10 mx-auto w-[88%] drop-shadow-[0_28px_45px_rgba(0,0,0,0.5)] sm:w-[82%] lg:w-auto lg:max-h-[74vh]"
            />

            {/* speech bubble — beside the head, not overlapping */}
            <div
              className="absolute right-0 top-2 z-20 max-w-[11rem] animate-float rounded-2xl rounded-br-sm border border-white/10 bg-ink-card/95 p-4 shadow-card backdrop-blur-md sm:max-w-[12.5rem] lg:right-2"
            >
              <p className="text-sm leading-snug text-cream">
                Ahoj, jsem{" "}
                <span className="text-gold-gradient font-semibold">DINO AI</span>.
                Jak vám dnes mohu pomoci?
              </p>
              <span className="mt-1.5 flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Online · odpovídám hned
              </span>
            </div>

            {/* handwritten gold signature */}
            <div className="absolute bottom-6 right-1 z-20 text-right leading-tight sm:right-2">
              <div className="font-script text-3xl font-bold text-gold-gradient sm:text-4xl">
                DINO AI
              </div>
              <div className="font-script -mt-1 text-lg text-gold-light/90 sm:text-xl">
                by Daniel Ilek
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* trust strip */}
      <Reveal delay={200} className="mx-auto mt-12 max-w-5xl">
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-center text-xs font-medium uppercase tracking-[0.18em] text-muted/70">
          <span>Finance</span>
          <span className="h-1 w-1 rounded-full bg-gold/50" />
          <span>Investice</span>
          <span className="h-1 w-1 rounded-full bg-gold/50" />
          <span>Nemovitosti</span>
          <span className="h-1 w-1 rounded-full bg-gold/50" />
          <span>Budování majetku</span>
        </div>
      </Reveal>
    </section>
  );
}
