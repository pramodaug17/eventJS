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
    /** @type {EventPlugin[]} */
    plugins: EventPlugin[];
    /** @type {HookRegistry}*/
    hooks: HookRegistry;
    /** @type {((error: Error, ctx: EventContext) => (void|Promise<void>))[]} */
    errorHooks: ((error: Error, ctx: EventContext) => (void | Promise<void>))[];
    /**
     * @param {EventPlugin} plugin
     */
    use(plugin: EventPlugin): void;
    /**
     *
     * @param {HookName} hookName - name of the hook
     * @param {EventContext} ctx - context of plugin
     */
    runHook(hookName: HookName, ctx: EventContext): Promise<void>;
    /**
     *
     * @param {Error} error - object of error
     * @param {EventContext} ctx - context of plugin
     */
    runError(error: Error, ctx: EventContext): Promise<void>;
}
export type EventPlugin = {
    name?: string | undefined;
    priority?: number | undefined;
    beforeEmit?: ((ctx: EventContext) => (void | Promise<void>)) | undefined;
    afterEmit?: ((ctx: EventContext) => (void | Promise<void>)) | undefined;
    beforeListener?: ((ctx: EventContext) => (void | Promise<void>)) | undefined;
    afterListener?: ((ctx: EventContext) => (void | Promise<void>)) | undefined;
    onError?: ((error: Error, ctx: EventContext) => (void | Promise<void>)) | undefined;
};
export type EventContext = {
    eventName: string;
    payload: any;
    emitter: EventEmitter;
    listener?: Listener | undefined;
    cancelled?: boolean | undefined;
    meta?: Record<string, any> | undefined;
};
export type HookName = "beforeEmit" | "afterEmit" | "beforeListener" | "afterListener";
export type HookEntry = {
    fn: (ctx: EventContext) => (void | Promise<void>);
    priority: number;
    name: string;
};
export type HookRegistry = Record<HookName, HookEntry[]>;
import { EventEmitter } from "./EventEmitter.js";
import { Listener } from "../models/Listener.js";
