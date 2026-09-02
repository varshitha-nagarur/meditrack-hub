import medicinePack from "@/assets/medicine-pack.jpg";
import type { Medicine, MedicineCategory } from "@/types/medicine";

/**
 * Mock catalogue data. Realistic Indian pharmacy products and INR prices.
 * Informational only — this app never gives medical advice.
 *
 * TODO: Replace mock data with backend API (see src/services/api.ts)
 */

export const categories: MedicineCategory[] = [
  {
    id: "pain-relief",
    name: "Pain Relief",
    description: "Analgesics and anti-inflammatory medicines",
    icon: "Thermometer",
    itemCount: 6,
  },
  {
    id: "antibiotics",
    name: "Antibiotics",
    description: "Prescription-only antibacterial medicines",
    icon: "ShieldPlus",
    itemCount: 5,
  },
  {
    id: "diabetes-care",
    name: "Diabetes Care",
    description: "Oral anti-diabetics and monitoring support",
    icon: "Droplet",
    itemCount: 4,
  },
  {
    id: "cardiac-care",
    name: "Cardiac Care",
    description: "Blood pressure and cholesterol management",
    icon: "HeartPulse",
    itemCount: 4,
  },
  {
    id: "vitamins-supplements",
    name: "Vitamins & Supplements",
    description: "Daily nutrition and immunity support",
    icon: "Pill",
    itemCount: 5,
  },
  {
    id: "cold-cough",
    name: "Cold & Cough",
    description: "Relief for seasonal cold, cough and allergies",
    icon: "Wind",
    itemCount: 3,
  },
  {
    id: "first-aid",
    name: "First Aid",
    description: "Wound care, antiseptics and daily essentials",
    icon: "BriefcaseMedical",
    itemCount: 3,
  },
];

const DEFAULT_STORAGE = "Store below 25°C in a dry place, away from direct sunlight.";
const DEFAULT_USAGE = "Use strictly as directed by a registered medical practitioner.";
const DEFAULT_RETURN =
  "Returns accepted within 7 days for sealed, unopened packs with the original invoice.";

type MedicineSeed = Omit<
  Medicine,
  "imageUrl" | "storageInfo" | "usageInfo" | "returnPolicy" | "mrp"
> & { mrp?: number };

