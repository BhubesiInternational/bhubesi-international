import { ChatMessage } from "@/lib/types";
import { Seat } from "@/lib/seats";
import { getAccentClasses } from "@/lib/colors";

interface Props {
  message: ChatMessage;
  seat: Seat;
}

export default function ChatMessageBubble({ message, seat }: Props) {
  const isUser = message.role === "user";
  const accent = getAccentClasses(seat.accent);

  return (
    <div className={`flex items-start gap-2.5 ${isUser ? "flex-row-reverse" : ""}`}>
      <span
        className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
          isUser ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900" : accent.avatar
        }`}
      >
        {isUser ? "You" : seat.initials}
      </span>
      <div
        className={`max-w-[75%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
          isUser
            ? "rounded-tr-sm bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
            : "rounded-tl-sm bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-100"
        }`}
      >
        {message.text}
      </div>
    </div>
  );
}
