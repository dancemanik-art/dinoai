"use client";

import { useRef } from "react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import DinoChat, { type DinoChatHandle } from "./DinoChat";
import { SendIcon } from "./icons";

const suggestions = [
  "Jak propojit hypotéku s koupí investičního bytu?",
  "Co zvážit při refinancování v dnešní situaci?",
  "Vyplatí se mi spíš vlastnit, nebo pronajímat?",
];

export default function ChatDemo() {
  const chatRef = useRef<DinoChatHandle>(null);

  return (
    <section id="chat" className="section-spacing">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="AI chat"
          title={
            <>
              Zeptejte se Dina <span className="text-gold-gradient">přirozeně</span>,
              jako kamaráda
            </>
          }
          subtitle="Napište dotaz běžnou řečí a DINO AI vám odpoví jasně, srozumitelně a s ohledem na vaši situaci."
        />

        <div className="mt-10 grid items-stretch gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Left: example prompts — desktop */}
          <Reveal className="hidden lg:block">
            <div className="flex h-full flex-col gap-4">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gold-light">
                Vyzkoušejte třeba
              </p>
              {suggestions.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => chatRef.current?.sendMessage(s)}
                  className="card card-hover group flex w-full items-center justify-between gap-3 p-4 text-left"
                >
                  <span className="text-sm text-cream">{s}</span>
                  <SendIcon className="h-4 w-4 shrink-0 text-muted transition-colors group-hover:text-gold-light" />
                </button>
              ))}
              <p className="mt-auto text-xs leading-relaxed text-muted">
                DINO AI poskytuje obecné informace, ne osobní finanční poradenství. Důležitá
                rozhodnutí si vždy ověřte u odborníka.
              </p>
            </div>
          </Reveal>

          {/* Chat window */}
          <Reveal delay={120} className="min-h-[420px] lg:min-h-[520px]">
            <DinoChat
              ref={chatRef}
              suggestions={suggestions}
              className="h-full min-h-[420px] lg:min-h-[520px]"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
