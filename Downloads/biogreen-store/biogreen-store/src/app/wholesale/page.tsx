"use client";

import React, { useState } from "react";

type FormState = {
  contactName: string;
  businessName: string;
  email: string;
  phone: string;
  city: string;
  productsInterested: string;
  estimatedQuantity: string;
  message: string;
};

const initialForm: FormState = {
  contactName: "",
  businessName: "",
  email: "",
  phone: "",
  city: "",
  productsInterested: "Both Dr. TEA and Dr. COFFEE",
  estimatedQuantity: "",
  message: "",
};

export default function WholesalePage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<string | null>(null);

  function handleChange(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/wholesale-inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }

      setSubmitted(data.inquiry.id);
      setForm(initialForm);
    } catch {
      setError("Couldn't reach the server. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="max-w-content mx-auto px-5 sm:px-8 py-24 text-center">
        <div className="w-16 h-16 rounded-full bg-roast/10 flex items-center justify-center mx-auto mb-6">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3D2817" strokeWidth="2.5">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h1 className="font-display text-3xl text-ink mb-3">Inquiry received</h1>
        <p className="font-mono text-sm text-ink/60 mb-4">
          Reference: <span className="font-semibold text-ink">{submitted}</span>
        </p>
        <p className="font-body text-ink/70 max-w-md mx-auto">
          Thanks for reaching out. Our team will contact you within 1–2
          business days to discuss bulk pricing and availability.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-content mx-auto px-5 sm:px-8 py-12 sm:py-16">
      <div className="max-w-2xl mb-10">
        <p className="font-mono text-xs uppercase tracking-widest text-roast mb-3">
          Bulk &amp; Wholesale
        </p>
        <h1 className="font-display text-3xl sm:text-4xl text-ink mb-4">
          Stock Dr. TEA and Dr. COFFEE at your business
        </h1>
        <p className="font-body text-ink/70 leading-relaxed">
          We supply retailers, wellness centres, clinics and gyms directly.
          Share a few details below and our team will follow up with
          pricing tiers and minimum order quantities for your business.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl bg-white border border-ink/10 rounded-lg p-6 sm:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Your name" required>
            <input
              required
              type="text"
              value={form.contactName}
              onChange={(e) => handleChange("contactName", e.target.value)}
              className="input"
            />
          </Field>
          <Field label="Business name" required>
            <input
              required
              type="text"
              value={form.businessName}
              onChange={(e) => handleChange("businessName", e.target.value)}
              className="input"
            />
          </Field>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Email" required>
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
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

        <Field label="City">
          <input
            type="text"
            value={form.city}
            onChange={(e) => handleChange("city", e.target.value)}
            className="input"
          />
        </Field>

        <Field label="Products interested in">
          <select
            value={form.productsInterested}
            onChange={(e) => handleChange("productsInterested", e.target.value)}
            className="input"
          >
            <option>Both Dr. TEA and Dr. COFFEE</option>
            <option>Dr. TEA only</option>
            <option>Dr. COFFEE only</option>
          </select>
        </Field>

        <Field label="Estimated order quantity">
          <input
            type="text"
            placeholder="e.g. 50 units/month, or 200 units one-time"
            value={form.estimatedQuantity}
            onChange={(e) => handleChange("estimatedQuantity", e.target.value)}
            className="input"
          />
        </Field>

        <Field label="Anything else we should know? (optional)">
          <textarea
            rows={3}
            value={form.message}
            onChange={(e) => handleChange("message", e.target.value)}
            className="input"
          />
        </Field>

        {error && (
          <p className="font-body text-sm text-red-700 bg-red-50 border border-red-200 rounded-label px-4 py-3 mb-4">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-roast text-cream font-body font-semibold px-6 py-3.5 rounded-label hover:bg-roast-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? "Submitting…" : "Submit inquiry"}
        </button>
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
