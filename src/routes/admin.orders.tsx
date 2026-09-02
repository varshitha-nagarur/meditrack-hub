import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { DataTable, type Column } from "@/components/common/DataTable";
import { SectionHeading } from "@/components/common/SectionHeading";
import { StatusBadge } from "@/components/common/StatusBadge";
import { orders } from "@/data/orders";
import type { Order } from "@/types/order";
import { formatDate, formatINR, titleCase } from "@/utils/format";
import {
  orderStatusTone,
  paymentStatusTone,
  prescriptionStatusTone,
} from "@/utils/status-tones";
import { cn } from "@/lib/utils";

const title = "Order Management — MediTrack Admin";
const description = "Filter pharmacy orders by payment, prescription and fulfilment status.";

export const Route = createFileRoute("/admin/orders")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: AdminOrdersPage,
});

const filters = [
  "All",
  "Pending",
  "Paid",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
] as const;

function matchesFilter(order: Order, filter: (typeof filters)[number]) {
  switch (filter) {
    case "All":
      return true;
    case "Pending":
      return order.paymentStatus === "pending";
    case "Paid":
      return order.paymentStatus === "paid";
    case "Processing":
      return order.orderStatus === "processing";
    case "Shipped":
      return order.orderStatus === "out-for-delivery" || order.orderStatus === "packed";
    case "Delivered":
      return order.orderStatus === "delivered";
    case "Cancelled":
      return order.orderStatus === "cancelled";
  }
}

function AdminOrdersPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const rows = orders.filter((order) => matchesFilter(order, filter));

  const columns: Array<Column<Order>> = [
    { key: "id", header: "Order ID", render: (order) => order.id },
    { key: "customer", header: "Customer", render: (order) => order.customerName },
    { key: "amount", header: "Amount", render: (order) => formatINR(order.total) },
    {
      key: "payment",
      header: "Payment Status",
      render: (order) => (
        <StatusBadge tone={paymentStatusTone[order.paymentStatus]}>
          {titleCase(order.paymentStatus)}
        </StatusBadge>
      ),
    },
    {
      key: "prescription",
      header: "Prescription Status",
      render: (order) => (
        <StatusBadge
          tone={
            order.prescriptionStatus === "not-required"
              ? "neutral"
              : prescriptionStatusTone[order.prescriptionStatus]
          }
        >
          {titleCase(order.prescriptionStatus)}
        </StatusBadge>
      ),
    },
    {
      key: "status",
      header: "Order Status",
      render: (order) => (
        <StatusBadge tone={orderStatusTone[order.orderStatus]}>
          {titleCase(order.orderStatus)}
        </StatusBadge>
      ),
    },
    { key: "date", header: "Date", render: (order) => formatDate(order.placedOn) },
  ];

  return (
    <div className="space-y-6">
      <SectionHeading title="Orders" description="Order records come from mock data." />

      <div className="flex flex-wrap gap-2">
        {filters.map((item) => (
          <button
            key={item}
            onClick={() => setFilter(item)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-sm",
              filter === item
                ? "border-primary bg-primary-soft text-primary"
                : "border-border bg-card text-muted-foreground hover:text-foreground",
            )}
          >
            {item}
          </button>
        ))}
      </div>

      <DataTable
        columns={columns}
        rows={rows}
        rowKey={(order) => order.id}
        emptyTitle="No orders for this filter"
      />
    </div>
  );
}
