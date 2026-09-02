import type {
  AuditLogEntry,
  InventoryRecord,
  ReplenishmentRequest,
  ScannedBatch,
} from "@/types/inventory";
import { DEFAULT_MAXIMUM_LEVEL, DEFAULT_REORDER_LEVEL } from "@/utils/inventory-rules";

/**
 * TODO: Connect inventory API
 * TODO: Implement real-time stock synchronization
 */

type InventorySeed = Omit<InventoryRecord, "reorderLevel" | "maximumLevel"> &
  Partial<Pick<InventoryRecord, "reorderLevel" | "maximumLevel">>;

const seeds: InventorySeed[] = [
  { id: "inv-001", medicineId: "med-001", medicineName: "Dolo 650 Tablet", batchNumber: "DL650-A21", quantity: 240, manufacturingDate: "2025-09-01", expiryDate: "2027-08-31", supplier: "MediSupply Distributors", location: "Rack A1" },
  { id: "inv-002", medicineId: "med-001", medicineName: "Dolo 650 Tablet", batchNumber: "DL650-B04", quantity: 60, manufacturingDate: "2024-10-01", expiryDate: "2026-10-31", supplier: "MediSupply Distributors", location: "Rack A1" },
  { id: "inv-003", medicineId: "med-004", medicineName: "Meftal Spas Tablet", batchNumber: "MFS-330", quantity: 8, manufacturingDate: "2024-12-01", expiryDate: "2026-11-30", supplier: "Blue Cross Depot", location: "Rack B2" },
  { id: "inv-004", medicineId: "med-007", medicineName: "Augmentin 625 Duo Tablet", batchNumber: "AUG-4412", quantity: 88, manufacturingDate: "2025-03-01", expiryDate: "2027-02-28", supplier: "GSK Regional Depot", location: "Rack C1" },
  { id: "inv-005", medicineId: "med-009", medicineName: "Taxim-O 200 Tablet", batchNumber: "TXO-108", quantity: 9, manufacturingDate: "2024-10-01", expiryDate: "2026-09-30", supplier: "Alkem Depot", location: "Rack C2" },
  { id: "inv-006", medicineId: "med-011", medicineName: "Metrogyl 400 Tablet", batchNumber: "MTG-019", quantity: 0, manufacturingDate: "2024-09-01", expiryDate: "2026-08-31", supplier: "JB Chem Depot", location: "Rack C3" },
  { id: "inv-007", medicineId: "med-012", medicineName: "Glycomet 500 SR Tablet", batchNumber: "GLY-881", quantity: 210, manufacturingDate: "2025-08-01", expiryDate: "2027-07-31", supplier: "USV Regional Depot", location: "Rack D1" },
  { id: "inv-008", medicineId: "med-015", medicineName: "Zoryl 2 Tablet", batchNumber: "ZRY-441", quantity: 7, manufacturingDate: "2024-11-01", expiryDate: "2026-10-31", supplier: "Intas Depot", location: "Rack D2" },
  { id: "inv-009", medicineId: "med-016", medicineName: "Telma 40 Tablet", batchNumber: "TLM-702", quantity: 164, manufacturingDate: "2025-11-01", expiryDate: "2027-11-30", supplier: "Glenmark Depot", location: "Rack E1" },
  { id: "inv-010", medicineId: "med-019", medicineName: "Amlodac 5 Tablet", batchNumber: "AML-925", quantity: 10, manufacturingDate: "2024-12-01", expiryDate: "2026-12-31", supplier: "Zydus Depot", location: "Rack E2" },
  { id: "inv-011", medicineId: "med-024", medicineName: "Uprise D3 60K Capsule", batchNumber: "UPD-512", quantity: 6, manufacturingDate: "2024-09-01", expiryDate: "2026-09-30", supplier: "Alkem Depot", location: "Rack F1" },
  { id: "inv-012", medicineId: "med-030", medicineName: "Betadine Ointment", batchNumber: "BTD-604", quantity: 9, manufacturingDate: "2024-10-01", expiryDate: "2026-10-31", supplier: "Win-Medicare Depot", location: "Rack F2" },
  { id: "inv-013", medicineId: "med-026", medicineName: "Cetzine 10 Tablet", batchNumber: "CTZ-909", quantity: 275, manufacturingDate: "2025-06-01", expiryDate: "2027-06-30", supplier: "Dr. Reddy's Depot", location: "Rack G1" },
  { id: "inv-014", medicineId: "med-028", medicineName: "Dettol Antiseptic Liquid", batchNumber: "DTL-880", quantity: 120, manufacturingDate: "2026-04-01", expiryDate: "2028-04-30", supplier: "Reckitt Distributor", location: "Rack G2" },
];

