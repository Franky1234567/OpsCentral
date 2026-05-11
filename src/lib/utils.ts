import type { Post, Todo, User, UserWithStats } from "@/types";

export function getInitials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export function buildUsersWithStats(
  users: User[],
  posts: Post[],
  todos: Todo[]
): UserWithStats[] {
  return users.map((user) => {
    const userPosts = posts.filter((p) => p.userId === user.id);
    const userTodos = todos.filter((t) => t.userId === user.id);
    const completedTodos = userTodos.filter((t) => t.completed).length;
    return {
      ...user,
      totalPosts: userPosts.length,
      completedTodos,
      pendingTodos: userTodos.length - completedTodos,
    };
  });
}
