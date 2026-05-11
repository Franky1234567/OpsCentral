import type { Post, Todo, User } from "@/types";

const BASE_URL = "https://jsonplaceholder.typicode.com";

async function fetchJson<T>(path: string, revalidate = 60): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, { next: { revalidate } });
  if (!res.ok) throw new Error(`Failed to fetch ${path}: ${res.status}`);
  return res.json() as Promise<T>;
}

export const api = {
  getUsers: () => fetchJson<User[]>("/users"),
  getUser: (id: number) => fetchJson<User>(`/users/${id}`),
  getPosts: () => fetchJson<Post[]>("/posts"),
  getUserPosts: (userId: number) => fetchJson<Post[]>(`/posts?userId=${userId}`),
  getTodos: () => fetchJson<Todo[]>("/todos"),
  getUserTodos: (userId: number) => fetchJson<Todo[]>(`/todos?userId=${userId}`),
};
