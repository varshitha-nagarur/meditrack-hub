import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import { SectionHeading } from "@/components/common/SectionHeading";
import { StatusBadge } from "@/components/common/StatusBadge";
import { OrderCard } from "@/components/customer/OrderCard";
import { PrescriptionCard } from "@/components/prescription/PrescriptionCard";
import { getMedicineById, getMedicinesByTag } from "@/data/medicines";
import { getOrdersByCustomer, wishlistMedicineIds } from "@/data/orders";
import { getPrescriptionsByCustomer } from "@/data/prescriptions";
import { currentCustomer } from "@/data/users";
import { CustomerLayout } from "@/layouts/CustomerLayout";
import { formatDate, formatINR } from "@/utils/format";

const title = "Your Profile — MediTrack";
const description = "Personal details, addresses, orders, prescriptions and refill suggestions.";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const orders = getOrdersByCustomer(currentCustomer.id).slice(0, 2);
  const prescriptions = getPrescriptionsByCustomer(currentCustomer.id).slice(0, 2);
  const refills = getMedicinesByTag("refill").slice(0, 3);
  const wishlist = wishlistMedicineIds.map((id) => getMedicineById(id)).filter(Boolean);

  return (
    <CustomerLayout>
      <div className="container-page space-y-10 py-10">
        <SectionHeading
            as="h1"
          title={currentCustomer.name}
          description={`${currentCustomer.email} · Member since ${formatDate(currentCustomer.joinedOn)}`}
        />

        <Panel title="Personal Information">
          {/* TODO: Connect authentication provider — profile data is mock */}
          <div className="grid gap-3 sm:grid-cols-2">
            <Input label="Full name" defaultValue={currentCustomer.name} />
            <Input label="Email" defaultValue={currentCustomer.email} />
            <Input label="Phone" defaultValue={currentCustomer.phone} />
            <Input label="Role" defaultValue={currentCustomer.role} readOnly />
          </div>
          <Button className="mt-4">Save Changes</Button>
        </Panel>

        <Panel title="Addresses">
          <div className="grid gap-3 sm:grid-cols-2">
            {currentCustomer.addresses.map((address) => (
              <div key={address.id} className="rounded-lg border border-border p-4 text-sm">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-foreground">{address.label}</p>
                  {address.isDefault ? <StatusBadge tone="primary">Default</StatusBadge> : null}
                </div>
                <p className="mt-1 text-muted-foreground">
                  {address.line1}
                  {address.line2 ? `, ${address.line2}` : ""}, {address.city}, {address.state} —{" "}
                  {address.pincode}
                </p>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Refill Suggestions">
          {/* TODO: Replace mock co-purchase rules with backend CRM logic */}
          <div className="grid gap-3 sm:grid-cols-3">
            {refills.map((medicine) => (
              <div key={medicine.id} className="rounded-lg border border-border p-4">
                <p className="text-sm text-muted-foreground">
                  You previously purchased {medicine.name}.
                </p>
                <p className="mt-1 text-sm font-semibold text-foreground">
                  {formatINR(medicine.price)}
                </p>
                <Link to="/medicines/$id" params={{ id: medicine.id }} className="mt-3 block">
                  <Button size="sm" className="w-full">
                    Buy Again
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Recent Orders">
          <div className="grid gap-4">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
          <Link to="/orders" className="mt-4 inline-block text-sm text-primary hover:underline">
            View all orders
          </Link>
        </Panel>

        <Panel title="Prescriptions">
          <div className="grid gap-4 sm:grid-cols-2">
            {prescriptions.map((prescription) => (
              <PrescriptionCard key={prescription.id} prescription={prescription} />
            ))}
          </div>
        </Panel>

        <Panel title="Wishlist">
          <p className="text-sm text-muted-foreground">
            {wishlist.length} saved medicines.{" "}
            <Link to="/wishlist" className="text-primary hover:underline">
              Open wishlist
            </Link>
          </p>
        </Panel>

        <Panel title="Security">
          {/* TODO: Implement secure sessions/JWT */}
          <div className="grid gap-3 sm:grid-cols-2">
            <Input label="Current password" type="password" placeholder="••••••••" />
            <Input label="New password" type="password" placeholder="••••••••" />
          </div>
          <Button className="mt-4" variant="outline">
            Update Password
          </Button>
        </Panel>
      </div>
    </CustomerLayout>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-border bg-card p-5 shadow-card">
      <h2 className="mb-4 text-sm font-semibold text-foreground">{title}</h2>
      {children}
    </section>
  );
}
