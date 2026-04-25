import { Listener } from "../models/Listener.js"
import { ListenerCollection } from "../collections/ListenerCollection.js";
import { EventRegistry } from "./EventRegistry.js";
import { EventDispatcher } from "./EventDispatcher.js"
import { EventQueue } from "./EventQueue.js";


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
    /** @type {boolean} */
    this.isStrictMode = strictMode;
    this.isBatched = batch;
    this.asyncMode = asyncMode;
  }

  /**
   * 
   * @param {string} eventName - Name of event 
   * @param {any} payload - data from emitter to listener 
   * @returns 
   */
  #emiiter (eventName, payload) {
    /** @type {ListenerCollection|undefined} */
    const collection = this.eventRegistry.getCollection(eventName);
    /** @type {Listener[]} */
    const listenerList = collection?.getAll() || [];

    if (this.asyncMode) {
      this.eventDispatcher.dispatchParallel(listenerList, payload);
    } else {
      this.eventDispatcher.dispatchSequential(listenerList, payload);
    }

    //// Remove once listener
    listenerList
      .filter(listener => listener.isOnce)
      .forEach(listener => {
        collection?.remove(listener.handlerFn)
      });

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

    if (!this.isBatched) {
      this.#emiiter(eventName, payload);
    }

    this.eventQueue.enqueue(eventName, payload, 
      /**
       * 
       * @param {string} eventName - name of the event
       * @param {any} data data to the listener
       */
      (eventName, data) => {
        this.#emiiter(eventName, data);
      }
    );

    return this;
  }
}