import { Check } from "lucide-react";
import type { OrderTimelineStep } from "@/types/order";
import { formatDateTime } from "@/utils/format";
import { cn } from "@/lib/utils";

export function OrderTimeline({ steps }: { steps: OrderTimelineStep[] }) {
  return (
    <ol className="relative space-y-6 border-l border-border pl-6">
      {steps.map((step) => (
        <li key={step.key} className="relative">
          <span
            className={cn(
              "absolute top-0.5 -left-[31px] flex h-5 w-5 items-center justify-center rounded-full border-2",
              step.completed
                ? "border-success bg-success text-success-foreground"
                : "border-border bg-card",
            )}
          >
            {step.completed ? <Check className="h-3 w-3" /> : null}
          </span>
          <p
            className={cn(
              "text-sm font-medium",
              step.completed ? "text-foreground" : "text-muted-foreground",
            )}
          >
            {step.label}
          </p>
          {step.timestamp ? (
            <p className="text-xs text-muted-foreground">{formatDateTime(step.timestamp)}</p>
          ) : (
            <p className="text-xs text-muted-foreground">Pending</p>
          )}
        </li>
      ))}
    </ol>
  );
}
