import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/common/Button";
import { ConfirmationDialog } from "@/components/common/ConfirmationDialog";
import { DataTable, type Column } from "@/components/common/DataTable";
import { SectionHeading } from "@/components/common/SectionHeading";
import { StatusBadge } from "@/components/common/StatusBadge";
import { prescriptions } from "@/data/prescriptions";
import type { Prescription } from "@/types/prescription";
import { formatDate, titleCase } from "@/utils/format";
import { prescriptionStatusTone } from "@/utils/status-tones";

const title = "Prescription Review — MediTrack Admin";
const description = "Pharmacist queue for approving or rejecting uploaded prescriptions.";

export const Route = createFileRoute("/admin/prescriptions")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: AdminPrescriptionsPage,
});

type PendingAction = { prescription: Prescription; action: "approve" | "reject" | "view" };

function AdminPrescriptionsPage() {
  const [pending, setPending] = useState<PendingAction | null>(null);

  const columns: Array<Column<Prescription>> = [
    { key: "customer", header: "Customer", render: (item) => item.customerName },
    {
      key: "medicine",
      header: "Medicine",
      render: (item) => <span className="text-muted-foreground">{item.medicines.join(", ")}</span>,
    },
    { key: "uploaded", header: "Uploaded Date", render: (item) => formatDate(item.uploadedOn) },
    {
      key: "status",
      header: "Status",
      render: (item) => (
        <StatusBadge tone={prescriptionStatusTone[item.status]}>
          {titleCase(item.status)}
        </StatusBadge>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (item) => (
        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setPending({ prescription: item, action: "view" })}
          >
            View
          </Button>
          <Button
            size="sm"
            variant="success"
            onClick={() => setPending({ prescription: item, action: "approve" })}
          >
            Approve
          </Button>
          <Button
            size="sm"
            variant="danger"
            onClick={() => setPending({ prescription: item, action: "reject" })}
          >
            Reject
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <SectionHeading
        title="Prescriptions"
        description="Verification actions are UI only for now."
      />
      {/* TODO: Connect prescription verification backend */}
      <DataTable
        columns={columns}
        rows={prescriptions}
        rowKey={(item) => item.id}
        emptyTitle="No prescriptions to review"
      />

      <ConfirmationDialog
        open={pending !== null}
        title={
          pending?.action === "view"
            ? "Prescription details"
            : pending?.action === "approve"
              ? "Approve prescription"
              : "Reject prescription"
        }
        description={
          pending
            ? `${pending.prescription.fileName} · ${pending.prescription.customerName} · Dr. ${pending.prescription.doctorName}`
            : undefined
        }
        confirmLabel={pending?.action === "reject" ? "Reject" : "Confirm"}
        tone={pending?.action === "reject" ? "danger" : "success"}
        onConfirm={() => setPending(null)}
        onCancel={() => setPending(null)}
      />
    </div>
  );
}
