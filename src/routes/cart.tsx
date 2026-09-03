import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Minus, Plus, ShoppingCart, Timer, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/common/Button";
import { EmptyState } from "@/components/common/EmptyState";
import { SectionHeading } from "@/components/common/SectionHeading";
import { StatusBadge } from "@/components/common/StatusBadge";
import { StockBadge } from "@/components/common/StockBadge";
import { useStore } from "@/hooks/useStore";
import { CustomerLayout } from "@/layouts/CustomerLayout";
import { buildCartItems, calculateTotals, requiresPrescription } from "@/utils/cart";
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

/** Purely visual hold countdown. */
function useMockReservationTimer(seconds: number) {
  const [remaining, setRemaining] = useState(seconds);
  useEffect(() => {
    const interval = setInterval(() => setRemaining((value) => Math.max(0, value - 1)), 1000);
    return () => clearInterval(interval);
  }, []);
  const minutes = Math.floor(remaining / 60);
  return `${String(minutes).padStart(2, "0")}:${String(remaining % 60).padStart(2, "0")}`;
}

function CartPage() {
  const { cart, setQuantity, removeFromCart, moveToWishlist } = useStore();
  const items = buildCartItems(cart);
  const totals = calculateTotals(items);
  const needsRx = requiresPrescription(items);
  // TODO: Replace frontend stock reservation with server-side TTL stock hold.
  const holdTimer = useMockReservationTimer(9 * 60 + 45);

  return (
    <CustomerLayout>
      <div className="container-page py-10">
        <SectionHeading
          title="Cart"
          description={`${totals.itemCount} item${totals.itemCount === 1 ? "" : "s"} in your cart.`}
        />

        {items.length === 0 ? (
          <EmptyState
            icon={<ShoppingCart className="h-6 w-6" />}
            title="Your cart is empty"
            description="Browse the catalogue to add medicines to your cart."
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
                  <p className="text-xs text-muted-foreground">
                    Stock hold timer · {holdTimer} remaining (frontend simulation)
                  </p>
                </div>
              </div>

              {needsRx ? (
                <div className="rounded-xl border border-info/40 bg-info-soft p-4">
                  <p className="text-sm font-semibold text-info">Prescription Required</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Some items need pharmacist verification before checkout completes.
                  </p>
                </div>
              ) : null}

              {items.map((item) => (
                <article
                  key={item.medicineId}
                  className="flex flex-wrap items-center gap-4 rounded-xl border border-border bg-card p-4 shadow-card"
                >
                  <Link to="/medicines/$id" params={{ id: item.medicineId }} className="shrink-0">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      loading="lazy"
                      width={800}
                      height={800}
                      className="h-16 w-16 rounded-lg border border-border object-cover"
                    />
                  </Link>
                  <div className="min-w-40 flex-1">
                    <Link
                      to="/medicines/$id"
                      params={{ id: item.medicineId }}
                      className="text-sm font-semibold text-foreground hover:text-primary"
                    >
                      {item.name}
                    </Link>
                    <p className="text-xs text-muted-foreground">{item.composition}</p>
                    <div className="mt-1 flex flex-wrap items-center gap-1.5">
                      <StockBadge status={item.stockStatus} />
                      {item.prescriptionRequired ? (
                        <StatusBadge tone="info">Rx Required</StatusBadge>
                      ) : null}
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {formatINR(item.unitPrice)} each
                    </p>
                  </div>

                  <div className="flex items-center rounded-lg border border-border">
                    <button
                      className="p-2 text-muted-foreground hover:text-foreground"
                      aria-label={`Decrease quantity of ${item.name}`}
                      onClick={() => setQuantity(item.medicineId, item.quantity - 1)}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-9 text-center text-sm font-medium">{item.quantity}</span>
                    <button
                      className="p-2 text-muted-foreground hover:text-foreground"
                      aria-label={`Increase quantity of ${item.name}`}
                      onClick={() => setQuantity(item.medicineId, item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  <p className="w-24 text-right text-sm font-semibold text-foreground">
                    {formatINR(item.unitPrice * item.quantity)}
                  </p>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      aria-label={`Move ${item.name} to wishlist`}
                      onClick={() => moveToWishlist(item.medicineId)}
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      aria-label={`Remove ${item.name}`}
                      onClick={() => removeFromCart(item.medicineId)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </article>
              ))}
            </div>

            <aside className="h-fit rounded-xl border border-border bg-card p-5 shadow-card lg:sticky lg:top-20">
              <h2 className="text-sm font-semibold text-foreground">Order Summary</h2>
              <dl className="mt-4 space-y-2 text-sm">
                <Row label="Subtotal" value={formatINR(totals.subtotal)} />
                <Row
                  label="Delivery fee"
                  value={totals.deliveryFee === 0 ? "Free" : formatINR(totals.deliveryFee)}
                />
                <div className="border-t border-border pt-2">
                  <Row label="Total" value={formatINR(totals.total)} strong />
                </div>
              </dl>
              <Link to="/checkout" className="mt-5 block">
                <Button className="w-full">Proceed to Checkout</Button>
              </Link>
              <Link to="/medicines" className="mt-3 block">
                <Button variant="outline" className="w-full">
                  Continue Shopping
                </Button>
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
