"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import Avatar from "./Avatar";
import { LeadButton } from "./LeadModal";
import { RefreshIcon, SendIcon } from "./icons";

type Msg = { role: "ai" | "user"; text: string; time: string };

const script: Msg[] = [
  {
    role: "ai",
    text: "Ahoj! 👋 Jsem DINO AI, váš osobní průvodce. Zeptejte se mě na cokoliv ohledně vašich smluv, investic, hypoték nebo cílů.",
    time: "10:30",
  },
  {
    role: "user",
    text: "Můžeš mi vysvětlit, jak funguje má investice do fondu Conseq Growth?",
    time: "10:31",
  },
  {
    role: "ai",
    text: "Samozřejmě! Conseq Growth je dynamický smíšený fond, který investuje do akcií růstových společností po celém světě. Cílem je dlouhodobý růst hodnoty vaší investice. Aktuálně máte zhodnocení +12,45 % od začátku investice.",
    time: "10:32",
  },
];

const suggestions = [
  "Jak na mě dopadne nová sazba hypotéky?",
  "Kolik bych měl měsíčně investovat?",
  "Vyplatí se mi předčasně splatit úvěr?",
];

export default function ChatDemo() {
  const [count, setCount] = useState(0);
  const [typing, setTyping] = useState(false);
  const [runKey, setRunKey] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mounted = true;
    const timers: ReturnType<typeof setTimeout>[] = [];
    setCount(0);
    setTyping(false);

    const run = (i: number) => {
      if (!mounted || i >= script.length) {
        timers.push(setTimeout(() => mounted && setRunKey((k) => k + 1), 4500));
        return;
      }
      const isAi = script[i].role === "ai";
      const think = isAi ? 1100 : 650;
      if (isAi) setTyping(true);
      timers.push(
        setTimeout(() => {
          if (!mounted) return;
          setTyping(false);
          setCount(i + 1);
          run(i + 1);
        }, think),
      );
    };
    timers.push(setTimeout(() => run(0), 600));

    return () => {
      mounted = false;
      timers.forEach(clearTimeout);
    };
  }, [runKey]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [count, typing]);

  const shown = script.slice(0, count);

  return (
    <section id="chat" className="section-spacing">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Ukázka AI chatu"
          title={
            <>
              Zeptejte se Dina <span className="text-gold-gradient">přirozeně</span>,
              jako kamaráda
            </>
          }
          subtitle="Žádné formuláře ani složité tabulky. Napíšete dotaz běžnou řečí a Dino odpoví jasně, srozumitelně a s ohledem na vaši situaci."
        />

        <div className="mt-10 grid items-center gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Left: example prompts */}
          <Reveal>
            <div className="flex flex-col gap-4">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gold-light">
                Vyzkoušejte třeba
              </p>
              {suggestions.map((s) => (
                <LeadButton
                  key={s}
                  source="chat-demo"
                  className="card card-hover group flex w-full items-center justify-between gap-3 p-4 text-left"
                >
                  <span className="text-sm text-cream">{s}</span>
                  <SendIcon className="h-4 w-4 shrink-0 text-muted transition-colors group-hover:text-gold-light" />
                </LeadButton>
              ))}
              <p className="mt-2 text-xs leading-relaxed text-muted">
                DINO AI pracuje s důvěrnými daty. Důležité informace si vždy
                ověřte.
              </p>
            </div>
          </Reveal>

          {/* Right: chat window */}
          <Reveal delay={120}>
            <div className="card card-edge overflow-hidden">
              {/* window header */}
              <div className="flex items-center justify-between border-b border-white/8 bg-white/[0.02] px-5 py-4">
                <div className="flex items-center gap-3">
                  <Avatar size={40} />
                  <div className="leading-tight">
                    <div className="text-sm font-bold text-cream">DINO AI</div>
                    <div className="flex items-center gap-1.5 text-xs text-muted">
                      <span className="h-2 w-2 rounded-full bg-emerald-400" />
                      Online
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setRunKey((k) => k + 1)}
                  aria-label="Přehrát znovu"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-muted transition-colors hover:border-gold/40 hover:text-gold-light"
                >
                  <RefreshIcon className="h-4 w-4" />
                </button>
              </div>

              {/* messages */}
              <div
                ref={scrollRef}
                className="flex h-[340px] flex-col gap-4 overflow-y-auto px-5 py-5 sm:h-[380px]"
              >
                {shown.map((m, i) =>
                  m.role === "ai" ? (
                    <div key={i} className="flex items-end gap-2.5">
                      <Avatar size={30} />
                      <div className="max-w-[78%] rounded-2xl rounded-bl-sm border border-white/8 bg-white/[0.04] px-4 py-3">
                        <p className="text-sm leading-relaxed text-cream">{m.text}</p>
                        <span className="mt-1.5 block text-right text-[10px] text-muted">{m.time}</span>
                      </div>
                    </div>
                  ) : (
                    <div key={i} className="flex justify-end">
                      <div className="max-w-[78%] rounded-2xl rounded-br-sm border border-gold/30 bg-gold/12 px-4 py-3">
                        <p className="text-sm leading-relaxed text-cream">{m.text}</p>
                        <span className="mt-1.5 block text-right text-[10px] text-gold-light/80">{m.time}</span>
                      </div>
                    </div>
                  ),
                )}

                {typing && (
                  <div className="flex items-end gap-2.5">
                    <Avatar size={30} />
                    <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-sm border border-white/8 bg-white/[0.04] px-4 py-3.5">
                      {[0, 1, 2].map((d) => (
                        <span
                          key={d}
                          className="h-2 w-2 rounded-full bg-gold/70"
                          style={{ animation: "pulse-soft 1s ease-in-out infinite", animationDelay: `${d * 0.15}s` }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* input */}
              <div className="border-t border-white/8 px-4 py-4">
                <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                  <span className="flex-1 text-sm text-muted">Napište zprávu…</span>
                  <button
                    type="button"
                    aria-label="Odeslat"
                    className="btn-gold flex h-9 w-9 items-center justify-center rounded-lg"
                    disabled
                  >
                    <SendIcon className="h-4 w-4" />
                  </button>
                </div>
                <p className="mt-3 text-center text-[11px] text-muted">
                  DINO AI pracuje s důvěrnými daty. Ověřte důležité informace.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
