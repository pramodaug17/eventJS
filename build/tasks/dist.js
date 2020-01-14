const { task, src, dest, series } = require("gulp");
const esm = require("./plugins/escompile");
const rename = require("gulp-rename");
const ugliyfy = require("gulp-uglify-es").default;
const fs = require("fs");
const path = require("path");
const jsbeautify = require("gulp-beautify");

function buildStart(done) {
    let read = function(filename) {
        return fs.readFileSync(filename, "utf8");
    }

    let wrapper = read(path.resolve(__dirname, "../..", "src/cover.js")).split(/[\x20\t]*\/\/ @CODE\n(?:[\x20\t]*\/\/[^\n]+\n)*/ ); // console.log(wrapper);
    let packagejson = JSON.parse(fs.readFileSync("./package.json"));

    return esm({
        "inputOpts": {
            "entryFile": "src/core.js"
        },
        "outputOpts": {
            "outputFile": "dist/event.js",
            "format": "esm",
            "introstring": wrapper[0].replace(/\n*$/, ""),
            "outrostring": wrapper[1].replace(/^\n*/, "")
        },
        "version": packagejson.version,
        "done": done
    });
}

function buildFinish(done){
    src("dist/event.js")
    .pipe(jsbeautify())
    .pipe(dest("dist"))
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
        "biuld:dist"
    ];
})();