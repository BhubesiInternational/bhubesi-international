export default function PrototypeBanner() {
  return (
    <div className="flex items-center gap-2 border-b border-amber-500/20 bg-amber-500/10 px-4 py-2 text-xs text-amber-800 dark:text-amber-200 sm:px-6">
      <span className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
      <p>
        <span className="font-semibold">MVP build.</span> Real accounts, real database, real
        conversation history. Seat replies use Claude when an API key is configured, and fall
        back to a deterministic simulated response otherwise — see{" "}
        <code className="rounded bg-black/5 px-1 dark:bg-white/10">platform/ai/ai-platform.md</code>.
      </p>
    </div>
  );
}
