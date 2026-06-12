"use client";

import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import Avatar from "./Avatar";
import { RefreshIcon, SendIcon } from "./icons";
import type { ChatMessage } from "@/lib/chat";
import { CHAT_ERROR_GENERIC } from "@/lib/chat";

type UiMessage = ChatMessage & { id: string; time: string };

const WELCOME: UiMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "Ahoj! 👋 Jsem DINO AI — váš průvodce českými financemi a nemovitostmi. Zeptejte se na hypotéku, investiční byt, refinancování nebo jak to propojit s vašimi cíli. Rád vám to vysvětlím srozumitelně a v souvislostech.",
  time: formatTime(new Date()),
};

function formatTime(date: Date) {
  return date.toLocaleTimeString("cs-CZ", { hour: "2-digit", minute: "2-digit" });
}

function toUiMessage(role: ChatMessage["role"], content: string): UiMessage {
  return {
    id: `${role}_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    role,
    content,
    time: formatTime(new Date()),
  };
}

type DinoChatProps = {
  suggestions?: string[];
  className?: string;
};

export type DinoChatHandle = {
  sendMessage: (text: string) => void;
};

const DinoChat = forwardRef<DinoChatHandle, DinoChatProps>(function DinoChat(
  { suggestions = [], className = "" },
  ref,
) {
  const [messages, setMessages] = useState<UiMessage[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = useCallback(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading, scrollToBottom]);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || loading) return;

      setError(null);
      const userMsg = toUiMessage("user", trimmed);
      const nextMessages = [...messages, userMsg];
      setMessages(nextMessages);
      setInput("");
      setLoading(true);

      try {
        const payload: ChatMessage[] = nextMessages.map(({ role, content }) => ({
          role,
          content,
        }));

        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: payload }),
        });

        const data = (await res.json()) as { ok: boolean; message?: string; error?: string };

        if (!res.ok || !data.ok || !data.message) {
          throw new Error(data.error || CHAT_ERROR_GENERIC);
        }

        setMessages((prev) => [...prev, toUiMessage("assistant", data.message!)]);
      } catch (err) {
        const msg = err instanceof Error ? err.message : CHAT_ERROR_GENERIC;
        setError(msg);
      } finally {
        setLoading(false);
        inputRef.current?.focus();
      }
    },
    [loading, messages],
  );

  useImperativeHandle(ref, () => ({ sendMessage: (text: string) => void sendMessage(text) }), [
    sendMessage,
  ]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    void sendMessage(input);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void sendMessage(input);
    }
  }

  function resetChat() {
    setMessages([{ ...WELCOME, id: `welcome_${Date.now()}`, time: formatTime(new Date()) }]);
    setInput("");
    setError(null);
    inputRef.current?.focus();
  }

  return (
    <div className={`card card-edge flex flex-col overflow-hidden ${className}`}>
      {/* header */}
      <div className="flex shrink-0 items-center justify-between border-b border-white/8 bg-white/[0.02] px-4 py-3.5 sm:px-5 sm:py-4">
        <div className="flex items-center gap-3">
          <Avatar size={40} />
          <div className="leading-tight">
            <div className="text-sm font-bold text-cream">DINO AI</div>
            <div className="flex flex-col gap-0.5 text-[10px] uppercase tracking-widest text-muted">
              <span className="flex items-center gap-1.5 normal-case tracking-normal">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <span className="text-xs text-muted">Online</span>
              </span>
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={resetChat}
          disabled={loading}
          aria-label="Nový chat"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-muted transition-colors hover:border-gold/40 hover:text-gold-light disabled:opacity-50"
        >
          <RefreshIcon className="h-4 w-4" />
        </button>
      </div>

      {/* messages */}
      <div
        ref={scrollRef}
        className="flex min-h-[280px] flex-1 flex-col gap-4 overflow-y-auto px-4 py-4 sm:min-h-[340px] sm:px-5 sm:py-5 md:min-h-[380px]"
      >
        {messages.map((m) =>
          m.role === "assistant" ? (
            <div key={m.id} className="flex items-end gap-2.5">
              <Avatar size={30} />
              <div className="max-w-[85%] rounded-2xl rounded-bl-sm border border-white/8 bg-white/[0.04] px-4 py-3 sm:max-w-[78%]">
                <p className="whitespace-pre-wrap text-sm leading-relaxed text-cream">{m.content}</p>
                <span className="mt-1.5 block text-right text-[10px] text-muted">{m.time}</span>
              </div>
            </div>
          ) : (
            <div key={m.id} className="flex justify-end">
              <div className="max-w-[85%] rounded-2xl rounded-br-sm border border-gold/30 bg-gold/12 px-4 py-3 sm:max-w-[78%]">
                <p className="whitespace-pre-wrap text-sm leading-relaxed text-cream">{m.content}</p>
                <span className="mt-1.5 block text-right text-[10px] text-gold-light/80">{m.time}</span>
              </div>
            </div>
          ),
        )}

        {loading && (
          <div className="flex items-end gap-2.5">
            <Avatar size={30} />
            <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-sm border border-white/8 bg-white/[0.04] px-4 py-3.5">
              {[0, 1, 2].map((d) => (
                <span
                  key={d}
                  className="h-2 w-2 rounded-full bg-gold/70"
                  style={{
                    animation: "pulse-soft 1s ease-in-out infinite",
                    animationDelay: `${d * 0.15}s`,
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* suggestions (mobile: under messages) */}
      {suggestions.length > 0 && (
        <div className="flex shrink-0 gap-2 overflow-x-auto border-t border-white/6 px-4 py-3 lg:hidden">
          {suggestions.map((s) => (
            <button
              key={s}
              type="button"
              disabled={loading}
              onClick={() => void sendMessage(s)}
              className="shrink-0 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-cream transition-colors hover:border-gold/40 disabled:opacity-50"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* input */}
      <form onSubmit={handleSubmit} className="shrink-0 border-t border-white/8 px-4 py-4">
        {error && (
          <p className="mb-3 rounded-lg border border-red-400/30 bg-red-400/10 px-3 py-2 text-xs text-red-300">
            {error}
          </p>
        )}
        <div className="flex items-end gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 sm:px-4 sm:py-3">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Napište zprávu…"
            rows={1}
            disabled={loading}
            className="max-h-32 min-h-[24px] flex-1 resize-none bg-transparent text-sm text-cream placeholder:text-muted/70 outline-none disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            aria-label="Odeslat"
            className="btn-gold flex h-9 w-9 shrink-0 items-center justify-center rounded-lg disabled:cursor-not-allowed disabled:opacity-50"
          >
            <SendIcon className="h-4 w-4" />
          </button>
        </div>
        <p className="mt-3 text-center text-[11px] leading-relaxed text-muted">
          DINO AI poskytuje obecné informace, ne osobní finanční poradenství. Důležitá rozhodnutí si
          ověřte.
        </p>
      </form>
    </div>
  );
});

export default DinoChat;
