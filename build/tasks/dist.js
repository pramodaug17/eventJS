const { task, src, dest, series } = require("gulp");
const esm = require("./plugins/escompile");
const rename = require("gulp-rename");
const ugliyfy = require("gulp-uglify-es").default

function buildStart() {
    const ret = esm({
        "entryFile": "src/event.js",
        "outputFile": "tmp/compiled.js",
        "format": "esm"
    });
    return ret;
}

function buildFinish(done){
    src("tmp/compiled.js")
    .pipe(rename(function(path) {
        path.basename = "event";
        path.extname = ".js";
    }))
    .pipe(dest("./dist"))
    .pipe(ugliyfy())
    .pipe(rename(function(path) {
        path.basename = "event.min";
        path.extname = ".js";
    }))
    .pipe(dest("./dist"));

    done();
}

buildStart.displayName = "build:start";
buildFinish.displayName = "build:finish";

module.exports = (function(){
    task("build:dist", series(buildStart, buildFinish));
    return [
        buildStart.displayName
    ];
})();