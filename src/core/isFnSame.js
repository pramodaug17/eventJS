function isFnSame(fn1, fn2) {
    /* TODO: Add check of function definition only */
    return (fn1 === fn2) ||
        (fn1.toString().replace(/\s/gm, '') ===
            fn2.toString().replace(/\s/gm, ''));
}

export default isFnSame;