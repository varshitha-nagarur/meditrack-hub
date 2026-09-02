import { Link } from "@tanstack/react-router";
import { Pill } from "lucide-react";

const columns = [
  {
    title: "Shop",
    links: [
      { label: "All Medicines", to: "/medicines" },
      { label: "Cart", to: "/cart" },
      { label: "Wishlist", to: "/wishlist" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Profile", to: "/profile" },
      { label: "Orders", to: "/orders" },
      { label: "Prescriptions", to: "/prescriptions" },
    ],
  },
  {
    title: "Pharmacy",
    links: [
      { label: "Admin Portal", to: "/admin" },
      { label: "Inventory", to: "/admin/inventory" },
      { label: "Audit Logs", to: "/admin/audit-logs" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-card">
      <div className="container-page grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Pill className="h-4 w-4" />
            </span>
            <span className="font-semibold text-foreground">MediTrack</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Medicines you need. Stock you can trust.
          </p>
          <p className="mt-3 text-xs text-muted-foreground">
            Academic project. Informational only — not a source of medical advice.
          </p>
        </div>

        {columns.map((column) => (
          <div key={column.title}>
            <h3 className="text-sm font-semibold text-foreground">{column.title}</h3>
            <ul className="mt-3 space-y-2">
              {column.links.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} MediTrack. Built as a frontend scaffold.
      </div>
    </footer>
  );
}
