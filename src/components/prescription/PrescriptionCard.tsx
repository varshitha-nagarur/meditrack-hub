import { FileText } from "lucide-react";
import { StatusBadge } from "@/components/common/StatusBadge";
import { prescriptionStatusTone } from "@/utils/status-tones";
import type { Prescription } from "@/types/prescription";
import { formatDateTime, titleCase } from "@/utils/format";

const statusLabel: Record<Prescription["status"], string> = {
  pending: "Pending Review",
  verified: "Verified",
  rejected: "Rejected",
};

export function PrescriptionCard({ prescription }: { prescription: Prescription }) {
  return (
    <article className="rounded-xl border border-border bg-card p-5 shadow-card">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-muted-foreground">
            <FileText className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm font-semibold text-foreground">{prescription.id}</p>
            <p className="text-xs text-muted-foreground">{prescription.fileName}</p>
          </div>
        </div>
        <StatusBadge tone={prescriptionStatusTone[prescription.status]}>
          {statusLabel[prescription.status]}
        </StatusBadge>
      </div>

      <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-xs text-muted-foreground">Doctor</dt>
          <dd className="text-foreground">{prescription.doctorName}</dd>
        </div>
        <div>
          <dt className="text-xs text-muted-foreground">Uploaded</dt>
          <dd className="text-foreground">{formatDateTime(prescription.uploadedOn)}</dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-xs text-muted-foreground">Medicines listed</dt>
          <dd className="text-foreground">{prescription.medicines.join(", ")}</dd>
        </div>
        {prescription.reviewedBy ? (
          <div>
            <dt className="text-xs text-muted-foreground">Reviewed by</dt>
            <dd className="text-foreground">
              {prescription.reviewedBy} · {titleCase(prescription.status)}
            </dd>
          </div>
        ) : null}
      </dl>

      {prescription.notes ? (
        <p className="mt-4 rounded-lg bg-destructive-soft px-3 py-2 text-xs text-destructive">
          {prescription.notes}
        </p>
      ) : null}
    </article>
  );
}
