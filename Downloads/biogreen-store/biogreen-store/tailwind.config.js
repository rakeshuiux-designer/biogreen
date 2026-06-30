/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core palette pulled from the actual product labels
        forest: {
          DEFAULT: "#1F4D3A", // deep botanical green - primary
          dark: "#143329",
          light: "#2D6B4F",
        },
        gold: {
          DEFAULT: "#D4A537", // turmeric gold - accent
          dark: "#B3873F",
          light: "#E8C766",
        },
        roast: {
          DEFAULT: "#3D2817", // roasted coffee brown
          dark: "#28190F",
          light: "#5C3D24",
        },
        cream: {
          DEFAULT: "#FBF7EE", // warm background
          dark: "#F3ECD9",
        },
        ink: "#2A2722", // charcoal text
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      maxWidth: {
        content: "1280px",
      },
      borderRadius: {
        label: "0.25rem",
      },
    },
  },
  plugins: [],
};
