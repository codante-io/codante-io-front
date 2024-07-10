import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
import tailwindForm from "@tailwindcss/forms";
import tailwindTypography from "@tailwindcss/typography";
import tailwindContainerQueries from "@tailwindcss/container-queries";

const config = {
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
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
        lexend: ["Lexend", "sans-serif"],
        inter: ["Inter var", "sans-serif"],
        cursive: ["Gloria Hallelujah", "cursive"],
      },
      colors: {
        gray: {
          darkest: "#0E141A",
          dark: "#17212B",
        },
        brand: {
          DEFAULT: "#5282FF",
          50: "#FFFFFF",
          100: "#F5F8FF",
          200: "#CCDAFF",
          300: "#A4BDFF",
          400: "#7B9FFF",
          500: "#5282FF",
          600: "#1A59FF",
          700: "#003EE1",
          800: "#002FA9",
          900: "#001F71",
          950: "#001755",
        },
        background: {
          DEFAULT: "#0E141A",
          50: "#FCFCFD",
          100: "#F1F4F8",
          150: "#E9EEF3",
          200: "#CDD8E4",
          300: "#A8BCD0",
          400: "#84A0BD",
          500: "#5F84A9",
          600: "#364C63",
          700: "#1E2B38",
          800: "#17212B",
          900: "#0E141A",
          950: "#040608",
        },
      },
      animation: {
        bg: "bg 5s ease infinite",
        "rotate-bg": "rotate-bg 5s linear infinite",
        tada: "tada 1s ease-in-out ",
        float: "float 2s ease-in-out infinite",
        popover: "popover 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },

        bg: {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
        "rotate-bg": {
          "0%": {
            transform: "rotate(0deg)",
          },
          "50%": {
            transform: "rotate(180deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
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
        float: {
          "0%": {
            transform: "translatey(0px)",
          },
          "50%": {
            transform: "translatey(-5px)",
          },
          "100%": {
            transform: "translatey(0px)",
          },
        },
        popover: {
          from: {
            opacity: "0",
            transform: "translateY(4px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
    },
  },
  plugins: [tailwindForm, tailwindTypography, tailwindContainerQueries],
} satisfies Config;

export default config;
