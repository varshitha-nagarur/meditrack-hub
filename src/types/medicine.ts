/** Domain types for the medicine catalogue. */

export type MedicineCategoryId =
  | "pain-relief"
  | "antibiotics"
  | "diabetes-care"
  | "cardiac-care"
  | "vitamins-supplements"
  | "cold-cough"
  | "first-aid";

export interface MedicineCategory {
  id: MedicineCategoryId;
  name: string;
  description: string;
  /** Lucide icon name, resolved in CategoryCard. */
  icon: string;
  itemCount: number;
}

export type StockStatus = "in-stock" | "low-stock" | "out-of-stock";

export interface Medicine {
  id: string;
  name: string;
  composition: string;
  manufacturer: string;
  /** Price in INR. */
  price: number;
  mrp: number;
  packSize: string;
  category: MedicineCategoryId;
  imageUrl: string;
  prescriptionRequired: boolean;
  stockStatus: StockStatus;
  quantityAvailable: number;
  /** ISO date string (YYYY-MM-DD) of the earliest sellable batch. */
  expiryDate: string;
  batchNumber: string;
  storageInfo: string;
  usageInfo: string;
  returnPolicy: string;
  rating: number;
  tags: Array<"popular" | "frequently-purchased" | "essential" | "refill">;
}
