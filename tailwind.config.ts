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
            101: "#B0AEFF",
            102: "#C4C3FF",
            103: "#B0AEFF",
            104: "#8885FF",
            105: "#605CFF",
            106: "#4845C0",
            107: "#302E80",
            108: "#242360",
            109: "#181740"
          },
          green: {
            106: "#A0C94C",
            109: "#283213",
            200: "#E9FDBF",
            400: "#D3FC7E",
            500: "#C9FC5F",
            600: "#A0C94C",
            700: "#789739",
            800: "#506426",
            900: "#283213"
          }
        },
        neutral: {
          100: "#F7F7F8",
          200: "#EBECED",
          400: "#AFB2B7",
          700: "#313236",
          900: "#1D1D1F"
        },
        orange: {
          101: "#FFEFDE",
          108: "#FFDFBE",
          103: "#FFD09D",
          105: "#FFB05C",
          107: "#B37B40",
          109: "#332312"
        }
      },
    },
  },
  plugins: [],
  darkMode: 'selector',
};
export default config;
