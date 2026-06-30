import Link from "next/link";

export default function OrderConfirmationPage({
  searchParams,
}: {
  searchParams: { orderId?: string };
}) {
  const orderId = searchParams.orderId;

  return (
    <div className="max-w-content mx-auto px-5 sm:px-8 py-24 text-center">
      <div className="w-16 h-16 rounded-full bg-forest/10 flex items-center justify-center mx-auto mb-6">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1F4D3A" strokeWidth="2.5">
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </div>
      <h1 className="font-display text-3xl sm:text-4xl text-ink mb-3">
        Order received
      </h1>
      {orderId && (
        <p className="font-mono text-sm text-ink/60 mb-4">
          Order reference: <span className="font-semibold text-ink">{orderId}</span>
        </p>
      )}
      <p className="font-body text-ink/70 max-w-md mx-auto mb-10">
        Thank you. Our team will reach out by phone or email shortly to
        confirm your order details and arrange payment and delivery.
      </p>
      <Link
        href="/"
        className="inline-block bg-forest text-cream font-body font-semibold px-7 py-3.5 rounded-label hover:bg-forest-dark transition-colors"
      >
        Continue shopping
      </Link>
    </div>
  );
}
