const rollup = require("rollup");
const fs = require("fs");

async function process(opts) {
    let inputOptions = {
        input: opts.entryFile
    };
    let read = function(filename) {
        fs.readFileSync(filename, "utf8");
    }
    let wrapper = read("./cover.js").split(/[\x20\t]*\/\/ @CODE\n(?:[\x20\t]*\/\/[^\n]+\n)*/ );


    let outputOptions = {
        intro: wrapper[0],
        outro: wrapper[1]
    };
    
    const bundle = await rollup.rollup(inputOptions);
    const { output: [ { code } ] } = await bundle.generate(outputOptions);
    
    return bundle.write({
        file: opts.outputFile,
        format: opts.format || 'esm'
    });
}

module.exports = function(opts) {
    let outfile = opts.outputFile;

    return process(opts);

    //return outfile;
}