/** Cart, orders and payment types. */

export type PaymentMethod = "upi" | "debit-card" | "credit-card" | "net-banking";
export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";

export type OrderStatus =
  | "placed"
  | "processing"
  | "packed"
  | "out-for-delivery"
  | "delivered"
  | "cancelled";

export interface OrderItem {
  medicineId: string;
  name: string;
  composition: string;
  imageUrl: string;
  quantity: number;
  unitPrice: number;
  prescriptionRequired: boolean;
}

export interface CartItem extends OrderItem {
  stockStatus: "in-stock" | "low-stock" | "out-of-stock";
}

/** Minimal cart entry held in local UI state. */
export interface CartLine {
  medicineId: string;
  quantity: number;
}


export interface OrderTimelineStep {
  key: OrderStatus | "payment-confirmed";
  label: string;
  timestamp?: string | undefined;
  completed: boolean;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  placedOn: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  prescriptionStatus: "not-required" | "pending" | "verified" | "rejected";
  deliveryAddress: string;
  timeline: OrderTimelineStep[];
}
