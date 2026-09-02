import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { EmptyState } from "@/components/common/EmptyState";
import { SearchBar } from "@/components/common/SearchBar";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Select } from "@/components/common/Select";
import { MedicineCard } from "@/components/customer/MedicineCard";
import { categories, manufacturers, medicines } from "@/data/medicines";
import { CustomerLayout } from "@/layouts/CustomerLayout";
import type { MedicineCategoryId } from "@/types/medicine";

const title = "Medicine Catalogue — MediTrack";
const description =
  "Browse 30 medicines with live stock status, expiry visibility and prescription flags.";

export const Route = createFileRoute("/medicines/")({
  validateSearch: (search: Record<string, unknown>) => ({
    category: typeof search.category === "string" ? (search.category as MedicineCategoryId) : undefined,
  }),
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: CataloguePage,
});

const priceOptions = [
  { value: "all", label: "Any price" },
  { value: "0-100", label: "Under ₹100" },
  { value: "100-300", label: "₹100 – ₹300" },
  { value: "300+", label: "Above ₹300" },
];

function CataloguePage() {
  const { category: initialCategory } = Route.useSearch();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>(initialCategory ?? "all");
  const [price, setPrice] = useState("all");
  const [availability, setAvailability] = useState("all");
  const [rx, setRx] = useState("all");
  const [manufacturer, setManufacturer] = useState("all");

  const results = useMemo(
    () =>
      medicines.filter((medicine) => {
        const text = `${medicine.name} ${medicine.composition} ${medicine.manufacturer}`.toLowerCase();
        if (query && !text.includes(query.toLowerCase())) return false;
        if (category !== "all" && medicine.category !== category) return false;
        if (availability !== "all" && medicine.stockStatus !== availability) return false;
        if (rx === "yes" && !medicine.prescriptionRequired) return false;
        if (rx === "no" && medicine.prescriptionRequired) return false;
        if (manufacturer !== "all" && medicine.manufacturer !== manufacturer) return false;
        if (price === "0-100" && medicine.price >= 100) return false;
        if (price === "100-300" && (medicine.price < 100 || medicine.price > 300)) return false;
        if (price === "300+" && medicine.price <= 300) return false;
        return true;
      }),
    [query, category, price, availability, rx, manufacturer],
  );

  return (
    <CustomerLayout>
      <div className="container-page py-10">
        <SectionHeading
          title="All Medicines"
          description="Informational listing only — this is not medical advice."
        />

        <div className="mb-6 grid gap-3 rounded-xl border border-border bg-card p-4 shadow-card lg:grid-cols-3">
          <div className="lg:col-span-3">
            <SearchBar
              value={query}
              onChange={setQuery}
              placeholder="Search by name, composition or manufacturer"
            />
          </div>
          <Select
            label="Category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            options={[
              { value: "all", label: "All categories" },
              ...categories.map((item) => ({ value: item.id, label: item.name })),
            ]}
          />
          <Select
            label="Price"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            options={priceOptions}
          />
          <Select
            label="Availability"
            value={availability}
            onChange={(event) => setAvailability(event.target.value)}
            options={[
              { value: "all", label: "All" },
              { value: "in-stock", label: "In stock" },
              { value: "low-stock", label: "Low stock" },
              { value: "out-of-stock", label: "Out of stock" },
            ]}
          />
          <Select
            label="Prescription required"
            value={rx}
            onChange={(event) => setRx(event.target.value)}
            options={[
              { value: "all", label: "All" },
              { value: "yes", label: "Rx required" },
              { value: "no", label: "Over the counter" },
            ]}
          />
          <Select
            label="Manufacturer"
            value={manufacturer}
            onChange={(event) => setManufacturer(event.target.value)}
            options={[
              { value: "all", label: "All manufacturers" },
              ...manufacturers.map((name) => ({ value: name, label: name })),
            ]}
          />
        </div>

        {results.length === 0 ? (
          <EmptyState
            title="No medicines match these filters"
            description="Try widening the price range or clearing the category filter."
          />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {results.map((medicine) => (
              <MedicineCard key={medicine.id} medicine={medicine} />
            ))}
          </div>
        )}
      </div>
    </CustomerLayout>
  );
}
