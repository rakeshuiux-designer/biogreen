import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-forest text-cream mt-24">
      <div className="max-w-content mx-auto px-5 sm:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
          <div>
            <h3 className="font-display text-xl mb-3">Bio-Green Technologies</h3>
            <p className="font-body text-sm text-cream/70 leading-relaxed">
              #1-21/2, Raghavendra Nagar, Warangal High Way,
              <br />
              Uppal Khalsa, Boduppal, Hyderabad – 500092
            </p>
          </div>

          <div>
            <h4 className="font-body text-sm font-semibold uppercase tracking-wide text-gold mb-3">
              Shop
            </h4>
            <ul className="space-y-2 font-body text-sm text-cream/80">
              <li><Link href="/products/dr-tea" className="hover:text-gold transition-colors">Dr. TEA</Link></li>
              <li><Link href="/products/dr-coffee" className="hover:text-gold transition-colors">Dr. COFFEE</Link></li>
              <li><Link href="/wholesale" className="hover:text-gold transition-colors">Bulk &amp; Wholesale</Link></li>
              <li><Link href="/about" className="hover:text-gold transition-colors">About Bio-Green</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-body text-sm font-semibold uppercase tracking-wide text-gold mb-3">
              Contact
            </h4>
            <ul className="space-y-2 font-body text-sm text-cream/80">
              <li>biogreen20261@gmail.com</li>
              <li>+91 73862 75652</li>
              <li>+91 63095 72064</li>
              <li>+91 78420 02046</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-cream/15 flex flex-col sm:flex-row justify-between gap-2 font-body text-xs text-cream/60">
          <p>© {new Date().getFullYear()} Bio-Green Technologies. All rights reserved.</p>
          <p>Proprietary food supplements. Not intended to diagnose, treat, cure or prevent any disease.</p>
        </div>
      </div>
    </footer>
  );
}
