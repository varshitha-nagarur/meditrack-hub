import { createFileRoute, Link } from "@tanstack/react-router";
import { QrCode } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/common/Button";
import { ConfirmationDialog } from "@/components/common/ConfirmationDialog";
import { SearchBar } from "@/components/common/SearchBar";
import { SectionHeading } from "@/components/common/SectionHeading";
import { InventoryTable } from "@/components/inventory/InventoryTable";
import { inventoryRecords } from "@/data/inventory";
import type { InventoryRecord } from "@/types/inventory";
import { DEFAULT_MAXIMUM_LEVEL, DEFAULT_REORDER_LEVEL } from "@/utils/inventory-rules";

const title = "Inventory Management — MediTrack Admin";
const description = "Batch-level stock with reorder levels, expiry windows and status flags.";

export const Route = createFileRoute("/admin/inventory/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: AdminInventoryPage,
});

function AdminInventoryPage() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<InventoryRecord | null>(null);

  const records = useMemo(
    () =>
      inventoryRecords.filter((record) =>
        `${record.medicineName} ${record.batchNumber} ${record.supplier}`
          .toLowerCase()
          .includes(query.toLowerCase()),
      ),
    [query],
  );

  return (
    <div className="space-y-6">
      <SectionHeading
        as="h1"
        title="Inventory"
        description={`Reorder at ≤ ${DEFAULT_REORDER_LEVEL} units or expiry risk · replenish to ${DEFAULT_MAXIMUM_LEVEL} units.`}
        action={
          <Link to="/admin/inventory/scan">
            <Button>
              <QrCode className="h-4 w-4" />
              Scan Batch
            </Button>
          </Link>
        }
      />

      {/* TODO: Connect inventory API */}
      {/* TODO: Implement real-time stock synchronization */}
      <SearchBar
        value={query}
        onChange={setQuery}
        placeholder="Search medicine, batch or supplier"
      />

      <InventoryTable records={records} onEdit={setSelected} />

      <ConfirmationDialog
        open={selected !== null}
        title="Update stock quantity"
        description={
          selected
            ? `Confirm a stock update for ${selected.medicineName} (${selected.batchNumber}). This is a UI-only action.`
            : undefined
        }
        confirmLabel="Update"
        onConfirm={() => setSelected(null)}
        onCancel={() => setSelected(null)}
      />
    </div>
  );
}
