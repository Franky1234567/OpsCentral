# OpsCentral — User Operations Dashboard

A user management dashboard built with Next.js App Router, featuring user listing, detailed profiles, and activity signals derived from posts and todos.

## Tech Stack

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS v4**
- **TanStack React Query v5** — client-side data fetching
- **Jest + React Testing Library** — unit tests
- **API**: [JSONPlaceholder](https://jsonplaceholder.typicode.com)

## Features

- `/users` — paginated user list with search, sort, and filter
  - Search by name or email
  - Sort by name A–Z / Z–A, most posts, most pending todos
  - Filter: all users, has pending todos, no completed todos
  - Activity signals per user: total posts, completed todos, pending todos
  - Filter state persisted in URL params (survives navigation)
  - Responsive: table on desktop, cards on mobile
- `/users/[id]` — user detail page
  - Contact info, company, and address
  - Stat cards: total posts, completed todos, pending todos
  - Tabs: Posts and Assigned Tasks (todos)
  - Todo filter: all, completed, pending
- Loading skeletons, empty states, error states, and 404 pages
- ISR: server-side data cached with 60s revalidation
- Error Boundary via `error.tsx` for graceful failure recovery

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — redirects to `/users`.

## Running Tests

```bash
npm test
```

45 tests across 4 suites covering: user list rendering, search/filter/sort, loading/error/empty states, user detail view, tabs, and error boundary components.