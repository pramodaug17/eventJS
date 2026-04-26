
import { Listener } from "../models/Listener.js";
import { EventEmitter } from "./EventEmitter.js";

/**
 * @typedef {Object} EventPlugin
 * @property {string} [name]
 * @property {number} [priority]
 * @property {(ctx: EventContext) => (void|Promise<void>)} [beforeEmit]
 * @property {(ctx: EventContext) => (void|Promise<void>)} [afterEmit]
 * @property {(ctx: EventContext) => (void|Promise<void>)} [beforeListener]
 * @property {(ctx: EventContext) => (void|Promise<void>)} [afterListener]
 * @property {(error: Error, ctx: EventContext) => (void|Promise<void>)} [onError]
 */

/**
 * @typedef {Object} EventContext
 * 
 * @property {string} eventName
 * @property {any} payload
 * @property {EventEmitter} emitter
 * @property {Listener} [listener]
 * @property {boolean} [cancelled]
 * @property {Record<string, any>} [meta]
 */


/**
 * @typedef {"beforeEmit" | "afterEmit" | "beforeListener" | "afterListener"} HookName
 */

/**
 * @typedef {Object} HookEntry
 * @property {(ctx: EventContext) => (void|Promise<void>)} fn
 * @property {number} priority
 * @property {string} name
 */

/**
 * @typedef {Record<HookName,HookEntry[]>} HookRegistry
 */

export class PluginManager {
  constructor () {
    /** @type {EventPlugin[]} */
    this.plugins = [];
    /** @type {HookRegistry}*/
    this.hooks = {
      beforeEmit: [],
      afterEmit: [],
      beforeListener: [],
      afterListener: [],
    };

    /** @type {((error: Error, ctx: EventContext) => (void|Promise<void>))[]} */
    this.errorHooks = [];
  }

  /**
   * @param {EventPlugin} plugin 
   */
  use(plugin) {
    this.plugins.push(plugin);

    /** @type {HookName[]} */
    const hookNames = ["beforeEmit", "afterEmit", "beforeListener", "afterListener"];

    for (const hookName of hookNames) {
      /** @type {(ctx: EventContext) => (void|Promise<void>)} */
      if (!plugin[hookName]) continue;

      const hook = plugin[hookName];

      if (typeof hook === 'function') {
        this.hooks[hookName].push({
          fn: hook,
          priority: plugin.priority ?? 0,
          name: plugin.name || "anonymous"
        });
      }
    }

    if (typeof plugin.onError === 'function') {
      this.errorHooks.push(plugin.onError);
    }

    // this.sortHoks();    // TODO check later to enable
  }

  /**
   * 
   * @param {HookName} hookName - name of the hook
   * @param {EventContext} ctx - context of plugin
   */
  async runHook(hookName, ctx) {
    const hookList = this.hooks[hookName];

    for (const {fn} of hookList) {
      try {
        await fn(ctx);
        
        if (ctx.cancelled) break;     // Allows cancellation

      } catch (err) {
        await this.runError(
          err instanceof Error ? err : new Error(String(err)),
          ctx);
      }
    }
  }

  /**
   * 
   * @param {Error} error - object of error
   * @param {EventContext} ctx - context of plugin
   */
  async runError(error, ctx) {
    for (const plugin of this.plugins) {
      if (plugin.onError) {
        await plugin.onError(error, ctx);
      }
    }
  }
}