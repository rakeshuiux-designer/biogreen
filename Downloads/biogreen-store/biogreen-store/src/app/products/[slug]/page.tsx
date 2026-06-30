import Image from "next/image";
import { notFound } from "next/navigation";
import { products, getProductBySlug } from "@/data/products";
import AddToCartPanel from "@/components/AddToCartPanel";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) return {};
  return {
    title: `${product.name} | Bio-Green Technologies`,
    description: product.shortDescription,
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const accent = product.heroAccent === "forest" ? "forest" : "roast";

  return (
    <div className="max-w-content mx-auto px-5 sm:px-8 py-12 sm:py-16">
      {/* Top: image + add to cart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-16">
        <div>
          <div className="bg-cream-dark rounded-lg p-10 sm:p-14 flex items-center justify-center sticky top-28">
            <Image
              src={product.logo}
              alt={`${product.name} label`}
              width={500}
              height={180}
              className="w-full h-auto"
              priority
            />
          </div>
        </div>

        <div>
          <p className={`font-mono text-xs uppercase tracking-widest mb-3 ${accent === "forest" ? "text-forest" : "text-roast"}`}>
            {product.tagline}
          </p>
          <h1 className="font-display text-4xl sm:text-5xl text-ink mb-5">
            {product.name}
          </h1>
          <p className="font-body text-lg text-ink/70 leading-relaxed mb-8">
            {product.shortDescription}
          </p>

          <AddToCartPanel product={product} />
        </div>
      </div>

      {/* Long description */}
      <section className="max-w-2xl mb-16">
        <h2 className="font-display text-2xl text-ink mb-4">About this blend</h2>
        {product.longDescription.map((para, idx) => (
          <p key={idx} className="font-body text-ink/75 leading-relaxed mb-4">
            {para}
          </p>
        ))}
      </section>

      {/* Benefits grid */}
      <section className="mb-16">
        <h2 className="font-display text-2xl text-ink mb-6">Key benefits</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {product.benefits.map((benefit) => (
            <div key={benefit.title} className="border-l-2 border-gold pl-5 py-1">
              <h3 className="font-body font-semibold text-ink mb-1.5">{benefit.title}</h3>
              <p className="font-body text-sm text-ink/65 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Nutrition + ingredients */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
        <div>
          <h2 className="font-display text-2xl text-ink mb-4">Nutritional information</h2>
          <p className="font-body text-xs text-ink/50 mb-4">
            Approximate values per serving size of {product.servingSize}
          </p>
          <div className="bg-white border border-ink/10 rounded-lg overflow-hidden">
            {product.nutrition.map((fact, idx) => (
              <div
                key={fact.label}
                className={`flex items-center justify-between px-5 py-2.5 font-mono text-sm ${
                  idx % 2 === 0 ? "bg-cream-dark/50" : ""
                }`}
              >
                <span className="text-ink/70">{fact.label}</span>
                <span className="text-ink font-medium">{fact.value}</span>
              </div>
            ))}
            <div className="flex items-center justify-between px-5 py-2.5 font-mono text-sm border-t border-ink/10">
              <span className="text-ink/70">Vitamins</span>
              <span className="text-ink font-medium">{product.vitamins.join(", ")}</span>
            </div>
          </div>
        </div>

        <div>
          <h2 className="font-display text-2xl text-ink mb-4">Ingredients</h2>
          <div className="bg-white border border-ink/10 rounded-lg p-5">
            <ul className="font-body text-sm text-ink/75 leading-relaxed grid grid-cols-1 sm:grid-cols-2 gap-y-1.5 gap-x-4">
              {product.ingredients.map((ing) => (
                <li key={ing} className="flex items-start gap-2">
                  <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${accent === "forest" ? "bg-forest" : "bg-roast"}`} />
                  {ing}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 space-y-3">
            <DetailRow label="Directions to use" value={product.directions} />
            <DetailRow label="Storage" value={product.storage} />
            <DetailRow label="Best before" value={product.bestBefore} />
            <DetailRow label="FSSAI license no." value={product.fssaiLicense} />
          </div>
        </div>
      </section>

      {/* Useful for */}
      <section className="mb-16">
        <h2 className="font-display text-2xl text-ink mb-5">Useful for</h2>
        <div className="flex flex-wrap gap-2.5">
          {product.usefulFor.map((tag) => (
            <span
              key={tag}
              className={`font-mono text-xs uppercase tracking-wide px-3.5 py-2 rounded-full border ${
                accent === "forest"
                  ? "border-forest/30 text-forest bg-forest/5"
                  : "border-roast/30 text-roast bg-roast/5"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* Disclaimer */}
      <p className="font-body text-xs text-ink/45 max-w-2xl border-t border-ink/10 pt-6">
        {product.disclaimer}
      </p>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="font-mono text-xs uppercase tracking-wide text-ink/45">{label}</span>
      <span className="font-body text-sm text-ink/75">{value}</span>
    </div>
  );
}
