import { modules } from "@/lib/modules";

export default function ModuleNav() {
  return (
    <nav className="flex gap-1.5 overflow-x-auto px-4 py-2 sm:px-6" aria-label="Bhubesi OS modules">
      {modules.map((mod) => (
        <button
          key={mod.id}
          type="button"
          disabled={mod.status === "soon"}
          title={mod.status === "soon" ? `${mod.label} — coming in a future phase` : mod.label}
          className={
            mod.status === "active"
              ? "shrink-0 rounded-full bg-zinc-900 px-3.5 py-1.5 text-xs font-medium text-white dark:bg-white dark:text-zinc-900"
              : "shrink-0 cursor-not-allowed rounded-full border border-dashed border-zinc-300 px-3.5 py-1.5 text-xs font-medium text-zinc-400 dark:border-zinc-700 dark:text-zinc-600"
          }
        >
          {mod.label}
          {mod.status === "soon" && <span className="ml-1.5 text-[10px] uppercase tracking-wide">soon</span>}
        </button>
      ))}
    </nav>
  );
}
