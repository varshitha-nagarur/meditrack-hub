/** Inventory, batches, supply chain and audit types. */

export type InventoryStatus = "healthy" | "low-stock" | "expiring-soon" | "reorder-required";

export interface InventoryRecord {
  id: string;
  medicineId: string;
  medicineName: string;
  batchNumber: string;
  quantity: number;
  /** Business rule: reorder when quantity <= reorderLevel. */
  reorderLevel: number;
  /** Business rule: replenish up to this level. */
  maximumLevel: number;
  manufacturingDate: string;
  expiryDate: string;
  supplier: string;
  location: string;
}

export type ReplenishmentTrigger = "low-quantity" | "expiry-risk";
export type ReplenishmentStatus = "pending" | "approved" | "ordered" | "received";

export interface ReplenishmentRequest {
  id: string;
  medicineId: string;
  medicineName: string;
  currentQuantity: number;
  targetQuantity: number;
  trigger: ReplenishmentTrigger;
  expiryDate: string;
  supplier: string;
  status: ReplenishmentStatus;
  raisedOn: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  user: string;
  role: "customer" | "pharmacist" | "inventory-manager" | "admin";
  action: string;
  resource: string;
  result: "success" | "failure";
}

/** Mock scan payload for /admin/inventory/scan. */
export interface ScannedBatch {
  batchId: string;
  medicineName: string;
  quantity: number;
  manufacturingDate: string;
  expiryDate: string;
  supplier: string;
}
