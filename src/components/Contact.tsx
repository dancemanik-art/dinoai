"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import { GlobeIcon, ChatIcon, UsersIcon, SendIcon, CheckIcon } from "./icons";

const methods = [
  {
    icon: ChatIcon,
    label: "E-mail",
    value: "hello@dinoai.cz",
    href: "mailto:hello@dinoai.cz",
  },
  {
    icon: GlobeIcon,
    label: "Web",
    value: "dinoai.cz",
    href: "https://dinoai.cz",
  },
  {
    icon: UsersIcon,
    label: "Autor projektu",
    value: "Daniel Ilek",
    href: "https://daniel-ilek.cz",
  },
];

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (name.trim().length < 2) {
      setError("Zadejte prosím své jméno.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Zadejte prosím platný e-mail.");
      return;
    }
    setStatus("loading");
    const payload = { name, email, phone, message, source: "kontakt" };
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch {
      /* fallback níže */
    }
    try {
      const arr = JSON.parse(localStorage.getItem("dino_leads") || "[]");
      arr.push({ ...payload, createdAt: new Date().toISOString() });
      localStorage.setItem("dino_leads", JSON.stringify(arr));
    } catch {
      /* ignore */
    }
    setStatus("done");
  }

  return (
    <section className="relative px-4 py-10 pb-16">
      <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        {/* Contact methods */}
        <Reveal>
          <div className="flex h-full flex-col gap-4">
            {methods.map((m) => (
              <a
                key={m.label}
                href={m.href}
                className="card card-hover group flex items-center gap-4 p-5"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-gold/25 bg-gold/10 text-gold-light">
                  <m.icon className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-xs uppercase tracking-[0.18em] text-muted">
                    {m.label}
                  </div>
                  <div className="text-base font-semibold text-cream transition-colors group-hover:text-gold-light">
                    {m.value}
                  </div>
                </div>
              </a>
            ))}
            <p className="mt-2 px-1 text-sm leading-relaxed text-muted">
              Jste poradce a chcete vlastního AI asistenta pod svou značkou?
              Napište nám — rádi vám vše vysvětlíme nezávazně.
            </p>
          </div>
        </Reveal>

        {/* Form */}
        <Reveal delay={120}>
          {status === "done" ? (
            <div className="card card-edge flex h-full flex-col items-center justify-center p-8 text-center sm:p-10">
              <span className="flex h-16 w-16 items-center justify-center rounded-full border border-gold/40 bg-gold/10 text-gold-light">
                <CheckIcon className="h-8 w-8" />
              </span>
              <h3 className="mt-5 text-xl font-extrabold text-cream">
                Děkujeme za váš zájem.
              </h3>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
                Jakmile bude DINO AI připraveno k používání nebo budeme mít další
                informace, ozveme se vám.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="card card-edge flex flex-col gap-4 p-6 sm:p-8"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm">
                  <span className="font-medium text-cream">Jméno</span>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Vaše jméno"
                    autoComplete="name"
                    className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-cream placeholder:text-muted/70 outline-none transition-colors focus:border-gold/50"
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm">
                  <span className="font-medium text-cream">E-mail</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="vas@email.cz"
                    autoComplete="email"
                    className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-cream placeholder:text-muted/70 outline-none transition-colors focus:border-gold/50"
                  />
                </label>
              </div>
              <label className="flex flex-col gap-2 text-sm">
                <span className="font-medium text-cream">Telefon (volitelný)</span>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+420…"
                  autoComplete="tel"
                  className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-cream placeholder:text-muted/70 outline-none transition-colors focus:border-gold/50"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm">
                <span className="font-medium text-cream">Zpráva</span>
                <textarea
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Jak vám můžeme pomoci?"
                  className="resize-none rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-cream placeholder:text-muted/70 outline-none transition-colors focus:border-gold/50"
                />
              </label>
              {error && <p className="text-sm text-red-400">{error}</p>}
              <button
                type="submit"
                disabled={status === "loading"}
                className="btn-gold mt-1 inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold disabled:opacity-70"
              >
                {status === "loading" ? "Odesílám…" : "Mám zájem o DINO AI"}
                {status !== "loading" && <SendIcon className="h-4 w-4" />}
              </button>
              <p className="text-center text-[11px] text-muted">
                Vaše údaje použijeme pouze pro odpověď a informace o DINO AI.
              </p>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
