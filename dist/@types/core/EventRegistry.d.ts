/**
 * This hanldes event registration related tasks
 *
 */
export class EventRegistry {
    /** @type {Map<string,ListenerCollection>} */
    eventMap: Map<string, ListenerCollection>;
    /**
     *
     * @param {string} eventName Name of the event to be registered
     * @returns {void}
     */
    registerEvent(eventName: string): void;
    /**
     *
     * @param {string} eventName - Name of the event
     * @returns {boolean}
     */
    hasEvent(eventName: string): boolean;
    /**
     *
     * @param {string} eventName - Name of the event
     * @returns {ListenerCollection|undefined}
     */
    getCollection(eventName: string): ListenerCollection | undefined;
    /**
     *
     * @param {string} eventName - Name of the event
     * @returns {void}
     */
    removeEvent(eventName: string): void;
}
import { ListenerCollection } from "../collections/ListenerCollection.js";
