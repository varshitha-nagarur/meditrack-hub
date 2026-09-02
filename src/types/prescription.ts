/** Prescription upload + pharmacist verification types. */

export type PrescriptionStatus = "pending" | "verified" | "rejected";

export interface Prescription {
  id: string;
  customerId: string;
  customerName: string;
  doctorName: string;
  medicines: string[];
  uploadedOn: string;
  reviewedOn?: string | undefined;
  reviewedBy?: string | undefined;
  status: PrescriptionStatus;
  fileName: string;
  notes?: string | undefined;
}
