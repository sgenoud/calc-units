import typescript from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";
import banner from "rollup-plugin-banner";
import clear from "rollup-plugin-clear";

import pkg from "./package.json";

// delete old typings to avoid issues
require("fs").unlink("dist/index.d.ts", err => {});

const BANNER = `calc-units
v<%= pkg.version %> (${new Date().toISOString()}) 
2019-${new Date().getFullYear()} <%= pkg.author %>
`;

export default {
  input: "index.ts",

  output: [
    {
      file: pkg.main,
      exports: "named",
      format: "cjs"
    },
    {
      file: pkg.module,
      exports: "named",
      format: "es"
    },
    {
      file: pkg.browser,
      exports: "named",
      format: "iife",
      name: "calcUnits"
    }
  ],

  plugins: [
    clear({
      // required, point out which directories should be clear.
      targets: ["dist"]
    }),
    typescript({
      typescript: require("typescript")
    }),
    terser({
      include: [/^.+\.bundle\.js$/]
    }),
    banner(BANNER)
  ]
};
