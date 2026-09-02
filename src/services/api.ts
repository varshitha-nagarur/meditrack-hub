/**
 * Single place where the frontend talks to "the backend".
 *
 * Every function below currently returns mock data from src/data/*.
 * Replace the bodies with real network calls as you build the backend —
 * the UI does not need to change.
 *
 * TODO: Replace mock data with backend API
 * TODO: Connect authentication
 * TODO: Connect database
 * TODO: Connect payment gateway
 */

import { categories, getMedicineById, medicines } from "@/data/medicines";
import { auditLogs, inventoryRecords, replenishmentRequests } from "@/data/inventory";
import { cartItems, orders, wishlistMedicineIds } from "@/data/orders";
import { prescriptions } from "@/data/prescriptions";
import { currentCustomer, users } from "@/data/users";
import type { Medicine, MedicineCategory } from "@/types/medicine";
import type { CartItem, Order, PaymentMethod } from "@/types/order";
import type { Prescription } from "@/types/prescription";
import type { User, UserRole } from "@/types/user";
import type { AuditLogEntry, InventoryRecord, ReplenishmentRequest } from "@/types/inventory";

/** Simulates network latency so loading states can be exercised. */
function delay<T>(value: T, ms = 250): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

/* ------------------------------- Catalogue ------------------------------- */

export const catalogueService = {
  // TODO: GET /api/medicines
  listMedicines: (): Promise<Medicine[]> => delay(medicines),
  // TODO: GET /api/medicines/:id
  getMedicine: (id: string): Promise<Medicine | undefined> => delay(getMedicineById(id)),
  // TODO: GET /api/categories
  listCategories: (): Promise<MedicineCategory[]> => delay(categories),
};

/* ---------------------------------- Cart --------------------------------- */

export const cartService = {
  // TODO: GET /api/cart
  getCart: (): Promise<CartItem[]> => delay(cartItems),
  // TODO: POST /api/cart  — then invalidate the cart query
  addToCart: (medicineId: string, quantity: number): Promise<void> => {
    console.info("[mock] addToCart", { medicineId, quantity });
    return delay(undefined, 0);
  },
  // TODO: Implement TTL-based stock reservation (server-side hold + expiry job)
  reserveStock: (): Promise<void> => delay(undefined, 0),
};

/* -------------------------------- Wishlist ------------------------------- */

export const wishlistService = {
  // TODO: GET /api/wishlist
  getWishlist: (): Promise<Medicine[]> =>
    delay(medicines.filter((medicine) => wishlistMedicineIds.includes(medicine.id))),
};

/* --------------------------------- Orders -------------------------------- */

export const orderService = {
  // TODO: GET /api/orders
  listOrders: (): Promise<Order[]> => delay(orders),
  // TODO: GET /api/orders/:id
  getOrder: (id: string): Promise<Order | undefined> =>
    delay(orders.find((order) => order.id === id)),
  // TODO: POST /api/orders
  // TODO: Implement transactional inventory update (decrement stock atomically)
  placeOrder: (payload: { paymentMethod: PaymentMethod }): Promise<{ orderId: string }> => {
    console.info("[mock] placeOrder", payload);
    return delay({ orderId: "MT-XXXXX" });
  },
};

/* -------------------------------- Payments ------------------------------- */

export const paymentService = {
  // TODO: Connect payment gateway (Razorpay / Stripe / UPI PSP)
  // TODO: Verify payment signature server-side before confirming the order
  initiatePayment: (method: PaymentMethod, amount: number): Promise<{ status: string }> => {
    console.info("[mock] initiatePayment", { method, amount });
    return delay({ status: "mock-success" });
  },
};

/* ------------------------------ Prescriptions ---------------------------- */

export const prescriptionService = {
  // TODO: GET /api/prescriptions
  listPrescriptions: (): Promise<Prescription[]> => delay(prescriptions),
  // TODO: Connect prescription upload API (multipart upload to object storage)
  upload: (file: { name: string }): Promise<void> => {
    console.info("[mock] uploadPrescription", file);
    return delay(undefined, 0);
  },
  // TODO: Connect prescription verification backend
  // TODO: Implement pharmacist verification workflow (approve / reject + reason)
  review: (id: string, decision: "verified" | "rejected"): Promise<void> => {
    console.info("[mock] reviewPrescription", { id, decision });
    return delay(undefined, 0);
  },
};

/* -------------------------------- Inventory ------------------------------ */

export const inventoryService = {
  // TODO: Connect inventory API
  listInventory: (): Promise<InventoryRecord[]> => delay(inventoryRecords),
  // TODO: Integrate QR/RFID scanner (WebUSB / native bridge / hardware SDK)
  scanBatch: (): Promise<void> => delay(undefined, 0),
  // TODO: POST /api/inventory/receive — confirm stock entry
  confirmStockEntry: (batchId: string, quantity: number): Promise<void> => {
    console.info("[mock] confirmStockEntry", { batchId, quantity });
    return delay(undefined, 0);
  },
  // TODO: Implement replenishment workflow (approve -> order -> receive)
  listReplenishmentRequests: (): Promise<ReplenishmentRequest[]> => delay(replenishmentRequests),
};

/* --------------------------- Customers / audit --------------------------- */

export const customerService = {
  // TODO: GET /api/customers
  listCustomers: (): Promise<User[]> => delay(users.filter((user) => user.role === "customer")),
  // TODO: Replace mock co-purchase rules with backend CRM logic
  getRefillSuggestions: (): Promise<Medicine[]> =>
    delay(medicines.filter((medicine) => medicine.tags.includes("refill"))),
};

export const auditService = {
  // TODO: Implement append-only audit logging backend (immutable storage)
  listAuditLogs: (): Promise<AuditLogEntry[]> => delay(auditLogs),
};

/* ----------------------------- Authentication ---------------------------- */

export const authService = {
  // TODO: Connect authentication provider
  // TODO: Implement secure sessions/JWT
  // TODO: Implement API-level authorization (server-side role checks)
  getCurrentUser: (): Promise<User> => delay(currentCustomer),
  login: (email: string, password: string): Promise<User> => {
    console.info("[mock] login", { email, password: "***" });
    return delay(currentCustomer);
  },
  loginAs: (role: UserRole): Promise<User> => {
    const user = users.find((entry) => entry.role === role) ?? currentCustomer;
    return delay(user);
  },
  logout: (): Promise<void> => delay(undefined, 0),
};
