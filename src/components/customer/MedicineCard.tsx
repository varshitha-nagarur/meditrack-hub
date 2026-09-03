import { Link } from "@tanstack/react-router";
import { Heart, ShoppingCart, Stethoscope } from "lucide-react";
import { Button } from "@/components/common/Button";
import { ExpiryBadge } from "@/components/common/ExpiryBadge";
import { StatusBadge } from "@/components/common/StatusBadge";
import { StockBadge } from "@/components/common/StockBadge";
import { useStore } from "@/hooks/useStore";
import type { Medicine } from "@/types/medicine";
import { formatINR } from "@/utils/format";
import { cn } from "@/lib/utils";

/** Catalogue tile used on the home page, catalogue and related sections. */
export function MedicineCard({ medicine }: { medicine: Medicine }) {
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const outOfStock = medicine.stockStatus === "out-of-stock";
  const saved = isWishlisted(medicine.id);

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-card transition-shadow hover:shadow-elevated">
      <Link
        to="/medicines/$id"
        params={{ id: medicine.id }}
        className="relative block aspect-square overflow-hidden bg-muted"
      >
        <img
          src={medicine.imageUrl}
          alt={medicine.name}
          loading="lazy"
          width={800}
          height={800}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {medicine.prescriptionRequired ? (
          <span className="absolute top-3 left-3">
            <StatusBadge tone="info" icon={<Stethoscope className="h-3.5 w-3.5" />}>
              Rx Required
            </StatusBadge>
          </span>
        ) : null}
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <Link to="/medicines/$id" params={{ id: medicine.id }}>
          <h3 className="line-clamp-2 text-sm font-semibold text-foreground hover:text-primary">
            {medicine.name}
          </h3>
        </Link>
        <p className="line-clamp-2 text-xs text-muted-foreground">{medicine.composition}</p>
        <p className="text-xs text-muted-foreground">{medicine.manufacturer}</p>

        <div className="flex flex-wrap items-center gap-1.5">
          <StockBadge status={medicine.stockStatus} />
          <ExpiryBadge expiryDate={medicine.expiryDate} />
        </div>

        <div className="mt-auto flex items-baseline gap-2 pt-2">
          <span className="text-base font-semibold text-foreground">
            {formatINR(medicine.price)}
          </span>
          <span className="text-xs text-muted-foreground line-through">
            {formatINR(medicine.mrp)}
          </span>
        </div>

        <div className="flex gap-2">
          {/* TODO: Connect cart service to backend API */}
          <Button
            size="sm"
            className="flex-1"
            disabled={outOfStock}
            onClick={() => addToCart(medicine.id)}
          >
            <ShoppingCart className="h-4 w-4" />
            {outOfStock ? "Unavailable" : "Add to Cart"}
          </Button>
          <Button
            size="sm"
            variant="outline"
            aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
            aria-pressed={saved}
            onClick={() => toggleWishlist(medicine.id)}
          >
            <Heart className={cn("h-4 w-4", saved && "fill-destructive text-destructive")} />
          </Button>
        </div>

        <Link
          to="/medicines/$id"
          params={{ id: medicine.id }}
          className="text-center text-xs font-medium text-primary hover:underline"
        >
          View Details
        </Link>
      </div>
    </article>
  );
}
