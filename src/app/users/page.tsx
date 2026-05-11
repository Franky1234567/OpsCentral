import { Suspense } from "react";
import { UsersView } from "@/components/users/UsersView";
import { TableSkeleton } from "@/components/ui/Skeleton";

export const metadata = {
  title: "Users | OpsCentral",
};

export default function UsersPage() {
  return (
    <main className="w-full max-w-[1200px] mx-auto px-4 lg:px-6 py-8">
      <Suspense fallback={<TableSkeleton />}>
        <UsersView />
      </Suspense>
    </main>
  );
}
