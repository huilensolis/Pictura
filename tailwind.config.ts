import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "cm-darker-gray": "#161616",
        "cm-gray": "#1C1C1C",
        "cm-lighter-gray": "#2C2C2C",
      },
    },
  },
  plugins: [],
};
export default config;
