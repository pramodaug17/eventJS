import evtlist from "../var/eventList"

/*
 * data is decription of parameter of callback function
 */
export default function register(eventName, data) {
    if(!evtlist[eventName]) {
        evtlist[eventName] = {};
        evtlist[eventName].fn = [];
    }

    if(data) {
        evtlist[eventName].data = data;
    }
    
    return this;
}