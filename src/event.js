(function(global) {
    var evtlist = {},
        defaultopt = {
            "bindobj": null
        };

    function isFnSame(fn1, fn2) {
        /* TODO: Add check of function definition only */
        return (fn1 === fn2) ||
            (fn1.toString().replace(/\s/gm, '') ===
                fn2.toString().replace(/\s/gm, ''));
    }

    function createCbProperty(opt) {
        var prop = {};

        for (k in defaultopt) {
            if (opt && k in opt)
                prop[k] = opt[k];
        }

        return prop;
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
                return this;
            }
        }

        cb.props = createCbProperty(option);
        evtlist[evt].fn.push(cb);

        return this;
    }

    function unsubscribe(evt, cb) {
        if (evtlist[evt]) {
            for (let counter = 0; counter < evtlist[evt].fn.length; counter++) {
                if (isFnSame(cb, evtlist[evt].fn[counter])) {
                    evtlist[evt].fn.splice(counter, 1);
                    break;
                }
            }
        }
        return this;
    }

    function publish(evt) {
        var args = [];

        // for (let i = 1; i < arguments.length; i++)
        //     args.push(arguments[i]);

        if (evtlist[evt]) {
            evtlist[evt].fn.forEach(function(cb) {
                let obj = cb.props.bindobj || global;
                setTimeout(function() {
                    cb.apply(obj, arguments.slice(1));
                }, 1);
            });
        }
    }

    /*
     * data is decription of parameter of callback function
     */
    function register(eventName, data) {
        evtlist[eventName] = evtlist[eventName] || {};
        evtlist[eventName].fn = evtlist[eventName].fn || [];
        evtlist[eventName].data = data || evtlist[eventName].data || {};
        
        return this;
    }

    global.events = {
        on: function(eventName, callback, option) {
            return subscribe.apply(this, arguments);
        },
        off: function(eventName, callback) {
            return unsubscribe.apply(this, arguments);
        },
        emit: function(eventName) {
            return publish.apply(this, arguments);
        },
        registerEvent: function(eventName, data) {
            return register.apply(this, arguments);
        },
    };
})(window);

