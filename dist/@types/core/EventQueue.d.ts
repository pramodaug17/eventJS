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
    constructor(options?: {
        strategy: "macrotask" | "microtask" | "idle";
    });
    /** @type {QueueItem[]}   */
    queue: QueueItem[];
    isScheduled: boolean;
    strategy: "idle" | "macrotask" | "microtask";
    /**
     * @param {string} eventName - name of the event
     * @param {any} payload - data which will be sent to callback
     * @param {(eventName: string, payload: any) => Promise<void>|void} dispatcher - function which will call all the callbacks
     */
    enqueue(eventName: string, payload: any, dispatcher: (eventName: string, payload: any) => Promise<void> | void): void;
    /**
     *
     */
    scheduleFlush(): void;
    /**
     *
     */
    flush(): Promise<void>;
    /**
     *
     */
    yieldControl(): Promise<any>;
    /**
     *
     * @param {function} dispatcher - function which hanldes calling of registered callbacks
     * @param {string} eventName - name of event
     * @param {any} payload - date passed by emitter to listener
     */
    dispatchAsync(dispatcher: Function, eventName: string, payload: any): Promise<void>;
}
export type QueueItem = {
    eventName: string;
    payload: any;
    dispatcher: (eventName: string, payload: any) => Promise<void> | void;
};
