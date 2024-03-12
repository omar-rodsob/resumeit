import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'main': '#003E6B',
        'second': '#082f49',
        'three': '#082f49',
        'four': '#082f49',
        'five': '#082f49',
        'six': '#082f49',
        'seven': '#082f49',
        'eigth': '#082f49',
        'nine': '#082f49',
        'subHeader':'#003E6B',
        'borderColor': '#003E6B',
        'body': '#f1f4f8',
        'module' : '#FFFFFF',
        'cleanText' : '#ffffff'
      }
    },
  },
  plugins: [],
};
export default config;
