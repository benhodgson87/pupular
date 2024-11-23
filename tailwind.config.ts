import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "lexend-deca": ['"Lexend Deca"', "sans-serif"],
        "cherry-bomb-one": ['"Cherry Bomb One"', "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
