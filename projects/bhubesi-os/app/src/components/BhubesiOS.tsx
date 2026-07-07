"use client";

import { useState } from "react";
import { seats, getSeat } from "@/lib/seats";
import { ChatMessage } from "@/lib/types";
import { generateReply } from "@/lib/responder";
import ModuleNav from "./ModuleNav";
import SeatSidebar from "./SeatSidebar";
import ChatPanel from "./ChatPanel";
import PrototypeBanner from "./PrototypeBanner";

function initialHistory(): Record<string, ChatMessage[]> {
  const history: Record<string, ChatMessage[]> = {};
  for (const seat of seats) {
    history[seat.id] = [
      { id: `${seat.id}-greeting`, role: "seat", text: seat.greeting, ts: Date.now() },
    ];
  }
  return history;
}

let idCounter = 0;
function nextId() {
  idCounter += 1;
  return `msg-${idCounter}`;
}

export default function BhubesiOS() {
  const [selectedId, setSelectedId] = useState(seats[0].id);
  const [history, setHistory] = useState<Record<string, ChatMessage[]>>(initialHistory);
  const [typingSeatId, setTypingSeatId] = useState<string | null>(null);

  const selectedSeat = getSeat(selectedId) ?? seats[0];
  const messages = history[selectedId] ?? [];

  function handleSend(text: string) {
    const seatId = selectedId;
    const userMessage: ChatMessage = { id: nextId(), role: "user", text, ts: Date.now() };
    setHistory((prev) => ({ ...prev, [seatId]: [...(prev[seatId] ?? []), userMessage] }));
    setTypingSeatId(seatId);

    const delay = 500 + Math.random() * 500;
    setTimeout(() => {
      const reply = generateReply(seatId, text);
      const seatMessage: ChatMessage = { id: nextId(), role: "seat", text: reply, ts: Date.now() };
      setHistory((prev) => ({ ...prev, [seatId]: [...(prev[seatId] ?? []), seatMessage] }));
      setTypingSeatId((current) => (current === seatId ? null : current));
    }, delay);
  }

  return (
    <div className="flex h-full flex-col">
      <header className="flex items-center justify-between gap-4 border-b border-zinc-200 px-4 py-3 dark:border-zinc-800 sm:px-6">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 text-sm font-bold text-amber-400 dark:bg-white dark:text-amber-600">
            B
          </span>
          <div>
            <h1 className="text-sm font-semibold leading-none text-zinc-900 dark:text-zinc-100">Bhubesi OS</h1>
            <p className="text-[11px] leading-none text-zinc-400">Phase 3 · AI Workforce Chat</p>
          </div>
        </div>
      </header>
      <ModuleNav />
      <PrototypeBanner />
      <div className="flex min-h-0 flex-1 flex-col md:flex-row">
        <SeatSidebar seats={seats} selectedId={selectedId} onSelect={setSelectedId} />
        <ChatPanel
          seat={selectedSeat}
          messages={messages}
          isTyping={typingSeatId === selectedId}
          onSend={handleSend}
        />
      </div>
    </div>
  );
}
