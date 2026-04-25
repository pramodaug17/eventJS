import { Listener } from "../models/Listener.js";

/**
 * 
 */
export class ListenerCollection {
  constructor() {
    this.listenerSet = new Set();
  }

  /**
   * This adds the listner in the collection.
   * @param {Listener} listener 
   */
  add(listener) {
    this.listenerSet.add(listener);
  }

  /**
   * This removes the listener based on hanlderFn
   * @param {function} handlerFn 
   */
  remove(handlerFn) {
    for(const listener of this.listenerSet) {
      if(listener.handlerFn === handlerFn) {
        this.listenerSet.delete(listener);
      }
    }
  }

  /**
   * This function will return list of all listener in array
   * @returns {Array<Listener>} Array of Listener type
   */
  getAll() {
    return Array.from(this.listenerSet);
  }
}