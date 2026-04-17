/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", 
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#E6EAF6",
          100: "#CCD5ED",
          200: "#99ACDB",
          300: "#6682C9",
          400: "#3359B7",
          500: "#002FA5",
          600: "#001271",
          700: "#001064",
          800: "#000D4F",
          900: "#000A3A",
        },
        // NEW: Semantic Theme Colors
        theme: {
          bg: "rgb(var(--bg-primary) / <alpha-value>)",
          surface: "rgb(var(--bg-secondary) / <alpha-value>)",
          base: "rgb(var(--bg-tertiary) / <alpha-value>)",
          text: "rgb(var(--text-primary) / <alpha-value>)",
          muted: "rgb(var(--text-secondary) / <alpha-value>)",
          border: "rgb(var(--border-primary) / <alpha-value>)",
        },
        secondary: {
          500: "#C28F00",
          600: "#9A7100",
        },
      },
      fontFamily: {
        serif: ["Cinzel", "serif"],
        sans: ["Inter", "sans-serif"],
      },
      boxShadow: {
        soft: "var(--shadow)",
        "soft-lg": "var(--shadow-lg)",
      },
    },
  },
  plugins: [],
};