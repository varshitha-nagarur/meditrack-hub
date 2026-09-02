import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/common/Button";
import { EmptyState } from "@/components/common/EmptyState";
import { SectionHeading } from "@/components/common/SectionHeading";
import { OrderCard } from "@/components/customer/OrderCard";
import { getOrdersByCustomer } from "@/data/orders";
import { currentCustomer } from "@/data/users";
import { CustomerLayout } from "@/layouts/CustomerLayout";

const title = "Your Orders — MediTrack";
const description = "Order history with payment status, order status and delivery progress.";

export const Route = createFileRoute("/orders/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: OrdersPage,
});

function OrdersPage() {
  const orders = getOrdersByCustomer(currentCustomer.id);

  return (
    <CustomerLayout>
      <div className="container-page py-10">
        <SectionHeading title="Orders" description="Mock order history for this account." />
        {orders.length === 0 ? (
          <EmptyState
            title="No orders yet"
            description="Your first order will appear here."
            action={
              <Link to="/medicines">
                <Button>Shop Medicines</Button>
              </Link>
            }
          />
        ) : (
          <div className="grid gap-4">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </div>
    </CustomerLayout>
  );
}
