"use client";

import { useQueries } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { buildUsersWithStats } from "@/lib/utils";

export function useUsersWithStats() {
  const results = useQueries({
    queries: [
      { queryKey: ["users"], queryFn: api.getUsers },
      { queryKey: ["posts"], queryFn: api.getPosts },
      { queryKey: ["todos"], queryFn: api.getTodos },
    ],
  });

  const [usersQ, postsQ, todosQ] = results;
  const isLoading = results.some((r) => r.isLoading);
  const isError = results.some((r) => r.isError);
  const error = results.find((r) => r.error)?.error ?? null;

  const data =
    usersQ.data && postsQ.data && todosQ.data
      ? buildUsersWithStats(usersQ.data, postsQ.data, todosQ.data)
      : undefined;

  return { data, isLoading, isError, error };
}
