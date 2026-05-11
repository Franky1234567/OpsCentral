import { buildUsersWithStats } from "@/lib/utils";
import type { Post, Todo, User } from "@/types";

const mockUser: User = {
  id: 1,
  name: "John Doe",
  username: "johndoe",
  email: "john@example.com",
  phone: "123",
  website: "john.com",
  address: { street: "A", suite: "B", city: "C", zipcode: "D", geo: { lat: "0", lng: "0" } },
  company: { name: "ACME", catchPhrase: "", bs: "" },
};

const mockPosts: Post[] = [
  { id: 1, userId: 1, title: "Post 1", body: "body" },
  { id: 2, userId: 1, title: "Post 2", body: "body" },
];

const mockTodos: Todo[] = [
  { id: 1, userId: 1, title: "Todo 1", completed: true },
  { id: 2, userId: 1, title: "Todo 2", completed: false },
  { id: 3, userId: 1, title: "Todo 3", completed: false },
];

describe("buildUsersWithStats", () => {
  it("calculates stats correctly", () => {
    const [result] = buildUsersWithStats([mockUser], mockPosts, mockTodos);
    expect(result.totalPosts).toBe(2);
    expect(result.completedTodos).toBe(1);
    expect(result.pendingTodos).toBe(2);
  });

  it("returns zero stats when user has no data", () => {
    const [result] = buildUsersWithStats([mockUser], [], []);
    expect(result.totalPosts).toBe(0);
    expect(result.completedTodos).toBe(0);
    expect(result.pendingTodos).toBe(0);
  });
});