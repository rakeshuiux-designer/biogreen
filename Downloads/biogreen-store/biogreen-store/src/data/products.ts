// Product catalog for Bio-Green Technologies
// Nutritional data and ingredients sourced from official product labels.

export type Variant = {
  id: string;
  label: string; // e.g. "100g Pouch"
  weightGrams: number;
  price: number; // INR
  mrp: number; // INR, inclusive of all taxes
};

export type NutritionFact = {
  label: string;
  value: string;
};

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  shortDescription: string;
  longDescription: string[];
  logo: string;
  heroAccent: "forest" | "roast";
  servingSize: string;
  directions: string;
  storage: string;
  ingredients: string[];
  nutrition: NutritionFact[];
  vitamins: string[];
  benefits: { title: string; description: string }[];
  usefulFor: string[];
  variants: Variant[];
  bestBefore: string;
  fssaiLicense: string;
  disclaimer: string;
};

export const products: Product[] = [
  {
    slug: "dr-tea",
    name: "Dr. TEA",
    tagline: "With Oats Milk, Moringa & Ginseng",
    shortDescription:
      "A nutrient-dense herbal tea blend rich in vitamins, minerals, antioxidants, fiber, plant protein and healthy fats — formulated to support immunity, weight management and everyday vitality.",
    longDescription: [
      "Dr. TEA is built on black tea blended with moringa, ginseng, oats milk and a low-GI herbal sugar made from over a dozen traditional botanical extracts. It's designed as a daily nutritional drink rather than a medicine — a concentrated, easy-to-digest source of vitamins, minerals and plant protein for people whose everyday diets fall short.",
      "Each serving is mixed fresh: just two teaspoons in hot or cold water. The blend draws on ingredients long used in Indian wellness traditions — amla, fenugreek, black cumin, turmeric — combined with moringa and ginseng for an antioxidant-rich profile.",
    ],
    logo: "/images/dr-tea-logo.png",
    heroAccent: "forest",
    servingSize: "10 g (2 tea spoons)",
    directions: "Add 10 g (2 tea spoons) of Dr. TEA to 100 ml of hot or cold water and mix well to drink.",
    storage: "Store in a cool place, airtight. Do not refrigerate.",
    ingredients: [
      "Black Tea",
      "Moringa",
      "Ginseng",
      "Blended Spice Extracts",
      "Low GI Herbal Sugar with extracts of:",
      "Indian Senna",
      "Black Jamun",
      "Black Cumin",
      "Fenugreek",
      "Indian Gooseberry (Amla)",
      "Black Pepper",
      "Cinnamon",
      "Turmeric",
      "Cumin",
      "Cloves",
      "Ginger",
      "Star Anise",
      "Coriander Seeds",
      "Guava Leaves",
      "White Pepper",
      "Ajwain",
      "Fennel Seeds",
    ],
    nutrition: [
      { label: "Serving Size", value: "10 g" },
      { label: "Energy", value: "25 kcal" },
      { label: "Total Fat", value: "0.75 g" },
      { label: "Carbohydrates", value: "2.60 g" },
      { label: "Total Sugar", value: "1.50 g" },
      { label: "Added Sugar", value: "0.50 g" },
      { label: "Protein", value: "2.3 g" },
      { label: "Fibre", value: "1.2 g" },
      { label: "Iron", value: "0.5 g" },
      { label: "Beta Carotene", value: "0.1 g" },
      { label: "Calcium", value: "0.2 g" },
      { label: "Potassium", value: "0.1 g" },
      { label: "Phosphorus", value: "0.1 g" },
    ],
    vitamins: ["A", "C", "E", "B1", "B2", "B3", "B6"],
    benefits: [
      {
        title: "Rich in Nutrients",
        description:
          "A concentrated, easily digestible source of vitamins A, C and E, minerals like calcium, potassium and iron, and plant protein.",
      },
      {
        title: "Antioxidant Properties",
        description:
          "Compounds like quercetin, chlorogenic acid and beta-carotene help the body combat oxidative stress.",
      },
      {
        title: "Anti-Inflammatory Effects",
        description:
          "May help manage inflammatory conditions and reduce inflammation-related discomfort.",
      },
      {
        title: "Supports Cardiovascular Health",
        description:
          "The combination of antioxidants and anti-inflammatory properties supports overall heart health.",
      },
      {
        title: "Supports Brain Health",
        description:
          "Antioxidants and neuroprotective properties may help protect against oxidative stress linked to cognitive decline.",
      },
      {
        title: "Natural Energy Booster",
        description:
          "Iron and B vitamins help combat fatigue, offering a nutritious alternative to synthetic energy supplements.",
      },
    ],
    usefulFor: [
      "Immunity",
      "Strength & Vitality",
      "Diabetes",
      "Blood Cells",
      "Heart Health",
      "Obesity",
      "Kidneys",
      "Liver",
      "Bones",
      "Hair",
      "Eyes",
      "Skin",
      "Antioxidant",
    ],
    variants: [
      { id: "dr-tea-100g", label: "100 g Pouch", weightGrams: 100, price: 1000, mrp: 1000 },
      { id: "dr-tea-300g", label: "300 g Pack (3x)", weightGrams: 300, price: 2850, mrp: 3000 },
      { id: "dr-tea-1kg", label: "1 kg Bulk Pack", weightGrams: 1000, price: 9000, mrp: 10000 },
    ],
    bestBefore: "12 months from packing",
    fssaiLicense: "13621034000089",
    disclaimer: "A proprietary food supplement. Not to be used as medicine. If pregnant or nursing, consult a physician before use.",
  },
  {
    slug: "dr-coffee",
    name: "Dr. COFFEE",
    tagline: "With Oats Milk, Moringa & Ginseng",
    shortDescription:
      "A nutrient-dense herbal coffee blend rich in vitamins, minerals, antioxidants, fiber, plant protein and healthy fats — formulated to support immunity, weight management and everyday vitality.",
    longDescription: [
      "Dr. COFFEE takes black coffee and blends it with moringa, ginseng, oats milk and a low-GI herbal sugar made from traditional botanical extracts. Like its tea counterpart, it's designed as a daily nutritional drink — a concentrated, easy-to-digest source of vitamins, minerals and plant protein.",
      "Mixed fresh in seconds, it carries the same wellness-forward ingredient philosophy: amla, fenugreek, black cumin, turmeric, ginger and more, alongside moringa and ginseng for an antioxidant-rich daily cup.",
    ],
    logo: "/images/dr-coffee-logo.png",
    heroAccent: "roast",
    servingSize: "10 g (2 tea spoons)",
    directions: "Add 10 g (2 tea spoons) of Dr. COFFEE to 100 ml of hot or cold water and mix well to drink.",
    storage: "Store in a cool place, airtight. Do not refrigerate.",
    ingredients: [
      "Black Coffee",
      "Moringa",
      "Ginseng",
      "Blended Spice Extracts",
      "Low GI Herbal Sugar with extracts of:",
      "Indian Senna",
      "Black Jamun",
      "Black Cumin",
      "Fenugreek",
      "Indian Gooseberry (Amla)",
      "Black Pepper",
      "Cinnamon",
      "Turmeric",
      "Cumin",
      "Cloves",
      "Ginger",
      "Star Anise",
      "Coriander Seeds",
      "Guava Leaves",
      "White Pepper",
      "Ajwain",
      "Fennel Seeds",
    ],
    nutrition: [
      { label: "Serving Size", value: "10 g" },
      { label: "Energy", value: "25 kcal" },
      { label: "Total Fat", value: "0.75 g" },
      { label: "Carbohydrates", value: "2.60 g" },
      { label: "Total Sugar", value: "1.50 g" },
      { label: "Added Sugar", value: "0.50 g" },
      { label: "Protein", value: "2.3 g" },
      { label: "Fibre", value: "1.2 g" },
      { label: "Iron", value: "0.5 g" },
      { label: "Beta Carotene", value: "0.1 g" },
      { label: "Calcium", value: "0.2 g" },
      { label: "Potassium", value: "0.1 g" },
      { label: "Phosphorus", value: "0.1 g" },
    ],
    vitamins: ["A", "C", "E", "B1", "B2", "B3", "B6"],
    benefits: [
      {
        title: "Rich in Nutrients",
        description:
          "A concentrated, easily digestible source of vitamins A, C and E, minerals like calcium, potassium and iron, and plant protein.",
      },
      {
        title: "Antioxidant Properties",
        description:
          "Compounds like quercetin, chlorogenic acid and beta-carotene help the body combat oxidative stress.",
      },
      {
        title: "Anti-Inflammatory Effects",
        description:
          "May help manage inflammatory conditions and reduce inflammation-related discomfort.",
      },
      {
        title: "Supports Cardiovascular Health",
        description:
          "The combination of antioxidants and anti-inflammatory properties supports overall heart health.",
      },
      {
        title: "May Aid Weight Management",
        description:
          "Properties that can support a healthy metabolism, helping manage body weight and fat mass.",
      },
      {
        title: "Boosts Immunity",
        description:
          "Rich content of vitamin C and zinc contribute to a strengthened immune system.",
      },
    ],
    usefulFor: [
      "Immunity",
      "Strength & Vitality",
      "Diabetes",
      "Blood Cells",
      "Heart Health",
      "Obesity",
      "Kidneys",
      "Liver",
      "Bones",
      "Hair",
      "Eyes",
      "Skin",
      "Antioxidant",
    ],
    variants: [
      { id: "dr-coffee-100g", label: "100 g Pouch", weightGrams: 100, price: 1000, mrp: 1000 },
      { id: "dr-coffee-300g", label: "300 g Pack (3x)", weightGrams: 300, price: 2850, mrp: 3000 },
      { id: "dr-coffee-1kg", label: "1 kg Bulk Pack", weightGrams: 1000, price: 9000, mrp: 10000 },
    ],
    bestBefore: "12 months from packing",
    fssaiLicense: "13621034000089",
    disclaimer: "A proprietary food supplement. Not to be used as medicine. If pregnant or nursing, consult a physician before use.",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export const comparisonStats = [
  { nutrient: "Vitamin A", multiplier: "4x More", comparedTo: "than Carrots" },
  { nutrient: "Vitamin C", multiplier: "4x More", comparedTo: "than Oranges" },
  { nutrient: "Calcium", multiplier: "14x More", comparedTo: "than Milk" },
  { nutrient: "Vitamin E", multiplier: "4x More", comparedTo: "than Almonds" },
  { nutrient: "Dietary Fiber", multiplier: "4x More", comparedTo: "than Oats" },
  { nutrient: "Potassium", multiplier: "4x More", comparedTo: "than Bananas" },
  { nutrient: "Iron", multiplier: "9x More", comparedTo: "than Spinach" },
];
