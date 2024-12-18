/** @type {import('tailwindcss').Config} */

import { Colors } from "tailwindcss/defaultTheme";
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        ...Colors,
        primary: "#161622",
        secondary: {
          DEFAULT: "#0a7ea4",
          100: "#0690d0",
          200: "#067fb7",
        },
        yellow: {
          DEFAULT: "#FF9C01",
          100: "#FF9001",
          200: "#FF8E01",
        },
        black: {
          DEFAULT: "#000",
          100: "#1E1E2D",
          200: "#232533",
        },
        gray: {
          100: "#CDCDE0",
        },
        white: {
          DEFAULT: "#fff",
          100: "#f5f5f5",
        },
        confirm: "#0057fa",
        unConfirm: "#FF0000",
        alert: "#CC384E",
        success: "#00C48C",
      },
      fontFamily: {
        pregular: ["Poppins-Regular", "sans-serif"],
        pmedium: ["Poppins-Medium", "sans-serif"],
        psemibold: ["Poppins-SemiBold", "sans-serif"],
      },
    },
  },
  plugins: [],
}