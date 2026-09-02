import { Menu, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Sidebar } from "@/components/admin/Sidebar";
import { currentAdminUser } from "@/data/users";

/** Shell for the pharmacy admin portal (separate from the store). */
export function AdminLayout({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-muted/40">
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {mobileOpen ? (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="absolute inset-0 bg-foreground/40"
            onClick={() => setMobileOpen(false)}
            aria-hidden
          />
          <div className="relative z-10 h-full">
            <Sidebar onNavigate={() => setMobileOpen(false)} />
          </div>
        </div>
      ) : null}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 items-center gap-3 border-b border-border bg-card px-4 sm:px-6">
          <button
            className="rounded-lg p-2 text-muted-foreground hover:bg-muted lg:hidden"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label="Toggle admin navigation"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-foreground">Pharmacy Operations</p>
            <p className="text-xs text-muted-foreground">
              {/* TODO: Connect authentication provider — role comes from mock data */}
              Signed in as {currentAdminUser.name} · {currentAdminUser.role}
            </p>
          </div>
        </header>
        <div className="flex-1 p-4 sm:p-6">{children}</div>
      </div>
    </div>
  );
}
