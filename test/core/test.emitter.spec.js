// import { expect } from "chai";
import { describe, it, expect } from "vitest";
import { EventEmitter } from "../../src/core/EventEmitter";
import { EventTestHelper } from "../utility/helper";
// import { describe } from "mocha";


describe("Event Emitter - Core", () => {

  let emitter;

  beforeEach(() => {
    emitter = new EventEmitter({ strictMode: true});
  });

  it("should register the event", () => {
    emitter.registerEvent("test");

    expect(emitter.eventRegistry.hasEvent("test")).toBeTruthy();
  });

  it("should subscribe and emit event", async () => {
    emitter.registerEvent("test");

    const emitterPaylod = EventTestHelper.waitForEvent(emitter, "test");
    
    emitter.emit("test", 42);

    const payload = await emitterPaylod;

    expect(payload).toBe(42);

  });

  it("should throw if emitting unregistered event in strict mode", () => {
    expect(() => {
      emitter.emit("invalid");
    }).toThrow();
  });

  it("should not throw if strict mode is false", () => {
    
    expect(() => {
      const emitter = new EventEmitter({strictMode: false});

      emitter.emit("invalid");
    }).not.toThrow();
  });

  it("should unsubscribe correctly", () => {
    emitter.registerEvent("test");

    const hanlder = () => {
      throw new Error("should not be called");
    };

    emitter.on("test", hanlder);
    emitter.off("test", hanlder);

    expect(() => {
      emitter.emit("test");
    }).not.toThrow();    
  });

  it("should not block execution", async () => {
    const emitter = new EventEmitter();

    emitter.registerEvent("test");

    let executed = false;

    emitter.on("test", async () => {
      await new Promise(r => setTimeout(r,0));
      executed = true;
    });

    emitter.emit("test");

    expect(executed).toBe(false);

    await new Promise(r => setTimeout(r,50));

    expect(executed).toBe(true);
  });

  it("should cancel event in plugin", async () => {
    const emitter = new EventEmitter();

    emitter.registerEvent("test");

    let called = false;

    emitter.use({
      beforeEmit(ctx) {
        ctx.cancelled = true;
      }
    });

    emitter.on("test", () => {
      called = true;
    });

    emitter.emit("test");

    await new Promise(r => setTimeout(r, 10));

    expect(called).toBe(false);
  });
});
 