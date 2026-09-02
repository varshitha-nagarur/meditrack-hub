import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Timer, Trash2 } from "lucide-react";
import { Button } from "@/components/common/Button";
import { EmptyState } from "@/components/common/EmptyState";
import { SectionHeading } from "@/components/common/SectionHeading";
import { StockBadge } from "@/components/common/StockBadge";
import { cartItems } from "@/data/orders";
import { CustomerLayout } from "@/layouts/CustomerLayout";
import { formatINR } from "@/utils/format";

const title = "Your Cart — MediTrack";
const description = "Review medicines, quantities and reserved stock before checkout.";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const subtotal = cartItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const deliveryFee = subtotal > 500 ? 0 : 40;

  return (
    <CustomerLayout>
      <div className="container-page py-10">
        <SectionHeading title="Cart" description="Quantities and totals use mock data." />

        {cartItems.length === 0 ? (
          <EmptyState
            title="Your cart is empty"
            description="Browse the catalogue to add medicines."
            action={
              <Link to="/medicines">
                <Button>Shop Medicines</Button>
              </Link>
            }
          />
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1fr_20rem]">
            <div className="space-y-4">
              <div className="flex items-center gap-3 rounded-xl border border-warning/40 bg-warning-soft p-4">
                <Timer className="h-5 w-5 text-warning-foreground" />
                <div>
                  <p className="text-sm font-semibold text-warning-foreground">
                    Stock reserved temporarily
                  </p>
                  {/* TODO: Implement TTL-based stock reservation */}
                  <p className="text-xs text-muted-foreground">Stock hold timer · 09:45 remaining</p>
                </div>
              </div>

              {cartItems.map((item) => (
                <article
                  key={item.medicineId}
                  className="flex flex-wrap items-center gap-4 rounded-xl border border-border bg-card p-4 shadow-card"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    loading="lazy"
                    width={800}
                    height={800}
                    className="h-16 w-16 rounded-lg border border-border object-cover"
                  />
                  <div className="min-w-40 flex-1">
                    <p className="text-sm font-semibold text-foreground">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.composition}</p>
                    <div className="mt-1">
                      <StockBadge status={item.stockStatus} />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">Qty {item.quantity}</p>
                  <p className="text-sm font-semibold text-foreground">
                    {formatINR(item.unitPrice * item.quantity)}
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" aria-label="Move to wishlist">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" aria-label="Remove item">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </article>
              ))}
            </div>

            <aside className="h-fit rounded-xl border border-border bg-card p-5 shadow-card">
              <h2 className="text-sm font-semibold text-foreground">Order Summary</h2>
              <dl className="mt-4 space-y-2 text-sm">
                <Row label="Subtotal" value={formatINR(subtotal)} />
                <Row label="Delivery fee" value={formatINR(deliveryFee)} />
                <div className="border-t border-border pt-2">
                  <Row label="Total" value={formatINR(subtotal + deliveryFee)} strong />
                </div>
              </dl>
              <Link to="/checkout" className="mt-5 block">
                <Button className="w-full">Proceed to Checkout</Button>
              </Link>
            </aside>
          </div>
        )}
      </div>
    </CustomerLayout>
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
