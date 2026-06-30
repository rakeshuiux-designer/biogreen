"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

type FormState = {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  notes: string;
};

const initialForm: FormState = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  notes: "",
};

export default function CheckoutPage() {
  const { detailedLines, lines, subtotal, clearCart } = useCart();
  const router = useRouter();
  const [form, setForm] = useState<FormState>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (detailedLines.length === 0) {
    return (
      <div className="max-w-content mx-auto px-5 sm:px-8 py-24 text-center">
        <h1 className="font-display text-3xl text-ink mb-4">Your cart is empty</h1>
        <Link
          href="/"
          className="inline-block bg-forest text-cream font-body font-semibold px-7 py-3.5 rounded-label hover:bg-forest-dark transition-colors"
        >
          Browse products
        </Link>
      </div>
    );
  }

  function handleChange(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: {
            name: form.name,
            email: form.email,
            phone: form.phone,
            address: form.address,
            city: form.city,
            state: form.state,
            pincode: form.pincode,
          },
          lines,
          notes: form.notes,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }

      clearCart();
      router.push(`/order-confirmation?orderId=${data.order.id}`);
    } catch {
      setError("Couldn't reach the server. Please check your connection and try again.");
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-content mx-auto px-5 sm:px-8 py-12 sm:py-16">
      <h1 className="font-display text-3xl sm:text-4xl text-ink mb-3">Checkout</h1>
      <p className="font-body text-ink/60 mb-10 max-w-xl">
        We'll confirm your order and payment details by phone or email after
        you submit this form. No payment is collected on this page yet.
      </p>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          <fieldset className="bg-white border border-ink/10 rounded-lg p-6">
            <legend className="font-display text-lg text-ink mb-4">Contact &amp; delivery details</legend>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Full name" required>
                <input
                  required
                  type="text"
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="input"
                />
              </Field>
              <Field label="Phone number" required>
                <input
                  required
                  type="tel"
                  value={form.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className="input"
                />
              </Field>
            </div>

            <Field label="Email" required>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="input"
              />
            </Field>

            <Field label="Delivery address" required>
              <textarea
                required
                rows={3}
                value={form.address}
                onChange={(e) => handleChange("address", e.target.value)}
                className="input"
              />
            </Field>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Field label="City" required>
                <input
                  required
                  type="text"
                  value={form.city}
                  onChange={(e) => handleChange("city", e.target.value)}
                  className="input"
                />
              </Field>
              <Field label="State" required>
                <input
                  required
                  type="text"
                  value={form.state}
                  onChange={(e) => handleChange("state", e.target.value)}
                  className="input"
                />
              </Field>
              <Field label="PIN code" required>
                <input
                  required
                  type="text"
                  value={form.pincode}
                  onChange={(e) => handleChange("pincode", e.target.value)}
                  className="input"
                />
              </Field>
            </div>

            <Field label="Order notes (optional)">
              <textarea
                rows={2}
                value={form.notes}
                onChange={(e) => handleChange("notes", e.target.value)}
                className="input"
                placeholder="Delivery instructions, preferred contact time, etc."
              />
            </Field>
          </fieldset>

          {error && (
            <p className="font-body text-sm text-red-700 bg-red-50 border border-red-200 rounded-label px-4 py-3">
              {error}
            </p>
          )}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white border border-ink/10 rounded-lg p-6 sticky top-28">
            <h2 className="font-display text-xl text-ink mb-5">Order Summary</h2>
            <div className="space-y-3 mb-5">
              {detailedLines.map((line) => (
                <div
                  key={`${line.productSlug}-${line.variantId}`}
                  className="flex justify-between font-body text-sm"
                >
                  <span className="text-ink/70">
                    {line.product.name} · {line.variant.label} × {line.quantity}
                  </span>
                  <span className="font-mono text-ink">
                    ₹{line.lineTotal.toLocaleString("en-IN")}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex justify-between font-body font-semibold text-ink border-t border-ink/10 pt-4 mb-6">
              <span>Total</span>
              <span className="font-mono">₹{subtotal.toLocaleString("en-IN")}</span>
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-forest text-cream font-body font-semibold px-6 py-3.5 rounded-label hover:bg-forest-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? "Placing order…" : "Place order"}
            </button>
            <p className="font-body text-xs text-ink/45 mt-3">
              By placing this order you'll be contacted to confirm payment
              (bank transfer / COD, depending on availability in your area).
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block mb-4">
      <span className="font-body text-sm font-medium text-ink/80 mb-1.5 block">
        {label} {required && <span className="text-roast">*</span>}
      </span>
      {children}
    </label>
  );
}
