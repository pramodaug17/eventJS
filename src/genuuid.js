import mod16 from "./genuuid/mod16"
import genXY from "./genuuid/genXY"
import performanceVal from "./genuuid/performance"

export default function generateUUID() { // Public Domain/MIT
    var d = new Date().getTime();//Timestamp
    var d2 = performanceVal();
    
    //Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if(d > 0) {//Use timestamp until depleted
            r = mod16(d + r);
            d = Math.floor(d/16);
        } else {//Use microseconds since page-load if supported
            r = mod16(d2 + r);
            d2 = Math.floor(d2/16);
        }
        return genXY(c, r);
    });
}