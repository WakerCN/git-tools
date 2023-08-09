import { defineConfig } from "rollup";
import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import { dts } from "rollup-plugin-dts";

import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const pkg = require("./package.json");

export default defineConfig([
  {
    input: "src/index.ts",
    output: [
      {
        dir: "dist/lib",
        format: "cjs",
        preserveModules: true,
        preserveModulesRoot: "src",
        sourcemap: true
      },
      {
        dir: "dist/es",
        format: "es",
        preserveModules: true,
        preserveModulesRoot: "src",
        sourcemap: true
      }
    ],
    plugins: [resolve(), typescript()]
  },
  {
    input: "src/index.ts",
    output: {
      format: "es",
      dir: "dist/types",
      preserveModules: true
    },
    plugins: [dts()]
  }
]);
