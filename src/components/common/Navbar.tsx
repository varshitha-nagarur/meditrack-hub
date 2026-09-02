import { Link } from "@tanstack/react-router";
import {
  Heart,
  Menu,
  Package,
  Pill,
  ShoppingCart,
  Stethoscope,
  User,
  X,
} from "lucide-react";
import { useState } from "react";
import { SearchBar } from "./SearchBar";
import { cartItems, wishlistMedicineIds } from "@/data/orders";

const navLinks = [
  { to: "/medicines", label: "Medicines", icon: Pill },
  { to: "/prescriptions", label: "Prescriptions", icon: Stethoscope },
  { to: "/orders", label: "Orders", icon: Package },
] as const;

/** Customer store header. Counts come from mock data for now. */
export function Navbar() {
  const [query, setQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur">
      <div className="container-page flex h-16 items-center gap-4">
        <Link to="/" className="flex shrink-0 items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Pill className="h-5 w-5" />
          </span>
          <span className="text-lg font-semibold tracking-tight text-foreground">MediTrack</span>
        </Link>

        <div className="hidden flex-1 md:block">
          {/* TODO: Wire search to catalogue query params / backend search */}
          <SearchBar value={query} onChange={setQuery} />
        </div>

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              activeProps={{ className: "bg-primary-soft text-primary" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <IconLink to="/wishlist" label="Wishlist" count={wishlistMedicineIds.length}>
            <Heart className="h-5 w-5" />
          </IconLink>
          <IconLink to="/cart" label="Cart" count={cartItems.length}>
            <ShoppingCart className="h-5 w-5" />
          </IconLink>
          <IconLink to="/profile" label="Profile">
            <User className="h-5 w-5" />
          </IconLink>
          <button
            className="rounded-lg p-2 text-muted-foreground hover:bg-muted lg:hidden"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div className="border-t border-border bg-card px-4 py-3 lg:hidden">
          <SearchBar value={query} onChange={setQuery} className="mb-3 md:hidden" />
          <div className="grid gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted"
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}

function IconLink({
  to,
  label,
  count,
  children,
}: {
  to: string;
  label: string;
  count?: number;
  children: React.ReactNode;
}) {
  return (
    <Link
      to={to}
      aria-label={label}
      className="relative rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
    >
      {children}
      {count && count > 0 ? (
        <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground">
          {count}
        </span>
      ) : null}
    </Link>
  );
}
