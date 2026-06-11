import Image from "next/image";
import Reveal from "./Reveal";
import Avatar from "./Avatar";
import { LeadButton } from "./LeadModal";
import {
  ChartUpIcon,
  UsersIcon,
  CoinsIcon,
  CheckIcon,
  CalendarIcon,
} from "./icons";

const tabs = [
  { label: "Přehled", icon: ChartUpIcon, active: true },
  { label: "Klienti", icon: UsersIcon },
  { label: "Investice", icon: CoinsIcon },
  { label: "Úkoly", icon: CheckIcon },
  { label: "Kalendář", icon: CalendarIcon },
];

const kpis = [
  { value: "128", label: "Aktivních klientů" },
  { value: "98 %", label: "Spokojených klientů" },
  { value: "84 mil.", label: "Spravovaný majetek" },
];

const clients = [
  { name: "Jana Nováková", tag: "Investice", value: "+8,2 %" },
  { name: "Petr Svoboda", tag: "Hypotéka", value: "Schůzka" },
  { name: "Eva Dvořáková", tag: "Penze", value: "Výročí" },
];

const checklist = [
  "Vaše značka a vlastní logo",
  "Vaše informace a produkty",
  "Propojení s vaším systémem na klienty",
  "Bezpečné a plně přizpůsobitelné",
  "Vyšší kvalita služeb a úspora času",
];

export default function ForAdvisors() {
  return (
    <section id="poradci" className="section-spacing">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          {/* Left: copy + checklist + mascot */}
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold-light">
                Vlastní AI asistent pod vaší značkou
              </span>
              <h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-cream sm:text-4xl">
                DINO AI <span className="text-gold-gradient">pro poradce</span>
              </h2>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-muted">
                Vytvoříme AI asistenta, který bude vystupovat pod vaším jménem,
                logem a vizuální identitou. Vaši klienti tak budou komunikovat
                s vaším digitálním průvodcem, nikoliv s anonymní umělou
                inteligencí.
              </p>
            </Reveal>

            <ul className="mt-8 flex flex-col gap-3.5">
              {checklist.map((c, i) => (
                <Reveal as="li" key={c} delay={i * 70}>
                  <div className="flex items-center gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-gold-light">
                      <CheckIcon className="h-4 w-4" />
                    </span>
                    <span className="text-sm font-medium text-cream">{c}</span>
                  </div>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={120}>
              <LeadButton
                source="poradci"
                className="btn-gold mt-8 inline-flex items-center justify-center rounded-xl px-7 py-3.5 text-sm font-semibold"
              >
                Chci vlastního AI asistenta
              </LeadButton>
            </Reveal>
          </div>

          {/* Right: dashboard + mascot */}
          <Reveal delay={120}>
            <div className="relative">
              <div className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-gold/10 blur-3xl" />

              <div className="card card-edge relative z-10 overflow-hidden">
                {/* top bar */}
                <div className="flex items-center gap-2 border-b border-white/8 bg-white/[0.02] px-4 py-3">
                  <span className="h-3 w-3 rounded-full bg-white/15" />
                  <span className="h-3 w-3 rounded-full bg-white/15" />
                  <span className="h-3 w-3 rounded-full bg-white/15" />
                  <span className="ml-3 text-xs text-muted">app.dinoai.cz</span>
                </div>

                {/* tabs */}
                <div className="flex items-center gap-1 overflow-x-auto border-b border-white/8 px-3 py-2.5">
                  {tabs.map((t) => (
                    <span
                      key={t.label}
                      className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium ${
                        t.active ? "bg-gold/12 text-gold-light" : "text-muted"
                      }`}
                    >
                      <t.icon className="h-3.5 w-3.5" />
                      {t.label}
                    </span>
                  ))}
                </div>

                {/* body — extra right padding on xl leaves a clear channel for the mascot */}
                <div className="space-y-4 p-4 sm:p-5 xl:pr-28">
                  <div className="grid grid-cols-3 gap-3">
                    {kpis.map((k) => (
                      <div key={k.label} className="rounded-xl border border-white/8 bg-white/[0.03] p-3">
                        <div className="text-lg font-extrabold text-cream">{k.value}</div>
                        <div className="text-[11px] leading-tight text-muted">{k.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-start gap-3 rounded-xl border border-gold/25 bg-gold/8 p-3.5">
                    <Avatar size={32} />
                    <p className="text-xs leading-relaxed text-cream">
                      <span className="font-semibold text-gold-light">Dino:</span>{" "}
                      3 klienti mají tento měsíc výročí smlouvy. Připravil jsem
                      podklady ke schůzkám.
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/8 bg-white/[0.02]">
                    {clients.map((c, i) => (
                      <div
                        key={c.name}
                        className={`flex items-center justify-between px-4 py-3 ${
                          i !== clients.length - 1 ? "border-b border-white/6" : ""
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold/12 text-xs font-bold text-gold-light">
                            {c.name.split(" ").map((w) => w[0]).join("")}
                          </span>
                          <div className="leading-tight">
                            <div className="text-xs font-semibold text-cream">{c.name}</div>
                            <div className="text-[11px] text-muted">{c.tag}</div>
                          </div>
                        </div>
                        <span className="rounded-md bg-white/5 px-2 py-1 text-[11px] font-medium text-gold-light">
                          {c.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* mascot — sits beside the dashboard, overlapping only the empty right edge */}
              <Image
                src="/mascot/desk.png"
                alt="DINO AI"
                width={410}
                height={887}
                className="pointer-events-none absolute bottom-0 right-0 z-20 hidden w-44 translate-x-[52%] drop-shadow-[0_24px_45px_rgba(0,0,0,0.65)] xl:block"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
