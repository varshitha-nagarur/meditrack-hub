import { DataTable, type Column } from "@/components/common/DataTable";
import { Button } from "@/components/common/Button";
import { StatusBadge } from "@/components/common/StatusBadge";
import type { InventoryRecord } from "@/types/inventory";
import { getInventoryStatus } from "@/utils/inventory-rules";
import { inventoryStatusLabel, inventoryStatusTone } from "@/utils/status-tones";
import { formatDate } from "@/utils/format";

interface InventoryTableProps {
  records: InventoryRecord[];
  onEdit?: (record: InventoryRecord) => void;
}

/** Inventory grid shared by the inventory and supply-chain screens. */
export function InventoryTable({ records, onEdit }: InventoryTableProps) {
  const columns: Array<Column<InventoryRecord>> = [
    {
      key: "medicine",
      header: "Medicine",
      render: (record) => (
        <div>
          <p className="font-medium text-foreground">{record.medicineName}</p>
          <p className="text-xs text-muted-foreground">{record.location}</p>
        </div>
      ),
    },
    { key: "batch", header: "Batch", render: (record) => record.batchNumber },
    { key: "quantity", header: "Quantity", render: (record) => record.quantity },
    { key: "reorder", header: "Reorder Level", render: (record) => record.reorderLevel },
    { key: "maximum", header: "Maximum Level", render: (record) => record.maximumLevel },
    { key: "expiry", header: "Expiry", render: (record) => formatDate(record.expiryDate) },
    {
      key: "status",
      header: "Status",
      render: (record) => {
        const status = getInventoryStatus(record);
        return (
          <StatusBadge tone={inventoryStatusTone[status]}>
            {inventoryStatusLabel[status]}
          </StatusBadge>
        );
      },
    },
    {
      key: "actions",
      header: "Actions",
      render: (record) => (
        <Button size="sm" variant="outline" onClick={() => onEdit?.(record)}>
          Update
        </Button>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      rows={records}
      rowKey={(record) => record.id}
      emptyTitle="No inventory records"
      emptyDescription="Receive a batch to populate inventory."
    />
  );
}
