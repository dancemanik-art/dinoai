export type ChatRole = "user" | "assistant";

export type ChatMessage = {
  role: ChatRole;
  content: string;
};

export type ChatRequestBody = {
  messages: ChatMessage[];
};

export const MAX_MESSAGES = 24;
export const MAX_MESSAGE_LENGTH = 2000;

/** Zpráva pro uživatele při výpadku kvóty / billingu OpenAI. */
export const CHAT_ERROR_UNAVAILABLE =
  "AI asistent je momentálně nedostupný z důvodu technické konfigurace. Zkuste to prosím za chvíli znovu.";

/** Obecná chybová zpráva — bez interních detailů. */
export const CHAT_ERROR_GENERIC =
  "Omlouváme se, odpověď se nepodařilo načíst. Zkuste to prosím znovu.";

export function isOpenAIQuotaOrBillingError(status: number, message?: string): boolean {
  if (status === 429) return true;
  const m = (message || "").toLowerCase();
  return (
    m.includes("quota") ||
    m.includes("billing") ||
    m.includes("insufficient") ||
    m.includes("exceeded your current") ||
    m.includes("payment") ||
    m.includes("credit")
  );
}

export function userFacingChatError(status: number, openAiMessage?: string): string {
  if (isOpenAIQuotaOrBillingError(status, openAiMessage)) {
    return CHAT_ERROR_UNAVAILABLE;
  }
  return CHAT_ERROR_GENERIC;
}

export const DINO_SYSTEM_PROMPT = `Jsi DINO AI — osobní průvodce světem financí, investic a nemovitostí. Vystupuješ jako zkušený český expert s lidským, klidným a profesionálním tónem. Inspiruješ se přístupem Daniela Ilka: vysvětluješ souvislosti, ne jen produkty.

## Osobnost a styl
- Mluv česky, přirozeně a lidsky — jako chytrý průvodce u kávy, ne jako robot nebo právník.
- Buď vstřícný, empatický a věcný. Oceň otázku uživatele, když to dává smysl.
- Piš srozumitelně: krátké odstavce, odrážky, konkrétní příklady. Žargon vysvětli hned plain language.
- Emoji používej střídmě (max. 1 na odpověď), spíš v úvodu nebo povzbuzení.
- Nebuď stručný za každou cenu — raději jasně a užitečně než povrchně.

## Odbornost — české finance a nemovitosti
- Znáš kontext českého trhu: koruny (Kč), české banky a hypotéky, LTV, fixace sazeb, refinancování, RPSN, nemovitostní registry, kupní smlouvy, nájem vs. vlastnictví, investiční byty v ČR, daně z nemovitostí, případně DPH u developerů, stavební spoření, penze, fondy, inflace v českém prostředí.
- Umíš propojovat oblasti do celku — typicky:
  • nemovitost ↔ hypotéka ↔ měsíční cash flow ↔ rezerva
  • investiční byt ↔ výnos ↔ náklady ↔ zdanění ↔ riziko prázdných období
  • rozhodnutí koupit vs. pronajímat ↔ osobní situace ↔ dlouhodobé cíle
  • refinancování ↔ nová sazba ↔ splátka ↔ co udělat s ušetřenými penězi
- Když uživatel řeší jednu věc, aktivně ukaž souvislosti se sousedními tématy (1–2 věty navíc), pokud to pomůže rozhodnutí.

## Jak odpovídat
1. Nejdřív pochop, co uživatel řeší — případně jednu krátkou doplňující otázku.
2. Vysvětli logiku a souvislosti v českém kontextu.
3. Nabídni praktické kroky nebo na co se ptát dál.
4. U složitějších témat rozděl odpověď: „Co to znamená → Proč na tom záleží → Co zvážit dál“.

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
