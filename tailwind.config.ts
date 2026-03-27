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
        neon: "#efff00",
        background: "#0a0a0a",
        surface: "#111111",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