const seeds: MedicineSeed[] = [
  { id: "med-001", name: "Dolo 650 Tablet", composition: "Paracetamol 650 mg", manufacturer: "Micro Labs", price: 31.5, packSize: "Strip of 15 tablets", category: "pain-relief", prescriptionRequired: false, stockStatus: "in-stock", quantityAvailable: 240, expiryDate: "2027-08-31", batchNumber: "DL650-A21", rating: 4.7, tags: ["popular", "frequently-purchased", "refill"] },
  { id: "med-002", name: "Combiflam Tablet", composition: "Ibuprofen 400 mg + Paracetamol 325 mg", manufacturer: "Sanofi India", price: 44.2, packSize: "Strip of 20 tablets", category: "pain-relief", prescriptionRequired: false, stockStatus: "in-stock", quantityAvailable: 156, expiryDate: "2027-03-31", batchNumber: "CBF-1187", rating: 4.5, tags: ["popular"] },
  { id: "med-003", name: "Volini Pain Relief Gel", composition: "Diclofenac Diethylamine 1.16% w/w", manufacturer: "Sun Pharma", price: 152, packSize: "Tube of 30 g", category: "pain-relief", prescriptionRequired: false, stockStatus: "in-stock", quantityAvailable: 74, expiryDate: "2026-12-31", batchNumber: "VOL-772", rating: 4.3, tags: ["essential"] },
  { id: "med-004", name: "Meftal Spas Tablet", composition: "Dicyclomine 20 mg + Mefenamic Acid 250 mg", manufacturer: "Blue Cross Labs", price: 62.5, packSize: "Strip of 10 tablets", category: "pain-relief", prescriptionRequired: true, stockStatus: "low-stock", quantityAvailable: 8, expiryDate: "2026-11-30", batchNumber: "MFS-330", rating: 4.2, tags: [] },
  { id: "med-005", name: "Saridon Advance Tablet", composition: "Paracetamol 500 mg + Caffeine 30 mg", manufacturer: "Bayer", price: 38, packSize: "Strip of 10 tablets", category: "pain-relief", prescriptionRequired: false, stockStatus: "in-stock", quantityAvailable: 132, expiryDate: "2027-05-31", batchNumber: "SRD-508", rating: 4.1, tags: ["frequently-purchased"] },
  { id: "med-006", name: "Zerodol SP Tablet", composition: "Aceclofenac 100 mg + Paracetamol 325 mg + Serratiopeptidase 15 mg", manufacturer: "Ipca Labs", price: 118, packSize: "Strip of 10 tablets", category: "pain-relief", prescriptionRequired: true, stockStatus: "in-stock", quantityAvailable: 61, expiryDate: "2027-01-31", batchNumber: "ZSP-914", rating: 4.4, tags: [] },

  { id: "med-007", name: "Augmentin 625 Duo Tablet", composition: "Amoxicillin 500 mg + Clavulanic Acid 125 mg", manufacturer: "GSK India", price: 224.5, packSize: "Strip of 10 tablets", category: "antibiotics", prescriptionRequired: true, stockStatus: "in-stock", quantityAvailable: 88, expiryDate: "2027-02-28", batchNumber: "AUG-4412", rating: 4.6, tags: ["popular"] },
  { id: "med-008", name: "Azithral 500 Tablet", composition: "Azithromycin 500 mg", manufacturer: "Alembic Pharma", price: 132, packSize: "Strip of 5 tablets", category: "antibiotics", prescriptionRequired: true, stockStatus: "in-stock", quantityAvailable: 54, expiryDate: "2026-10-31", batchNumber: "AZT-221", rating: 4.5, tags: [] },
  { id: "med-009", name: "Taxim-O 200 Tablet", composition: "Cefixime 200 mg", manufacturer: "Alkem Labs", price: 176, packSize: "Strip of 10 tablets", category: "antibiotics", prescriptionRequired: true, stockStatus: "low-stock", quantityAvailable: 9, expiryDate: "2026-09-30", batchNumber: "TXO-108", rating: 4.2, tags: [] },
  { id: "med-010", name: "Ciplox 500 Tablet", composition: "Ciprofloxacin 500 mg", manufacturer: "Cipla", price: 96, packSize: "Strip of 10 tablets", category: "antibiotics", prescriptionRequired: true, stockStatus: "in-stock", quantityAvailable: 47, expiryDate: "2027-04-30", batchNumber: "CPX-655", rating: 4.0, tags: [] },
  { id: "med-011", name: "Metrogyl 400 Tablet", composition: "Metronidazole 400 mg", manufacturer: "J.B. Chemicals", price: 42, packSize: "Strip of 15 tablets", category: "antibiotics", prescriptionRequired: true, stockStatus: "out-of-stock", quantityAvailable: 0, expiryDate: "2026-08-31", batchNumber: "MTG-019", rating: 4.1, tags: [] },

  { id: "med-012", name: "Glycomet 500 SR Tablet", composition: "Metformin 500 mg (SR)", manufacturer: "USV Pvt Ltd", price: 48.6, packSize: "Strip of 20 tablets", category: "diabetes-care", prescriptionRequired: true, stockStatus: "in-stock", quantityAvailable: 210, expiryDate: "2027-07-31", batchNumber: "GLY-881", rating: 4.6, tags: ["refill", "frequently-purchased"] },
  { id: "med-013", name: "Januvia 50 Tablet", composition: "Sitagliptin 50 mg", manufacturer: "MSD Pharma", price: 412, packSize: "Strip of 15 tablets", category: "diabetes-care", prescriptionRequired: true, stockStatus: "in-stock", quantityAvailable: 36, expiryDate: "2027-06-30", batchNumber: "JNV-233", rating: 4.4, tags: [] },
  { id: "med-014", name: "Accu-Chek Active Test Strips", composition: "Blood glucose test strips (50 count)", manufacturer: "Roche Diagnostics", price: 1150, packSize: "Box of 50 strips", category: "diabetes-care", prescriptionRequired: false, stockStatus: "in-stock", quantityAvailable: 28, expiryDate: "2027-09-30", batchNumber: "ACT-5501", rating: 4.5, tags: ["essential", "refill"] },
  { id: "med-015", name: "Zoryl 2 Tablet", composition: "Glimepiride 2 mg", manufacturer: "Intas Pharma", price: 118, packSize: "Strip of 10 tablets", category: "diabetes-care", prescriptionRequired: true, stockStatus: "low-stock", quantityAvailable: 7, expiryDate: "2026-10-31", batchNumber: "ZRY-441", rating: 4.2, tags: [] },

  { id: "med-016", name: "Telma 40 Tablet", composition: "Telmisartan 40 mg", manufacturer: "Glenmark Pharma", price: 148, packSize: "Strip of 15 tablets", category: "cardiac-care", prescriptionRequired: true, stockStatus: "in-stock", quantityAvailable: 164, expiryDate: "2027-11-30", batchNumber: "TLM-702", rating: 4.7, tags: ["refill", "frequently-purchased"] },
  { id: "med-017", name: "Ecosprin 75 Tablet", composition: "Aspirin 75 mg", manufacturer: "USV Pvt Ltd", price: 12.4, packSize: "Strip of 14 tablets", category: "cardiac-care", prescriptionRequired: true, stockStatus: "in-stock", quantityAvailable: 320, expiryDate: "2027-05-31", batchNumber: "ECO-330", rating: 4.5, tags: ["refill"] },
  { id: "med-018", name: "Rosuvas 10 Tablet", composition: "Rosuvastatin 10 mg", manufacturer: "Sun Pharma", price: 186, packSize: "Strip of 10 tablets", category: "cardiac-care", prescriptionRequired: true, stockStatus: "in-stock", quantityAvailable: 72, expiryDate: "2027-03-31", batchNumber: "RSV-118", rating: 4.4, tags: [] },
  { id: "med-019", name: "Amlodac 5 Tablet", composition: "Amlodipine 5 mg", manufacturer: "Zydus Cadila", price: 34, packSize: "Strip of 15 tablets", category: "cardiac-care", prescriptionRequired: true, stockStatus: "low-stock", quantityAvailable: 10, expiryDate: "2026-12-31", batchNumber: "AML-925", rating: 4.3, tags: [] },

  { id: "med-020", name: "Zincovit Tablet", composition: "Multivitamin + Multimineral with Zinc", manufacturer: "Apex Labs", price: 108, packSize: "Strip of 15 tablets", category: "vitamins-supplements", prescriptionRequired: false, stockStatus: "in-stock", quantityAvailable: 190, expiryDate: "2027-10-31", batchNumber: "ZNC-661", rating: 4.6, tags: ["popular", "essential"] },
  { id: "med-021", name: "Shelcal 500 Tablet", composition: "Calcium Carbonate 500 mg + Vitamin D3 250 IU", manufacturer: "Torrent Pharma", price: 132, packSize: "Strip of 15 tablets", category: "vitamins-supplements", prescriptionRequired: false, stockStatus: "in-stock", quantityAvailable: 145, expiryDate: "2027-08-31", batchNumber: "SHC-204", rating: 4.5, tags: ["refill"] },
  { id: "med-022", name: "Neurobion Forte Tablet", composition: "Vitamin B-Complex with B12", manufacturer: "Merck Ltd", price: 42, packSize: "Strip of 30 tablets", category: "vitamins-supplements", prescriptionRequired: false, stockStatus: "in-stock", quantityAvailable: 210, expiryDate: "2027-07-31", batchNumber: "NBF-777", rating: 4.4, tags: ["frequently-purchased"] },
  { id: "med-023", name: "Limcee 500 Chewable Tablet", composition: "Vitamin C (Ascorbic Acid) 500 mg", manufacturer: "Abbott India", price: 28, packSize: "Strip of 15 tablets", category: "vitamins-supplements", prescriptionRequired: false, stockStatus: "in-stock", quantityAvailable: 260, expiryDate: "2027-02-28", batchNumber: "LMC-140", rating: 4.3, tags: ["popular"] },
  { id: "med-024", name: "Uprise D3 60K Capsule", composition: "Cholecalciferol 60000 IU", manufacturer: "Alkem Labs", price: 96, packSize: "Strip of 4 capsules", category: "vitamins-supplements", prescriptionRequired: false, stockStatus: "low-stock", quantityAvailable: 6, expiryDate: "2026-09-30", batchNumber: "UPD-512", rating: 4.5, tags: ["refill"] },

  { id: "med-025", name: "Ascoril LS Syrup", composition: "Ambroxol + Levosalbutamol + Guaifenesin", manufacturer: "Glenmark Pharma", price: 138, packSize: "Bottle of 100 ml", category: "cold-cough", prescriptionRequired: true, stockStatus: "in-stock", quantityAvailable: 58, expiryDate: "2026-11-30", batchNumber: "ASC-318", rating: 4.2, tags: [] },
  { id: "med-026", name: "Cetzine 10 Tablet", composition: "Cetirizine 10 mg", manufacturer: "Dr. Reddy's Labs", price: 24.5, packSize: "Strip of 10 tablets", category: "cold-cough", prescriptionRequired: false, stockStatus: "in-stock", quantityAvailable: 275, expiryDate: "2027-06-30", batchNumber: "CTZ-909", rating: 4.5, tags: ["popular", "frequently-purchased"] },
  { id: "med-027", name: "Otrivin Nasal Spray", composition: "Xylometazoline 0.1% w/v", manufacturer: "Haleon India", price: 128, packSize: "Bottle of 10 ml", category: "cold-cough", prescriptionRequired: false, stockStatus: "in-stock", quantityAvailable: 66, expiryDate: "2027-01-31", batchNumber: "OTV-451", rating: 4.4, tags: ["essential"] },

  { id: "med-028", name: "Dettol Antiseptic Liquid", composition: "Chloroxylenol 4.8% w/v", manufacturer: "Reckitt India", price: 165, packSize: "Bottle of 250 ml", category: "first-aid", prescriptionRequired: false, stockStatus: "in-stock", quantityAvailable: 120, expiryDate: "2028-04-30", batchNumber: "DTL-880", rating: 4.7, tags: ["essential", "popular"] },
  { id: "med-029", name: "Hansaplast Washproof Strips", composition: "Sterile adhesive bandages (20 count)", manufacturer: "Beiersdorf India", price: 55, packSize: "Pack of 20 strips", category: "first-aid", prescriptionRequired: false, stockStatus: "in-stock", quantityAvailable: 180, expiryDate: "2028-01-31", batchNumber: "HSP-233", rating: 4.6, tags: ["essential"] },
  { id: "med-030", name: "Betadine Ointment", composition: "Povidone Iodine 5% w/w", manufacturer: "Win-Medicare", price: 142, packSize: "Tube of 20 g", category: "first-aid", prescriptionRequired: false, stockStatus: "low-stock", quantityAvailable: 9, expiryDate: "2026-10-31", batchNumber: "BTD-604", rating: 4.5, tags: ["essential"] },
];

export const medicines: Medicine[] = seeds.map((seed) => ({
  ...seed,
  mrp: seed.mrp ?? Math.round(seed.price * 1.18 * 100) / 100,
  imageUrl: medicinePack,
  storageInfo: DEFAULT_STORAGE,
  usageInfo: DEFAULT_USAGE,
  returnPolicy: DEFAULT_RETURN,
}));

export const manufacturers: string[] = Array.from(
  new Set(medicines.map((medicine) => medicine.manufacturer)),
).sort();

export function getMedicineById(id: string): Medicine | undefined {
  return medicines.find((medicine) => medicine.id === id);
}

export function getMedicinesByTag(tag: Medicine["tags"][number]): Medicine[] {
  return medicines.filter((medicine) => medicine.tags.includes(tag));
}

/** TODO: Replace mock co-purchase rules with backend CRM logic */
export const frequentlyBoughtTogether: Record<string, string[]> = {
  "med-001": ["med-026", "med-020"],
  "med-012": ["med-014", "med-022"],
  "med-016": ["med-017", "med-018"],
};
