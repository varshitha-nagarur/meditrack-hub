import { createFileRoute, Link } from "@tanstack/react-router";
import { ShoppingCart, Trash2 } from "lucide-react";
import { Button } from "@/components/common/Button";
import { DataTable, type Column } from "@/components/common/DataTable";
import { SectionHeading } from "@/components/common/SectionHeading";
import { StockBadge } from "@/components/common/StockBadge";
import { getMedicineById } from "@/data/medicines";
import { wishlistMedicineIds } from "@/data/orders";
import { CustomerLayout } from "@/layouts/CustomerLayout";
import type { Medicine } from "@/types/medicine";
import { formatINR } from "@/utils/format";

const title = "Wishlist — MediTrack";
const description = "Saved medicines with live availability and one-tap move to cart.";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: WishlistPage,
});

function WishlistPage() {
  const items = wishlistMedicineIds
    .map((id) => getMedicineById(id))
    .filter((item): item is Medicine => Boolean(item));

  const columns: Array<Column<Medicine>> = [
    {
      key: "product",
      header: "Product",
      render: (medicine) => (
        <div className="flex items-center gap-3">
          <img
            src={medicine.imageUrl}
            alt={medicine.name}
            loading="lazy"
            width={800}
            height={800}
            className="h-10 w-10 rounded-md border border-border object-cover"
          />
          <div>
            <Link
              to="/medicines/$id"
              params={{ id: medicine.id }}
              className="font-medium text-foreground hover:text-primary"
            >
              {medicine.name}
            </Link>
            <p className="text-xs text-muted-foreground">{medicine.manufacturer}</p>
          </div>
        </div>
      ),
    },
    { key: "price", header: "Price", render: (medicine) => formatINR(medicine.price) },
    {
      key: "availability",
      header: "Availability",
      render: (medicine) => <StockBadge status={medicine.stockStatus} />,
    },
    {
      key: "actions",
      header: "Actions",
      render: (medicine) => (
        <div className="flex gap-2">
          {/* TODO: Connect wishlist + cart services to backend API */}
          <Button size="sm" disabled={medicine.stockStatus === "out-of-stock"}>
            <ShoppingCart className="h-4 w-4" />
            Move to Cart
          </Button>
          <Button size="sm" variant="outline" aria-label="Remove from wishlist">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <CustomerLayout>
      <div className="container-page py-10">
        <SectionHeading title="Wishlist" description="Medicines you saved for later." />
        <DataTable
          columns={columns}
          rows={items}
          rowKey={(medicine) => medicine.id}
          emptyTitle="Nothing saved yet"
          emptyDescription="Tap the heart icon on any medicine to save it here."
        />
      </div>
    </CustomerLayout>
  );
}
