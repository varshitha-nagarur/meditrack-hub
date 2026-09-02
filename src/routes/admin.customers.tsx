import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { DataTable, type Column } from "@/components/common/DataTable";
import { Button } from "@/components/common/Button";
import { SectionHeading } from "@/components/common/SectionHeading";
import { StatusBadge } from "@/components/common/StatusBadge";
import { getMedicinesByTag } from "@/data/medicines";
import { getOrdersByCustomer } from "@/data/orders";
import { getPrescriptionsByCustomer } from "@/data/prescriptions";
import { users } from "@/data/users";
import type { User } from "@/types/user";
import { formatDate, formatINR, titleCase } from "@/utils/format";

const title = "Customer Management — MediTrack Admin";
const description = "Customer records with order history, prescriptions and refill suggestions.";

export const Route = createFileRoute("/admin/customers")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: AdminCustomersPage,
});

function AdminCustomersPage() {
  const customers = users.filter((user) => user.role === "customer");
  const [selected, setSelected] = useState<User | null>(customers[0] ?? null);

  const columns: Array<Column<User>> = [
    { key: "name", header: "Name", render: (user) => user.name },
    { key: "email", header: "Email", render: (user) => user.email },
    { key: "phone", header: "Phone", render: (user) => user.phone },
    { key: "orders", header: "Orders", render: (user) => user.totalOrders },
    {
      key: "last",
      header: "Last Order",
      render: (user) => (user.lastOrderDate ? formatDate(user.lastOrderDate) : "—"),
    },
    {
      key: "status",
      header: "Status",
      render: (user) => (
        <StatusBadge tone={user.status === "active" ? "success" : "neutral"}>
          {titleCase(user.status)}
        </StatusBadge>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (user) => (
        <Button size="sm" variant="outline" onClick={() => setSelected(user)}>
          View
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <SectionHeading title="Customers" description="CRM records come from mock data." />
      {/* TODO: Replace mock data with backend API */}
      <DataTable columns={columns} rows={customers} rowKey={(user) => user.id} />

      {selected ? <CustomerDetail customer={selected} /> : null}
    </div>
  );
}

function CustomerDetail({ customer }: { customer: User }) {
  const orders = getOrdersByCustomer(customer.id);
  const prescriptions = getPrescriptionsByCustomer(customer.id);
  const refills = getMedicinesByTag("refill").slice(0, 3);

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Panel title="Personal Information">
        <dl className="space-y-1 text-sm">
          <Row label="Name" value={customer.name} />
          <Row label="Email" value={customer.email} />
          <Row label="Phone" value={customer.phone} />
          <Row label="Joined" value={formatDate(customer.joinedOn)} />
        </dl>
      </Panel>

      <Panel title="Order History">
        {orders.length === 0 ? (
          <p className="text-sm text-muted-foreground">No orders yet.</p>
        ) : (
          <ul className="divide-y divide-border text-sm">
            {orders.map((order) => (
              <li key={order.id} className="flex justify-between py-2">
                <span className="text-foreground">{order.id}</span>
                <span className="text-muted-foreground">{formatINR(order.total)}</span>
              </li>
            ))}
          </ul>
        )}
      </Panel>

      <Panel title="Prescription History">
        {prescriptions.length === 0 ? (
          <p className="text-sm text-muted-foreground">No prescriptions uploaded.</p>
        ) : (
          <ul className="divide-y divide-border text-sm">
            {prescriptions.map((prescription) => (
              <li key={prescription.id} className="flex justify-between py-2">
                <span className="text-foreground">{prescription.id}</span>
                <span className="text-muted-foreground">{titleCase(prescription.status)}</span>
              </li>
            ))}
          </ul>
        )}
      </Panel>

      <Panel title="Refill Suggestions">
        {/* TODO: Replace mock co-purchase rules with backend CRM logic */}
        <ul className="divide-y divide-border text-sm">
          {refills.map((medicine) => (
            <li key={medicine.id} className="flex justify-between py-2">
              <span className="text-foreground">{medicine.name}</span>
              <span className="text-muted-foreground">{formatINR(medicine.price)}</span>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-border bg-card p-5 shadow-card">
      <h2 className="mb-3 text-sm font-semibold text-foreground">{title}</h2>
      {children}
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-foreground">{value}</dd>
    </div>
  );
}
