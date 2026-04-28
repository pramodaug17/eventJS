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
    constructor(options?: {
        onError?: ((error: Error, context: {
            eventName?: string;
            listener?: Listener;
        }) => void) | undefined;
        pluginManager?: PluginManager | undefined;
    });
    /** @type {(error: Error, context: { eventName?: string, listener?: Listener }) => void} */
    onError: (error: Error, context: {
        eventName?: string;
        listener?: Listener;
    }) => void;
    /** @type {PluginManager|undefined} */
    pluginManager: PluginManager | undefined;
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
    dispatchParallel(eventName: string, listenerList: Listener[], payload: any, emitter: EventEmitter, collection?: ListenerCollectionLike): Promise<void>;
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
    dispatchSequential(eventName: string, listenerList: Listener[], payload: any, emitter: EventEmitter, collection?: ListenerCollectionLike): Promise<void>;
}
export type ListenerCollectionLike = {
    remove: (handlerFn: Function) => void;
};
import { Listener } from "../models/Listener.js";
import { PluginManager } from "./EventPlugin.js";
import { EventEmitter } from "./EventEmitter.js";
