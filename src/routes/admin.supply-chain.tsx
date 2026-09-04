import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/common/Button";
import { DataTable, type Column } from "@/components/common/DataTable";
import { SectionHeading } from "@/components/common/SectionHeading";
import { StatusBadge } from "@/components/common/StatusBadge";
import { replenishmentRequests } from "@/data/inventory";
import type { ReplenishmentRequest } from "@/types/inventory";
import { formatDate, titleCase } from "@/utils/format";
import { replenishmentStatusTone } from "@/utils/status-tones";

const title = "Supply Chain — MediTrack Admin";
const description = "Replenishment requests triggered by low quantity or expiry risk.";

export const Route = createFileRoute("/admin/supply-chain")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: SupplyChainPage,
});

const triggerLabel: Record<ReplenishmentRequest["trigger"], string> = {
  "low-quantity": "Low Quantity",
  "expiry-risk": "Expiry Risk",
};

function SupplyChainPage() {
  const columns: Array<Column<ReplenishmentRequest>> = [
    { key: "medicine", header: "Medicine", render: (item) => item.medicineName },
    { key: "current", header: "Current Quantity", render: (item) => item.currentQuantity },
    { key: "target", header: "Target Quantity", render: (item) => item.targetQuantity },
    {
      key: "trigger",
      header: "Trigger",
      render: (item) => (
        <StatusBadge tone={item.trigger === "expiry-risk" ? "danger" : "warning"}>
          {triggerLabel[item.trigger]}
        </StatusBadge>
      ),
    },
    { key: "expiry", header: "Expiry", render: (item) => formatDate(item.expiryDate) },
    {
      key: "status",
      header: "Status",
      render: (item) => (
        <StatusBadge tone={replenishmentStatusTone[item.status]}>
          {titleCase(item.status)}
        </StatusBadge>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <SectionHeading
            as="h1"
        title="Supply Chain"
        description="Replenishment requests are mock records."
        action={<Button variant="outline">New Request</Button>}
      />
      {/* TODO: Implement replenishment workflow */}
      <DataTable
        columns={columns}
        rows={replenishmentRequests}
        rowKey={(item) => item.id}
        emptyTitle="No replenishment requests"
      />
    </div>
  );
}
