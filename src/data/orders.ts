import type { CartItem, Order } from "@/types/order";
import { medicines } from "./medicines";

/** TODO: Replace mock data with backend API */

function itemFrom(medicineId: string, quantity: number) {
  const medicine = medicines.find((entry) => entry.id === medicineId)!;
  return {
    medicineId: medicine.id,
    name: medicine.name,
    composition: medicine.composition,
    imageUrl: medicine.imageUrl,
    quantity,
    unitPrice: medicine.price,
    prescriptionRequired: medicine.prescriptionRequired,
  };
}

function timeline(reached: number, placedOn: string) {
  const steps = [
    { key: "placed" as const, label: "Order Placed" },
    { key: "payment-confirmed" as const, label: "Payment Confirmed" },
    { key: "processing" as const, label: "Pharmacy Processing" },
    { key: "packed" as const, label: "Packed" },
    { key: "out-for-delivery" as const, label: "Out for Delivery" },
    { key: "delivered" as const, label: "Delivered" },
  ];
  return steps.map((step, index) => ({
    ...step,
    completed: index <= reached,
    timestamp: index <= reached ? placedOn : undefined,
  }));
}

export const orders: Order[] = [
  {
    id: "MT-10241",
    customerId: "usr-001",
    customerName: "Aarav Sharma",
    placedOn: "2026-08-22T10:15:00Z",
    items: [itemFrom("med-001", 2), itemFrom("med-026", 1)],
    subtotal: 87.5,
    deliveryFee: 0,
    discount: 10,
    total: 77.5,
    paymentMethod: "upi",
    paymentStatus: "paid",
    orderStatus: "delivered",
    prescriptionStatus: "not-required",
    deliveryAddress: "Flat 402, Sunrise Residency, Baner Road, Pune 411045",
    timeline: timeline(5, "2026-08-22T10:15:00Z"),
  },
  {
    id: "MT-10258",
    customerId: "usr-001",
    customerName: "Aarav Sharma",
    placedOn: "2026-08-28T08:40:00Z",
    items: [itemFrom("med-012", 1), itemFrom("med-014", 1)],
    subtotal: 1198.6,
    deliveryFee: 40,
    discount: 0,
    total: 1238.6,
    paymentMethod: "credit-card",
    paymentStatus: "paid",
    orderStatus: "out-for-delivery",
    prescriptionStatus: "verified",
    deliveryAddress: "Flat 402, Sunrise Residency, Baner Road, Pune 411045",
    timeline: timeline(4, "2026-08-28T08:40:00Z"),
  },
  {
    id: "MT-10263",
    customerId: "usr-002",
    customerName: "Meera Iyer",
    placedOn: "2026-08-30T14:05:00Z",
    items: [itemFrom("med-007", 1)],
    subtotal: 224.5,
    deliveryFee: 40,
    discount: 0,
    total: 264.5,
    paymentMethod: "net-banking",
    paymentStatus: "pending",
    orderStatus: "processing",
    prescriptionStatus: "pending",
    deliveryAddress: "12/B Lake View Apartments, Adyar, Chennai 600020",
    timeline: timeline(1, "2026-08-30T14:05:00Z"),
  },
  {
    id: "MT-10270",
    customerId: "usr-004",
    customerName: "Ananya Nair",
    placedOn: "2026-09-01T09:20:00Z",
    items: [itemFrom("med-020", 2), itemFrom("med-021", 1)],
    subtotal: 348,
    deliveryFee: 0,
    discount: 25,
    total: 323,
    paymentMethod: "upi",
    paymentStatus: "paid",
    orderStatus: "packed",
    prescriptionStatus: "not-required",
    deliveryAddress: "7 Rose Villa, Kakkanad, Kochi 682030",
    timeline: timeline(3, "2026-09-01T09:20:00Z"),
  },
  {
    id: "MT-10272",
    customerId: "usr-003",
    customerName: "Rohit Verma",
    placedOn: "2026-09-01T18:45:00Z",
    items: [itemFrom("med-009", 1)],
    subtotal: 176,
    deliveryFee: 40,
    discount: 0,
    total: 216,
    paymentMethod: "debit-card",
    paymentStatus: "failed",
    orderStatus: "cancelled",
    prescriptionStatus: "rejected",
    deliveryAddress: "204 Gokul Heights, Andheri West, Mumbai 400058",
    timeline: timeline(0, "2026-09-01T18:45:00Z"),
  },
];

export function getOrderById(id: string): Order | undefined {
  return orders.find((order) => order.id === id);
}

export function getOrdersByCustomer(customerId: string): Order[] {
  return orders.filter((order) => order.customerId === customerId);
}

/** Mock cart contents. TODO: Move to a cart hook/context backed by the API. */
export const cartItems: CartItem[] = [
  { ...itemFrom("med-001", 2), stockStatus: "in-stock" },
  { ...itemFrom("med-016", 1), stockStatus: "in-stock" },
  { ...itemFrom("med-024", 1), stockStatus: "low-stock" },
];

/** Mock wishlist contents. */
export const wishlistMedicineIds: string[] = ["med-020", "med-028", "med-011", "med-018"];
