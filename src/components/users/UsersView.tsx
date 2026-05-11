"use client";

import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useUsersWithStats } from "@/hooks/useUsersWithStats";
import { TableSkeleton } from "@/components/ui/Skeleton";
import { ErrorState } from "@/components/ui/ErrorState";
import { EmptyState } from "@/components/ui/EmptyState";
import { UsersTable } from "@/components/users/UsersTable";
import { UserCard } from "@/components/users/UserCard";
import { VALID_SORTS, VALID_FILTERS, DEFAULT_SORT, DEFAULT_FILTER } from "@/constants/users";
import type { SortOption, FilterOption } from "@/constants/users";

export function UsersView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const { data, isLoading, isError, error } = useUsersWithStats();

  const search = searchParams.get("q") ?? "";
  const sort = (VALID_SORTS.includes(searchParams.get("sort") as SortOption)
    ? searchParams.get("sort")
    : DEFAULT_SORT) as SortOption;
  const filter = (VALID_FILTERS.includes(searchParams.get("filter") as FilterOption)
    ? searchParams.get("filter")
    : DEFAULT_FILTER) as FilterOption;

  function updateParams(updates: Record<string, string>) {
    const params = new URLSearchParams(searchParams.toString());
    const defaults: Record<string, string> = { sort: DEFAULT_SORT, filter: DEFAULT_FILTER };
    for (const [key, value] of Object.entries(updates)) {
      if (value && value !== defaults[key]) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    }
    router.replace(`?${params.toString()}`, { scroll: false });
  }

  const filtered = useMemo(() => {
    if (!data) return [];
    let result = data;

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
      );
    }

    if (filter === "has-pending") {
      result = result.filter((u) => u.pendingTodos > 0);
    } else if (filter === "no-completed") {
      result = result.filter((u) => u.completedTodos === 0);
    }

    return [...result].sort((a, b) => {
      if (sort === "name-asc") return a.name.localeCompare(b.name);
      if (sort === "name-desc") return b.name.localeCompare(a.name);
      if (sort === "posts-desc") return b.totalPosts - a.totalPosts;
      if (sort === "pending-desc") return b.pendingTodos - a.pendingTodos;
      return 0;
    });
  }, [data, search, sort, filter]);

  function handleRetry() {
    queryClient.invalidateQueries({ queryKey: ["users"] });
    queryClient.invalidateQueries({ queryKey: ["posts"] });
    queryClient.invalidateQueries({ queryKey: ["todos"] });
  }

  function handleClearFilters() {
    router.replace("/users", { scroll: false });
  }

  if (isError) {
    return (
      <ErrorState
        message={(error as Error)?.message ?? "Failed to load users."}
        onRetry={handleRetry}
      />
    );
  }

  const total = data?.length ?? 0;

  return (
    <div>
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 gap-2">
        <div>
          <h1 className="text-display-lg text-on-background">Users</h1>
          <p className="text-body-base text-on-surface-variant mt-1">
            Manage and explore user activity
          </p>
        </div>
        {!isLoading && (
          <div className="bg-surface-variant text-on-surface-variant text-label-caps px-4 py-1 rounded-full border border-outline-variant self-start sm:self-end">
            Total: {total}
          </div>
        )}
      </header>

      <section className="bg-surface border border-outline-variant rounded-lg p-2 mb-6 shadow-sm flex flex-col sm:flex-row gap-2 items-center">
        <div className="relative w-full sm:flex-1">
          <span className="material-symbols-outlined absolute left-2 top-1/2 -translate-y-1/2 text-outline-variant pointer-events-none text-lg">
            search
          </span>
          <input
            className="w-full pl-8 pr-3 py-2 text-body-sm border border-outline-variant rounded bg-surface text-on-surface placeholder:text-outline-variant focus:border-primary focus:ring-2 focus:ring-primary-fixed focus:outline-none transition-all"
            placeholder="Search by name or email..."
            type="text"
            value={search}
            onChange={(e) => updateParams({ q: e.target.value })}
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-48">
            <select
              className="w-full appearance-none pl-3 pr-8 py-2 text-body-sm border border-outline-variant rounded bg-surface text-on-surface focus:border-primary focus:ring-2 focus:ring-primary-fixed focus:outline-none transition-all cursor-pointer"
              value={sort}
              onChange={(e) => updateParams({ sort: e.target.value })}
            >
              <option value="name-asc">Sort by: Name A-Z</option>
              <option value="name-desc">Name Z-A</option>
              <option value="posts-desc">Most Posts</option>
              <option value="pending-desc">Most Pending Todos</option>
            </select>
            <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-outline-variant pointer-events-none text-lg">
              expand_more
            </span>
          </div>
          <div className="relative w-full sm:w-48">
            <select
              className="w-full appearance-none pl-3 pr-8 py-2 text-body-sm border border-outline-variant rounded bg-surface text-on-surface focus:border-primary focus:ring-2 focus:ring-primary-fixed focus:outline-none transition-all cursor-pointer"
              value={filter}
              onChange={(e) => updateParams({ filter: e.target.value })}
            >
              <option value="all">Filter: All Users</option>
              <option value="has-pending">Has Pending Todos</option>
              <option value="no-completed">No Completed Todos</option>
            </select>
            <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-outline-variant pointer-events-none text-lg">
              filter_list
            </span>
          </div>
        </div>
      </section>

      {isLoading && <TableSkeleton />}

      {!isLoading && filtered.length === 0 && (
        <EmptyState onClearFilters={handleClearFilters} />
      )}

      {!isLoading && filtered.length > 0 && (
        <>
          <div className="hidden md:block">
            <UsersTable users={filtered} />
          </div>
          <div className="md:hidden space-y-2">
            {filtered.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
