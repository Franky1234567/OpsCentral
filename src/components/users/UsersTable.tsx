"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { UserWithStats } from "@/types";
import { getInitials } from "@/lib/utils";
import { COLORS } from "@/constants/colors";

export function UsersTable({ users }: { users: UserWithStats[] }) {
  const router = useRouter();

  return (
    <div className="bg-surface border border-outline-variant rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-outline-variant bg-surface-container-lowest">
              <th className="px-4 py-3 text-label-caps text-on-surface-variant">User</th>
              <th className="px-4 py-3 text-label-caps text-on-surface-variant">Website</th>
              <th className="px-4 py-3 text-label-caps text-on-surface-variant text-center">Posts</th>
              <th className="px-4 py-3 text-label-caps text-on-surface-variant text-center">Completed</th>
              <th className="px-4 py-3 text-label-caps text-on-surface-variant text-center">Pending</th>
              <th className="px-4 py-3 text-label-caps text-on-surface-variant text-right">Action</th>
            </tr>
          </thead>
          <tbody className="text-body-sm text-on-surface">
            {users.map((user) => (
              <tr
                key={user.id}
                onClick={() => router.push(`/users/${user.id}`)}
                className="group border-b border-outline-variant last:border-0 hover:bg-surface-container-low transition-colors cursor-pointer relative"
              >
                
                <td className="px-4 py-3 relative">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center text-label-caps shrink-0">
                      {getInitials(user.name)}
                    </div>
                    <div>
                      <div className="font-semibold text-on-surface">{user.name}</div>
                      <div className="text-on-surface-variant font-data-mono text-data-mono">{user.email}</div>
                    </div>
                  </div>
                </td>

                <td className="px-4 py-3">
                  <a
                    href={`https://${user.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline font-data-mono text-data-mono"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {user.website}
                  </a>
                </td>

                <td className="px-4 py-3 text-center">
                  <span className="inline-flex items-center justify-center px-2 py-1 rounded bg-primary-container text-on-primary-container font-data-mono text-data-mono">
                    {user.totalPosts}
                  </span>
                </td>

                <td className="px-4 py-3 text-center">
                  <span className="inline-flex items-center justify-center gap-1 px-2 py-1 rounded font-data-mono text-data-mono border" style={{ backgroundColor: COLORS.completed.bg, color: COLORS.completed.text, borderColor: COLORS.completed.border }}>
                    <span className="material-symbols-outlined text-sm">check</span>
                    {user.completedTodos}
                  </span>
                </td>

                <td className="px-4 py-3 text-center">
                  <span className="inline-flex items-center justify-center gap-1 px-2 py-1 rounded font-data-mono text-data-mono border" style={{ backgroundColor: COLORS.pending.bg, color: COLORS.pending.text, borderColor: COLORS.pending.border }}>
                    <span className="material-symbols-outlined text-sm">hourglass_empty</span>
                    {user.pendingTodos}
                  </span>
                </td>

                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/users/${user.id}`}
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center justify-center p-1 rounded text-outline-variant group-hover:text-primary hover:bg-surface-variant transition-colors"
                  >
                    <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}