import evtlist from "../var/eventList"
import isFnSame from "./isFnSame"

export default function unsubscribe(evt, cb) {
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
