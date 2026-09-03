import { getMedicineById } from "@/data/medicines";
import type { CartItem, CartLine } from "@/types/order";

/** Cart pricing rules kept out of the UI layer. */
export const DELIVERY_FEE = 40;
export const FREE_DELIVERY_THRESHOLD = 500;

/** Resolves cart lines against the catalogue. */
export function buildCartItems(lines: CartLine[]): CartItem[] {
  return lines.flatMap((line) => {
    const medicine = getMedicineById(line.medicineId);
    if (!medicine) return [];
    return [
      {
        medicineId: medicine.id,
        name: medicine.name,
        composition: medicine.composition,
        imageUrl: medicine.imageUrl,
        quantity: line.quantity,
        unitPrice: medicine.price,
        prescriptionRequired: medicine.prescriptionRequired,
        stockStatus: medicine.stockStatus,
      },
    ];
  });
}

export interface CartTotals {
  subtotal: number;
  deliveryFee: number;
  total: number;
  itemCount: number;
}

export function calculateTotals(items: CartItem[]): CartTotals {
  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const deliveryFee = items.length === 0 || subtotal > FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  return {
    subtotal,
    deliveryFee,
    total: subtotal + deliveryFee,
    itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
  };
}

/** True when at least one line needs pharmacist verification before dispatch. */
export function requiresPrescription(items: CartItem[]): boolean {
  return items.some((item) => item.prescriptionRequired);
}
