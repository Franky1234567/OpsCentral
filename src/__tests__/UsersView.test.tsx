import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { UsersView } from "@/components/users/UsersView";
import { useUsersWithStats } from "@/hooks/useUsersWithStats";
import { useRouter, useSearchParams } from "next/navigation";
import type { UserWithStats } from "@/types";

/* ── Mocks ── */

jest.mock("@/hooks/useUsersWithStats");
jest.mock("@tanstack/react-query", () => ({
  ...jest.requireActual("@tanstack/react-query"),
  useQueryClient: () => ({ invalidateQueries: jest.fn() }),
}));

const mockReplace = jest.fn();
const mockPush = jest.fn();

const mockAddress = {
  street: "123 St",
  suite: "Apt 1",
  city: "City",
  zipcode: "12345",
  geo: { lat: "0", lng: "0" },
};
const mockCompany = { name: "Corp", catchPhrase: "phrase", bs: "bs" };

const mockUsers: UserWithStats[] = [
  {
    id: 1, name: "Leanne Graham", username: "Bret",
    email: "Sincere@april.biz", phone: "111", website: "hildegard.org",
    address: mockAddress, company: mockCompany,
    totalPosts: 12, completedTodos: 5, pendingTodos: 2,
  },
  {
    id: 2, name: "Ervin Howell", username: "Antonette",
    email: "Shanna@melissa.tv", phone: "222", website: "anastasia.net",
    address: mockAddress, company: mockCompany,
    totalPosts: 8, completedTodos: 0, pendingTodos: 6,
  },
  {
    id: 3, name: "Clementine Bauch", username: "Samantha",
    email: "Nathan@yesenia.net", phone: "333", website: "ramiro.info",
    address: mockAddress, company: mockCompany,
    totalPosts: 24, completedTodos: 8, pendingTodos: 0,
  },
];

function setup(params: Record<string, string> = {}) {
  (useRouter as jest.Mock).mockReturnValue({ replace: mockReplace, push: mockPush });
  (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams(params));
  (useUsersWithStats as jest.Mock).mockReturnValue({
    data: mockUsers,
    isLoading: false,
    isError: false,
    error: null,
  });
}

beforeEach(() => {
  jest.clearAllMocks();
});

/* ── Tests ── */

describe("UsersView — loading & error states", () => {
  it("shows skeleton while loading", () => {
    (useRouter as jest.Mock).mockReturnValue({ replace: mockReplace, push: mockPush });
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());
    (useUsersWithStats as jest.Mock).mockReturnValue({
      data: undefined, isLoading: true, isError: false, error: null,
    });

    const { container } = render(<UsersView />);
    // Skeleton elements are rendered (skeleton-pulse divs)
    expect(container.querySelectorAll(".skeleton-pulse").length).toBeGreaterThan(0);
    expect(screen.queryByText("Leanne Graham")).not.toBeInTheDocument();
  });

  it("shows error state when fetch fails", () => {
    (useRouter as jest.Mock).mockReturnValue({ replace: mockReplace, push: mockPush });
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());
    (useUsersWithStats as jest.Mock).mockReturnValue({
      data: undefined, isLoading: false, isError: true,
      error: new Error("Network error"),
    });

    render(<UsersView />);
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    expect(screen.getByText(/Network error/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /try again/i })).toBeInTheDocument();
  });
});

describe("UsersView — renders user list with activity signals", () => {
  it("renders all users with name, posts, completed and pending counts", () => {
    setup();
    render(<UsersView />);

    expect(screen.getAllByText("Leanne Graham").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Ervin Howell").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Clementine Bauch").length).toBeGreaterThan(0);

    // Posts badges — value 12 appears for Leanne (table + card = 2 times)
    expect(screen.getAllByText("12").length).toBeGreaterThan(0);
    // Completed badge for Leanne
    expect(screen.getAllByText("5").length).toBeGreaterThan(0);
    // Pending badge for Leanne
    expect(screen.getAllByText("2").length).toBeGreaterThan(0);
  });

  it("shows total count badge", () => {
    setup();
    render(<UsersView />);
    expect(screen.getByText("Total: 3")).toBeInTheDocument();
  });
});

describe("UsersView — search filter", () => {
  it("filters by name when q param is set", () => {
    setup({ q: "Ervin" });
    render(<UsersView />);

    expect(screen.queryByText("Leanne Graham")).not.toBeInTheDocument();
    expect(screen.getAllByText("Ervin Howell").length).toBeGreaterThan(0);
    expect(screen.queryByText("Clementine Bauch")).not.toBeInTheDocument();
  });

  it("filters by email when q param matches email", () => {
    setup({ q: "Sincere@april.biz" });
    render(<UsersView />);

    expect(screen.getAllByText("Leanne Graham").length).toBeGreaterThan(0);
    expect(screen.queryByText("Ervin Howell")).not.toBeInTheDocument();
  });

  it("shows empty state when no users match search", () => {
    setup({ q: "nonexistentuser" });
    render(<UsersView />);

    expect(screen.getByText("No users match your search")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /clear filters/i })).toBeInTheDocument();
  });

  it("updates URL params when typing in search input", () => {
    setup();
    render(<UsersView />);

    const input = screen.getByPlaceholderText("Search by name or email...");
    fireEvent.change(input, { target: { value: "John" } });

    expect(mockReplace).toHaveBeenCalled();
  });
});

describe("UsersView — additional filters", () => {
  it("filters to only users with pending todos", () => {
    setup({ filter: "has-pending" });
    render(<UsersView />);

    // Users 1 (pending=2) and 2 (pending=6) should show; User 3 (pending=0) should not
    expect(screen.getAllByText("Leanne Graham").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Ervin Howell").length).toBeGreaterThan(0);
    expect(screen.queryByText("Clementine Bauch")).not.toBeInTheDocument();
  });

  it("filters to only users with no completed todos", () => {
    setup({ filter: "no-completed" });
    render(<UsersView />);

    // Only User 2 (completedTodos=0) should show
    expect(screen.getAllByText("Ervin Howell").length).toBeGreaterThan(0);
    expect(screen.queryByText("Leanne Graham")).not.toBeInTheDocument();
    expect(screen.queryByText("Clementine Bauch")).not.toBeInTheDocument();
  });
});

describe("UsersView — sort", () => {
  it("sorts name Z-A when sort param is name-desc", () => {
    setup({ sort: "name-desc" });
    render(<UsersView />);

    const names = screen
      .getAllByText(/Leanne Graham|Ervin Howell|Clementine Bauch/)
      .map((el) => el.textContent);

    // First occurrence should be Leanne (Z-A: L > E > C)
    expect(names[0]).toBe("Leanne Graham");
  });

  it("sorts by most posts when sort param is posts-desc", () => {
    setup({ sort: "posts-desc" });
    render(<UsersView />);

    const names = screen
      .getAllByText(/Leanne Graham|Ervin Howell|Clementine Bauch/)
      .map((el) => el.textContent);

    // Clementine (24) should come first
    expect(names[0]).toBe("Clementine Bauch");
  });

  it("sorts by most pending todos when sort param is pending-desc", () => {
    setup({ sort: "pending-desc" });
    render(<UsersView />);

    const names = screen
      .getAllByText(/Leanne Graham|Ervin Howell|Clementine Bauch/)
      .map((el) => el.textContent);

    // Ervin (pending=6) should come first
    expect(names[0]).toBe("Ervin Howell");
  });
});