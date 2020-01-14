import evtlist from "../var/eventList"

export default function publish(evt) {
    var args = [];

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