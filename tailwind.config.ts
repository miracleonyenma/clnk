import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    extend: {
      fontFamily: {
        heading: [
          "'Instrument Serif'",
          "'Brygada 1918'",
          "'Old Standard TT'",
          "Gupter",
          "Oranienbaum",
          "Imbue",
          "EB Garamond",
          ...defaultTheme.fontFamily.sans,
        ],
        sans: ["DM Sans", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
} satisfies Config;

export default config;
