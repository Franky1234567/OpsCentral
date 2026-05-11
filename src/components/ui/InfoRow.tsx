export function InfoRow({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div>
      <p className="text-label-caps text-on-surface-variant mb-0.5">{label}</p>
      <p className={mono ? "font-data-mono text-data-mono text-on-surface" : "text-body-base text-on-surface"}>
        {value}
      </p>
    </div>
  );
}

export function AddressRow({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex justify-between items-center border-b border-dashed border-surface-variant pb-2 last:border-0 last:pb-0">
      <span className="text-label-caps text-on-surface-variant">{label}</span>
      <span className={mono ? "font-data-mono text-data-mono text-on-surface" : "text-body-base text-on-surface"}>
        {value}
      </span>
    </div>
  );
}