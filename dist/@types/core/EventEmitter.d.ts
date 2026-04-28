/**
 * This represents PubSub model of events. Events are custom events.
 */
export class EventEmitter {
    /**
     * @constructor
     * @param {{strictMode?:boolean,
     * strategy?: "macrotask" | "microtask" | "idle"
     * batch?:boolean
     * asyncMode?: true }} [options] - Enables strict mode
     *
     */
    constructor(options?: {
        strictMode?: boolean;
        strategy?: "macrotask" | "microtask" | "idle";
        batch?: boolean;
        asyncMode?: true;
    });
    /** @type {EventRegistry} */
    eventRegistry: EventRegistry;
    /** @type {EventDispatcher} */
    eventDispatcher: EventDispatcher;
    /** @type {EventQueue} */
    eventQueue: EventQueue;
    /** @type {PluginManager} */
    pluginManager: PluginManager;
    /** @type {boolean} */
    isStrictMode: boolean;
    isBatched: boolean;
    asyncMode: true;
    /**
     * This registers the event to publish event when occurrs
     * @param {string} eventName
     * @returns
     */
    registerEvent(eventName: string): this;
    /**
     *
     * @param {string} eventName Name of event
     * @param {function} handlerFn hanlder function which will handle the event
     * @returns self object
     */
    on(eventName: string, handlerFn: Function): this;
    /**
     *
     * @param {string} eventName Name of the event
     * @param {function} handlerFn Hanlder function which will handle the event
     * @returns self object
     */
    once(eventName: string, handlerFn: Function): this;
    /**
     *
     * @param {string} eventName Name of the event
     * @param {function} handlerFn Hanlder function which will handle the event
     * @returns self object
     */
    off(eventName: string, handlerFn: Function): this;
    /**
     *
     * @param {string} eventName Name of the event
     * @param {any} payload Data sent by the event emitter
     * @returns self object
     */
    emit(eventName: string, payload: any): this;
    /**
     * @param {import("./EventPlugin.js").EventPlugin} plugin
     */
    use(plugin: import("./EventPlugin.js").EventPlugin): this;
    #private;
}
import { EventRegistry } from "./EventRegistry.js";
import { EventDispatcher } from "./EventDispatcher.js";
import { EventQueue } from "./EventQueue.js";
import { PluginManager } from "./EventPlugin.js";
