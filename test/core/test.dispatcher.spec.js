import { describe, expect, it, vi } from "vitest";
import { EventDispatcher } from "../../src/core/EventDispatcher";

describe("Event Dispatcher", () => {

  it("should execute listeners in parallel", async () => {
    const dispatcher = new EventDispatcher();

    const spy1 = vi.fn();
    const spy2 = vi.fn();

    const listeners = [
      { handlerFn: spy1, isOnce: false },
      { handlerFn: spy2, isOnce: false }
    ];

    await dispatcher.dispatchParallel("test", listeners, 1, null, null);

    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  });

  it("should execute listeners in sequential", async () => {
    const dispatcher = new EventDispatcher();

    const results = [];

    const listeners = [
      { handlerFn: ()=>results.push(1), isOnce: false },
      { handlerFn: ()=>results.push(2), isOnce: false }
    ];

    await dispatcher.dispatchSequential("test", listeners, 1, null, null);
    console.log(results);
    expect(results).toStrictEqual([1,2]);
  });

  it("should remove once listener", async () => {
    const dispatcher = new EventDispatcher();

    const removeMock = vi.fn();

    const listener = [
      { handlerFn: removeMock, isOnce: true}
    ];

    await dispatcher.dispatchSequential("test", listener, 1, null, null);

    expect(removeMock).toHaveBeenCalled();
  });
});