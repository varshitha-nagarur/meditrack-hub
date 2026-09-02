import type { BadgeTone } from "@/components/common/StatusBadge";
import type { InventoryStatus, ReplenishmentStatus } from "@/types/inventory";
import type { OrderStatus, PaymentStatus } from "@/types/order";
import type { PrescriptionStatus } from "@/types/prescription";

/** Single source of truth for status -> badge colour mapping. */

export const orderStatusTone: Record<OrderStatus, BadgeTone> = {
  placed: "info",
  processing: "info",
  packed: "primary",
  "out-for-delivery": "warning",
  delivered: "success",
  cancelled: "danger",
};

export const paymentStatusTone: Record<PaymentStatus, BadgeTone> = {
  pending: "warning",
  paid: "success",
  failed: "danger",
  refunded: "neutral",
};

export const prescriptionStatusTone: Record<PrescriptionStatus, BadgeTone> = {
  pending: "warning",
  verified: "success",
  rejected: "danger",
};

export const inventoryStatusTone: Record<InventoryStatus, BadgeTone> = {
  healthy: "success",
  "low-stock": "warning",
  "expiring-soon": "warning",
  "reorder-required": "danger",
};

export const inventoryStatusLabel: Record<InventoryStatus, string> = {
  healthy: "Healthy",
  "low-stock": "Low Stock",
  "expiring-soon": "Expiring Soon",
  "reorder-required": "Reorder Required",
};

export const replenishmentStatusTone: Record<ReplenishmentStatus, BadgeTone> = {
  pending: "warning",
  approved: "info",
  ordered: "primary",
  received: "success",
};
