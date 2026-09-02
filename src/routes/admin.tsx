import { Outlet, createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/layouts/AdminLayout";

export const Route = createFileRoute("/admin")({
  component: AdminRoot,
});

function AdminRoot() {
  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
}
