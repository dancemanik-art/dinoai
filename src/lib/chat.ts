export type ChatRole = "user" | "assistant";

export type ChatMessage = {
  role: ChatRole;
  content: string;
};

export type ChatRequestBody = {
  messages: ChatMessage[];
};

export const MAX_MESSAGES = 16;
export const MAX_MESSAGE_LENGTH = 1500;
/** Počet zpráv odesílaných do OpenAI (posledních N) — šetří tokeny. */
export const MAX_CONTEXT_MESSAGES = 10;
export const DEFAULT_CHAT_MODEL = "gpt-4.1-mini";
export const DEFAULT_MAX_OUTPUT_TOKENS = 450;

/** Povolené levné modely (výchozí provoz). */
export const ECONOMY_MODELS = new Set(["gpt-4.1-mini", "gpt-4o-mini"]);

/** Drahé modely — jen s OPENAI_ALLOW_EXPENSIVE_MODEL=true */
const EXPENSIVE_MODEL_PATTERN =
  /^(gpt-4\.1(?!-mini)|gpt-4o(?!-mini)|gpt-5|o1|o3|chatgpt-4o-latest)/i;

export const CHAT_ERROR_MISSING_KEY =
  "AI asistent není momentálně k dispozici. Zkuste to prosím později.";

export const CHAT_ERROR_QUOTA =
  "AI služba je dočasně nedostupná z důvodu vyčerpaného kreditu. Zkuste to prosím později.";

export const CHAT_ERROR_RATE_LIMIT =
  "AI služba je dočasně přetížená. Počkejte prosím chvíli a zkuste to znovu.";

export const CHAT_ERROR_NETWORK =
  "Nepodařilo se spojit se serverem. Zkontrolujte připojení a zkuste to znovu.";

/** @deprecated use specific errors above */
export const CHAT_ERROR_UNAVAILABLE = CHAT_ERROR_MISSING_KEY;

export const CHAT_ERROR_GENERIC =
  "Omlouváme se, odpověď se nepodařilo načíst. Zkuste to prosím znovu.";

export function isOpenAIQuotaOrBillingError(status: number, message?: string): boolean {
  const m = (message || "").toLowerCase();
  if (m.includes("quota") || m.includes("billing") || m.includes("insufficient")) return true;
  if (m.includes("exceeded your current") || m.includes("payment") || m.includes("credit"))
    return true;
  return status === 402;
}

export function isOpenAIRateLimitError(status: number, message?: string): boolean {
  if (status !== 429) return false;
  const m = (message || "").toLowerCase();
  if (isOpenAIQuotaOrBillingError(status, message)) return false;
  return m.includes("rate limit") || m.includes("too many requests") || m.includes("requests per");
}

export function userFacingChatError(status: number, openAiMessage?: string): string {
  if (status === 429) {
    if (isOpenAIRateLimitError(status, openAiMessage)) return CHAT_ERROR_RATE_LIMIT;
    return CHAT_ERROR_QUOTA;
  }
  if (isOpenAIQuotaOrBillingError(status, openAiMessage)) return CHAT_ERROR_QUOTA;
  return CHAT_ERROR_GENERIC;
}

/** Vybere model — default gpt-4.1-mini, blokuje drahé modely bez explicitního povolení. */
export function resolveChatModel(): string {
  const requested = process.env.OPENAI_MODEL?.trim();
  const allowExpensive = process.env.OPENAI_ALLOW_EXPENSIVE_MODEL === "true";

  if (!requested) return DEFAULT_CHAT_MODEL;

  if (ECONOMY_MODELS.has(requested)) return requested;

  if (!allowExpensive && EXPENSIVE_MODEL_PATTERN.test(requested)) {
    console.warn(
      `[chat] Model "${requested}" je drahý a není povolen. Použit ${DEFAULT_CHAT_MODEL}.`,
    );
    return DEFAULT_CHAT_MODEL;
  }

  if (!allowExpensive) {
    console.warn(
      `[chat] Model "${requested}" není na seznamu levných modelů. Použit ${DEFAULT_CHAT_MODEL}.`,
    );
    return DEFAULT_CHAT_MODEL;
  }

  return requested;
}

export function trimMessagesForContext(messages: ChatMessage[]): ChatMessage[] {
  if (messages.length <= MAX_CONTEXT_MESSAGES) return messages;
  return messages.slice(-MAX_CONTEXT_MESSAGES);
}

