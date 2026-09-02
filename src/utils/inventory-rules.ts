import type { InventoryRecord, InventoryStatus } from "@/types/inventory";
import { monthsUntil } from "./format";

/**
 * Business rules live here, NOT in components.
 *
 * Example rules used by this scaffold:
 *  - Reorder when quantity <= reorderLevel (default 10)
 *  - Reorder when the batch expires within EXPIRY_RISK_MONTHS
 *  - Replenish target = maximumLevel (default 100 units)
 *
 * TODO: Implement reorder rule against real inventory service
 * TODO: Implement real-time stock synchronization
 */

export const DEFAULT_REORDER_LEVEL = 10;
export const DEFAULT_MAXIMUM_LEVEL = 100;
export const EXPIRY_RISK_MONTHS = 3;

export function isExpiringSoon(expiryDate: string): boolean {
  return monthsUntil(expiryDate) <= EXPIRY_RISK_MONTHS;
}

export function getInventoryStatus(record: InventoryRecord): InventoryStatus {
  if (record.quantity === 0) return "reorder-required";
  if (isExpiringSoon(record.expiryDate)) return "expiring-soon";
  if (record.quantity <= record.reorderLevel) return "low-stock";
  return "healthy";
}

export function needsReorder(record: InventoryRecord): boolean {
  return record.quantity <= record.reorderLevel || isExpiringSoon(record.expiryDate);
}

export function replenishQuantity(record: InventoryRecord): number {
  return Math.max(record.maximumLevel - record.quantity, 0);
}
