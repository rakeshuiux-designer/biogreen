import Link from "next/link";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import IngredientLedger from "@/components/IngredientLedger";
import { products, comparisonStats } from "@/data/products";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-cream">
        <div className="max-w-content mx-auto px-5 sm:px-8 pt-16 pb-20 sm:pt-24 sm:pb-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-forest mb-4">
                10 years in formulation · 14 botanicals · 1 daily cup
              </p>
              <h1 className="font-display text-4xl sm:text-6xl leading-[1.05] text-ink mb-6">
                A daily cup that{" "}
                <span className="text-forest">closes the gap</span>{" "}
                your diet leaves open.
              </h1>
              <p className="font-body text-lg text-ink/70 leading-relaxed mb-8 max-w-lg">
                Dr. TEA and Dr. COFFEE blend moringa, ginseng and twelve more
                traditional botanicals into a tea or coffee you already drink
                every day — rich in vitamins, minerals, antioxidants and
                plant protein.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/products/dr-tea"
                  className="bg-forest text-cream font-body font-semibold px-7 py-3.5 rounded-label hover:bg-forest-dark transition-colors"
                >
                  Shop Dr. TEA
                </Link>
                <Link
                  href="/products/dr-coffee"
                  className="bg-roast text-cream font-body font-semibold px-7 py-3.5 rounded-label hover:bg-roast-dark transition-colors"
                >
                  Shop Dr. COFFEE
                </Link>
              </div>
            </div>

            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 bg-gold/10 rounded-full blur-3xl" aria-hidden="true" />
              <div className="relative grid grid-cols-1 gap-6 w-full max-w-sm">
                <div className="bg-white rounded-lg shadow-lg border border-forest/10 p-5 rotate-[-1.5deg]">
                  <Image
                    src="/images/dr-tea-logo.png"
                    alt="Dr. TEA label"
                    width={420}
                    height={150}
                    className="w-full h-auto"
                  />
                </div>
                <div className="bg-white rounded-lg shadow-lg border border-roast/10 p-5 rotate-[1.5deg] -mt-2">
                  <Image
                    src="/images/dr-coffee-logo.png"
                    alt="Dr. COFFEE label"
                    width={420}
                    height={150}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison stats strip */}
      <section className="bg-forest">
        <div className="max-w-content mx-auto px-5 sm:px-8 py-10">
          <p className="font-mono text-xs uppercase tracking-widest text-gold text-center mb-6">
            Per serving, compared to common foods
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-6">
            {comparisonStats.map((stat) => (
              <div key={stat.nutrient} className="text-center">
                <p className="font-display text-2xl text-gold">{stat.multiplier}</p>
                <p className="font-body text-xs text-cream/80 mt-1">{stat.comparedTo}</p>
                <p className="font-body text-xs text-cream/50 mt-0.5">{stat.nutrient}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="max-w-content mx-auto px-5 sm:px-8 py-20">
        <div className="mb-10">
          <h2 className="font-display text-3xl text-ink mb-3">Our Products</h2>
          <p className="font-body text-ink/70 max-w-2xl">
            Two daily rituals, one formulation philosophy. Choose the one
            that fits your morning.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      {/* Ingredient ledger - signature element */}
      <section className="bg-cream-dark">
        <div className="max-w-content mx-auto px-5 sm:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2">
              <h2 className="font-display text-3xl text-ink mb-4">
                What's actually in the cup
              </h2>
              <p className="font-body text-ink/70 leading-relaxed mb-6">
                Both Dr. TEA and Dr. COFFEE are built on the same base of 14
                botanical extracts — sourced from leaf, root, seed, fruit,
                bark and rhizome. Each one is doing a specific job, not just
                filling out a label.
              </p>
              <Link
                href="/about"
                className="font-body font-semibold text-forest inline-flex items-center gap-1.5 hover:gap-2.5 transition-all"
              >
                Read about our formulation process
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="lg:col-span-3">
              <IngredientLedger />
            </div>
          </div>
        </div>
      </section>

      {/* Wholesale CTA */}
      <section className="max-w-content mx-auto px-5 sm:px-8 py-20">
        <div className="bg-roast rounded-xl px-8 sm:px-14 py-12 sm:py-16 text-center">
          <h2 className="font-display text-3xl sm:text-4xl text-cream mb-4">
            Stocking for a store, clinic or gym?
          </h2>
          <p className="font-body text-cream/75 max-w-xl mx-auto mb-8">
            We work with retailers, wellness centres and distributors on bulk
            pricing. Tell us what you need and we'll get back to you.
          </p>
          <Link
            href="/wholesale"
            className="inline-block bg-gold text-roast font-body font-semibold px-8 py-3.5 rounded-label hover:bg-gold-light transition-colors"
          >
            Enquire about bulk orders
          </Link>
        </div>
      </section>
    </>
  );
}
