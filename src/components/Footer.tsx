import Link from "next/link";
import Logo from "./Logo";

const cols = [
  {
    title: "Navigace",
    links: [
      { label: "Domů", href: "/" },
      { label: "Jak funguji", href: "/#jak-funguje" },
      { label: "O DINO AI", href: "/#o-nas" },
      { label: "Pro poradce", href: "/pro-poradce" },
      { label: "Kontakt", href: "/kontakt" },
    ],
  },
  {
    title: "S čím pomohu",
    links: [
      { label: "Investice", href: "/#pomoc" },
      { label: "Nemovitosti", href: "/#pomoc" },
      { label: "Hypotéky", href: "/#pomoc" },
      { label: "Pojištění", href: "/#pomoc" },
    ],
  },
  {
    title: "Společnost",
    links: [
      { label: "Pro poradce", href: "/pro-poradce" },
      { label: "Kontakt", href: "/kontakt" },
      { label: "Ochrana údajů", href: "/" },
      { label: "Podmínky", href: "/" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/8 px-4 pt-16 pb-10">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
              Váš osobní průvodce světem financí, investic a majetku.
            </p>

            <div className="mt-6 max-w-xs">
              <h4 className="text-sm font-semibold text-cream">Kontakt</h4>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Máte otázku nebo zájem o spolupráci? Napište nám a rádi se vám
                ozveme.
              </p>
              <a
                href="mailto:hello@dinoai.cz"
                className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-gold-light transition-colors hover:text-gold"
              >
                hello@dinoai.cz
              </a>
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="text-sm font-semibold text-cream">{c.title}</h4>
              <ul className="mt-4 flex flex-col gap-3">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-muted transition-colors hover:text-gold-light"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/8 pt-6 text-xs text-muted sm:flex-row">
          <p>© {new Date().getFullYear()} DINO AI · by Daniel Ilek. Všechna práva vyhrazena.</p>
          <p>dinoai.cz</p>
        </div>
      </div>
    </footer>
  );
}
