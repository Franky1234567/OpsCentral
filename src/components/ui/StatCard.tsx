import { SHADOW } from "@/constants/colors";

interface StatCardProps {
  icon: string;
  label: string;
  value: number;
  iconBg: string;
  iconColor: string;
  accentColor: string;
}

export function StatCard({ icon, label, value, iconBg, iconColor, accentColor }: StatCardProps) {
  return (
    <div
      className="bg-white border border-outline-variant rounded-xl p-4 flex items-center gap-4 border-l-4"
      style={{ boxShadow: SHADOW, borderLeftColor: accentColor }}
    >
      <div
        className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0"
        style={{ backgroundColor: iconBg }}
      >
        <span className="material-symbols-outlined text-2xl" style={{ color: iconColor }}>
          {icon}
        </span>
      </div>
      <div>
        <p className="text-label-caps text-on-surface-variant">{label}</p>
        <p className="text-h1 text-on-surface">{value}</p>
      </div>
    </div>
  );
}