import Link from "next/link";
import Image from "next/image";
import { Product } from "@/data/products";

export default function ProductCard({ product }: { product: Product }) {
  const accentBorder = product.heroAccent === "forest" ? "border-forest/20" : "border-roast/20";
  const accentBg = product.heroAccent === "forest" ? "bg-forest" : "bg-roast";

  return (
    <Link
      href={`/products/${product.slug}`}
      className={`group block bg-white rounded-lg border ${accentBorder} overflow-hidden hover:shadow-xl transition-shadow duration-300`}
    >
      <div className="relative bg-cream-dark p-8 flex items-center justify-center">
        <Image
          src={product.logo}
          alt={`${product.name} label`}
          width={420}
          height={150}
          className="w-full max-w-[320px] h-auto transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>
      <div className="p-6">
        <p className={`font-mono text-xs uppercase tracking-widest mb-2 ${product.heroAccent === "forest" ? "text-forest" : "text-roast"}`}>
          {product.tagline}
        </p>
        <h3 className="font-display text-2xl text-ink mb-2">{product.name}</h3>
        <p className="font-body text-sm text-ink/70 leading-relaxed mb-4 line-clamp-3">
          {product.shortDescription}
        </p>
        <div className="flex items-center justify-between">
          <span className="font-mono text-sm text-ink/60">
            From ₹{Math.min(...product.variants.map((v) => v.price)).toLocaleString("en-IN")}
          </span>
          <span className={`inline-flex items-center gap-1 text-sm font-semibold ${accentBg} text-cream px-4 py-2 rounded-label group-hover:gap-2 transition-all`}>
            Shop now
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
