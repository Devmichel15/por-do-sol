/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,html}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ff7f50",
        "primary-dark": "#e66a3c",
        secondary: "#d4af37",
        dark: "#0f172a",
        "dark-lighter": "#1e293b",
        "dark-darker": "#020617",
        light: "#f8fafc",
      },
      fontFamily: {
        heading: ["'Playfair Display'", "serif"],
        body: ["Montserrat", "sans-serif"],
      },
      backgroundImage: {
        "hero-pattern": "linear-gradient(to top, rgba(15, 23, 42, 0.8), transparent), url('/images/hero.jpg')",
        "cocktail-pattern": "linear-gradient(rgba(15, 23, 42, 0.9), rgba(15, 23, 42, 0.9)), url('/images/cocktail.jpg')",
        "cta-pattern": "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/hero.jpg')",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.8s ease-out forwards",
        "fade-in": "fade-in 1s ease-out forwards",
      },
      boxShadow: {
        "text-shadow": "2px 2px 4px rgba(0, 0, 0, 0.5)",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".text-shadow": {
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
        },
      };
      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
