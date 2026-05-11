import Link from "next/link";
import type { UserWithStats } from "@/types";
import { getInitials } from "@/lib/utils";
import { COLORS } from "@/constants/colors";

export function UserCard({ user }: { user: UserWithStats }) {
  return (
    <div className="bg-surface border border-outline-variant rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-transparent hover:border-l-primary flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center text-label-caps shrink-0">
            {getInitials(user.name)}
          </div>
          <div>
            <div className="font-semibold text-body-sm text-on-surface">{user.name}</div>
            <div className="text-on-surface-variant font-data-mono text-data-mono">{user.email}</div>
          </div>
        </div>
        <Link
          href={`/users/${user.id}`}
          className="text-outline-variant hover:text-primary p-1"
        >
          <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-1.5 mb-3">
        <div className="text-xs text-on-surface-variant">
          <span className="font-semibold block text-on-surface">Website</span>
          <a
            href={`https://${user.website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary font-data-mono text-data-mono hover:underline"
          >
            {user.website}
          </a>
        </div>
        <div className="text-xs text-on-surface-variant">
          <span className="font-semibold block text-on-surface">Posts</span>
          <span className="font-data-mono text-data-mono text-on-surface">{user.totalPosts}</span>
        </div>
      </div>

      <div className="flex gap-2 border-t border-outline-variant pt-3 mt-auto">
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded font-data-mono text-data-mono border" style={{ backgroundColor: COLORS.completed.bg, color: COLORS.completed.text, borderColor: COLORS.completed.border }}>
          <span className="material-symbols-outlined text-sm">check</span>
          {user.completedTodos}
        </span>
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded font-data-mono text-data-mono border" style={{ backgroundColor: COLORS.pending.bg, color: COLORS.pending.text, borderColor: COLORS.pending.border }}>
          <span className="material-symbols-outlined text-sm">hourglass_empty</span>
          {user.pendingTodos}
        </span>
      </div>
    </div>
  );
}