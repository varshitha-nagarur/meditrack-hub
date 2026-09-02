import { createFileRoute } from "@tanstack/react-router";
import { DataTable, type Column } from "@/components/common/DataTable";
import { SectionHeading } from "@/components/common/SectionHeading";
import { StatusBadge } from "@/components/common/StatusBadge";
import { roleDefinitions, users } from "@/data/users";
import type { User } from "@/types/user";
import { formatDate, titleCase } from "@/utils/format";

const title = "Users & Roles — MediTrack Admin";
const description = "Role definitions and permissions for customers, pharmacists and admins.";

export const Route = createFileRoute("/admin/users")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: UsersRolesPage,
});

function UsersRolesPage() {
  const columns: Array<Column<User>> = [
    { key: "name", header: "Name", render: (user) => user.name },
    { key: "email", header: "Email", render: (user) => user.email },
    { key: "role", header: "Role", render: (user) => titleCase(user.role) },
    { key: "joined", header: "Joined", render: (user) => formatDate(user.joinedOn) },
    {
      key: "status",
      header: "Status",
      render: (user) => (
        <StatusBadge tone={user.status === "active" ? "success" : "neutral"}>
          {titleCase(user.status)}
        </StatusBadge>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <SectionHeading
        title="Users & Roles"
        description="Role-based visibility is UI only — no authorization is enforced."
      />
      {/* TODO: Implement API-level authorization */}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {roleDefinitions.map((role) => (
          <div key={role.role} className="rounded-xl border border-border bg-card p-5 shadow-card">
            <h3 className="text-sm font-semibold text-foreground">{role.label}</h3>
            <p className="mt-1 text-xs text-muted-foreground">{role.description}</p>
            <ul className="mt-3 space-y-1">
              {role.permissions.map((permission) => (
                <li key={permission} className="text-xs text-muted-foreground">
                  • {permission}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <DataTable columns={columns} rows={users} rowKey={(user) => user.id} />
    </div>
  );
}
