import { notFound } from "next/navigation";
import { api } from "@/lib/api";
import { UserDetailView } from "@/components/users/UserDetailView";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const user = await api.getUser(Number(id)).catch(() => null);
  return { title: user ? `${user.name} | OpsCentral` : "User not found" };
}

export default async function UserDetailPage({ params }: Props) {
  const { id } = await params;
  const userId = Number(id);

  if (isNaN(userId)) notFound();

  const [user, posts, todos] = await Promise.all([
    api.getUser(userId).catch(() => null),
    api.getUserPosts(userId),
    api.getUserTodos(userId),
  ]);

  if (!user) notFound();

  return <UserDetailView user={user} posts={posts} todos={todos} />;
}