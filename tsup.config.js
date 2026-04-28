import { defineConfig } from "tsup";


class TsupConfigFactory {
  static createConfigs() {
    return [
      defineConfig({
        entry: ["src/index.js"],      // Entry Point
        outDir: "dist",
        outExtension: () => ({js: ".js"}),
        format: ["esm"],       // Dual out formate
        dts: false,                    // Not Geneating d.ts as it is not reliable
        sourcemap: true,
        globalName: "events",
        clean: true,
        minify: true,
        target: "es2020",
        splitting: false
      }),
      defineConfig({
        entry: ["src/index.js"],      // Entry Point
        outDir: "dist",
        outExtension: () => ({js: ".cjs"}),
        format: ["cjs"],       // Dual out formate
        dts: false,                    // Not Geneating d.ts as it is not reliable
        sourcemap: true,
        globalName: "events",
        clean: true,
        minify: true,
        target: "es2020",
        splitting: false
      }),
      defineConfig({
        entry: ["src/index.js"],      // Entry Point
        format: ["iife"],       // Dual out formate
        outDir: "dist",
        dts: false,                    // Not Geneating d.ts as it is not reliable
        sourcemap: true,
        globalName: "events",
        entryNames: "events",
        clean: true,
        minify: true,
        target: "es2020",
        splitting: false
      })
    ];
  }
}

defineConfig({
  entry: ["src/index.js"],      // Entry Point
  format: ["esm", "cjs", "iife"],       // Dual out formate
  dts: false,                    // Not Geneating d.ts as it is not reliable
  sourcemap: true,
  globalName: "events",
  clean: true,
  minify: true,
  target: "es2020",
  splitting: false
});


export default TsupConfigFactory.createConfigs();
