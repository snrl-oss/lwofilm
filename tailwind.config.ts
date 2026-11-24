import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#070b12",
          900: "#090d16",
          850: "#0b111c",
          800: "#0f1623",
          750: "#111827",
          700: "#16202f",
        },
        brand: {
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Impact", "sans-serif"],
      },
      boxShadow: {
        "glow-emerald": "0 0 0 1px rgba(16,185,129,.10), 0 14px 40px -24px rgba(16,185,129,.30)",
        "glow-soft": "0 24px 80px -32px rgba(0,0,0,.9)",
        card: "0 18px 40px -30px rgba(0,0,0,.9)",
      },
      backgroundImage: {
        "grid-faint":
          "linear-gradient(to right, rgba(148,163,184,.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,.06) 1px, transparent 1px)",
        "emerald-fade":
          "radial-gradient(60% 80% at 50% 0%, rgba(16,185,129,.07) 0%, rgba(9,13,22,0) 70%)",
      },
      backgroundSize: {
        "grid-faint": "48px 48px",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slow-zoom": {
          "0%": { transform: "scale(1.04)" },
          "100%": { transform: "scale(1.14)" },
        },
        "pulse-ring": {
          "0%": { boxShadow: "0 0 0 0 rgba(16,185,129,.45)" },
          "70%": { boxShadow: "0 0 0 12px rgba(16,185,129,0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(16,185,129,0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-700px 0" },
          "100%": { backgroundPosition: "700px 0" },
        },
      },
      animation: {
        "fade-up": "fade-up .6s cubic-bezier(.16,1,.3,1) both",
        "fade-in": "fade-in .4s ease-out both",
        "slow-zoom": "slow-zoom 18s ease-out both",
        "pulse-ring": "pulse-ring 2.4s ease-out infinite",
        shimmer: "shimmer 1.6s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
