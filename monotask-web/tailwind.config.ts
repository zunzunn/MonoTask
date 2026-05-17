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
        // Exact Stitch/Terra palette
        "on-surface-variant": "#4a4e4a",
        "surface-tint": "#4a7c59",
        "on-primary-container": "#d8f0de",
        "tertiary-fixed": "#f8e0a8",
        "on-tertiary": "#ffffff",
        "surface:": "#faf6f0",
        "surface-container-low": "#f5f1ea",
        "on-surface": "#2e3230",
        "on-primary": "#ffffff",
        tertiary: "#705c30",
        "inverse-surface": "#2e3230",
        secondary: "#6b6358",
        "on-primary-fixed-variant": "#2a6038",
        "on-tertiary-fixed": "#221a05",
        background: "#faf6f0",
        "primary-fixed-dim": "#8ecf9e",
        "surface-container": "#f0ece4",
        "inverse-primary": "#8ecf9e",
        surface: "#faf6f0",
        "surface-dim": "#dbd7cf",
        "surface-container-lowest": "#ffffff",
        "on-secondary": "#ffffff",
        "secondary-container": "#f0e8db",
        "on-tertiary-container": "#554020",
        "on-primary-fixed": "#002110",
        "secondary-fixed": "#f0e8db",
        "primary-fixed": "#c8e8d0",
        "on-secondary-fixed-variant": "#4a4538",
        "secondary-fixed-dim": "#d4ccbf",
        error: "#b83230",
        "surface-variant": "#e4e0d8",
        "inverse-on-surface": "#f5f0e8",
        "primary-container": "#78a886",
        "tertiary-container": "#c4a66a",
        "error-container": "#ffdad8",
        "on-background": "#2e3230",
        "on-tertiary-fixed-variant": "#554020",
        "surface-container-high": "#eae6de",
        primary: "#4a7c59",
        "surface-bright": "#faf6f0",
        outline: "#74796e",
        "on-error-container": "#690005",
        "on-secondary-fixed": "#1e1a13",
        "outline-variant": "#c4c8bc",
        "surface-container-highest": "#e4e0d8",
        "on-error": "#ffffff",
        "tertiary-fixed-dim": "#dcc48e",
        "on-secondary-container": "#5e5548",
      },
      fontFamily: {
        headline: ["Hanken Grotesk", "sans-serif"],
        display: ["Hanken Grotesk", "sans-serif"],
        body: ["Atkinson Hyperlegible Next", "sans-serif"],
        label: ["Atkinson Hyperlegible Next", "sans-serif"],
        "body-lg": ["Atkinson Hyperlegible Next", "sans-serif"],
        "body-md": ["Atkinson Hyperlegible Next", "sans-serif"],
        "headline-xl": ["Hanken Grotesk", "sans-serif"],
        "label-md": ["Atkinson Hyperlegible Next", "sans-serif"],
        "label-sm": ["Atkinson Hyperlegible Next", "sans-serif"],
        "headline-lg": ["Hanken Grotesk", "sans-serif"],
        "headline-lg-mobile": ["Hanken Grotesk", "sans-serif"],
        "headline-md": ["Hanken Grotesk", "sans-serif"],
      },
      fontSize: {
        "body-lg": ["20px", { lineHeight: "32px", fontWeight: "400" }],
        "body-md": ["17px", { lineHeight: "26px", fontWeight: "400" }],
        "headline-xl": [
          "48px",
          {
            lineHeight: "56px",
            letterSpacing: "-0.01em",
            fontWeight: "700",
          },
        ],
        "label-md": [
          "14px",
          {
            lineHeight: "20px",
            letterSpacing: "0.02em",
            fontWeight: "500",
          },
        ],
        "label-sm": [
          "12px",
          {
            lineHeight: "16px",
            letterSpacing: "0.05em",
            fontWeight: "600",
          },
        ],
        "headline-lg-mobile": [
          "28px",
          {
            lineHeight: "36px",
            letterSpacing: "-0.01em",
            fontWeight: "600",
          },
        ],
        "headline-lg": [
          "32px",
          {
            lineHeight: "40px",
            letterSpacing: "-0.01em",
            fontWeight: "600",
          },
        ],
        "headline-md": [
          "24px",
          {
            lineHeight: "32px",
            fontWeight: "600",
          },
        ],
      },
      borderRadius: {
        DEFAULT: "0.5rem",
        lg: "1rem",
        xl: "1.5rem",
        full: "9999px",
        "2xl": "1.75rem",
      },
      spacing: {
        unit: "8px",
        "stack-lg": "48px",
        "stack-sm": "12px",
        "stack-md": "24px",
        "margin-mobile": "20px",
        "container-max": "1024px",
        gutter: "32px",
      },
      boxShadow: {
        sm: "0 4px 20px rgba(46, 50, 48, 0.06)",
        pearl:
          "0 0 30px rgba(74,124,89,0.4)",
        "pearl-secondary": "0 0 20px rgba(107,99,88,0.3)",
        "pearl-tertiary": "0 0 25px rgba(112,92,48,0.3)",
        "pearl-container": "0 0 15px rgba(120,168,134,0.3)",
      },
      animation: {
        "float-1": "float-1 5s ease-in-out infinite",
        "float-2": "float-2 6s ease-in-out infinite",
        "float-3": "float-3 4s ease-in-out infinite",
        shimmer: "shimmer 1.5s ease-in-out infinite",
        "fill-jar": "fill-jar 1.5s ease-out forwards",
        "spin-slow": "spin 2s linear infinite",
      },
      keyframes: {
        "float-1": {
          "0%, 100%": { transform: "translateY(0) translateX(0)" },
          "50%": { transform: "translateY(-4px) translateX(2px)" },
        },
        "float-2": {
          "0%, 100%": { transform: "translateY(0) translateX(0)" },
          "50%": { transform: "translateY(-3px) translateX(-2px)" },
        },
        "float-3": {
          "0%, 100%": { transform: "translateY(0) translateX(0)" },
          "50%": { transform: "translateY(-2px) translateX(3px)" },
        },
        shimmer: {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
        "fill-jar": {
          "0%": { height: "0%" },
          "100%": { height: "100%" },
        },
      },
      maxWidth: {
        "container-max": "1024px",
      },
    },
  },
  plugins: [],
};

export default config;