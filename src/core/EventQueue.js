/**
 * This represent Queue of Event which will be executed as per the strategy defined.
 */
export class EventQueue {
  /**
   * @constructor
   * @param {{ strategy: "macrotask" | "microtask" | "idle" }} [options={ strategy: "macrotask"}] - Strategy is defined
   */
  constructor (options = { strategy: "macrotask"}) {
    const { strategy } = options;
    /** @type {Map<string, any>} */
    this.queue = new Map();
    this.isScheduled = false;
    this.strategy = strategy;
  }

  /**
   * @param {string} eventName - name of the event
   * @param {any} payload - data which will be sent to callback
   * @param {function} dispatcher - function which will call all the callbacks
   */
  enqueue (eventName, payload, dispatcher) {
    this.queue.set(eventName, payload);

    if (!this.isScheduled) {
      this.isScheduled = true;
      this.scheduleFlush(dispatcher);
    }
  }

  /**
   * @param {function} dispatcher - function which handles calling of callback registered  
   */
  scheduleFlush (dispatcher) {
    switch (this.strategy) {
      case "microtask":
        queueMicrotask(() => {
          this.flush(dispatcher);
        })
        break;
      case "idle":
        if (typeof requestIdleCallback !== "undefined") {
          requestIdleCallback(() => {
            this.flush(dispatcher);
          });
        } else {
          setTimeout(() => {
            this.flush(dispatcher);
          }, 16);
        }
        break;
      default:
        setTimeout(() => {
          this.flush(dispatcher);
        },0);
        break;
    }
  }

  /**
   * @param {function} dispatcher - function which hanldes calling of registered callbacks
   */
  async flush (dispatcher) {
    const entries = Array.from(this.queue.entries());
    this.queue.clear();
    this.isScheduled = false;

    for (const [eventName, payload] of entries) {
      await this.dispatchAsync(dispatcher, eventName, payload);

      // yeild control
      await new Promise(r => setTimeout(r, 0));
    }
  }

  /**
   * 
   * @param {function} dispatcher - function which hanldes calling of registered callbacks
   * @param {string} eventName - name of event 
   * @param {any} payload - date passed by emitter to listener 
   */
  async dispatchAsync (dispatcher, eventName, payload) {
    await Promise.resolve().then(() => {
      dispatcher(eventName, payload);
    });
  }
}