import { CheckCircle2, CircleSlash, TriangleAlert } from "lucide-react";
import { StatusBadge, type BadgeTone } from "./StatusBadge";
import type { StockStatus } from "@/types/medicine";

const config: Record<StockStatus, { label: string; tone: BadgeTone; icon: JSX.Element }> = {
  "in-stock": { label: "In Stock", tone: "success", icon: <CheckCircle2 className="h-3.5 w-3.5" /> },
  "low-stock": {
    label: "Low Stock",
    tone: "warning",
    icon: <TriangleAlert className="h-3.5 w-3.5" />,
  },
  "out-of-stock": {
    label: "Out of Stock",
    tone: "danger",
    icon: <CircleSlash className="h-3.5 w-3.5" />,
  },
};

export function StockBadge({ status }: { status: StockStatus }) {
  const entry = config[status];
  return (
    <StatusBadge tone={entry.tone} icon={entry.icon}>
      {entry.label}
    </StatusBadge>
  );
}
