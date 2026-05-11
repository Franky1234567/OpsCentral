import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { UserDetailView } from "@/components/users/UserDetailView";
import type { User, Post, Todo } from "@/types";


/* ── Mock data ── */

const mockUser: User = {
  id: 1,
  name: "Leanne Graham",
  username: "Bret",
  email: "Sincere@april.biz",
  phone: "1-770-736-8031 x56442",
  website: "hildegard.org",
  address: {
    street: "Kulas Light",
    suite: "Apt. 556",
    city: "Gwenborough",
    zipcode: "92998-3874",
    geo: { lat: "-37.3159", lng: "81.1496" },
  },
  company: {
    name: "Romaguera-Crona",
    catchPhrase: "Multi-layered client-server neural-net",
    bs: "harness real-time e-markets",
  },
};

const mockPosts: Post[] = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  userId: 1,
  title: `Post title ${i + 1}`,
  body: `Post body ${i + 1}`,
}));

const mockTodos: Todo[] = [
  { id: 1, userId: 1, title: "Completed task one", completed: true },
  { id: 2, userId: 1, title: "Pending task one", completed: false },
  { id: 3, userId: 1, title: "Pending task two", completed: false },
];

function renderDetail(
  user = mockUser,
  posts = mockPosts,
  todos = mockTodos,
) {
  return render(<UserDetailView user={user} posts={posts} todos={todos} />);
}

/* ── Tests ── */

