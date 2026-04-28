import { describe, expect, it, vi } from "vitest";
import { EventQueue } from "../../src/core/EventQueue";


describe("Event Queue", () =>{
  
  it("should enqueue and process task", async() => {
    const queue = new EventQueue();
    let executed = false;

    queue.enqueue("test", 1, () => {
      executed = true;
    });

    await new Promise(r => setTimeout(r,10));

    expect(executed).toBe(true);
  });

  it("should process tasks in order", async () => {
    const queue = new EventQueue();

    const result = [];

    queue.enqueue("test1", 1, () => result.push(1));
    queue.enqueue("test2", 2, () => result.push(2));

    await new Promise(r => setTimeout(r,20));

    expect(result).toEqual([1,2]);
  });

  it("should not lose tasks (no overwrite bug", async () => {
    const queue = new EventQueue();
    let count = 0;

    for(let i = 0; i < 5; i++) {
      queue.enqueue("test", i, () => count++);
    }

    await new Promise(r => setTimeout(r,500));

    expect(count).toBe(5);
  });

});
