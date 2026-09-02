import { createFileRoute, Link } from "@tanstack/react-router";
import { PackageCheck, ShieldCheck, Stethoscope, Timer } from "lucide-react";
import heroImage from "@/assets/hero-pharmacy.jpg";
import { Button } from "@/components/common/Button";
import { SectionHeading } from "@/components/common/SectionHeading";
import { CategoryCard } from "@/components/customer/CategoryCard";
import { MedicineCard } from "@/components/customer/MedicineCard";
import { categories, getMedicinesByTag } from "@/data/medicines";
import { CustomerLayout } from "@/layouts/CustomerLayout";

const title = "MediTrack — Medicines you need. Stock you can trust.";
const description =
  "Real-time medicine availability, prescription-aware checkout and expiry visibility from a modern pharmacy portal.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: HomePage,
});

const trustIndicators = [
  {
    title: "Real-Time Inventory",
    description: "Live stock status on every medicine, batch by batch.",
    icon: PackageCheck,
  },
  {
    title: "Prescription Verification",
    description: "Pharmacist review before Rx medicines ship.",
    icon: Stethoscope,
  },
  { title: "Secure Checkout", description: "Protected order and payment flow.", icon: ShieldCheck },
  { title: "Expiry Visibility", description: "See expiry windows before you buy.", icon: Timer },
] as const;

function HomePage() {
  const popular = getMedicinesByTag("popular").slice(0, 4);
  const frequent = getMedicinesByTag("frequently-purchased").slice(0, 4);
  const refill = getMedicinesByTag("refill").slice(0, 4);
  const essentials = getMedicinesByTag("essential").slice(0, 4);

  return (
    <CustomerLayout>
      <section className="border-b border-border bg-primary-soft/50">
        <div className="container-page grid items-center gap-8 py-14 lg:grid-cols-2 lg:py-20">
          <div>
            <p className="text-sm font-semibold tracking-wide text-primary uppercase">MediTrack</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Medicines you need. Stock you can trust.
            </h1>
            <p className="mt-4 max-w-xl text-base text-muted-foreground">
              Real-time availability, prescription-aware checkout, and secure pharmacy shopping.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/medicines">
                <Button size="lg">Shop Medicines</Button>
              </Link>
              <a href="#categories">
                <Button size="lg" variant="outline">
                  View Categories
                </Button>
              </a>
            </div>
          </div>
          <img
            src={heroImage}
            alt="Pharmacist organising medicine shelves in a modern pharmacy"
            width={1024}
            height={768}
            className="rounded-2xl border border-border object-cover shadow-elevated"
          />
        </div>
      </section>

      <div className="container-page space-y-14 py-14">
        <section id="categories">
          <SectionHeading title="Shop by Category" description="Seven curated pharmacy shelves." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </section>

        <MedicineRow title="Popular Medicines" items={popular} />
        <MedicineRow title="Frequently Purchased" items={frequent} />
        <MedicineRow
          title="Refill Again"
          description="Based on your previous purchases (mock data)."
          items={refill}
        />
        <MedicineRow title="Healthcare Essentials" items={essentials} />

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trustIndicators.map((item) => (
            <div key={item.title} className="rounded-xl border border-border bg-card p-5 shadow-card">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-success-soft text-success">
                <item.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-3 text-sm font-semibold text-foreground">{item.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </section>
      </div>
    </CustomerLayout>
  );
}

function MedicineRow({
  title: heading,
  description,
  items,
}: {
  title: string;
  description?: string;
  items: ReturnType<typeof getMedicinesByTag>;
}) {
  return (
    <section>
      <SectionHeading
        title={heading}
        description={description}
        action={
          <Link to="/medicines" className="text-sm font-medium text-primary hover:underline">
            View all
          </Link>
        }
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((medicine) => (
          <MedicineCard key={medicine.id} medicine={medicine} />
        ))}
      </div>
    </section>
  );
}
