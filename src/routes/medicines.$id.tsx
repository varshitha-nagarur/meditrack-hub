import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Heart, ShoppingCart, Stethoscope } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/common/Button";
import { ExpiryBadge } from "@/components/common/ExpiryBadge";
import { StatusBadge } from "@/components/common/StatusBadge";
import { StockBadge } from "@/components/common/StockBadge";
import { MedicineCard } from "@/components/customer/MedicineCard";
import { frequentlyBoughtTogether, getMedicineById, medicines } from "@/data/medicines";
import { CustomerLayout } from "@/layouts/CustomerLayout";
import { formatDate, formatINR } from "@/utils/format";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/medicines/$id")({
  loader: ({ params }) => {
    const medicine = getMedicineById(params.id);
    if (!medicine) throw notFound();
    return { medicine };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Medicine unavailable — MediTrack" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const title = `${loaderData.medicine.name} — MediTrack`;
    const description = `${loaderData.medicine.composition} by ${loaderData.medicine.manufacturer}. Stock, batch and expiry details.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: MedicineDetailsPage,
});

const tabs = [
  { key: "product", label: "Product Information" },
  { key: "composition", label: "Composition" },
  { key: "storage", label: "Storage Information" },
  { key: "usage", label: "Usage Information" },
  { key: "returns", label: "Return Policy" },
] as const;

function MedicineDetailsPage() {
  const { medicine } = Route.useLoaderData();
  const [quantity, setQuantity] = useState(1);
  const [tab, setTab] = useState<(typeof tabs)[number]["key"]>("product");

  const related = (frequentlyBoughtTogether[medicine.id] ?? [])
    .map((id) => medicines.find((item) => item.id === id))
    .filter((item): item is (typeof medicines)[number] => Boolean(item));

  return (
    <CustomerLayout>
      <div className="container-page py-10">
        <nav className="mb-6 text-sm text-muted-foreground">
          <Link to="/medicines" className="hover:text-primary">
            Medicines
          </Link>
          <span className="px-2">/</span>
          <span className="text-foreground">{medicine.name}</span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-2">
          <img
            src={medicine.imageUrl}
            alt={medicine.name}
            width={800}
            height={800}
            className="aspect-square w-full rounded-xl border border-border object-cover shadow-card"
          />

          <div>
            <h1 className="text-2xl font-semibold text-foreground sm:text-3xl">{medicine.name}</h1>
            <p className="mt-2 text-sm text-muted-foreground">{medicine.composition}</p>
            <p className="text-sm text-muted-foreground">
              {medicine.manufacturer} · {medicine.packSize}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <StockBadge status={medicine.stockStatus} />
              <ExpiryBadge expiryDate={medicine.expiryDate} />
              {medicine.prescriptionRequired ? (
                <StatusBadge tone="info" icon={<Stethoscope className="h-3.5 w-3.5" />}>
                  Prescription Required
                </StatusBadge>
              ) : null}
            </div>

            <div className="mt-5 flex items-baseline gap-3">
              <span className="text-3xl font-semibold text-foreground">
                {formatINR(medicine.price)}
              </span>
              <span className="text-sm text-muted-foreground line-through">
                {formatINR(medicine.mrp)}
              </span>
            </div>

            <dl className="mt-5 grid gap-2 rounded-xl border border-border bg-card p-4 text-sm shadow-card sm:grid-cols-2">
              <Detail label="Batch number" value={medicine.batchNumber} />
              <Detail label="Expiry date" value={formatDate(medicine.expiryDate)} />
              <Detail label="Units available" value={String(medicine.quantityAvailable)} />
              <Detail label="Rating" value={`${medicine.rating} / 5`} />
            </dl>

            {medicine.prescriptionRequired ? (
              <div className="mt-4 rounded-xl border border-info/40 bg-info-soft p-4">
                <p className="text-sm font-semibold text-info">Prescription Required</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  This medicine requires prescription verification before checkout.
                </p>
              </div>
            ) : null}

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <div className="flex items-center rounded-lg border border-border">
                <button
                  className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
                  onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="w-10 text-center text-sm font-medium">{quantity}</span>
                <button
                  className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
                  onClick={() => setQuantity((value) => value + 1)}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
              {/* TODO: Connect cart service to backend API */}
              <Button disabled={medicine.stockStatus === "out-of-stock"}>
                <ShoppingCart className="h-4 w-4" />
                Add to Cart
              </Button>
              <Button variant="outline">
                <Heart className="h-4 w-4" />
                Wishlist
              </Button>
            </div>
          </div>
        </div>

        <section className="mt-12">
          <div className="flex flex-wrap gap-2 border-b border-border">
            {tabs.map((item) => (
              <button
                key={item.key}
                onClick={() => setTab(item.key)}
                className={cn(
                  "-mb-px border-b-2 px-3 py-2 text-sm font-medium transition-colors",
                  tab === item.key
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground",
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="rounded-b-xl border border-t-0 border-border bg-card p-5 text-sm text-muted-foreground shadow-card">
            {tab === "product" ? (
              <p>
                {medicine.name} ({medicine.packSize}) manufactured by {medicine.manufacturer}.
                Informational content only — not medical advice.
              </p>
            ) : null}
            {tab === "composition" ? <p>{medicine.composition}</p> : null}
            {tab === "storage" ? <p>{medicine.storageInfo}</p> : null}
            {tab === "usage" ? <p>{medicine.usageInfo}</p> : null}
            {tab === "returns" ? <p>{medicine.returnPolicy}</p> : null}
          </div>
        </section>

        {related.length > 0 ? (
          <section className="mt-12">
            <h2 className="mb-4 text-xl font-semibold text-foreground">
              Frequently purchased together
            </h2>
            {/* TODO: Replace mock co-purchase rules with backend CRM logic */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((item) => (
                <MedicineCard key={item.id} medicine={item} />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </CustomerLayout>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="font-medium text-foreground">{value}</dd>
    </div>
  );
}
