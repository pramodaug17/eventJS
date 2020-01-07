const { task } = require("gulp");
const log = require("fancy-log");

function distTask(done) {
    log("Inside dist task");
    
    done();
}

distTask.displayName = "dist:all"
distTask.description = "Distribution build task";

module.exports = (function(){
    task(distTask);
    return [
        distTask.displayName
    ];
})();