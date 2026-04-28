import { describe, it, expect, vi } from "vitest";
import { PluginManager } from "../../src/core/EventPlugin";

describe("Plugin Manager", () => {

  it("should execute beforeEmit hook", async () => {
    const manager = new PluginManager();

    const spy1 = vi.fn();

    manager.use({
      beforeEmit: spy1
    });

    await manager.runHook("beforeEmit", {});

    expect(spy1).toHaveBeenCalled();
  });

  it("should stop execution when cancelled", async () => {
    const manager = new PluginManager();

    const spy1 = vi.fn();

    manager.use({
      beforeEmit(ctx) {
        ctx.cancelled = true;
      }
    });

    manager.use({
      beforeEmit: spy1
    });

    await manager.runHook("beforeEmit", {cancelled: false});

    expect(spy1).not.toHaveBeenCalled();
  });

  it("should handle errors via onError", async () => {
    const manager = new PluginManager();

    const spy = vi.fn();

    manager.use({
      beforeEmit() {
        throw new Error("Failed");
      },
      onError: spy
    });

    await manager.runHook("beforeEmit", {})

    expect(spy).toHaveBeenCalled();
  });
});
