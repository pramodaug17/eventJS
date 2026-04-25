import { Listener } from "../models/Listener.js";

export class EventDispatcher {

  /**
   * 
   * @param {Listener[]} listenerList 
   * @param {any} payload 
   */
  async dispatchParallel(listenerList, payload) {
    // for (const listener of listenerList) {
    //   listener.handlerFn(payload);
    // }
    await Promise.all(listenerList.map(listener => {
      Promise.resolve(listener.handlerFn(payload));
    }));
  }

  async dispatchSequential(listenerList, payload) {
    for (const listener of listenerList) {
      listener.handlerFn(payload);
    }
    // await Promise.all(listenerList.map(listener => {
    //   Promise.resolve(listener.handlerFn(payload));
    // }));
  }
}