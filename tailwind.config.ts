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
        metro: "#E62129",
        cheese: "#FFD200",
        plate: "#FAFAFA",
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
        heading: ["var(--font-nunito)"],
      },
    },
  },
  plugins: [],
};
export default config;
