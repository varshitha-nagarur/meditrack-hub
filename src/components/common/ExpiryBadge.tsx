import { CalendarClock } from "lucide-react";
import { StatusBadge, type BadgeTone } from "./StatusBadge";
import { formatDate, monthsUntil } from "@/utils/format";
import { EXPIRY_RISK_MONTHS } from "@/utils/inventory-rules";

/** Colour-codes how close a batch is to its expiry date. */
export function ExpiryBadge({ expiryDate }: { expiryDate: string }) {
  const months = monthsUntil(expiryDate);
  let tone: BadgeTone = "neutral";
  if (months <= 0) tone = "danger";
  else if (months <= EXPIRY_RISK_MONTHS) tone = "warning";
  else if (months <= 6) tone = "info";

  return (
    <StatusBadge tone={tone} icon={<CalendarClock className="h-3.5 w-3.5" />}>
      Exp {formatDate(expiryDate)}
    </StatusBadge>
  );
}
