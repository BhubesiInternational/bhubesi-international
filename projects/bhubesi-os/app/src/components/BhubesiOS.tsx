"use client";

import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { seats, getSeat } from "@/lib/seats";
import { ChatMessage } from "@/lib/types";
import ModuleNav from "./ModuleNav";
import SeatSidebar from "./SeatSidebar";
import ChatPanel from "./ChatPanel";
import PrototypeBanner from "./PrototypeBanner";

interface Props {
  userName: string;
  companyId: string;
  companyName: string;
}

interface DbMessage {
  id: string;
  role: string;
  content: string;
  createdAt: string;
}

function toChatMessage(m: DbMessage): ChatMessage {
  return {
    id: m.id,
    role: m.role === "seat" ? "seat" : "user",
    text: m.content,
    ts: new Date(m.createdAt).getTime(),
  };
}

let localIdCounter = 0;
function nextLocalId() {
  localIdCounter += 1;
  return `local-${localIdCounter}`;
}

export default function BhubesiOS({ userName, companyId, companyName }: Props) {
  const [selectedId, setSelectedId] = useState(seats[0].id);
  const [history, setHistory] = useState<Record<string, ChatMessage[]>>({});
  const [loadedSeats, setLoadedSeats] = useState<Record<string, boolean>>({});
  const [typingSeatId, setTypingSeatId] = useState<string | null>(null);

  const selectedSeat = getSeat(selectedId) ?? seats[0];
  const messages = history[selectedId] ?? [];

  // Load this seat's persisted conversation the first time it's opened.
  useEffect(() => {
    if (loadedSeats[selectedId]) return;

    let cancelled = false;
    fetch(`/api/chat?seatId=${selectedId}&companyId=${companyId}`)
      .then((res) => res.json())
      .then((data: { messages: DbMessage[] }) => {
        if (cancelled) return;
        const persisted = (data.messages ?? []).map(toChatMessage);
        setHistory((prev) => ({
          ...prev,
          [selectedId]:
            persisted.length > 0
              ? persisted
              : [{ id: `${selectedId}-greeting`, role: "seat", text: getSeat(selectedId)!.greeting, ts: Date.now() }],
        }));
        setLoadedSeats((prev) => ({ ...prev, [selectedId]: true }));
      })
      .catch(() => {
        // Degrade gracefully: show the greeting even if the history fetch fails.
        setHistory((prev) => ({
          ...prev,
          [selectedId]: [{ id: `${selectedId}-greeting`, role: "seat", text: getSeat(selectedId)!.greeting, ts: Date.now() }],
        }));
        setLoadedSeats((prev) => ({ ...prev, [selectedId]: true }));
      });

    return () => {
      cancelled = true;
    };
  }, [selectedId, companyId, loadedSeats]);

  async function handleSend(text: string) {
    const seatId = selectedId;
    const userMessage: ChatMessage = { id: nextLocalId(), role: "user", text, ts: Date.now() };
    setHistory((prev) => ({ ...prev, [seatId]: [...(prev[seatId] ?? []), userMessage] }));
    setTypingSeatId(seatId);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ seatId, companyId, message: text }),
      });
      const data: { message: DbMessage } = await res.json();
      const seatMessage = toChatMessage(data.message);
      setHistory((prev) => ({ ...prev, [seatId]: [...(prev[seatId] ?? []), seatMessage] }));
    } catch {
      const errorMessage: ChatMessage = {
        id: nextLocalId(),
        role: "seat",
        text: "Something went wrong reaching the server — please try again.",
        ts: Date.now(),
      };
      setHistory((prev) => ({ ...prev, [seatId]: [...(prev[seatId] ?? []), errorMessage] }));
    } finally {
      setTypingSeatId((current) => (current === seatId ? null : current));
    }
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
            <p className="text-[11px] leading-none text-zinc-400">{companyName} · AI Workforce Chat</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden text-xs text-zinc-500 dark:text-zinc-400 sm:inline">{userName}</span>
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="rounded-full border border-zinc-200 px-3 py-1 text-xs text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900"
          >
            Sign out
          </button>
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
