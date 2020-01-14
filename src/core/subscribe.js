import evtlist from "../var/eventList"
import createCbProperty from "./createProps"
import genuuid from "../genuuid"
import isFnSame from "./isFnSame"

export default function subscribe(evt, cb, option) {
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
    cb.id = genuuid();
    evtlist[evt].fn.push(cb);

    return this;
}