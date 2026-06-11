import { promises as fs } from "fs";
import path from "path";

/**
 * Lead = zájemce o DINO AI zachycený přes kontaktní formulář / modal.
 *
 * Tato vrstva je záměrně oddělená, aby se dala později jednoduše napojit na:
 *   1. E-mailové notifikace (např. Resend / SendGrid / SMTP)
 *   2. CRM (např. Daniel Ilek Office CRM, HubSpot, Pipedrive)
 *   3. Databázi zájemců (Postgres / Supabase / Notion ...)
 *
 * Stačí doplnit volání do `persistLead()` níže – tvar dat (`Lead`) zůstává stejný.
 */
export type LeadSource =
  | "hero"
  | "navbar"
  | "cta"
  | "features"
  | "how"
  | "why"
  | "poradci"
  | "about"
  | "kontakt"
  | "novinky"
  | "ukazka"
  | "jiny";

export type LeadInput = {
  name: string;
  email: string;
  phone?: string;
  message?: string;
  source?: LeadSource | string;
};

export type Lead = LeadInput & {
  id: string;
  createdAt: string;
  status: "new";
};

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/** Ověří a normalizuje vstup z formuláře. Vrací chybovou hlášku, nebo null. */
export function validateLead(input: Partial<LeadInput>): string | null {
  if (!input.name || input.name.trim().length < 2) return "Zadejte prosím své jméno.";
  if (!input.email || !isValidEmail(input.email)) return "Zadejte prosím platný e-mail.";
  return null;
}

/**
 * Uloží lead do připravené struktury.
 *
 * Aktuálně se zapisuje do lokálního JSON souboru (data/leads.json) jako
 * dočasné úložiště pro testovací provoz. Tady je jediné místo, kam stačí
 * v budoucnu doplnit e-mail / CRM / DB.
 */
export async function persistLead(input: LeadInput): Promise<Lead> {
  const lead: Lead = {
    id: `lead_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    phone: input.phone?.trim() || undefined,
    message: input.message?.trim() || undefined,
    source: input.source || "jiny",
    createdAt: new Date().toISOString(),
    status: "new",
  };

  // --- BUDOUCÍ INTEGRACE (stačí odkomentovat / doplnit) -------------------
  // await sendEmailNotification(lead);   // 1) e-mailová notifikace
  // await crm.createContact(lead);       // 2) CRM
  // await db.insert("leads", lead);      // 3) databáze zájemců
  // ------------------------------------------------------------------------

  // Dočasné úložiště pro testovací provoz – lokální JSON soubor.
  try {
    const dir = path.join(process.cwd(), "data");
    const file = path.join(dir, "leads.json");
    await fs.mkdir(dir, { recursive: true });
    let list: Lead[] = [];
    try {
      list = JSON.parse(await fs.readFile(file, "utf8"));
    } catch {
      list = [];
    }
    list.push(lead);
    await fs.writeFile(file, JSON.stringify(list, null, 2), "utf8");
  } catch (err) {
    // I když zápis selže (např. read-only prostředí), lead nezahodíme –
    // alespoň ho zalogujeme, aby šel dohledat.
    console.error("[leads] zápis do souboru selhal:", err);
  }

  console.log("[leads] nový zájemce:", { id: lead.id, email: lead.email, source: lead.source });
  return lead;
}
