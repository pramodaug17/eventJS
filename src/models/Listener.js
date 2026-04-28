/**
 * This represents Listener class which as handlerFn and isOnce 
 * 
 */
export class Listener {
  /**
   * 
   * @param {function} handlerFn 
   * @param {boolean} isOnce 
   */
  constructor(handlerFn, isOnce = false) {
    this.handlerFn = handlerFn;
    this.isOnce = isOnce;
  }
}