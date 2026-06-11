import type { Metadata } from "next";
import { Geist, Dancing_Script } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LeadModalProvider } from "@/components/LeadModal";
import { baseMetadata } from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
});

const script = Dancing_Script({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["600", "700"],
});

export const metadata: Metadata = baseMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs" className={`${geistSans.variable} ${script.variable} h-full antialiased`}>
      <body className="min-h-full">
        <div className="page-bg" aria-hidden />
        <LeadModalProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </LeadModalProvider>
      </body>
    </html>
  );
}
