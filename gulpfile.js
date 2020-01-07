/* 
 * main file to start gulp task runner
 */
var gulp = require("gulp");
var log = require("fancy-log")

var distTasks = require("./build/tasks/dist");

function defaultTask(done) {
    log("Inside default task");

    done();
}

exports.default = gulp.series(distTasks[0]);