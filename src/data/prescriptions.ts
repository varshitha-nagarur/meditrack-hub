import type { Prescription } from "@/types/prescription";

/**
 * TODO: Connect prescription upload API
 * TODO: Implement pharmacist verification workflow
 */
export const prescriptions: Prescription[] = [
  {
    id: "RX-2041",
    customerId: "usr-001",
    customerName: "Aarav Sharma",
    doctorName: "Dr. S. Deshpande (MBBS, MD)",
    medicines: ["Glycomet 500 SR Tablet", "Accu-Chek Active Test Strips"],
    uploadedOn: "2026-08-27T11:10:00Z",
    reviewedOn: "2026-08-27T13:02:00Z",
    reviewedBy: "Pharmacist01",
    status: "verified",
    fileName: "rx-glycomet-aug26.pdf",
  },
  {
    id: "RX-2048",
    customerId: "usr-002",
    customerName: "Meera Iyer",
    doctorName: "Dr. A. Menon (MBBS)",
    medicines: ["Augmentin 625 Duo Tablet"],
    uploadedOn: "2026-08-30T13:55:00Z",
    status: "pending",
    fileName: "rx-augmentin.jpg",
  },
  {
    id: "RX-2050",
    customerId: "usr-003",
    customerName: "Rohit Verma",
    doctorName: "Unreadable",
    medicines: ["Taxim-O 200 Tablet"],
    uploadedOn: "2026-09-01T18:30:00Z",
    reviewedOn: "2026-09-01T19:15:00Z",
    reviewedBy: "Pharmacist01",
    status: "rejected",
    fileName: "rx-scan-blurred.png",
    notes: "Image not legible. Please re-upload a clear copy of the prescription.",
  },
  {
    id: "RX-2053",
    customerId: "usr-004",
    customerName: "Ananya Nair",
    doctorName: "Dr. P. Krishnan (MBBS, DNB)",
    medicines: ["Telma 40 Tablet", "Ecosprin 75 Tablet"],
    uploadedOn: "2026-09-01T20:05:00Z",
    status: "pending",
    fileName: "rx-telma-sept.pdf",
  },
  {
    id: "RX-2055",
    customerId: "usr-001",
    customerName: "Aarav Sharma",
    doctorName: "Dr. S. Deshpande (MBBS, MD)",
    medicines: ["Zerodol SP Tablet"],
    uploadedOn: "2026-09-02T06:40:00Z",
    status: "pending",
    fileName: "rx-zerodol.jpg",
  },
];

export function getPrescriptionsByCustomer(customerId: string): Prescription[] {
  return prescriptions.filter((prescription) => prescription.customerId === customerId);
}
