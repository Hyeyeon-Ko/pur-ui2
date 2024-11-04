/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.{js,ts}",
  ],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    colors: {
      blue: "#1fb6ff",
      purple: "#7e5bef",
      pink: "#ff49db",
      orange: "#ff7849",
      green: "#13ce66",
      yellow: "#ffc82c",
      "gray-dark": "#273444",
      gray: "#8492a6",
      "gray-light": "#d3dce6",
      dark: {
        DEFAULT: "#1f2937", // dark gray
        blue: "#3b82f6", // blue for dark mode
        gray: "#4b5563", // gray for dark mode
        green: "#10b981", // green for dark mode
        signature: "#2e2e7a",
        sub: "#5454be",
        Button_Default: "#787586",
        Table_header: "#faf8ff",
        Grey_Darken_5: "#222222",
        Grey_Darken_4: "#333333",
        transparent: "transparent",
        white: "white",
      },
      sub: "#5454be",
      gradient_0: "#5454be",
      gradient_1: "#4444a6",
      gradient_2: "#313188",
      gradient_3: "#27277a",
      gradient_4: "#1a1a66",
      gradient_5: "#1b1b5e",
      signature: "#2e2e7a",
      white: "white",
      Grey_Default: "#888888",
      Grey_Darken_4: "#333333",
    },
    fontFamily: {
      sans: ["'Pretendard-Regular'", "sans-serif"],
    },
    extend: {
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};
