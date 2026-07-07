import { Seat } from "@/lib/seats";
import { getAccentClasses } from "@/lib/colors";

interface Props {
  seats: Seat[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export default function SeatSidebar({ seats, selectedId, onSelect }: Props) {
  const groups: Seat["group"][] = ["Executive Office", "Operating Seats"];

  return (
    <aside className="flex shrink-0 flex-col gap-4 overflow-x-auto border-b border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-950/40 md:w-72 md:min-h-0 md:overflow-y-auto md:border-b-0 md:border-r md:p-4">
      {groups.map((group) => (
        <div key={group} className="flex flex-col gap-1">
          <h2 className="px-2 pb-1 text-[11px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            {group}
          </h2>
          <div className="flex gap-1.5 md:flex-col">
            {seats
              .filter((seat) => seat.group === group)
              .map((seat) => {
                const isSelected = seat.id === selectedId;
                const accent = getAccentClasses(seat.accent);
                return (
                  <button
                    key={seat.id}
                    type="button"
                    onClick={() => onSelect(seat.id)}
                    className={`flex shrink-0 items-center gap-2.5 rounded-lg px-2.5 py-2 text-left transition-colors md:w-full ${
                      isSelected
                        ? "bg-white shadow-sm ring-1 ring-zinc-200 dark:bg-zinc-900 dark:ring-zinc-700"
                        : "hover:bg-zinc-100 dark:hover:bg-zinc-900/60"
                    }`}
                  >
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${accent.avatar}`}
                    >
                      {seat.initials}
                    </span>
                    <span className="hidden min-w-0 flex-col md:flex">
                      <span className="truncate text-sm font-medium text-zinc-900 dark:text-zinc-100">
                        {seat.title}
                      </span>
                      <span className="truncate text-xs text-zinc-500 dark:text-zinc-400">{seat.unit}</span>
                    </span>
                  </button>
                );
              })}
          </div>
        </div>
      ))}
    </aside>
  );
}
