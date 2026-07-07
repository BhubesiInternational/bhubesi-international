export interface AccentClasses {
  avatar: string;
  ring: string;
  chip: string;
  dot: string;
}

const accentMap: Record<string, AccentClasses> = {
  amber: {
    avatar: "bg-amber-500 text-amber-950 dark:bg-amber-400 dark:text-amber-950",
    ring: "ring-amber-500/40 dark:ring-amber-400/40",
    chip: "bg-amber-100 text-amber-900 dark:bg-amber-500/15 dark:text-amber-200",
    dot: "bg-amber-500 dark:bg-amber-400",
  },
  stone: {
    avatar: "bg-stone-500 text-stone-950 dark:bg-stone-400 dark:text-stone-950",
    ring: "ring-stone-500/40 dark:ring-stone-400/40",
    chip: "bg-stone-100 text-stone-900 dark:bg-stone-500/15 dark:text-stone-200",
    dot: "bg-stone-500 dark:bg-stone-400",
  },
  emerald: {
    avatar: "bg-emerald-500 text-emerald-950 dark:bg-emerald-400 dark:text-emerald-950",
    ring: "ring-emerald-500/40 dark:ring-emerald-400/40",
    chip: "bg-emerald-100 text-emerald-900 dark:bg-emerald-500/15 dark:text-emerald-200",
    dot: "bg-emerald-500 dark:bg-emerald-400",
  },
  sky: {
    avatar: "bg-sky-500 text-sky-950 dark:bg-sky-400 dark:text-sky-950",
    ring: "ring-sky-500/40 dark:ring-sky-400/40",
    chip: "bg-sky-100 text-sky-900 dark:bg-sky-500/15 dark:text-sky-200",
    dot: "bg-sky-500 dark:bg-sky-400",
  },
  rose: {
    avatar: "bg-rose-500 text-rose-950 dark:bg-rose-400 dark:text-rose-950",
    ring: "ring-rose-500/40 dark:ring-rose-400/40",
    chip: "bg-rose-100 text-rose-900 dark:bg-rose-500/15 dark:text-rose-200",
    dot: "bg-rose-500 dark:bg-rose-400",
  },
  fuchsia: {
    avatar: "bg-fuchsia-500 text-fuchsia-950 dark:bg-fuchsia-400 dark:text-fuchsia-950",
    ring: "ring-fuchsia-500/40 dark:ring-fuchsia-400/40",
    chip: "bg-fuchsia-100 text-fuchsia-900 dark:bg-fuchsia-500/15 dark:text-fuchsia-200",
    dot: "bg-fuchsia-500 dark:bg-fuchsia-400",
  },
  violet: {
    avatar: "bg-violet-500 text-violet-950 dark:bg-violet-400 dark:text-violet-950",
    ring: "ring-violet-500/40 dark:ring-violet-400/40",
    chip: "bg-violet-100 text-violet-900 dark:bg-violet-500/15 dark:text-violet-200",
    dot: "bg-violet-500 dark:bg-violet-400",
  },
  teal: {
    avatar: "bg-teal-500 text-teal-950 dark:bg-teal-400 dark:text-teal-950",
    ring: "ring-teal-500/40 dark:ring-teal-400/40",
    chip: "bg-teal-100 text-teal-900 dark:bg-teal-500/15 dark:text-teal-200",
    dot: "bg-teal-500 dark:bg-teal-400",
  },
  orange: {
    avatar: "bg-orange-500 text-orange-950 dark:bg-orange-400 dark:text-orange-950",
    ring: "ring-orange-500/40 dark:ring-orange-400/40",
    chip: "bg-orange-100 text-orange-900 dark:bg-orange-500/15 dark:text-orange-200",
    dot: "bg-orange-500 dark:bg-orange-400",
  },
  lime: {
    avatar: "bg-lime-500 text-lime-950 dark:bg-lime-400 dark:text-lime-950",
    ring: "ring-lime-500/40 dark:ring-lime-400/40",
    chip: "bg-lime-100 text-lime-900 dark:bg-lime-500/15 dark:text-lime-200",
    dot: "bg-lime-500 dark:bg-lime-400",
  },
  cyan: {
    avatar: "bg-cyan-500 text-cyan-950 dark:bg-cyan-400 dark:text-cyan-950",
    ring: "ring-cyan-500/40 dark:ring-cyan-400/40",
    chip: "bg-cyan-100 text-cyan-900 dark:bg-cyan-500/15 dark:text-cyan-200",
    dot: "bg-cyan-500 dark:bg-cyan-400",
  },
  indigo: {
    avatar: "bg-indigo-500 text-indigo-950 dark:bg-indigo-400 dark:text-indigo-950",
    ring: "ring-indigo-500/40 dark:ring-indigo-400/40",
    chip: "bg-indigo-100 text-indigo-900 dark:bg-indigo-500/15 dark:text-indigo-200",
    dot: "bg-indigo-500 dark:bg-indigo-400",
  },
};

const fallback: AccentClasses = accentMap.stone;

export function getAccentClasses(accent: string): AccentClasses {
  return accentMap[accent] ?? fallback;
}
