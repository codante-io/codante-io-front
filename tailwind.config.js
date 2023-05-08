const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      padding: {
        DEFAULT: "0.8rem",
        sm: "2rem",
        lg: "1.5rem",
        xl: "3rem",
        "2xl": "10rem",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        lexend: ["Lexend", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        gray: {
          darkest: "#0E141A",
          dark: "#17212B",
        },
        brand: {
          DEFAULT: "#5282FF",
        },
      },
      animation: {
        text: "text 5s ease infinite",
        tada: "tada 1s ease-in-out ",
      },
      keyframes: {
        text: {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
        tada: {
          from: { transform: "scale3d(1, 1, 1)" },
          "10%, 20%": {
            transform: "scale3d(0.97, 0.97, 0.97) rotate3d(0, 0, 1, -3deg)",
          },
          "30%, 50%, 70%, 90%": {
            transform: "scale3d(1.03, 1.03, 1.03) rotate3d(0, 0, 1, 3deg)",
          },
          "40%, 60%, 80%": {
            transform: "scale3d(1.03, 1.03, 1.03) rotate3d(0, 0, 1, -3deg)",
          },
          to: { transform: "scale3d(1, 1, 1)" },
        },
      },
    },
  },
  safelist: [
    "bg-orange-500",
    "bg-orange-600",
    "bg-amber-500",
    "bg-amber-600",
    "bg-lime-500",
    "bg-lime-600",
    "bg-blue-500",
    "bg-blue-600",
    "bg-yellow-500",
    "bg-yellow-600",
    "bg-teal-500",
    "bg-teal-600",
    "bg-cyan-500",
    "bg-cyan-600",
    "bg-red-500",
    "bg-red-600",
    "bg-purple-500",
  ],
  plugins: [require("@tailwindcss/forms")],
};
