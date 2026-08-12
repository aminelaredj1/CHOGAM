import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./sections/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        chogam: {
          midnight: "#0B1320",
          charcoal: "#0F172A",
          gold: "#D4AF37",
          goldMuted: "#C5A059",
          goldSoft: "#E2E8F0",
          white: "#FFFFFF",
          "gold-10": "rgba(212,175,55,0.10)",
          "gold-20": "rgba(212,175,55,0.20)",
          "gold-30": "rgba(212,175,55,0.30)",
          "gold-50": "rgba(212,175,55,0.50)",
        },
      },
      fontFamily: {
        serif: ["Playfair Display", "Noto Naskh Arabic", "Georgia", "serif"],
        sans: ["Manrope", "Cairo", "system-ui", "sans-serif"],
        arabic: ["Cairo", "Noto Naskh Arabic", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-gold":
          "linear-gradient(135deg, #D4AF37 0%, #C5A059 50%, #D4AF37 100%)",
        "gradient-dark":
          "linear-gradient(180deg, #0B1320 0%, #0F172A 50%, #0B1320 100%)",
      },
      animation: {
        "pulse-gold": "pulseGold 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        shimmer: "shimmer 2s linear infinite",
        "float-up": "floatUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "fade-in": "fadeIn 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "slide-in-end": "slideInEnd 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards",
      },
      keyframes: {
        pulseGold: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(212,175,55,0.4)" },
          "50%": { boxShadow: "0 0 0 12px rgba(212,175,55,0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        floatUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideInEnd: {
          "0%": { transform: "translateX(100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
      },
      transitionTimingFunction: {
        luxury: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      transitionDuration: {
        "400": "400ms",
        "600": "600ms",
        "800": "800ms",
        "1200": "1200ms",
      },
      boxShadow: {
        "gold-glow": "0 0 20px rgba(212,175,55,0.3), 0 0 60px rgba(212,175,55,0.1)",
        "gold-glow-sm": "0 0 10px rgba(212,175,55,0.25)",
        "dark-lg": "0 25px 50px rgba(0,0,0,0.7)",
        "dark-xl": "0 40px 80px rgba(0,0,0,0.8)",
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "88": "22rem",
        "100": "25rem",
        "120": "30rem",
      },
      borderWidth: {
        "0.5": "0.5px",
      },
      backdropBlur: {
        xs: "2px",
      },
      letterSpacing: {
        "ultra-wide": "0.4em",
        "widest-2": "0.3em",
      },
      screens: {
        xs: "375px",
      },
    },
  },
  plugins: [],
};

export default config;