export const DINO_SYSTEM_PROMPT = `Jsi DINO AI — osobní průvodce světem financí, investic a nemovitostí. Vystupuješ jako zkušený český expert s lidským, klidným a profesionálním tónem. Inspiruješ se přístupem Daniela Ilka: vysvětluješ souvislosti, ne jen produkty.

## Osobnost a styl
- Mluv česky, přirozeně a lidsky — jako chytrý průvodce u kávy, ne jako robot nebo právník.
- Buď vstřícný, empatický a věcný.
- Piš stručně a efektivně: ideálně 2–4 krátké odstavce nebo odrážky. Každá věta ať přináší hodnotu.
- Vyhni se opakování, dlouhým úvodům a zbytečným detailům. Žargon vysvětli jednou větou.
- Emoji max. 1 na odpověď, spíš výjimečně.

## Odbornost — české finance a nemovitosti
- Znáš kontext českého trhu: koruny (Kč), české banky a hypotéky, LTV, fixace sazeb, refinancování, RPSN, nemovitostní registry, kupní smlouvy, nájem vs. vlastnictví, investiční byty v ČR, daně z nemovitostí, případně DPH u developerů, stavební spoření, penze, fondy, inflace v českém prostředí.
- Umíš propojovat oblasti do celku — typicky:
  • nemovitost ↔ hypotéka ↔ měsíční cash flow ↔ rezerva
  • investiční byt ↔ výnos ↔ náklady ↔ zdanění ↔ riziko prázdných období
  • rozhodnutí koupit vs. pronajímat ↔ osobní situace ↔ dlouhodobé cíle
  • refinancování ↔ nová sazba ↔ splátka ↔ co udělat s ušetřenými penězi
- Když uživatel řeší jednu věc, stručně ukaž 1 klíčovou souvislost (1 věta), pokud to pomůže rozhodnutí.

## Jak odpovídat
1. Pochop dotaz — maximálně jedna krátká doplňující otázka, pokud je nutná.
2. Vysvětli podstatu a souvislosti v českém kontextu — bez zbytečné délky.
3. Ukonči 1–3 praktickými kroky nebo na co se ptát dál.

## Limity a důvěra
- Nevymýšlej konkrétní sazby, ceny nemovitostí, smlouvy ani osobní data klienta. Pokud chybí čísla, pracuj s principy a typickými scénáři.
- Nejsi licencovaný finanční, právní ani daňový poradce. U závažných rozhodnutí vždy jemně připomeň, že jde o obecnou orientaci — pro konkrétní krok je vhodný odborník nebo osobní konzultace.
- Neposkytuj individuální investiční doporučení typu „kup teď tento fond“. Místo toho vysvětli, jak si posoudit, co dává smysl v jejich situaci.
- U právních a daňových detailů buď opatrný a nasměruj na specialistu.

## Cíl
Pomoci uživateli rozumět penězům, nemovitostem a jejich propojení — aby dělal informovanější rozhodnutí s klidem a přehledem.`;

export function validateChatRequest(body: unknown): { ok: true; messages: ChatMessage[] } | { ok: false; error: string } {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Neplatný požadavek." };
  }

  const { messages } = body as ChatRequestBody;
  if (!Array.isArray(messages) || messages.length === 0) {
    return { ok: false, error: "Chybí historie zpráv." };
  }

  if (messages.length > MAX_MESSAGES) {
    return { ok: false, error: "Příliš dlouhá konverzace. Začněte prosím nový chat." };
  }

  const normalized: ChatMessage[] = [];
  for (const msg of messages) {
    if (!msg || typeof msg !== "object") {
      return { ok: false, error: "Neplatný formát zprávy." };
    }
    const { role, content } = msg as ChatMessage;
    if (role !== "user" && role !== "assistant") {
      return { ok: false, error: "Neplatná role zprávy." };
    }
    if (typeof content !== "string" || !content.trim()) {
      return { ok: false, error: "Prázdná zpráva." };
    }
    if (content.length > MAX_MESSAGE_LENGTH) {
      return { ok: false, error: "Zpráva je příliš dlouhá." };
    }
    normalized.push({ role, content: content.trim() });
  }

  if (normalized.at(-1)?.role !== "user") {
    return { ok: false, error: "Poslední zpráva musí být od uživatele." };
  }

  return { ok: true, messages: normalized };
}
