import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          purple: {
            101: "#f6e8ff",
            102: "#e4b9fd",
            103: "#d694fc",
            104: "#c569fb",
            105: "#b541fa",
            106: "#9a32df",
            107: "#7d21c1",
            108: "#6614aa",
            109: "#4d0691"
          },
          blue: {
            100: "#d0faff",
            200: "#baf5fc",
            300: "#a6f0fa",
            400: "#92ebf7",
            500: "#7ce6f4",
            600: "#5ec0d0",
            700: "#3e96aa",
            800: "#206f86",
            900: "#004560"
          }
        }
      },
    },
  },
  plugins: [],
  darkMode: 'selector',
};
export default config;
