export function Chip({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="flex items-center gap-1 bg-surface-container px-3 py-1 rounded-full font-data-mono text-data-mono text-on-surface-variant border border-outline-variant">
      <span className="material-symbols-outlined text-base">{icon}</span>
      {label}
    </div>
  );
}