import { Listener } from "../models/Listener.js";
import { EventEmitter } from "./EventEmitter.js";
import { PluginManager } from "./EventPlugin.js";

/**
 * @typedef {Object} ListenerCollectionLike
 * @property {(handlerFn: Function) => void} remove
 */
export class EventDispatcher {
  /**
   * @param {Object} [options]
   * @param {(error: Error, context: { eventName?: string, listener?: Listener }) => void} [options.onError]
   * @param {PluginManager} [options.pluginManager]
   */
  constructor (options = {}) {
    /** @type {(error: Error, context: { eventName?: string, listener?: Listener }) => void} */
    this.onError = options.onError || ((err) => {
      console.error("[EventDispatcher Error]: ", err);
    });

    /** @type {PluginManager|undefined} */
    this.pluginManager = options.pluginManager;
  }


  /**
   * 
   * @param {string} eventName
   * @param {Listener[]} listenerList 
   * @param {any} payload 
   * @param {EventEmitter} emitter - EventEmitter object
   * @param {ListenerCollectionLike} [collection] - Listener collection (used for removing once)
   * 
   * @returns {Promise<void>}
   */
  async dispatchParallel(eventName, listenerList, payload, emitter, collection) {
    if (!listenerList || listenerList.length === 0) return;

    await Promise.all(
      listenerList.map(async(listener) => {

        const ctx = {
          eventName: eventName,
          payload,
          listener,
          emitter
        };

        try {
          await this.pluginManager?.runHook("beforeListener", ctx);

          await Promise.resolve(listener.handlerFn(payload));

          await this.pluginManager?.runHook("afterListener", ctx);

          if (listener.isOnce) {
            collection?.remove(listener.handlerFn);
          }
        } catch (err) {
          const error = err instanceof Error ? err : new Error(String(err));
          await this.pluginManager?.runError(error, ctx) || this.onError(error, { listener });
        }
      })
    );
  }

  /**
   * 
   * @param {string} eventName
   * @param {Listener[]} listenerList 
   * @param {any} payload 
   * @param {EventEmitter} emitter - EventEmitter object
   * @param {ListenerCollectionLike} [collection]
   * 
   * @returns {Promise<void>}
   */
  async dispatchSequential(eventName, listenerList, payload, emitter, collection) {
    if (!listenerList || listenerList.length === 0) return;

    for (const listener of listenerList) {
      const ctx = {
        eventName: eventName,
        payload,
        listener,
        emitter
      };
      try {
        await this.pluginManager?.runHook("beforeListener", ctx);

        await Promise.resolve(listener.handlerFn(payload));

        await this.pluginManager?.runHook("afterListener", ctx);

        if (listener.isOnce) {
          collection?.remove(listener.handlerFn);
        }
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        await this.pluginManager?.runError(error, ctx) || this.onError(error, { listener });
      }
    }
  }
}