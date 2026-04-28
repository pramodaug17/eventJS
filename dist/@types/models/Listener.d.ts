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
    constructor(handlerFn: Function, isOnce?: boolean);
    handlerFn: Function;
    isOnce: boolean;
}
