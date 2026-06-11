import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import Avatar from "./Avatar";
import { LeadButton } from "./LeadModal";
import { CheckIcon } from "./icons";

const reasons = [
  {
    title: "Rozumí financím i vám",
    desc: "Spojuje znalost financí s pochopením vaší konkrétní situace.",
  },
  {
    title: "Vysvětlí možnosti jasně",
    desc: "Rozloží složitá témata na srozumitelné kroky, kterým rozumíte.",
  },
  {
    title: "Odpovídá rychle a srozumitelně",
    desc: "Odpověď dostanete během vteřin, jasně a bez žargonu.",
  },
  {
    title: "Pomáhá dělat lepší rozhodnutí",
    desc: "Každý den vám pomáhá posouvat se blíž k vašim cílům.",
  },
];

const stats = [
  { value: "24/7", label: "k dispozici" },
  { value: "vteřiny", label: "do odpovědi" },
  { value: "100 %", label: "srozumitelně" },
];

export default function WhyDino() {
  return (
    <section id="proc" className="section-spacing">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
        {/* Left: reasons */}
        <div>
          <SectionHeading
            align="left"
            eyebrow="Proč DINO AI"
            title={
              <>
                Důvěryhodný průvodce, který je vždy{" "}
                <span className="text-gold-gradient">na vaší straně</span>
              </>
            }
          />

          <ul className="mt-8 flex flex-col gap-4">
            {reasons.map((r, i) => (
              <Reveal as="li" key={r.title} delay={i * 80}>
                <div className="flex items-start gap-4">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-gold-light">
                    <CheckIcon className="h-4 w-4" />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-cream">{r.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{r.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={120}>
            <div className="mt-8 grid grid-cols-3 gap-4">
              {stats.map((s) => (
                <div key={s.label} className="card card-edge p-4 text-center">
                  <div className="text-xl font-extrabold text-gold-gradient">{s.value}</div>
                  <div className="mt-1 text-xs text-muted">{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Right: ask Dino card */}
        <Reveal delay={120}>
          <div className="relative mx-auto max-w-md">
            <div className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-gold/10 blur-3xl" />
            <div className="card card-edge relative overflow-hidden p-8">
              <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold-light">
                Zeptejte se Dina
              </span>

              {/* handwritten-style note bubble */}
              <div className="mt-6 rounded-2xl rounded-bl-sm border border-white/10 bg-white/[0.04] p-5">
                <p className="text-lg font-medium italic leading-relaxed text-cream">
                  „Nevíte si rady? Zeptejte se Dina. Je tu pro vás 24/7.”
                </p>
              </div>

              <div className="mt-6 flex items-center gap-4">
                <Avatar size={64} />
                <div>
                  <div className="text-sm font-bold text-cream">DINO AI</div>
                  <div className="flex items-center gap-1.5 text-xs text-muted">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    Online · připraven pomoci
                  </div>
                </div>
              </div>

              <LeadButton
                source="why"
                className="btn-gold mt-6 flex w-full items-center justify-center rounded-xl px-6 py-3.5 text-sm font-semibold"
              >
                Vyzkoušet v testovacím provozu
              </LeadButton>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
