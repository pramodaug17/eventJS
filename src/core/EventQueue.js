
/**
 * @typedef {Object} QueueItem
 * @property {string} eventName
 * @property {any} payload
 * @property {(eventName: string, payload: any) => Promise<void>|void} dispatcher
 */


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
    /** @type {QueueItem[]}   */
    this.queue = [];
    this.isScheduled = false;
    this.strategy = strategy;
  }

  /**
   * @param {string} eventName - name of the event
   * @param {any} payload - data which will be sent to callback
   * @param {(eventName: string, payload: any) => Promise<void>|void} dispatcher - function which will call all the callbacks
   */
  enqueue (eventName, payload, dispatcher) {
    this.queue.push({eventName, payload, dispatcher});

    if (!this.isScheduled) {
      this.isScheduled = true;
      this.scheduleFlush();
    }
  }

  /**
   *  
   */
  scheduleFlush () {
    const runner = () => this.flush();
    switch (this.strategy) {
      case "microtask":
        queueMicrotask(() => {
          runner();
        });
        break;
      case "idle":
        if (typeof requestIdleCallback !== "undefined") {
          requestIdleCallback(runner);
        } else {
          setTimeout(runner, 16);
        }
        break;
      default:
        setTimeout(runner,0);
        break;
    }
  }

  /**
   * 
   */
  async flush () {
    this.isScheduled = false;

    while (this.queue.length > 0) {
      /** @type {QueueItem|undefined} */
      const item = this.queue.shift();

      if (!item) continue;

      const { eventName, payload, dispatcher } = item;

      try {
        await this.dispatchAsync(dispatcher, eventName, payload);
      } catch (error) {
        console.error("[EventQueue Error]", error);
      }

      await this.yieldControl();
    }
  }

  /**
   * 
   */
  async yieldControl () {
    return new Promise(resolve => setTimeout(resolve, 0));
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