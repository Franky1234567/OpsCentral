"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { User, Post, Todo } from "@/types";
import { getInitials } from "@/lib/utils";
import { COLORS, SHADOW } from "@/constants/colors";
import { Chip } from "@/components/ui/Chip";
import { FlatCard } from "@/components/ui/FlatCard";
import { StatCard } from "@/components/ui/StatCard";
import { InfoRow, AddressRow } from "@/components/ui/InfoRow";

interface UserDetailViewProps {
  user: User;
  posts: Post[];
  todos: Todo[];
}

export function UserDetailView({ user, posts, todos }: UserDetailViewProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"posts" | "todos">("posts");
  const [todoFilter, setTodoFilter] = useState<"all" | "completed" | "pending">("all");
  const [showAllPosts, setShowAllPosts] = useState(false);

  const completedTodos = todos.filter((t) => t.completed);
  const pendingTodos = todos.filter((t) => !t.completed);

  const visibleTodos =
    todoFilter === "completed"
      ? completedTodos
      : todoFilter === "pending"
      ? pendingTodos
      : todos;

  return (
    <main className="w-full max-w-[900px] mx-auto px-4 py-6 md:px-6 md:py-8">
      <div className="flex flex-col gap-2 mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1 text-primary hover:opacity-80 transition-opacity text-h2 w-fit"
        >
          <span className="material-symbols-outlined text-xl">arrow_back</span>
          Back to Users
        </button>
        <div className="flex items-center gap-1 text-on-surface-variant text-body-sm">
          <Link href="/users" className="hover:text-primary transition-colors">
            Users
          </Link>
          <span className="material-symbols-outlined text-base">chevron_right</span>
          <span className="font-semibold text-on-surface">{user.name}</span>
        </div>
      </div>

      <div
        className="bg-white border border-outline-variant rounded-xl shadow-sm p-6 mb-6 flex flex-col md:flex-row items-center md:items-start gap-6 relative overflow-hidden"
        style={{ boxShadow: SHADOW }}
      >
        <div
          className="absolute top-0 left-0 w-full h-24 opacity-50 z-0"
          style={{ background: "linear-gradient(to right, #e1e0ff, #efecf8)" }}
        />
        <div className="relative z-10 shrink-0">
          <div className="w-24 h-24 rounded-full bg-primary text-on-primary flex items-center justify-center text-display-sm select-none">
            {getInitials(user.name)}
          </div>
        </div>
        <div className="relative z-10 flex-1 text-center md:text-left flex flex-col items-center md:items-start">
          <h1 className="text-display-sm text-on-surface mb-1">{user.name}</h1>
          <p className="text-body-base text-on-surface-variant mb-4">@{user.username}</p>
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            <Chip icon="mail" label={user.email} />
            <Chip icon="phone" label={user.phone} />
            <Chip icon="language" label={user.website} />
            <Chip icon="domain" label={user.company.name} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <FlatCard>
          <h2 className="text-h1 text-on-surface mb-4 flex items-center gap-2 border-b border-surface-variant pb-3">
            <span className="material-symbols-outlined text-primary text-xl">contact_page</span>
            Contact &amp; Company
          </h2>
          <div className="flex flex-col gap-4 flex-1">
            <InfoRow label="Email" value={user.email} mono />
            <InfoRow label="Phone" value={user.phone} mono />
            <InfoRow label="Website" value={user.website} mono />
            <div className="mt-auto pt-4 border-t border-surface-variant">
              <p className="text-h2 text-on-surface">{user.company.name}</p>
              <p className="text-body-sm text-on-surface-variant italic mt-1">
                &ldquo;{user.company.catchPhrase}&rdquo;
              </p>
            </div>
          </div>
        </FlatCard>

        <FlatCard>
          <h2 className="text-h1 text-on-surface mb-4 flex items-center gap-2 border-b border-surface-variant pb-3">
            <span className="material-symbols-outlined text-primary text-xl">location_on</span>
            Address
          </h2>
          <div className="flex flex-col gap-3">
            <AddressRow label="Street" value={user.address.street} />
            <AddressRow label="Suite" value={user.address.suite} />
            <AddressRow label="City" value={user.address.city} />
            <AddressRow label="Zipcode" value={user.address.zipcode} mono />
          </div>
          <div className="mt-auto pt-4 flex justify-end">
            <span className="material-symbols-outlined text-surface-dim opacity-50 text-5xl">map</span>
          </div>
        </FlatCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatCard
          icon="article"
          label="Total Posts"
          value={posts.length}
          iconBg={COLORS.posts.iconBg}
          iconColor={COLORS.posts.icon}
          accentColor={COLORS.posts.accent}
        />
        <StatCard
          icon="task_alt"
          label="Completed Todos"
          value={completedTodos.length}
          iconBg={COLORS.completed.statBg}
          iconColor={COLORS.completed.icon}
          accentColor={COLORS.completed.icon}
        />
        <StatCard
          icon="pending_actions"
          label="Pending Todos"
          value={pendingTodos.length}
          iconBg={COLORS.pending.statBg}
          iconColor={COLORS.pending.statIcon}
          accentColor={COLORS.pending.icon}
        />
      </div>

      <div className="mb-6 border-b border-outline-variant">
        <div className="flex gap-8">
          {(["posts", "todos"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-2 pb-3 border-b-2 text-h2 px-1 transition-colors ${
                activeTab === tab
                  ? "border-primary text-primary"
                  : "border-transparent text-on-surface-variant hover:text-on-surface"
              }`}
            >
              {tab === "posts" ? "Posts" : "Assigned Tasks"}
              <span
                className={`text-label-caps px-2 py-0.5 rounded-full ${
                  activeTab === tab
                    ? "bg-primary-container text-on-primary-container"
                    : "bg-surface-variant text-on-surface-variant"
                }`}
              >
                {tab === "posts" ? posts.length : todos.length}
              </span>
            </button>
          ))}
        </div>
      </div>

      {activeTab === "posts" && (
        <div className="flex flex-col gap-4">
          {(showAllPosts ? posts : posts.slice(0, 3)).map((post) => (
            <FlatCard key={post.id} accentLeft>
              <div className="flex gap-4">
                <div className="flex-1">
                  <h3 className="text-h2 text-on-surface mb-1 group-hover:text-primary transition-colors capitalize">
                    {post.title}
                  </h3>
                  <p className="text-body-sm text-on-surface-variant line-clamp-2">{post.body}</p>
                </div>
                <span className="material-symbols-outlined text-surface-dim self-center">chevron_right</span>
              </div>
            </FlatCard>
          ))}
          {posts.length > 3 && (
            <button
              onClick={() => setShowAllPosts((prev) => !prev)}
              className="bg-white border border-outline-variant rounded-xl p-4 flex justify-center items-center hover:bg-surface-container-low transition-colors w-full"
              style={{ boxShadow: SHADOW }}
            >
              <span className="text-body-base text-primary font-semibold">
                {showAllPosts ? "Show less" : `View all posts (${posts.length})`}
              </span>
            </button>
          )}
        </div>
      )}

      {activeTab === "todos" && (
        <div className="flex flex-col gap-4">
          <div className="flex justify-end gap-2 mb-2">
            {(["all", "completed", "pending"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setTodoFilter(f)}
                className={`text-label-caps px-3 py-1.5 rounded transition-all ${
                  todoFilter === f
                    ? "bg-surface-variant text-on-surface"
                    : "text-on-surface-variant hover:bg-surface-variant"
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            {visibleTodos.map((todo) => (
              <div
                key={todo.id}
                className="bg-white border border-outline-variant rounded-xl p-3 flex items-center gap-3 hover:border-primary transition-colors cursor-pointer"
                style={{ boxShadow: SHADOW }}
              >
                <span
                  className="material-symbols-outlined text-xl"
                  style={{ color: todo.completed ? COLORS.completed.icon : "#c7c4d7" }}
                >
                  {todo.completed ? "check_box" : "check_box_outline_blank"}
                </span>
                <span
                  className={`text-body-base ${
                    todo.completed ? "line-through text-on-surface-variant" : "text-on-surface"
                  }`}
                >
                  {todo.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}