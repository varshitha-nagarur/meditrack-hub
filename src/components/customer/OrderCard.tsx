import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { StatusBadge } from "@/components/common/StatusBadge";
import { orderStatusTone, paymentStatusTone } from "@/utils/status-tones";
import type { Order } from "@/types/order";
import { formatDate, formatINR, titleCase } from "@/utils/format";

export function OrderCard({ order }: { order: Order }) {
  return (
    <article className="rounded-xl border border-border bg-card p-5 shadow-card">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-foreground">{order.id}</p>
          <p className="text-xs text-muted-foreground">Placed on {formatDate(order.placedOn)}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <StatusBadge tone={paymentStatusTone[order.paymentStatus]}>
            {titleCase(order.paymentStatus)}
          </StatusBadge>
          <StatusBadge tone={orderStatusTone[order.orderStatus]}>
            {titleCase(order.orderStatus)}
          </StatusBadge>
        </div>
      </div>

      <ul className="mt-4 space-y-2">
        {order.items.map((item) => (
          <li key={item.medicineId} className="flex items-center gap-3">
            <img
              src={item.imageUrl}
              alt={item.name}
              loading="lazy"
              width={800}
              height={800}
              className="h-10 w-10 rounded-md border border-border object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm text-foreground">{item.name}</p>
              <p className="text-xs text-muted-foreground">Qty {item.quantity}</p>
            </div>
            <span className="text-sm text-muted-foreground">
              {formatINR(item.unitPrice * item.quantity)}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
        <p className="text-sm font-semibold text-foreground">{formatINR(order.total)}</p>
        <Link
          to="/orders/$id"
          params={{ id: order.id }}
          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          View details
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
