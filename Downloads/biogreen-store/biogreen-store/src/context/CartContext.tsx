"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";
import { products, Product, Variant } from "@/data/products";

export type CartLine = {
  productSlug: string;
  variantId: string;
  quantity: number;
};

export type CartLineDetailed = CartLine & {
  product: Product;
  variant: Variant;
  lineTotal: number;
};

type CartContextValue = {
  lines: CartLine[];
  addToCart: (productSlug: string, variantId: string, quantity: number) => void;
  updateQuantity: (productSlug: string, variantId: string, quantity: number) => void;
  removeFromCart: (productSlug: string, variantId: string) => void;
  clearCart: () => void;
  detailedLines: CartLineDetailed[];
  subtotal: number;
  totalItems: number;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = "biogreen_cart_v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Load from localStorage on mount (browser only — standalone Next.js app, not a Claude artifact)
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setLines(JSON.parse(raw));
      }
    } catch {
      // ignore corrupt storage
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, hydrated]);

  function addToCart(productSlug: string, variantId: string, quantity: number) {
    setLines((prev) => {
      const existing = prev.find(
        (l) => l.productSlug === productSlug && l.variantId === variantId
      );
      if (existing) {
        return prev.map((l) =>
          l.productSlug === productSlug && l.variantId === variantId
            ? { ...l, quantity: l.quantity + quantity }
            : l
        );
      }
      return [...prev, { productSlug, variantId, quantity }];
    });
  }

  function updateQuantity(productSlug: string, variantId: string, quantity: number) {
    setLines((prev) =>
      quantity <= 0
        ? prev.filter(
            (l) => !(l.productSlug === productSlug && l.variantId === variantId)
          )
        : prev.map((l) =>
            l.productSlug === productSlug && l.variantId === variantId
              ? { ...l, quantity }
              : l
          )
    );
  }

  function removeFromCart(productSlug: string, variantId: string) {
    setLines((prev) =>
      prev.filter((l) => !(l.productSlug === productSlug && l.variantId === variantId))
    );
  }

  function clearCart() {
    setLines([]);
  }

  const detailedLines: CartLineDetailed[] = useMemo(() => {
    return lines
      .map((line) => {
        const product = products.find((p) => p.slug === line.productSlug);
        const variant = product?.variants.find((v) => v.id === line.variantId);
        if (!product || !variant) return null;
        return {
          ...line,
          product,
          variant,
          lineTotal: variant.price * line.quantity,
        };
      })
      .filter((l): l is CartLineDetailed => l !== null);
  }, [lines]);

  const subtotal = useMemo(
    () => detailedLines.reduce((sum, l) => sum + l.lineTotal, 0),
    [detailedLines]
  );

  const totalItems = useMemo(
    () => lines.reduce((sum, l) => sum + l.quantity, 0),
    [lines]
  );

  return (
    <CartContext.Provider
      value={{
        lines,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        detailedLines,
        subtotal,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
