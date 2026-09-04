import { createFileRoute } from "@tanstack/react-router";
import { UploadCloud } from "lucide-react";
import { Button } from "@/components/common/Button";
import { EmptyState } from "@/components/common/EmptyState";
import { Input } from "@/components/common/Input";
import { SectionHeading } from "@/components/common/SectionHeading";
import { PrescriptionCard } from "@/components/prescription/PrescriptionCard";
import { getPrescriptionsByCustomer } from "@/data/prescriptions";
import { currentCustomer } from "@/data/users";
import { CustomerLayout } from "@/layouts/CustomerLayout";

const title = "Prescriptions — MediTrack";
const description = "Upload prescriptions and track pharmacist verification status.";

export const Route = createFileRoute("/prescriptions")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: PrescriptionsPage,
});

function PrescriptionsPage() {
  const history = getPrescriptionsByCustomer(currentCustomer.id);

  return (
    <CustomerLayout>
      <div className="container-page grid gap-8 py-10 lg:grid-cols-[22rem_1fr]">
        <section className="h-fit rounded-xl border border-border bg-card p-5 shadow-card">
          <h2 className="text-sm font-semibold text-foreground">Upload Prescription</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            A pharmacist reviews every upload before Rx medicines ship.
          </p>
          {/* TODO: Connect prescription upload API */}
          <div className="mt-4 flex flex-col items-center rounded-xl border border-dashed border-border bg-muted/40 px-4 py-8 text-center">
            <UploadCloud className="h-7 w-7 text-muted-foreground" />
            <p className="mt-2 text-sm font-medium text-foreground">Drop a file here</p>
            <p className="text-xs text-muted-foreground">JPG, PNG or PDF up to 5 MB</p>
          </div>
          <div className="mt-4 space-y-3">
            <Input label="Doctor name" placeholder="Dr. A. Sharma" />
            <Input label="Notes (optional)" placeholder="Anything the pharmacist should know" />
            <Button className="w-full">Submit for Review</Button>
          </div>
        </section>

        <section>
          <SectionHeading
            as="h1"
            title="Prescription History"
            description="Statuses are mock values for now."
          />
          {/* TODO: Implement pharmacist verification workflow */}
          {history.length === 0 ? (
            <EmptyState
              title="No prescriptions uploaded"
              description="Uploads appear here with their review status."
            />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {history.map((prescription) => (
                <PrescriptionCard key={prescription.id} prescription={prescription} />
              ))}
            </div>
          )}
        </section>
      </div>
    </CustomerLayout>
  );
}
