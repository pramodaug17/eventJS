/* 
 * main file to start gulp task runner
 */
var gulp = require("gulp");
var log = require("fancy-log");
const rename = require("gulp-rename");

const cleanupTasks = require("./build/tasks/cleanup");
const distTasks = require("./build/tasks/dist");

let defaultTaskList = [
    "clean:dist",
    "build:dist"
];

exports.default = gulp.series(defaultTaskList);