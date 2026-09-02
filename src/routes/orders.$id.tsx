import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { StatusBadge } from "@/components/common/StatusBadge";
import { OrderTimeline } from "@/components/customer/OrderTimeline";
import { getOrderById } from "@/data/orders";
import { CustomerLayout } from "@/layouts/CustomerLayout";
import { formatDate, formatINR, titleCase } from "@/utils/format";
import {
  orderStatusTone,
  paymentStatusTone,
  prescriptionStatusTone,
} from "@/utils/status-tones";

export const Route = createFileRoute("/orders/$id")({
  loader: ({ params }) => {
    const order = getOrderById(params.id);
    if (!order) throw notFound();
    return { order };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Order unavailable — MediTrack" }, { name: "robots", content: "noindex" }],
      };
    }
    const title = `Order ${loaderData.order.id} — MediTrack`;
    const description = `Items, payment, prescription status and delivery timeline for order ${loaderData.order.id}.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: OrderDetailsPage,
});

function OrderDetailsPage() {
  const { order } = Route.useLoaderData();

  return (
    <CustomerLayout>
      <div className="container-page py-10">
        <nav className="mb-6 text-sm text-muted-foreground">
          <Link to="/orders" className="hover:text-primary">
            Orders
          </Link>
          <span className="px-2">/</span>
          <span className="text-foreground">{order.id}</span>
        </nav>

        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">{order.id}</h1>
            <p className="text-sm text-muted-foreground">
              Placed on {formatDate(order.placedOn)}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <StatusBadge tone={paymentStatusTone[order.paymentStatus]}>
              {titleCase(order.paymentStatus)}
            </StatusBadge>
            <StatusBadge tone={orderStatusTone[order.orderStatus]}>
              {titleCase(order.orderStatus)}
            </StatusBadge>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_20rem]">
          <div className="space-y-6">
            <Panel title="Order Summary">
              <ul className="divide-y divide-border">
                {order.items.map((item) => (
                  <li key={item.medicineId} className="flex items-center gap-3 py-3">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      loading="lazy"
                      width={800}
                      height={800}
                      className="h-11 w-11 rounded-md border border-border object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm text-foreground">{item.name}</p>
                      <p className="text-xs text-muted-foreground">Qty {item.quantity}</p>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {formatINR(item.unitPrice * item.quantity)}
                    </span>
                  </li>
                ))}
              </ul>
              <dl className="mt-3 space-y-1 border-t border-border pt-3 text-sm">
                <Row label="Subtotal" value={formatINR(order.subtotal)} />
                <Row label="Delivery fee" value={formatINR(order.deliveryFee)} />
                <Row label="Discount" value={`− ${formatINR(order.discount)}`} />
                <Row label="Total" value={formatINR(order.total)} strong />
              </dl>
            </Panel>

            <Panel title="Order Timeline">
              <OrderTimeline steps={order.timeline} />
            </Panel>
          </div>

          <div className="space-y-6">
            <Panel title="Delivery Address">
              <p className="text-sm text-muted-foreground">{order.deliveryAddress}</p>
            </Panel>
            <Panel title="Payment Information">
              <dl className="space-y-1 text-sm">
                <Row label="Method" value={titleCase(order.paymentMethod)} />
                <Row label="Status" value={titleCase(order.paymentStatus)} />
              </dl>
            </Panel>
            <Panel title="Prescription Status">
              <StatusBadge tone={prescriptionStatusTone[
                order.prescriptionStatus === "not-required" ? "verified" : order.prescriptionStatus
              ]}>
                {titleCase(order.prescriptionStatus)}
              </StatusBadge>
            </Panel>
          </div>
        </div>
      </div>
    </CustomerLayout>
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

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <dt className={strong ? "font-semibold text-foreground" : "text-muted-foreground"}>{label}</dt>
      <dd className={strong ? "font-semibold text-foreground" : "text-foreground"}>{value}</dd>
    </div>
  );
}
