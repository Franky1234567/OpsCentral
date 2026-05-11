import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import UserDetailError from "@/app/users/[id]/error";
import UserNotFound from "@/app/users/[id]/not-found";
import UserDetailLoading from "@/app/users/[id]/loading";


/* ── Error state ── */

describe("UserDetailError", () => {
  const mockReset = jest.fn();
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it("renders error heading and message", () => {
    const error = new Error("Network request failed");
    render(<UserDetailError error={error} reset={mockReset} />);

    expect(screen.getByText("Failed to load user")).toBeInTheDocument();
    expect(screen.getByText("Network request failed")).toBeInTheDocument();
  });

  it("renders Try again and Back to list buttons", () => {
    const error = new Error("oops");
    render(<UserDetailError error={error} reset={mockReset} />);

    expect(screen.getByRole("button", { name: /try again/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /back to list/i })).toBeInTheDocument();
  });

  it("calls reset when Try again is clicked", () => {
    const error = new Error("oops");
    render(<UserDetailError error={error} reset={mockReset} />);

    fireEvent.click(screen.getByRole("button", { name: /try again/i }));
    expect(mockReset).toHaveBeenCalledTimes(1);
  });

  it("Back to list links to /users", () => {
    const error = new Error("oops");
    render(<UserDetailError error={error} reset={mockReset} />);

    const backLink = screen.getByRole("link", { name: /back to list/i });
    expect(backLink).toHaveAttribute("href", "/users");
  });

  it("logs error to console", () => {
    const error = new Error("logged error");
    render(<UserDetailError error={error} reset={mockReset} />);

    expect(consoleSpy).toHaveBeenCalledWith(error);
  });
});

/* ── Not found (invalid user id) ── */

describe("UserNotFound", () => {
  it("renders user not found message", () => {
    render(<UserNotFound />);

    expect(screen.getByText("User not found")).toBeInTheDocument();
    expect(screen.getByText(/doesn't exist or may have been removed/i)).toBeInTheDocument();
  });

  it("renders back to user list link pointing to /users", () => {
    render(<UserNotFound />);

    const links = screen.getAllByRole("link");
    const backLinks = links.filter((l) => l.getAttribute("href") === "/users");
    expect(backLinks.length).toBeGreaterThan(0);
  });
});

/* ── Loading state ── */

describe("UserDetailLoading", () => {
  it("renders skeleton elements", () => {
    const { container } = render(<UserDetailLoading />);

    const skeletons = container.querySelectorAll(".skeleton-pulse");
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it("renders skeleton structure for hero, info cards, stat cards, and posts", () => {
    const { container } = render(<UserDetailLoading />);

    // Hero avatar skeleton (rounded-full)
    expect(container.querySelector(".rounded-full.skeleton-pulse")).toBeInTheDocument();

    // 3 stat card skeleton groups
    const statCards = container.querySelectorAll(".rounded-lg.skeleton-pulse");
    expect(statCards.length).toBeGreaterThanOrEqual(3);

    // Post card skeletons (3 items)
    const postCards = container.querySelectorAll(".border-l-primary");
    expect(postCards.length).toBe(3);
  });
});