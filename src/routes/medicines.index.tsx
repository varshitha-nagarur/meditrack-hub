import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { FilterX, SearchX } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/common/Button";
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

interface CatalogueSearch {
  category?: MedicineCategoryId | undefined;
  q?: string | undefined;
}

export const Route = createFileRoute("/medicines/")({
  validateSearch: (search: Record<string, unknown>): CatalogueSearch => {
    const category = search["category"];
    const q = search["q"];
    return {
      ...(typeof category === "string" ? { category: category as MedicineCategoryId } : {}),
      ...(typeof q === "string" && q.length > 0 ? { q } : {}),
    };
  },
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

const sortOptions = [
  { value: "relevance", label: "Recommended" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name", label: "Name: A to Z" },
];

function CataloguePage() {
  const { category: initialCategory, q: initialQuery } = Route.useSearch();
  const navigate = useNavigate({ from: "/medicines/" });

  const [query, setQuery] = useState(initialQuery ?? "");
  const [category, setCategory] = useState<string>(initialCategory ?? "all");
  const [price, setPrice] = useState("all");
  const [availability, setAvailability] = useState("all");
  const [rx, setRx] = useState("all");
  const [manufacturer, setManufacturer] = useState("all");
  const [sort, setSort] = useState("relevance");

  const filtersActive =
    query.trim() !== "" ||
    category !== "all" ||
    price !== "all" ||
    availability !== "all" ||
    rx !== "all" ||
    manufacturer !== "all" ||
    sort !== "relevance";

  function clearFilters() {
    setQuery("");
    setCategory("all");
    setPrice("all");
    setAvailability("all");
    setRx("all");
    setManufacturer("all");
    setSort("relevance");
    void navigate({ search: () => ({}) });
  }

  const results = useMemo(() => {
    const filtered = medicines.filter((medicine) => {
      const text =
        `${medicine.name} ${medicine.composition} ${medicine.manufacturer}`.toLowerCase();
      if (query && !text.includes(query.trim().toLowerCase())) return false;
      if (category !== "all" && medicine.category !== category) return false;
      if (availability !== "all" && medicine.stockStatus !== availability) return false;
      if (rx === "yes" && !medicine.prescriptionRequired) return false;
      if (rx === "no" && medicine.prescriptionRequired) return false;
      if (manufacturer !== "all" && medicine.manufacturer !== manufacturer) return false;
      if (price === "0-100" && medicine.price >= 100) return false;
      if (price === "100-300" && (medicine.price < 100 || medicine.price > 300)) return false;
      if (price === "300+" && medicine.price <= 300) return false;
      return true;
    });

    const sorted = [...filtered];
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    if (sort === "name") sorted.sort((a, b) => a.name.localeCompare(b.name));
    return sorted;
  }, [query, category, price, availability, rx, manufacturer, sort]);

  return (
    <CustomerLayout>
      <div className="container-page py-10">
        <SectionHeading
          as="h1"
          title="All Medicines"
          description="Informational listing only — this is not medical advice."
        />

        <div className="mb-6 grid gap-3 rounded-xl border border-border bg-card p-4 shadow-card sm:grid-cols-2 lg:grid-cols-3">
          <div className="sm:col-span-2 lg:col-span-3">
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
          <Select
            label="Sort by"
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            options={sortOptions}
          />
        </div>

        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-medium text-foreground">{results.length}</span> of{" "}
            {medicines.length} medicines
          </p>
          {filtersActive ? (
            <Button size="sm" variant="outline" onClick={clearFilters}>
              <FilterX className="h-4 w-4" />
              Clear filters
            </Button>
          ) : null}
        </div>

        {results.length === 0 ? (
          <EmptyState
            icon={<SearchX className="h-6 w-6" />}
            title="No medicines match these filters"
            description="Try widening the price range, changing availability, or clearing all filters."
            action={
              <Button variant="outline" onClick={clearFilters}>
                <FilterX className="h-4 w-4" />
                Clear filters
              </Button>
            }
          />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {results.map((medicine) => (
              <MedicineCard key={medicine.id} medicine={medicine} />
            ))}
          </div>
        )}
      </div>
    </CustomerLayout>
  );
}
