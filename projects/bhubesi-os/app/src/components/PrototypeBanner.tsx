export default function PrototypeBanner() {
  return (
    <div className="flex items-center gap-2 border-b border-amber-500/20 bg-amber-500/10 px-4 py-2 text-xs text-amber-800 dark:text-amber-200 sm:px-6">
      <span className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
      <p>
        <span className="font-semibold">Phase 3 prototype.</span> Seat replies are simulated
        locally against the AI Workforce specs — not yet wired to a live AI backend.
      </p>
    </div>
  );
}
