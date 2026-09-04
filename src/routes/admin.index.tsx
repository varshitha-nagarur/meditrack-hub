import { createFileRoute } from "@tanstack/react-router";
import {
  AlertTriangle,
  BarChart3,
  ClipboardList,
  FileText,
  Layers,
  Package,
  Timer,
} from "lucide-react";
import { SectionHeading } from "@/components/common/SectionHeading";
import { StatCard } from "@/components/common/StatCard";
import { StatusBadge } from "@/components/common/StatusBadge";
import { auditLogs, dashboardStats } from "@/data/inventory";
import { formatDateTime } from "@/utils/format";

const title = "Pharmacy Dashboard — MediTrack Admin";
const description = "Stock, expiry, prescription and order KPIs for pharmacy operations.";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: AdminDashboard,
});

const charts = ["Orders", "Inventory", "Low Stock", "Expiry"] as const;

function AdminDashboard() {
  return (
    <div className="space-y-8">
      <SectionHeading
            as="h1" title="Dashboard" description="All values are mock data." />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard label="Total Medicines" value={dashboardStats.totalMedicines} icon={Package} />
        <StatCard label="Item Varieties" value={dashboardStats.itemVarieties} icon={Layers} tone="info" />
        <StatCard label="Low Stock" value={dashboardStats.lowStock} icon={AlertTriangle} tone="warning" />
        <StatCard label="Expiring Soon" value={dashboardStats.expiringSoon} icon={Timer} tone="danger" />
        <StatCard
          label="Pending Prescriptions"
          value={dashboardStats.pendingPrescriptions}
          icon={FileText}
          tone="info"
        />
        <StatCard
          label="Orders Today"
          value={dashboardStats.ordersToday}
          icon={ClipboardList}
          tone="success"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {charts.map((label) => (
          <div key={label} className="rounded-xl border border-border bg-card p-5 shadow-card">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground">{label}</h3>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </div>
            {/* TODO: Replace placeholder with a real chart fed by the inventory API */}
            <div className="mt-4 flex h-36 items-end gap-2">
              {[45, 70, 35, 85, 60, 50, 75].map((height, index) => (
                <div
                  key={index}
                  className="flex-1 rounded-t bg-primary/25"
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <section className="rounded-xl border border-border bg-card p-5 shadow-card">
        <h3 className="text-sm font-semibold text-foreground">Recent Activity</h3>
        <ul className="mt-4 divide-y divide-border">
          {auditLogs.slice(0, 5).map((entry) => (
            <li key={entry.id} className="flex flex-wrap items-center gap-2 py-3 text-sm">
              <span className="font-medium text-foreground">{entry.user}</span>
              <span className="text-muted-foreground">{entry.action}</span>
              <span className="text-muted-foreground">· {entry.resource}</span>
              <span className="ml-auto text-xs text-muted-foreground">
                {formatDateTime(entry.timestamp)}
              </span>
              <StatusBadge tone={entry.result === "success" ? "success" : "danger"}>
                {entry.result}
              </StatusBadge>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