export const inventoryRecords: InventoryRecord[] = seeds.map((seed) => ({
  ...seed,
  reorderLevel: seed.reorderLevel ?? DEFAULT_REORDER_LEVEL,
  maximumLevel: seed.maximumLevel ?? DEFAULT_MAXIMUM_LEVEL,
}));

export const replenishmentRequests: ReplenishmentRequest[] = [
  { id: "rep-001", medicineId: "med-011", medicineName: "Metrogyl 400 Tablet", currentQuantity: 0, targetQuantity: 100, trigger: "low-quantity", expiryDate: "2026-08-31", supplier: "JB Chem Depot", status: "pending", raisedOn: "2026-09-01" },
  { id: "rep-002", medicineId: "med-024", medicineName: "Uprise D3 60K Capsule", currentQuantity: 6, targetQuantity: 100, trigger: "low-quantity", expiryDate: "2026-09-30", supplier: "Alkem Depot", status: "approved", raisedOn: "2026-08-30" },
  { id: "rep-003", medicineId: "med-009", medicineName: "Taxim-O 200 Tablet", currentQuantity: 9, targetQuantity: 100, trigger: "expiry-risk", expiryDate: "2026-09-30", supplier: "Alkem Depot", status: "ordered", raisedOn: "2026-08-28" },
  { id: "rep-004", medicineId: "med-015", medicineName: "Zoryl 2 Tablet", currentQuantity: 7, targetQuantity: 100, trigger: "low-quantity", expiryDate: "2026-10-31", supplier: "Intas Depot", status: "pending", raisedOn: "2026-09-01" },
  { id: "rep-005", medicineId: "med-030", medicineName: "Betadine Ointment", currentQuantity: 9, targetQuantity: 100, trigger: "expiry-risk", expiryDate: "2026-10-31", supplier: "Win-Medicare Depot", status: "received", raisedOn: "2026-08-20" },
];

/** TODO: Implement append-only audit logging backend */
export const auditLogs: AuditLogEntry[] = [
  { id: "log-001", timestamp: "2026-09-02T06:52:00Z", user: "Pharmacist01", role: "pharmacist", action: "Approved prescription", resource: "RX-2041", result: "success" },
  { id: "log-002", timestamp: "2026-09-02T06:20:00Z", user: "Admin01", role: "admin", action: "Updated inventory", resource: "inv-007", result: "success" },
  { id: "log-003", timestamp: "2026-09-01T20:10:00Z", user: "Customer04", role: "customer", action: "Created order", resource: "MT-10270", result: "success" },
  { id: "log-004", timestamp: "2026-09-01T19:15:00Z", user: "Pharmacist01", role: "pharmacist", action: "Rejected prescription", resource: "RX-2050", result: "success" },
  { id: "log-005", timestamp: "2026-09-01T12:05:00Z", user: "Admin01", role: "admin", action: "Created replenishment request", resource: "rep-001", result: "success" },
  { id: "log-006", timestamp: "2026-08-31T16:40:00Z", user: "Inventory01", role: "inventory-manager", action: "Received stock batch", resource: "BTD-604", result: "success" },
  { id: "log-007", timestamp: "2026-08-31T09:12:00Z", user: "Customer03", role: "customer", action: "Payment attempt", resource: "MT-10272", result: "failure" },
  { id: "log-008", timestamp: "2026-08-30T10:00:00Z", user: "Admin01", role: "admin", action: "Updated user role", resource: "usr-102", result: "success" },
];

/** Mock result shown after pressing "Scan Batch". TODO: Integrate QR/RFID scanner */
export const mockScannedBatch: ScannedBatch = {
  batchId: "TLM-702",
  medicineName: "Telma 40 Tablet",
  quantity: 120,
  manufacturingDate: "2025-11-01",
  expiryDate: "2027-11-30",
  supplier: "Glenmark Depot",
};

/** Admin dashboard KPI values (mock). */
export const dashboardStats = {
  totalMedicines: 30,
  itemVarieties: 7,
  lowStock: 6,
  expiringSoon: 4,
  pendingPrescriptions: 5,
  ordersToday: 12,
};
