"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import { LeadButton, useLeadModal } from "./LeadModal";

const links = [
  { label: "Domů", href: "/" },
  { label: "Jak funguji", href: "/#jak-funguje" },
  { label: "O DINO AI", href: "/#o-nas" },
  { label: "Pro poradce", href: "/pro-poradce" },
  { label: "Kontakt", href: "/kontakt" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { open: openLead } = useLeadModal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <nav
        className={`flex w-full max-w-6xl items-center justify-between gap-4 rounded-2xl border px-4 py-3 transition-all duration-500 sm:px-6 ${
          scrolled
            ? "border-white/10 bg-ink/80 shadow-card backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <Link href="/" aria-label="DINO AI">
          <Logo />
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-lg px-3.5 py-2 text-sm font-medium text-muted transition-colors hover:text-cream"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <LeadButton
            source="navbar"
            className="btn-gold rounded-xl px-5 py-2.5 text-sm font-semibold"
          >
            Vyzkoušet v testovacím provozu
          </LeadButton>
        </div>

        <button
          type="button"
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
          className="btn-ghost flex h-10 w-10 items-center justify-center rounded-xl lg:hidden"
        >
          <span className="relative block h-3.5 w-5">
            <span
              className={`absolute left-0 block h-0.5 w-5 bg-cream transition-all ${open ? "top-1.5 rotate-45" : "top-0"}`}
            />
            <span
              className={`absolute left-0 top-1.5 block h-0.5 w-5 bg-cream transition-all ${open ? "opacity-0" : "opacity-100"}`}
            />
            <span
              className={`absolute left-0 block h-0.5 w-5 bg-cream transition-all ${open ? "top-1.5 -rotate-45" : "top-3"}`}
            />
          </span>
        </button>
      </nav>

      {open && (
        <div className="absolute inset-x-4 top-20 rounded-2xl border border-white/10 bg-ink/95 p-4 shadow-card backdrop-blur-xl lg:hidden">
          <div className="flex flex-col">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium text-muted transition-colors hover:bg-white/5 hover:text-cream"
              >
                {l.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                openLead("navbar");
              }}
              className="btn-gold mt-3 rounded-xl px-5 py-3 text-center text-sm font-semibold"
            >
              Vyzkoušet v testovacím provozu
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
