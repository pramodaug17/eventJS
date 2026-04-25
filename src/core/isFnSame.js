/**
 * 
 * @param {function} fn1 - function 1 to compare
 * @param {function} fn2 - function 2 to compare 
 * @returns {boolean}
 */
function isFnSame(fn1, fn2) {
    /* TODO: Add check of function definition only */
    return (fn1 === fn2) ||
        (fn1.toString().replace(/\s/gm, '') ===
            fn2.toString().replace(/\s/gm, ''));
}

export default isFnSame;