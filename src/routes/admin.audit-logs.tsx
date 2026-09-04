import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { DataTable, type Column } from "@/components/common/DataTable";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Select } from "@/components/common/Select";
import { Input } from "@/components/common/Input";
import { StatusBadge } from "@/components/common/StatusBadge";
import { auditLogs } from "@/data/inventory";
import type { AuditLogEntry } from "@/types/inventory";
import { formatDateTime, titleCase } from "@/utils/format";

const title = "Audit Logs — MediTrack Admin";
const description = "Timestamped record of sensitive pharmacy actions for accountability.";

export const Route = createFileRoute("/admin/audit-logs")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: AuditLogsPage,
});

function unique<T>(values: T[]): T[] {
  return Array.from(new Set(values));
}

function AuditLogsPage() {
  const [user, setUser] = useState("all");
  const [role, setRole] = useState("all");
  const [action, setAction] = useState("all");
  const [date, setDate] = useState("");

  const rows = useMemo(
    () =>
      auditLogs.filter((entry) => {
        if (user !== "all" && entry.user !== user) return false;
        if (role !== "all" && entry.role !== role) return false;
        if (action !== "all" && entry.action !== action) return false;
        if (date && !entry.timestamp.startsWith(date)) return false;
        return true;
      }),
    [user, role, action, date],
  );

  const columns: Array<Column<AuditLogEntry>> = [
    { key: "timestamp", header: "Timestamp", render: (entry) => formatDateTime(entry.timestamp) },
    { key: "user", header: "User", render: (entry) => entry.user },
    { key: "role", header: "Role", render: (entry) => titleCase(entry.role) },
    { key: "action", header: "Action", render: (entry) => entry.action },
    { key: "resource", header: "Resource", render: (entry) => entry.resource },
    {
      key: "result",
      header: "Result",
      render: (entry) => (
        <StatusBadge tone={entry.result === "success" ? "success" : "danger"}>
          {titleCase(entry.result)}
        </StatusBadge>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <SectionHeading
        as="h1"
        title="Audit Logs"
        description="Sensitive actions are recorded for accountability."
      />
      {/* TODO: Implement append-only audit logging backend */}

      <div className="grid gap-3 rounded-xl border border-border bg-card p-4 shadow-card sm:grid-cols-2 lg:grid-cols-4">
        <Select
          label="User"
          value={user}
          onChange={(event) => setUser(event.target.value)}
          options={[
            { value: "all", label: "All users" },
            ...unique(auditLogs.map((entry) => entry.user)).map((value) => ({
              value,
              label: value,
            })),
          ]}
        />
        <Select
          label="Role"
          value={role}
          onChange={(event) => setRole(event.target.value)}
          options={[
            { value: "all", label: "All roles" },
            ...unique(auditLogs.map((entry) => entry.role)).map((value) => ({
              value,
              label: titleCase(value),
            })),
          ]}
        />
        <Select
          label="Action"
          value={action}
          onChange={(event) => setAction(event.target.value)}
          options={[
            { value: "all", label: "All actions" },
            ...unique(auditLogs.map((entry) => entry.action)).map((value) => ({
              value,
              label: value,
            })),
          ]}
        />
        <Input
          label="Date"
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
      </div>

      <DataTable
        columns={columns}
        rows={rows}
        rowKey={(entry) => entry.id}
        emptyTitle="No audit entries for these filters"
      />
    </div>
  );
}
