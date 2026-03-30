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
        // ── Marca Nexora — extraído del logo al pixel ──────────────────────
        // Core neon: #13F48A (verde neón puro del icono N)
        // Glow highlight: #0BF789 (brillo central del logo)
        neon: "#13F48A",
        "neon-bright": "#0BF789",
        background: "#0a0a0a",
        surface: "#111111",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
