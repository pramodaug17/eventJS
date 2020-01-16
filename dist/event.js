/*
 * eventJS JavaScript Pub-Sub Library v1.0.1
 *
 * Copyright Pramod Jain
 * Released under the MIT license
 *
 */


(function(global) {
    "use strict";

    var evtlist = {};

    var defaultOpts = {
        "bindobj": null
    };

    function createCbProperty(opt) {
        var prop = {};

        for (var k in defaultOpts) {
            if (opt && k in opt)
                prop[k] = opt[k];
        }

        return prop;
    }

    function mod16(value) {
        return (value % 16 | 0);
    }

    function genXY(c, r) {
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
    }

    function genPerformance(c, r) {
        return ((performance && performance.now && (performance.now() * 1000)) || 0);
    }

    function generateUUID() { // Public Domain/MIT
        var d = new Date().getTime(); //Timestamp
        var d2 = genPerformance();

        //Time in microseconds since page-load or 0 if unsupported
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16; //random number between 0 and 16
            if (d > 0) { //Use timestamp until depleted
                r = mod16(d + r);
                d = Math.floor(d / 16);
            } else { //Use microseconds since page-load if supported
                r = mod16(d2 + r);
                d2 = Math.floor(d2 / 16);
            }
            return genXY(c, r);
        });
    }

    function isFnSame(fn1, fn2) {
        /* TODO: Add check of function definition only */
        return (fn1 === fn2) ||
            (fn1.toString().replace(/\s/gm, '') ===
                fn2.toString().replace(/\s/gm, ''));
    }

    function subscribe(evt, cb, option) {
        /* Check if event is registered or not */
        if (!evtlist[evt]) {
            throw ("'" + evt + "' event is not registered!!");
        }
        /* check for occurrence */
        for (let counter = 0; counter < evtlist[evt].fn.length; counter++) {
            if (isFnSame(cb, evtlist[evt].fn[counter])) {
                /* Already present in list */
                evtlist[evt].fn[counter] = createCbProperty(option);
                return this;
            }
        }

        cb.props = createCbProperty(option);
        cb.id = generateUUID();
        evtlist[evt].fn.push(cb);

        return this;
    }

    function unsubscribe(evt, cb) {
        if (evtlist[evt]) {
            for (let counter = 0; counter < evtlist[evt].fn.length; counter++) {
                if (isFnSame(cb, evtlist[evt].fn[counter])) {
                    evtlist[evt].fn.splice(counter, 1);
                    counter = evtlist[evt].fn.length;
                }
            }
        }
        return this;
    }

    function publish(evt) {

        // for (let i = 1; i < arguments.length; i++)
        //     args.push(arguments[i]);

        if (evtlist[evt]) {
            evtlist[evt].fn.forEach(function(cb) {
                let obj = cb.props.bindobj || global;
                setTimeout(function() {
                    cb.apply(obj, arguments);
                }, 1);
            });
        }
    }

    /*
     * data is decription of parameter of callback function
     */
    function register(eventName, data) {
        if (!evtlist[eventName]) {
            evtlist[eventName] = {};
            evtlist[eventName].fn = [];
        }

        if (data) {
            evtlist[eventName].data = data;
        }

        return this;
    }

    global.events = {
        on: function(eventName, callback, option) {
            return subscribe.apply(this, arguments);
        },
        off: function(eventName, callback) {
            return unsubscribe.apply(this, arguments);
        },
        emit: function(eventName, data) {
            return publish.apply(this, arguments);
        },
        registerEvent: function(eventName, data) {
            return register.apply(this, arguments);
        },
    };

})(window);