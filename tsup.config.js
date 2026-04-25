import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.js"],      // Entry Point
  formate: ["esm", "cjs"],       // Dual out formate
  dts: true,                    // Geneate d.ts
  sourcemap: true,
  clean: true,
  minify: true,
  target: "es2020",
  splitting: false
});

