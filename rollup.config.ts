import { defineConfig } from "rollup";
import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import shebang from "rollup-plugin-preserve-shebang";
import json from "@rollup/plugin-json";

import { readFileSync } from "node:fs";
const pkg = JSON.parse(
  readFileSync(new URL("./package.json", import.meta.url)).toString()
);

export default defineConfig([
  {
    input: "src/index.ts",
    output: {
      dir: "dist/es",
      format: "esm",
      sourcemap: true,
      preserveModules: true,
      preserveModulesRoot: "src"
    },

    external: [...Object.keys(pkg.dependencies)],

    plugins: [
      nodeResolve(),
      commonjs(),
      json(),
      typescript(),
      shebang({
        shebang: "#! /usr/bin/env node"
      })
    ]
  }
]);
