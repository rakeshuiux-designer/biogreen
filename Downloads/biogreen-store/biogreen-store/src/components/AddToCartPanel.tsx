"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

export default function AddToCartPanel({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const router = useRouter();
  const [variantId, setVariantId] = useState(product.variants[0].id);
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const variant = product.variants.find((v) => v.id === variantId)!;
  const lineTotal = variant.price * quantity;
  const accent = product.heroAccent === "forest" ? "forest" : "roast";

  function handleQuantityChange(next: number) {
    if (next < 1) return;
    if (next > 500) return; // sanity ceiling for a single line item
    setQuantity(next);
  }

  function handleAddToCart() {
    addToCart(product.slug, variantId, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  }

  function handleBuyNow() {
    addToCart(product.slug, variantId, quantity);
    router.push("/cart");
  }

  return (
    <div className="bg-white rounded-lg border border-ink/10 p-6 sm:p-8">
      <fieldset>
        <legend className="font-body text-sm font-semibold text-ink mb-3">
          Pack size
        </legend>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {product.variants.map((v) => {
            const selected = v.id === variantId;
            return (
              <button
                key={v.id}
                type="button"
                onClick={() => setVariantId(v.id)}
                className={`rounded-label border px-4 py-3 text-left transition-colors ${
                  selected
                    ? accent === "forest"
                      ? "border-forest bg-forest/5"
                      : "border-roast bg-roast/5"
                    : "border-ink/15 hover:border-ink/30"
                }`}
                aria-pressed={selected}
              >
                <span className="font-body text-sm font-semibold text-ink block">
                  {v.label}
                </span>
                <span className="font-mono text-xs text-ink/60">
                  ₹{v.price.toLocaleString("en-IN")}
                  {v.mrp > v.price && (
                    <span className="line-through ml-1.5 text-ink/35">
                      ₹{v.mrp.toLocaleString("en-IN")}
                    </span>
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-6">
        <label htmlFor="quantity" className="font-body text-sm font-semibold text-ink mb-3 block">
          Quantity
          <span className="font-normal text-ink/50 ml-1.5">(bulk orders welcome)</span>
        </label>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => handleQuantityChange(quantity - 1)}
            className="w-10 h-10 rounded-label border border-ink/20 flex items-center justify-center font-body text-lg hover:bg-cream-dark transition-colors"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <input
            id="quantity"
            type="number"
            min={1}
            max={500}
            value={quantity}
            onChange={(e) => handleQuantityChange(parseInt(e.target.value, 10) || 1)}
            className="w-20 text-center font-mono text-base border border-ink/20 rounded-label py-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <button
            type="button"
            onClick={() => handleQuantityChange(quantity + 1)}
            className="w-10 h-10 rounded-label border border-ink/20 flex items-center justify-center font-body text-lg hover:bg-cream-dark transition-colors"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-ink/10 flex items-baseline justify-between">
        <span className="font-body text-sm text-ink/60">Line total</span>
        <span className="font-display text-2xl text-ink">
          ₹{lineTotal.toLocaleString("en-IN")}
        </span>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          type="button"
          onClick={handleAddToCart}
          className={`font-body font-semibold px-6 py-3.5 rounded-label border-2 transition-colors ${
            accent === "forest"
              ? "border-forest text-forest hover:bg-forest/5"
              : "border-roast text-roast hover:bg-roast/5"
          }`}
        >
          {justAdded ? "Added ✓" : "Add to cart"}
        </button>
        <button
          type="button"
          onClick={handleBuyNow}
          className={`font-body font-semibold px-6 py-3.5 rounded-label text-cream transition-colors ${
            accent === "forest" ? "bg-forest hover:bg-forest-dark" : "bg-roast hover:bg-roast-dark"
          }`}
        >
          Buy now
        </button>
      </div>

      <p className="mt-4 font-body text-xs text-ink/50">
        Need 1,000+ units for a store or clinic?{" "}
        <a href="/wholesale" className="underline hover:text-ink/70">
          Talk to us about wholesale pricing
        </a>
        .
      </p>
    </div>
  );
}
