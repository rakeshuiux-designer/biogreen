import Image from "next/image";

export default function AboutPage() {
  return (
    <div>
      <section className="bg-forest">
        <div className="max-w-content mx-auto px-5 sm:px-8 py-16 sm:py-20">
          <p className="font-mono text-xs uppercase tracking-widest text-gold mb-4">
            Formulated, packed &amp; marketed by Bio-Green Technologies
          </p>
          <h1 className="font-display text-4xl sm:text-5xl text-cream max-w-2xl leading-tight">
            Ten years of research, distilled into a daily cup.
          </h1>
        </div>
      </section>

      <section className="max-w-content mx-auto px-5 sm:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <Image
              src="/images/biogreen-logo.png"
              alt="Bio-Green Technologies"
              width={320}
              height={80}
              className="h-12 w-auto mb-8"
            />
            <h2 className="font-display text-2xl text-ink mb-4">Why we started</h2>
            <p className="font-body text-ink/75 leading-relaxed mb-4">
              Cardiovascular disease and diabetes affect a large share of
              India's population, and a fast-moving lifestyle leaves little
              room for the kind of consistent, nutrient-dense eating that
              supports long-term health. Most people aren't short on advice —
              they're short on a practical, daily habit that actually
              delivers on it.
            </p>
            <p className="font-body text-ink/75 leading-relaxed">
              Bio-Green Technologies spent over ten years researching how to
              fold meaningful nutrition into something people already do
              every day: drink a cup of tea or coffee. That research became
              Dr. TEA and Dr. COFFEE — two blends built on moringa, ginseng
              and twelve other traditional botanicals.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl text-ink mb-4">How we formulate</h2>
            <p className="font-body text-ink/75 leading-relaxed mb-4">
              Each blend starts from a familiar base — black tea or black
              coffee — and is layered with extracts chosen for a specific
              role: amla for vitamin C, fenugreek and black jamun for
              traditional blood-sugar support, turmeric and ginger for their
              anti-inflammatory properties, and a low-glycemic herbal sugar
              in place of refined sugar.
            </p>
            <p className="font-body text-ink/75 leading-relaxed">
              Both products are manufactured under FSSAI license and are
              positioned clearly as proprietary food supplements — not as
              medicine. We'd always encourage anyone managing a health
              condition to talk to their doctor about how a product like
              this fits into their routine.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-cream-dark">
        <div className="max-w-content mx-auto px-5 sm:px-8 py-16">
          <h2 className="font-display text-2xl text-ink mb-8">Where to find us</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg border border-ink/10 p-6">
              <h3 className="font-body font-semibold text-ink mb-2">Manufacturing &amp; office</h3>
              <p className="font-body text-sm text-ink/70 leading-relaxed">
                #1-21/2, Raghavendra Nagar, Warangal High Way,
                <br />
                Uppal Khalsa, Boduppal, Hyderabad – 500092
              </p>
            </div>
            <div className="bg-white rounded-lg border border-ink/10 p-6">
              <h3 className="font-body font-semibold text-ink mb-2">Get in touch</h3>
              <p className="font-body text-sm text-ink/70 leading-relaxed">
                biogreen20261@gmail.com
                <br />
                +91 73862 75652 · +91 63095 72064 · +91 78420 02046
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
