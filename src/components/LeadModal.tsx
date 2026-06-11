"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import Avatar from "./Avatar";
import { CheckIcon, ArrowRightIcon } from "./icons";

type LeadModalContextValue = {
  open: (source?: string) => void;
  close: () => void;
};

const LeadModalContext = createContext<LeadModalContextValue>({
  open: () => {},
  close: () => {},
});

export function useLeadModal() {
  return useContext(LeadModalContext);
}

/** Tlačítko, které otevře modal pro sběr kontaktů. */
export function LeadButton({
  children,
  className = "",
  source,
}: {
  children: ReactNode;
  className?: string;
  source?: string;
}) {
  const { open } = useLeadModal();
  return (
    <button type="button" className={className} onClick={() => open(source)}>
      {children}
    </button>
  );
}

export function LeadModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState<string | undefined>();

  const open = useCallback((s?: string) => {
    setSource(s);
    setIsOpen(true);
  }, []);
  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen, close]);

  return (
    <LeadModalContext.Provider value={{ open, close }}>
      {children}
      {isOpen && <LeadModal source={source} onClose={close} />}
    </LeadModalContext.Provider>
  );
}

function LeadModal({
  source,
  onClose,
}: {
  source?: string;
  onClose: () => void;
}) {
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
    const payload = { name, email, phone, message, source };

    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch {
      // i kdyby síť selhala, uložíme lokálně níže
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
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Mám zájem o DINO AI"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="card card-edge relative my-auto w-full max-w-md overflow-hidden p-6 sm:p-8">
        {/* ambient glow */}
        <div className="pointer-events-none absolute -top-24 left-1/2 h-56 w-80 -translate-x-1/2 rounded-full bg-gold/15 blur-3xl" />

        {/* close */}
        <button
          type="button"
          aria-label="Zavřít"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-muted transition-colors hover:border-gold/40 hover:text-gold-light"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        {status === "done" ? (
          <div className="relative flex flex-col items-center text-center">
            <div className="relative mb-5 flex h-20 w-20 items-center justify-center">
              <span className="absolute inset-0 rounded-full bg-gold/20 blur-xl" />
              <span className="relative flex h-20 w-20 items-center justify-center rounded-full border border-gold/40 bg-gold/10 text-gold-light">
                <CheckIcon className="h-9 w-9" />
              </span>
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight text-cream">
              Děkujeme za váš zájem.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Jakmile bude DINO AI připraveno k používání nebo budeme mít další
              informace, ozveme se vám.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="btn-gold mt-7 inline-flex w-full items-center justify-center rounded-xl px-6 py-3.5 text-sm font-semibold"
            >
              Zavřít
            </button>
          </div>
        ) : (
          <>
            <div className="relative flex flex-col items-center text-center">
              <div className="relative mb-4">
                <span className="absolute inset-0 rounded-full bg-gold/20 blur-lg" />
                <Avatar size={72} className="relative ring-2" />
              </div>
              <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-light">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Testovací provoz
              </span>
              <h2 className="mt-4 text-balance text-xl font-extrabold leading-tight tracking-tight text-cream sm:text-2xl">
                DINO AI je aktuálně v testovacím provozu
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Právě dokončujeme první verzi DINO AI a testujeme jednotlivé
                funkce. Pokud vás projekt zaujal, chcete získat přednostní přístup
                nebo se dozvědět více informací, zanechte nám kontakt a ozveme se
                vám.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="relative mt-6 flex flex-col gap-3">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jméno"
                autoComplete="name"
                className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-cream placeholder:text-muted/70 outline-none transition-colors focus:border-gold/50"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-mail"
                autoComplete="email"
                className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-cream placeholder:text-muted/70 outline-none transition-colors focus:border-gold/50"
              />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Telefon (volitelný)"
                autoComplete="tel"
                className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-cream placeholder:text-muted/70 outline-none transition-colors focus:border-gold/50"
              />
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Zpráva"
                rows={3}
                className="resize-none rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-cream placeholder:text-muted/70 outline-none transition-colors focus:border-gold/50"
              />

              {error && (
                <p className="text-sm text-red-400">{error}</p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="btn-gold mt-1 inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold disabled:opacity-70"
              >
                {status === "loading" ? "Odesílám…" : "Mám zájem o DINO AI"}
                {status !== "loading" && <ArrowRightIcon className="h-4 w-4" />}
              </button>
              <p className="text-center text-[11px] text-muted">
                Vaše údaje použijeme pouze pro odpověď a informace o DINO AI.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
