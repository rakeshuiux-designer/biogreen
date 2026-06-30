"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { detailedLines, updateQuantity, removeFromCart, subtotal } = useCart();

  if (detailedLines.length === 0) {
    return (
      <div className="max-w-content mx-auto px-5 sm:px-8 py-24 text-center">
        <h1 className="font-display text-3xl text-ink mb-4">Your cart is empty</h1>
        <p className="font-body text-ink/60 mb-8">
          Add Dr. TEA or Dr. COFFEE to get started.
        </p>
        <Link
          href="/"
          className="inline-block bg-forest text-cream font-body font-semibold px-7 py-3.5 rounded-label hover:bg-forest-dark transition-colors"
        >
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-content mx-auto px-5 sm:px-8 py-12 sm:py-16">
      <h1 className="font-display text-3xl sm:text-4xl text-ink mb-10">Your Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-4">
          {detailedLines.map((line) => (
            <div
              key={`${line.productSlug}-${line.variantId}`}
              className="flex gap-4 sm:gap-6 bg-white border border-ink/10 rounded-lg p-4 sm:p-5"
            >
              <div className="bg-cream-dark rounded-label p-2 shrink-0 w-24 sm:w-32 flex items-center justify-center">
                <Image
                  src={line.product.logo}
                  alt={line.product.name}
                  width={160}
                  height={60}
                  className="w-full h-auto"
                />
              </div>

              <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="font-body font-semibold text-ink">{line.product.name}</h2>
                  <p className="font-mono text-xs text-ink/50 mt-0.5">{line.variant.label}</p>
                  <p className="font-mono text-xs text-ink/50">
                    ₹{line.variant.price.toLocaleString("en-IN")} each
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(line.productSlug, line.variantId, line.quantity - 1)
                      }
                      className="w-8 h-8 rounded-label border border-ink/20 flex items-center justify-center hover:bg-cream-dark transition-colors"
                      aria-label={`Decrease quantity of ${line.product.name}`}
                    >
                      −
                    </button>
                    <input
                      type="number"
                      min={1}
                      max={500}
                      value={line.quantity}
                      onChange={(e) =>
                        updateQuantity(
                          line.productSlug,
                          line.variantId,
                          parseInt(e.target.value, 10) || 1
                        )
                      }
                      className="w-14 text-center font-mono text-sm border border-ink/20 rounded-label py-1.5 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(line.productSlug, line.variantId, line.quantity + 1)
                      }
                      className="w-8 h-8 rounded-label border border-ink/20 flex items-center justify-center hover:bg-cream-dark transition-colors"
                      aria-label={`Increase quantity of ${line.product.name}`}
                    >
                      +
                    </button>
                  </div>

                  <span className="font-display text-lg text-ink w-24 text-right">
                    ₹{line.lineTotal.toLocaleString("en-IN")}
                  </span>

                  <button
                    type="button"
                    onClick={() => removeFromCart(line.productSlug, line.variantId)}
                    className="text-ink/40 hover:text-red-600 transition-colors"
                    aria-label={`Remove ${line.product.name} from cart`}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white border border-ink/10 rounded-lg p-6 sticky top-28">
            <h2 className="font-display text-xl text-ink mb-5">Order Summary</h2>
            <div className="flex items-center justify-between font-body text-sm text-ink/70 mb-2">
              <span>Subtotal</span>
              <span className="font-mono">₹{subtotal.toLocaleString("en-IN")}</span>
            </div>
            <p className="font-body text-xs text-ink/45 mb-5">
              Shipping calculated at checkout based on delivery address.
            </p>
            <Link
              href="/checkout"
              className="block text-center bg-forest text-cream font-body font-semibold px-6 py-3.5 rounded-label hover:bg-forest-dark transition-colors"
            >
              Proceed to checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
