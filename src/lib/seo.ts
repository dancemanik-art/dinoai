import type { Metadata } from "next";

export const SITE_URL = "https://dinoai.cz";
export const SITE_NAME = "DINO AI";

export const defaultTitle =
  "DINO AI — Váš osobní průvodce světem financí, investic a majetku";

export const defaultDescription =
  "DINO AI je váš osobní průvodce světem financí, investic a majetku. Pomáhá vám dělat chytřejší rozhodnutí — srozumitelně, moderně a bezpečně, kdykoliv to potřebujete.";

export const siteConfig = {
  url: SITE_URL,
  name: SITE_NAME,
  title: defaultTitle,
  description: defaultDescription,
  locale: "cs_CZ",
  creator: "Daniel Ilek",
  email: "hello@dinoai.cz",
  keywords: [
    "DINO AI",
    "finance",
    "investice",
    "nemovitosti",
    "hypotéka",
    "pojištění",
    "budování majetku",
    "AI průvodce",
    "finanční poradenství",
    "Daniel Ilek",
  ],
} as const;

/** Sdílená metadata pro root layout — dědí ji všechny stránky. */
export const baseMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: defaultTitle,
    template: `%s | ${SITE_NAME}`,
  },
  description: defaultDescription,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.creator, url: "https://daniel-ilek.cz" }],
  creator: siteConfig.creator,
  publisher: SITE_NAME,
  category: "finance",
  applicationName: SITE_NAME,
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      "cs-CZ": SITE_URL,
    },
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: SITE_URL,
    siteName: SITE_NAME,
    title: defaultTitle,
    description: defaultDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [{ url: "/icon.png", type: "image/png" }],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
};

/** Metadata pro jednotlivé stránky včetně kanonické URL a OG/Twitter. */
export function createPageMetadata({
  title,
  description,
  path,
}: PageMetaInput): Metadata {
  const url = `${SITE_URL}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url,
      siteName: SITE_NAME,
      locale: siteConfig.locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
    },
  };
}
