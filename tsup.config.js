import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.js"],      // Entry Point
  format: ["esm", "cjs", "iife"],       // Dual out formate
  dts: false,                    // Not Geneating d.ts as it is not reliable
  sourcemap: true,
  globalName: "EventJs",
  clean: true,
  minify: true,
  target: "es2020",
  splitting: false
});

