import subscribe from "./core/subscribe";
import unsubscribe from "./core/unsubscribe";
import publish from "./core/publish";
import register from "./core/register";


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
