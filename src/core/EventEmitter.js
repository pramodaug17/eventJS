import { Listener } from "../models/Listener.js"
import { ListenerCollection } from "../collections/ListenerCollection.js";
import { EventRegistry } from "./EventRegistry.js";
import { EventDispatcher } from "./EventDispatcher.js"
import { EventQueue } from "./EventQueue.js";
import { PluginManager } from "./EventPlugin.js";


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
  constructor (options = {}) {
    const { 
      strictMode = true, 
      strategy = "macrotask",  
      batch = false,
      asyncMode = true
    } = options;
    /** @type {EventRegistry} */
    this.eventRegistry = new EventRegistry();
    /** @type {EventDispatcher} */
    this.eventDispatcher = new EventDispatcher();
    /** @type {EventQueue} */
    this.eventQueue = new EventQueue({strategy: strategy})
    /** @type {PluginManager} */
    this.pluginManager = new PluginManager();
    /** @type {boolean} */
    this.isStrictMode = strictMode;
    this.isBatched = batch;
    this.asyncMode = asyncMode;
  }

  /**
   * 
   * @param {string} eventName - Name of event 
   * @param {any} payload - data from emitter to listener 
   * @returns {Promise<void>}
   */
  #emitter (eventName, payload) {
    /** @type {ListenerCollection|undefined} */
    const collection = this.eventRegistry.getCollection(eventName);
    /** @type {Listener[]} */
    const listenerList = collection?.getAll() || [];
    let retPromise;

    if (this.asyncMode) {
      retPromise = this.eventDispatcher.dispatchParallel(eventName, listenerList, payload, this, collection);
    } else {
      retPromise = this.eventDispatcher.dispatchSequential(eventName, listenerList, payload, this, collection);
    }

    return retPromise;
  }

  /**
   * 
   * @param {string} eventName Name of the event
   * @param {any} payload Data sent by the event emitter
   * @returns self object
   */
  async #emitInternal(eventName, payload) {
    const eventContext = {
      eventName,
      payload,
      emitter: this,
      cancelled: false
    }

    try {
      //// Before emitter
      void this.pluginManager.runHook("beforeEmit", eventContext);

      if (eventContext.cancelled) return this;

      if (this.isBatched) {
        this.#emitter(eventName, payload);
        return this;
      }

      /**
       * 
       * @param {string} eventName - name of event
       * @param {any} data - data from emitter
       */
      const dispatcher = async (eventName, data) => {
        await this.#emitter(eventName, data);
      }
      this.eventQueue.enqueue(eventName, payload, dispatcher);

      /// After Emit
      await this.pluginManager.runHook("afterEmit", eventContext);

    } catch (err) {
      const error = err instanceof Error ? err : new Error(String (err));
      await this.pluginManager.runError(error, eventContext);
    }

    return this;
  }

  /**
   * This registers the event to publish event when occurrs
   * @param {string} eventName 
   * @returns 
   */
  registerEvent (eventName) {
    this.eventRegistry.registerEvent(eventName);
    return this;
  }

  /**
   * 
   * @param {string} eventName Name of event
   * @param {function} handlerFn hanlder function which will handle the event
   * @returns self object
   */
  on (eventName, handlerFn) {
    if (!this.eventRegistry.hasEvent(eventName)) {
      if (this.isStrictMode) {
        throw new Error(`Event ${eventName} is not register`);
      }

      this.registerEvent(eventName);      // Fall back for non-strict mode
    }

    /** @type {ListenerCollection|undefined} */
    const collection = this.eventRegistry.getCollection(eventName);
    collection?.add(new Listener(handlerFn));
    return this;
  }

  /**
   * 
   * @param {string} eventName Name of the event
   * @param {function} handlerFn Hanlder function which will handle the event
   * @returns self object
   */
  once (eventName, handlerFn) {
    if (!this.eventRegistry.hasEvent(eventName)) {
      if (this.isStrictMode) {
        throw new Error(`Event ${eventName} is not register`);
      }

      this.registerEvent(eventName);      // Fall back for non-strict mode
    }
    
    /** @type {ListenerCollection|undefined} */
    const collection = this.eventRegistry.getCollection(eventName);
    collection?.add(new Listener(handlerFn, true));

    return this;
  }

  /**
   * 
   * @param {string} eventName Name of the event
   * @param {function} handlerFn Hanlder function which will handle the event
   * @returns self object
   */
  off (eventName, handlerFn) {
    /** @type {ListenerCollection|undefined} */
    const collection = this.eventRegistry.getCollection(eventName);
    collection?.remove(handlerFn);
    return this;
  }

  /**
   * 
   * @param {string} eventName Name of the event
   * @param {any} payload Data sent by the event emitter
   * @returns self object
   */
  emit (eventName, payload) {
    if (!this.eventRegistry.hasEvent(eventName)) {
      if (this.isStrictMode) {
        throw new Error(`Event ${eventName} is not register`);
      }

      return this      // Fall back for non-strict mode
    }
    
    void this.#emitInternal(eventName, payload);

    return this;
  }

  /**
   * @param {import("./EventPlugin.js").EventPlugin} plugin
   */
  use (plugin) {
    this.pluginManager.use(plugin);
    return this;
  }
}