import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // New Palette
        espresso: "#4A3B32", // Primary Text/Buttons (was Red)
        latte: "#DDbea9",    // Secondary/Borders (was Yellow)
        sage: "#6B9080",     // Accent/Success
        cream: "#F9F7F2",    // Background (was White)

        // Legacy Mapping (for instant re-theme)
        metro: "#4A3B32",    // Maps to Espresso
        cheese: "#6B9080",   // Maps to Sage (for contrast)
        plate: "#F9F7F2",    // Maps to Cream
      },
      fontFamily: {
        sans: ["var(--font-lato)"],
        heading: ["var(--font-playfair)"],
      },
    },
  },
  plugins: [],
};
export default config;
