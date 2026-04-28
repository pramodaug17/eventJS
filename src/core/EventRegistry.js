import { ListenerCollection } from "../collections/ListenerCollection.js"

/**
 * This hanldes event registration related tasks
 * 
 */
export class EventRegistry {
  /**
   * @constructor
   */
  constructor() {
    /** @type {Map<string,ListenerCollection>} */
    this.eventMap = new Map();
  }

  /**
   * 
   * @param {string} eventName Name of the event to be registered
   * @returns {void}
   */
  registerEvent(eventName) {
    if (!this.hasEvent(eventName)) {
      this.eventMap.set(eventName, new ListenerCollection());
    }
  }

  /**
   * 
   * @param {string} eventName - Name of the event
   * @returns {boolean}
   */
  hasEvent (eventName) {
    return (this.eventMap.has(eventName));
  }

  /**
   * 
   * @param {string} eventName - Name of the event
   * @returns {ListenerCollection|undefined}
   */
  getCollection(eventName) {
    return this.eventMap.get(eventName);
  }

  /**
   * 
   * @param {string} eventName - Name of the event
   * @returns {void}
   */
  removeEvent(eventName) {
    if (this.eventMap.has(eventName)) {
      this.eventMap.delete(eventName);
    }
  }
}
