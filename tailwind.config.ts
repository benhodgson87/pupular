import exposeColors from "@tailwind-plugin/expose-colors";
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
  plugins: [
    exposeColors({
      prefix: "--tw",
      mode: "hex",
      extract: ["orange"],
    }),
  ],
} satisfies Config;
