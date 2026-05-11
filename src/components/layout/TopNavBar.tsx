import Link from "next/link";

export function TopNavBar() {
  return (
    <nav className="sticky top-0 z-50 flex justify-between items-center px-6 py-2 w-full bg-surface border-b border-outline-variant shadow-sm">
      <div className="flex items-center gap-6">
        <span className="text-display-sm text-primary">OpsCentral</span>
        <div className="hidden md:flex gap-1 items-center ml-4">
          <span className="text-on-surface-variant py-2 px-3 text-body-sm cursor-not-allowed opacity-50 select-none">
            Dashboard
          </span>
          <Link
            href="/users"
            className="text-primary font-semibold border-b-2 border-primary py-2 px-3 text-body-sm"
          >
            Users
          </Link>
          <span className="text-on-surface-variant py-2 px-3 text-body-sm cursor-not-allowed opacity-50 select-none">
            Reports
          </span>
          <span className="text-on-surface-variant py-2 px-3 text-body-sm cursor-not-allowed opacity-50 select-none">
            Settings
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3 opacity-50 cursor-not-allowed select-none">
        <div className="relative hidden sm:block mr-2 pointer-events-none">
          <span className="material-symbols-outlined absolute left-2 top-1/2 -translate-y-1/2 text-outline-variant text-lg">
            search
          </span>
          <input
            className="pl-8 pr-3 py-1.5 text-body-sm border border-outline-variant rounded bg-surface w-48 text-on-surface placeholder:text-outline-variant"
            placeholder="Search..."
            type="text"
            readOnly
            tabIndex={-1}
            aria-hidden="true"
          />
        </div>
        <span
          className="p-1.5 rounded-full text-on-surface-variant pointer-events-none"
          aria-label="Notifications (coming soon)"
        >
          <span className="material-symbols-outlined text-xl">notifications</span>
        </span>
        <span
          className="p-1.5 rounded-full text-on-surface-variant pointer-events-none mr-2"
          aria-label="Help (coming soon)"
        >
          <span className="material-symbols-outlined text-xl">help</span>
        </span>
        <div
          className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center text-label-caps font-semibold pointer-events-none"
          aria-label="User profile"
        >
          AU
        </div>
      </div>
    </nav>
  );
}