"use client";

import { useState } from "react";

type LedgerEntry = {
  name: string;
  role: string;
  origin: string;
};

const LEDGER: LedgerEntry[] = [
  { name: "Moringa", role: "Antioxidant & micronutrient density", origin: "Leaf" },
  { name: "Ginseng", role: "Adaptogen, supports vitality", origin: "Root" },
  { name: "Indian Gooseberry (Amla)", role: "Vitamin C source", origin: "Fruit" },
  { name: "Fenugreek", role: "Supports healthy blood sugar", origin: "Seed" },
  { name: "Black Cumin", role: "Antimicrobial, digestive support", origin: "Seed" },
  { name: "Turmeric", role: "Anti-inflammatory compounds", origin: "Rhizome" },
  { name: "Cinnamon", role: "Supports metabolism", origin: "Bark" },
  { name: "Ginger", role: "Digestive, anti-inflammatory", origin: "Rhizome" },
  { name: "Black Jamun", role: "Traditional blood-sugar support", origin: "Fruit" },
  { name: "Indian Senna", role: "Gentle digestive support", origin: "Leaf" },
  { name: "Guava Leaves", role: "Antioxidant polyphenols", origin: "Leaf" },
  { name: "Star Anise", role: "Digestive aromatic", origin: "Fruit" },
  { name: "Ajwain", role: "Digestive support", origin: "Seed" },
  { name: "Fennel Seeds", role: "Digestive, cooling", origin: "Seed" },
];

export default function IngredientLedger() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="bg-white rounded-lg border border-forest/15 overflow-hidden">
      <div className="bg-forest px-6 py-4 flex items-center justify-between">
        <h3 className="font-display text-cream text-lg">The Ledger of 14 Botanicals</h3>
        <span className="font-mono text-xs text-gold uppercase tracking-widest">
          Tap an entry
        </span>
      </div>
      <ul role="list" className="divide-y divide-forest/10">
        {LEDGER.map((entry, idx) => {
          const isActive = active === idx;
          return (
            <li key={entry.name} className="ledger-row">
              <button
                onClick={() => setActive(isActive ? null : idx)}
                className="w-full text-left px-6 py-3.5 flex items-center justify-between gap-4 hover:bg-cream/60 transition-colors"
                aria-expanded={isActive}
              >
                <span className="flex items-baseline gap-3">
                  <span className="font-mono text-xs text-ink/40 w-6">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className="font-body font-medium text-ink">{entry.name}</span>
                </span>
                <span className="font-mono text-[11px] uppercase tracking-wide text-gold-dark shrink-0">
                  {entry.origin}
                </span>
              </button>
              {isActive && (
                <p className="px-6 pb-4 pl-[3.25rem] font-body text-sm text-ink/70 -mt-1">
                  {entry.role}
                </p>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
