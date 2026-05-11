import { SHADOW } from "@/constants/colors";

export function FlatCard({
  children,
  accentLeft,
}: {
  children: React.ReactNode;
  accentLeft?: boolean;
}) {
  return (
    <div
      className={`bg-white border border-outline-variant rounded-xl p-6 flex flex-col h-full group ${
        accentLeft
          ? "border-l-4 border-l-primary hover:bg-surface-container-low transition-colors cursor-pointer"
          : ""
      }`}
      style={{ boxShadow: SHADOW }}
    >
      {children}
    </div>
  );
}