import { Link } from "@tanstack/react-router";
import * as icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { MedicineCategory } from "@/types/medicine";

/** Resolves the icon name stored in mock data to a Lucide component. */
function resolveIcon(name: string): LucideIcon {
  const iconMap = icons as unknown as Record<string, LucideIcon>;
  return iconMap[name] ?? icons.Pill;
}

export function CategoryCard({ category }: { category: MedicineCategory }) {
  const Icon = resolveIcon(category.icon);

  return (
    <Link
      to="/medicines"
      search={{ category: category.id }}
      className="group flex flex-col gap-3 rounded-xl border border-border bg-card p-5 shadow-card transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-elevated"
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary-soft text-primary">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <h3 className="text-sm font-semibold text-foreground group-hover:text-primary">
          {category.name}
        </h3>
        <p className="mt-1 text-xs text-muted-foreground">{category.description}</p>
      </div>
      <p className="text-xs font-medium text-muted-foreground">{category.itemCount} items</p>
    </Link>
  );
}
