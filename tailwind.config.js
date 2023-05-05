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
            transform: "scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg)",
          },
          "30%, 50%, 70%, 90%": {
            transform: "scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)",
          },
          "40%, 60%, 80%": {
            transform: "scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)",
          },
          to: { transform: "scale3d(1, 1, 1)" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
