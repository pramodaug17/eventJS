/**
 *
 */
export class ListenerCollection {
    listenerSet: Set<any>;
    /**
     * This adds the listner in the collection.
     * @param {Listener} listener
     */
    add(listener: Listener): void;
    /**
     * This removes the listener based on hanlderFn
     * @param {function} handlerFn
     */
    remove(handlerFn: Function): void;
    /**
     * This function will return list of all listener in array
     * @returns {Array<Listener>} Array of Listener type
     */
    getAll(): Array<Listener>;
}
import { Listener } from "../models/Listener.js";
