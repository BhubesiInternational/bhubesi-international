"use client";

import { useEffect, useRef, useState } from "react";
import { Seat } from "@/lib/seats";
import { getAccentClasses } from "@/lib/colors";
import { ChatMessage } from "@/lib/types";
import ChatMessageBubble from "./ChatMessageBubble";

interface Props {
  seat: Seat;
  messages: ChatMessage[];
  isTyping: boolean;
  onSend: (text: string) => void;
}

export default function ChatPanel({ seat, messages, isTyping, onSend }: Props) {
  const [draft, setDraft] = useState("");
  const [authorityOpen, setAuthorityOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const accent = getAccentClasses(seat.accent);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  function submit() {
    const text = draft.trim();
    if (!text) return;
    onSend(text);
    setDraft("");
  }

  return (
    <section className="flex min-h-0 min-w-0 flex-1 flex-col">
      <header className="flex flex-col gap-3 border-b border-zinc-200 px-4 py-3 dark:border-zinc-800 sm:px-6">
        <div className="flex items-center gap-3">
          <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold ${accent.avatar}`}>
            {seat.initials}
          </span>
          <div className="min-w-0">
            <h1 className="truncate text-sm font-semibold text-zinc-900 dark:text-zinc-100">{seat.title}</h1>
            <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">
              Reports to {seat.reportsTo} · {seat.unit}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setAuthorityOpen((v) => !v)}
            className={`ml-auto shrink-0 rounded-full px-3 py-1 text-xs font-medium ${accent.chip}`}
          >
            Decision authority {authorityOpen ? "▲" : "▼"}
          </button>
        </div>
        {authorityOpen && (
          <div className="grid gap-2 rounded-lg border border-zinc-200 bg-zinc-50 p-3 text-xs text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-400 sm:grid-cols-2">
            <div>
              <p className="mb-0.5 font-semibold text-zinc-700 dark:text-zinc-300">Decides directly (Type 2)</p>
              <p>{seat.decisionAuthority.type2}</p>
            </div>
            <div>
              <p className="mb-0.5 font-semibold text-zinc-700 dark:text-zinc-300">Must escalate (Type 1)</p>
              <p>{seat.decisionAuthority.type1}</p>
            </div>
          </div>
        )}
      </header>

      <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-4 sm:px-6">
        {messages.map((m) => (
          <ChatMessageBubble key={m.id} message={m} seat={seat} />
        ))}
        {isTyping && (
          <div className="flex items-center gap-2.5">
            <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${accent.avatar}`}>
              {seat.initials}
            </span>
            <div className="flex gap-1 rounded-2xl rounded-tl-sm bg-zinc-100 px-3.5 py-3 dark:bg-zinc-800">
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-400 [animation-delay:-0.3s]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-400 [animation-delay:-0.15s]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-400" />
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-zinc-200 px-4 py-3 dark:border-zinc-800 sm:px-6">
        <div className="mb-2 flex flex-wrap gap-1.5">
          {seat.suggestedPrompts.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => onSend(prompt)}
              className="rounded-full border border-zinc-200 px-2.5 py-1 text-xs text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900"
            >
              {prompt}
            </button>
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
          className="flex items-end gap-2"
        >
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                submit();
              }
            }}
            rows={1}
            placeholder={`Message the ${seat.title}…`}
            className="max-h-32 min-h-[2.5rem] flex-1 resize-none rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-sm text-zinc-900 outline-none focus:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-zinc-500"
          />
          <button
            type="submit"
            disabled={!draft.trim()}
            className="shrink-0 rounded-xl bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white disabled:opacity-40 dark:bg-white dark:text-zinc-900"
          >
            Send
          </button>
        </form>
      </div>
    </section>
  );
}
