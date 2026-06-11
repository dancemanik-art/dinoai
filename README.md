# DINO AI — dinoai.cz

První verze prémiového webu pro **DINO AI** — digitálního průvodce světem financí, investic, nemovitostí a budování majetku.

Design vychází ze schváleného vizuálního směru: tmavé luxusní pozadí, zlaté akcenty, přátelský maskot DINO AI, rozložení pomocí karet a moderní SaaS / fintech vzhled.

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack)
- TypeScript
- Tailwind CSS v4
- Bez backendu, databáze i autentizace — čistě prezentační frontend.

## Spuštění

```bash
npm install
npm run dev
```

Web poběží na [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # produkční build
npm run start   # spuštění produkční verze
```

## Struktura

```
src/
  app/
    layout.tsx        # fonty, metadata, ambientní pozadí
    globals.css       # design systém (barvy, animace, utility)
    page.tsx          # složení sekcí
  components/
    Navbar.tsx        # plovoucí navigace
    Hero.tsx          # Hero s maskotem (čistý průhledný cutout)
    Features.tsx      # Co umí DINO AI (Nemovitosti, Investice, Financování, Dokumenty)
    ChatDemo.tsx      # Ukázka AI chatu (animovaná)
    HowItHelps.tsx    # Jak funguje DINO AI (4 kroky)
    WhyDino.tsx       # Proč DINO AI
    ForAdvisors.tsx   # DINO AI pro poradce (White Label + dashboard)
    Marketplace.tsx   # DINO Marketplace (balíčky)
    About.tsx         # Kdo stojí za DINO AI
    CTA.tsx           # Závěrečné CTA
    Footer.tsx
    Logo.tsx, Avatar.tsx, icons.tsx, Reveal.tsx, SectionHeading.tsx
public/
  mascot/
    hero.png          # sedící maskot (průhledné pozadí)
    desk.png          # maskot u stolu (pro sekci Pro poradce)
    avatar.png        # obličej do chatu a avatarů
    reference.png     # původní schválená reference
```

## Maskot a logo

Maskot je převzatý ze schválené reference — pozadí bylo odstraněno (transparentní PNG),
takže nikde nevzniká „ořezaný obdélník". Logo (zlaté „D" v bublině) je překreslené jako
ostré SVG (`Logo.tsx`) podle značky z maskotovy mikiny / hrnku. Nebyl vytvořen nový styl
ani branding — web pracuje s existující identitou DINO AI.
