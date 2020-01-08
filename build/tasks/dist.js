const { task } = require("gulp");
const log = require("fancy-log");
const esm = require("./plugins/escompile");

function distTask() {
    log("Inside dist task");
    
    return esm();
}

distTask.displayName = "dist:all"
distTask.description = "Distribution build task";

module.exports = (function(){
    task(distTask);
    return [
        distTask.displayName
    ];
})();