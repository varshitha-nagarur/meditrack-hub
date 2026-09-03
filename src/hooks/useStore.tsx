import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { getMedicineById } from "@/data/medicines";
import { cartItems as mockCartItems, wishlistMedicineIds } from "@/data/orders";
import type { CartLine } from "@/types/order";

/**
 * Frontend-only cart + wishlist state for the MediTrack scaffold.
 * Seeded from mock data and kept in memory for the session.
 *
 * TODO: Replace this local store with backend cart/wishlist APIs
 * TODO: Replace frontend stock reservation with server-side TTL stock hold.
 */

interface StoreValue {
  cart: CartLine[];
  wishlist: string[];
  cartCount: number;
  wishlistCount: number;
  addToCart: (medicineId: string, quantity?: number) => void;
  setQuantity: (medicineId: string, quantity: number) => void;
  removeFromCart: (medicineId: string) => void;
  clearCart: () => void;
  isInCart: (medicineId: string) => boolean;
  toggleWishlist: (medicineId: string) => void;
  removeFromWishlist: (medicineId: string) => void;
  isWishlisted: (medicineId: string) => boolean;
  moveToCart: (medicineId: string) => void;
  moveToWishlist: (medicineId: string) => void;
}

const StoreContext = createContext<StoreValue | null>(null);

const initialCart: CartLine[] = mockCartItems.map((item) => ({
  medicineId: item.medicineId,
  quantity: item.quantity,
}));

function nameOf(medicineId: string): string {
  return getMedicineById(medicineId)?.name ?? "Medicine";
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>(initialCart);
  const [wishlist, setWishlist] = useState<string[]>(wishlistMedicineIds);

  const addToCart = useCallback((medicineId: string, quantity = 1) => {
    setCart((lines) => {
      const existing = lines.find((line) => line.medicineId === medicineId);
      if (existing) {
        return lines.map((line) =>
          line.medicineId === medicineId ? { ...line, quantity: line.quantity + quantity } : line,
        );
      }
      return [...lines, { medicineId, quantity }];
    });
    toast.success(`${nameOf(medicineId)} added to cart`);
  }, []);

  const setQuantity = useCallback((medicineId: string, quantity: number) => {
    setCart((lines) =>
      lines.flatMap((line) =>
        line.medicineId === medicineId
          ? quantity <= 0
            ? []
            : [{ ...line, quantity }]
          : [line],
      ),
    );
  }, []);

  const removeFromCart = useCallback((medicineId: string) => {
    setCart((lines) => lines.filter((line) => line.medicineId !== medicineId));
    toast(`${nameOf(medicineId)} removed from cart`);
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback((medicineId: string) => {
    setWishlist((ids) => {
      if (ids.includes(medicineId)) {
        toast(`${nameOf(medicineId)} removed from wishlist`);
        return ids.filter((id) => id !== medicineId);
      }
      toast.success(`${nameOf(medicineId)} saved to wishlist`);
      return [...ids, medicineId];
    });
  }, []);

  const removeFromWishlist = useCallback((medicineId: string) => {
    setWishlist((ids) => ids.filter((id) => id !== medicineId));
    toast(`${nameOf(medicineId)} removed from wishlist`);
  }, []);

  const moveToCart = useCallback(
    (medicineId: string) => {
      setWishlist((ids) => ids.filter((id) => id !== medicineId));
      addToCart(medicineId, 1);
    },
    [addToCart],
  );

  const moveToWishlist = useCallback((medicineId: string) => {
    setCart((lines) => lines.filter((line) => line.medicineId !== medicineId));
    setWishlist((ids) => (ids.includes(medicineId) ? ids : [...ids, medicineId]));
    toast.success(`${nameOf(medicineId)} moved to wishlist`);
  }, []);

  const value = useMemo<StoreValue>(
    () => ({
      cart,
      wishlist,
      cartCount: cart.reduce((sum, line) => sum + line.quantity, 0),
      wishlistCount: wishlist.length,
      addToCart,
      setQuantity,
      removeFromCart,
      clearCart,
      isInCart: (medicineId) => cart.some((line) => line.medicineId === medicineId),
      toggleWishlist,
      removeFromWishlist,
      isWishlisted: (medicineId) => wishlist.includes(medicineId),
      moveToCart,
      moveToWishlist,
    }),
    [
      cart,
      wishlist,
      addToCart,
      setQuantity,
      removeFromCart,
      clearCart,
      toggleWishlist,
      removeFromWishlist,
      moveToCart,
      moveToWishlist,
    ],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreValue {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used inside <StoreProvider>");
  return context;
}
