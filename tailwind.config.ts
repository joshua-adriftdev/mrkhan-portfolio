import type { Config } from "tailwindcss";

const withMT = require("@material-tailwind/react/utils/withMT");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        white: '#ffffff',
        primaryBackground: '#0D0D0D',
        primaryText: '#808080',
        stroke: '#383737',
        avatarBackground: '#171616',
        contentBackground: '#181818',
      },
    },
    fontFamily: {
      inter: ["Inter", 'sans-serif']
    }
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
};
export default withMT(config);
