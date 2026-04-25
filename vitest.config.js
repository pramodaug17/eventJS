import { defineConfig } from "vitest/config";

class ViTestConfigurationBuilder {
  static create() {
    return defineConfig({
      test: {
        globals: true,
        environment: "jsdom",
        coverage: {
          provider: "v8",
          reporter: ["text", "html"],
        },
        include: ["test/**/*.spec.js"],
      }
    })
  }
}

export default ViTestConfigurationBuilder.create();
