import { NextResponse } from "next/server";
import {
  CHAT_ERROR_GENERIC,
  CHAT_ERROR_MISSING_KEY,
  CHAT_ERROR_NETWORK,
  DEFAULT_MAX_OUTPUT_TOKENS,
  DINO_SYSTEM_PROMPT,
  resolveChatModel,
  trimMessagesForContext,
  userFacingChatError,
  validateChatRequest,
} from "@/lib/chat";

export const runtime = "nodejs";

type OpenAIResponse = {
  choices?: { message?: { content?: string } }[];
  error?: { message?: string; type?: string; code?: string };
};

function parseMaxTokens(): number {
  const raw = process.env.OPENAI_MAX_TOKENS;
  if (!raw) return DEFAULT_MAX_OUTPUT_TOKENS;
  const n = Number.parseInt(raw, 10);
  if (!Number.isFinite(n) || n < 100) return DEFAULT_MAX_OUTPUT_TOKENS;
  return Math.min(n, 800);
}

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error("[chat] OPENAI_API_KEY is not configured");
    return NextResponse.json({ ok: false, error: CHAT_ERROR_MISSING_KEY }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: CHAT_ERROR_GENERIC }, { status: 400 });
  }

  const parsed = validateChatRequest(body);
  if (!parsed.ok) {
    return NextResponse.json({ ok: false, error: parsed.error }, { status: 422 });
  }

  const model = resolveChatModel();
  const contextMessages = trimMessagesForContext(parsed.messages);
  const maxTokens = parseMaxTokens();

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        temperature: 0.5,
        max_tokens: maxTokens,
        messages: [
          { role: "system", content: DINO_SYSTEM_PROMPT },
          ...contextMessages,
        ],
      }),
    });

    const data = (await res.json()) as OpenAIResponse;

    if (!res.ok) {
      const detail = data.error?.message || "unknown error";
      console.error("[chat] OpenAI error:", {
        status: res.status,
        type: data.error?.type,
        code: data.error?.code,
        message: detail,
        model,
      });
      return NextResponse.json(
        { ok: false, error: userFacingChatError(res.status, detail) },
        { status: 502 },
      );
    }

    const reply = data.choices?.[0]?.message?.content?.trim();
    if (!reply) {
      console.error("[chat] OpenAI returned empty reply", { model });
      return NextResponse.json({ ok: false, error: CHAT_ERROR_GENERIC }, { status: 502 });
    }

    return NextResponse.json({ ok: true, message: reply });
  } catch (err) {
    console.error("[chat] network/request failed:", err);
    return NextResponse.json({ ok: false, error: CHAT_ERROR_NETWORK }, { status: 500 });
  }
}