describe("UserDetailView — user info", () => {
  it("renders user name and username", () => {
    renderDetail();
    expect(screen.getAllByText("Leanne Graham").length).toBeGreaterThan(0);
    expect(screen.getByText("@Bret")).toBeInTheDocument();
  });

  it("renders contact info chips (email, phone, website, company)", () => {
    renderDetail();
    expect(screen.getAllByText("Sincere@april.biz").length).toBeGreaterThan(0);
    expect(screen.getAllByText("1-770-736-8031 x56442").length).toBeGreaterThan(0);
    expect(screen.getAllByText("hildegard.org").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Romaguera-Crona").length).toBeGreaterThan(0);
  });

  it("renders address details", () => {
    renderDetail();
    expect(screen.getByText("Kulas Light")).toBeInTheDocument();
    expect(screen.getByText("Apt. 556")).toBeInTheDocument();
    expect(screen.getByText("Gwenborough")).toBeInTheDocument();
    expect(screen.getByText("92998-3874")).toBeInTheDocument();
  });

  it("renders company catchphrase", () => {
    renderDetail();
    expect(screen.getByText(/Multi-layered client-server neural-net/)).toBeInTheDocument();
  });

  it("renders back to users link", () => {
    renderDetail();
    expect(screen.getByText("Back to Users")).toBeInTheDocument();
  });

  it("renders breadcrumb with user name", () => {
    renderDetail();
    // Breadcrumb shows user name
    const breadcrumb = screen.getAllByText("Leanne Graham");
    expect(breadcrumb.length).toBeGreaterThan(0);
  });
});

describe("UserDetailView — stat cards", () => {
  it("shows correct total posts count", () => {
    renderDetail();
    const label = screen.getByText("Total Posts");
    const value = label.nextElementSibling;
    expect(value?.textContent).toBe("5");
  });

  it("shows correct completed todos count", () => {
    renderDetail();
    const label = screen.getByText("Completed Todos");
    const value = label.nextElementSibling;
    expect(value?.textContent).toBe("1");
  });

  it("shows correct pending todos count", () => {
    renderDetail();
    const label = screen.getByText("Pending Todos");
    const value = label.nextElementSibling;
    expect(value?.textContent).toBe("2");
  });
});

describe("UserDetailView — tabs", () => {
  it("shows Posts tab active by default", () => {
    renderDetail();
    expect(screen.getByText("Post title 1")).toBeInTheDocument();
    expect(screen.queryByText("Pending task one")).not.toBeInTheDocument();
  });

  it("switches to Assigned Tasks tab on click", () => {
    renderDetail();
    fireEvent.click(screen.getByRole("button", { name: /assigned tasks/i }));

    expect(screen.getByText("Completed task one")).toBeInTheDocument();
    expect(screen.getByText("Pending task one")).toBeInTheDocument();
    expect(screen.queryByText("Post title 1")).not.toBeInTheDocument();
  });

  it("can switch back to Posts tab", () => {
    renderDetail();
    fireEvent.click(screen.getByRole("button", { name: /assigned tasks/i }));
    fireEvent.click(screen.getByRole("button", { name: /^posts/i }));

    expect(screen.getByText("Post title 1")).toBeInTheDocument();
    expect(screen.queryByText("Pending task one")).not.toBeInTheDocument();
  });
});

describe("UserDetailView — posts", () => {
  it("shows first 3 posts by default when there are more than 3", () => {
    renderDetail();
    expect(screen.getByText("Post title 1")).toBeInTheDocument();
    expect(screen.getByText("Post title 2")).toBeInTheDocument();
    expect(screen.getByText("Post title 3")).toBeInTheDocument();
    expect(screen.queryByText("Post title 4")).not.toBeInTheDocument();
    expect(screen.queryByText("Post title 5")).not.toBeInTheDocument();
  });

  it("shows 'View all posts' button when there are more than 3 posts", () => {
    renderDetail();
    expect(screen.getByText(/view all posts/i)).toBeInTheDocument();
  });

  it("expands to show all posts when 'View all posts' is clicked", () => {
    renderDetail();
    fireEvent.click(screen.getByText(/view all posts/i));

    expect(screen.getByText("Post title 4")).toBeInTheDocument();
    expect(screen.getByText("Post title 5")).toBeInTheDocument();
    expect(screen.getByText(/show less/i)).toBeInTheDocument();
  });

  it("collapses back when 'Show less' is clicked", () => {
    renderDetail();
    fireEvent.click(screen.getByText(/view all posts/i));
    fireEvent.click(screen.getByText(/show less/i));

    expect(screen.queryByText("Post title 4")).not.toBeInTheDocument();
    expect(screen.getByText(/view all posts/i)).toBeInTheDocument();
  });

  it("does not show 'View all posts' when there are 3 or fewer posts", () => {
    const fewPosts = mockPosts.slice(0, 2);
    renderDetail(mockUser, fewPosts, mockTodos);

    expect(screen.queryByText(/view all posts/i)).not.toBeInTheDocument();
  });
});

describe("UserDetailView — assigned tasks (todos)", () => {
  beforeEach(() => {
    renderDetail();
    fireEvent.click(screen.getByRole("button", { name: /assigned tasks/i }));
  });

  it("shows all todos by default", () => {
    expect(screen.getByText("Completed task one")).toBeInTheDocument();
    expect(screen.getByText("Pending task one")).toBeInTheDocument();
    expect(screen.getByText("Pending task two")).toBeInTheDocument();
  });

  it("filters to only completed todos", () => {
    fireEvent.click(screen.getByRole("button", { name: /^completed$/i }));

    expect(screen.getByText("Completed task one")).toBeInTheDocument();
    expect(screen.queryByText("Pending task one")).not.toBeInTheDocument();
  });

  it("filters to only pending todos", () => {
    fireEvent.click(screen.getByRole("button", { name: /^pending$/i }));

    expect(screen.queryByText("Completed task one")).not.toBeInTheDocument();
    expect(screen.getByText("Pending task one")).toBeInTheDocument();
    expect(screen.getByText("Pending task two")).toBeInTheDocument();
  });

  it("returns to all todos when All is clicked", () => {
    fireEvent.click(screen.getByRole("button", { name: /^pending$/i }));
    fireEvent.click(screen.getByRole("button", { name: /^all$/i }));

    expect(screen.getByText("Completed task one")).toBeInTheDocument();
    expect(screen.getByText("Pending task one")).toBeInTheDocument();
  });
});