import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import { SectionHeading } from "@/components/common/SectionHeading";
import { DEFAULT_MAXIMUM_LEVEL, DEFAULT_REORDER_LEVEL, EXPIRY_RISK_MONTHS } from "@/utils/inventory-rules";

const title = "Settings — MediTrack Admin";
const description = "Pharmacy profile, inventory thresholds and notification preferences.";

export const Route = createFileRoute("/admin/settings")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <div className="space-y-6">
      <SectionHeading
            as="h1" title="Settings" description="Values are placeholders — nothing is saved." />

      <section className="rounded-xl border border-border bg-card p-5 shadow-card">
        <h2 className="mb-4 text-sm font-semibold text-foreground">Pharmacy Profile</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <Input label="Pharmacy name" defaultValue="MediTrack Pharmacy" />
          <Input label="Licence number" defaultValue="MH-PH-2024-0198" />
          <Input label="Support email" defaultValue="support@meditrack.example" />
          <Input label="Support phone" defaultValue="+91 90000 12345" />
        </div>
      </section>

      <section className="rounded-xl border border-border bg-card p-5 shadow-card">
        <h2 className="mb-4 text-sm font-semibold text-foreground">Inventory Rules</h2>
        {/* TODO: Implement reorder rule on the backend */}
        <div className="grid gap-3 sm:grid-cols-3">
          <Input
            label="Reorder level (units)"
            type="number"
            defaultValue={DEFAULT_REORDER_LEVEL}
            hint="Reorder when quantity is at or below this value."
          />
          <Input
            label="Maximum replenish level (units)"
            type="number"
            defaultValue={DEFAULT_MAXIMUM_LEVEL}
          />
          <Input
            label="Expiry risk window (months)"
            type="number"
            defaultValue={EXPIRY_RISK_MONTHS}
          />
        </div>
        <Button className="mt-4">Save Settings</Button>
      </section>
    </div>
  );
}
