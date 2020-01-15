/*
 *  Clean generated file and tmp
 */
const gulp = require("gulp");
const cleanup = require("gulp-clean");
let tasks = [];

function doCleanup(options) {
    options = options || {};
    options.read = false;    // To make clean a lot faster

    if(!options.dest) {
        throw new Error('cleanup: Missing dest file(s) in options');
    }

    const files = ([]).concat(options.dest);

    delete options.dest;

    return gulp.src(files)
    .pipe(cleanup(options));
}

function cleanDist(options) {
    return doCleanup({
        "dest": ["dist/**/*.js"]
    })
}

cleanDist.displayName = "clean:dist";
cleanDist.description = "Task to clean all file(s) in dist folder.";

function cleanAll(options) {
    return cleanDist()
}

cleanAll.displayName = "clean:all";
cleanAll.description = "Task to clean all generated file(s).";

tasks = tasks.concat([
    cleanAll.displayName,
    cleanDist.displayName
]);

module.exports = (function(){
    gulp.task(cleanAll);
    gulp.task("clean", cleanAll);
    gulp.task(cleanDist);
    return tasks;
})();