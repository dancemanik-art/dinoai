import { NextResponse } from "next/server";
import { DINO_SYSTEM_PROMPT, validateChatRequest } from "@/lib/chat";

export const runtime = "nodejs";

type OpenAIResponse = {
  choices?: { message?: { content?: string } }[];
  error?: { message?: string };
};

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { ok: false, error: "Chat není nakonfigurován. Chybí OPENAI_API_KEY." },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Neplatný požadavek." }, { status: 400 });
  }

  const parsed = validateChatRequest(body);
  if (!parsed.ok) {
    return NextResponse.json({ ok: false, error: parsed.error }, { status: 422 });
  }

  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        temperature: 0.7,
        max_tokens: 900,
        messages: [
          { role: "system", content: DINO_SYSTEM_PROMPT },
          ...parsed.messages,
        ],
      }),
    });

    const data = (await res.json()) as OpenAIResponse;

    if (!res.ok) {
      const detail = data.error?.message || "OpenAI API vrátilo chybu.";
      console.error("[chat] OpenAI error:", res.status, detail);
      return NextResponse.json(
        { ok: false, error: "DINO AI teď nemůže odpovědět. Zkuste to prosím za chvíli." },
        { status: 502 },
      );
    }

    const reply = data.choices?.[0]?.message?.content?.trim();
    if (!reply) {
      return NextResponse.json(
        { ok: false, error: "Prázdná odpověď od AI." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, message: reply });
  } catch (err) {
    console.error("[chat] request failed:", err);
    return NextResponse.json(
      { ok: false, error: "Spojení se serverem selhalo. Zkuste to znovu." },
      { status: 500 },
    );
  }
}
