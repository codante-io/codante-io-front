/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        md: "2rem",
        lg: "8rem",
        xl: "9rem",
        "2xl": "10rem",
      },
    },
    extend: {
      fontFamily: {
        lexend: ["Lexend", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        gray: {
          darkest: "#0E141A",
          dark: "#17212B",
        },
      },
      animation: {
        text: "text 5s ease infinite",
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
      },
    },
  },
  plugins: [],
};
