import { Link } from "@tanstack/react-router";
import {
  ClipboardList,
  FileText,
  LayoutDashboard,
  Package,
  Pill,
  Settings,
  ShieldCheck,
  Truck,
  Users,
  UsersRound,
} from "lucide-react";

export const adminNavItems = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/inventory", label: "Inventory", icon: Package },
  { to: "/admin/orders", label: "Orders", icon: ClipboardList },
  { to: "/admin/prescriptions", label: "Prescriptions", icon: FileText },
  { to: "/admin/customers", label: "Customers", icon: UsersRound },
  { to: "/admin/supply-chain", label: "Supply Chain", icon: Truck },
  { to: "/admin/audit-logs", label: "Audit Logs", icon: ShieldCheck },
  { to: "/admin/users", label: "Users & Roles", icon: Users },
  { to: "/admin/settings", label: "Settings", icon: Settings },
] as const;

/** Admin navigation. Role-based visibility is UI only for now. */
export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <aside className="flex h-full w-64 shrink-0 flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-5">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Pill className="h-4 w-4" />
        </span>
        <div>
          <p className="text-sm font-semibold">MediTrack</p>
          <p className="text-[11px] text-sidebar-foreground/70">Pharmacy Admin</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {adminNavItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            activeOptions={{ exact: item.to === "/admin" }}
            activeProps={{
              className: "bg-sidebar-accent text-sidebar-accent-foreground",
            }}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground/85 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="border-t border-sidebar-border p-4">
        <Link
          to="/"
          className="text-xs text-sidebar-foreground/70 transition-colors hover:text-sidebar-accent-foreground"
        >
          ← Back to store
        </Link>
      </div>
    </aside>
  );
}
