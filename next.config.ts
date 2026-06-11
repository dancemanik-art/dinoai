import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Povolit přístup k dev serveru z lokální sítě (telefon, jiné zařízení).
  // IP se může změnit — aktualizujte podle výpisu „Network:“ z `npm run dev`.
  allowedDevOrigins: ["192.168.0.77"],
};

export default nextConfig;
