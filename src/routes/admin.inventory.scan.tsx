import { createFileRoute } from "@tanstack/react-router";
import { QrCode, ScanLine } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/common/Button";
import { EmptyState } from "@/components/common/EmptyState";
import { SectionHeading } from "@/components/common/SectionHeading";
import { mockScannedBatch } from "@/data/inventory";
import { formatDate } from "@/utils/format";

const title = "Batch Scanning — MediTrack Admin";
const description = "Mock QR/RFID batch scanning interface for stock receiving.";

export const Route = createFileRoute("/admin/inventory/scan")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: ScanPage,
});

function ScanPage() {
  const [scanned, setScanned] = useState(false);

  return (
    <div className="space-y-6">
      <SectionHeading
        as="h1"
        title="Scan Batch"
        description="QR / RFID scanning is mocked — no hardware is connected."
      />

      {/* TODO: Integrate QR/RFID scanner */}
      <div className="flex flex-col items-center rounded-xl border border-dashed border-border bg-card px-6 py-12 text-center shadow-card">
        <ScanLine className="h-8 w-8 text-primary" />
        <p className="mt-3 text-sm font-medium text-foreground">
          Point the scanner at a batch label
        </p>
        <p className="text-xs text-muted-foreground">Supports QR codes and RFID tags.</p>
        <Button className="mt-5" onClick={() => setScanned(true)}>
          <QrCode className="h-4 w-4" />
          Scan Batch
        </Button>
      </div>

      {scanned ? (
        <section className="rounded-xl border border-border bg-card p-5 shadow-card">
          <h2 className="text-sm font-semibold text-foreground">Scan Result</h2>
          <dl className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <Detail label="Batch ID" value={mockScannedBatch.batchId} />
            <Detail label="Medicine" value={mockScannedBatch.medicineName} />
            <Detail label="Quantity" value={String(mockScannedBatch.quantity)} />
            <Detail
              label="Manufacturing Date"
              value={formatDate(mockScannedBatch.manufacturingDate)}
            />
            <Detail label="Expiry Date" value={formatDate(mockScannedBatch.expiryDate)} />
            <Detail label="Supplier" value={mockScannedBatch.supplier} />
          </dl>
          <div className="mt-5 flex flex-wrap gap-2">
            <Button variant="success">Confirm Stock Entry</Button>
            <Button variant="outline">Update Quantity</Button>
          </div>
        </section>
      ) : (
        <EmptyState
          title="No batch scanned yet"
          description="Scan results will appear here with batch, expiry and supplier details."
        />
      )}
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border p-3">
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="text-sm font-medium text-foreground">{value}</dd>
    </div>
  );
}
