const rollup = require("rollup");
const fs = require("fs");
const readable = require("stream").Readable;
const path = require("path");

async function process(opts) {
    let inputOptions = {
        input: opts.inputOpts.entryFile
    };

    let outputOptions = {
        intro: opts.outputOpts.introstring,
        outro: opts.outputOpts.outrostring,
    };

    const bundle = await rollup.rollup(inputOptions);
    const { output: [ { code } ] } = await bundle.generate(outputOptions);
    
    let compiledCode = code.replace(/@VERSION/g, opts.version)
                            .replace(/@DATE/g, 
                                ( new Date() ).toISOString()
                                .replace( /:\d+\.\d+Z$/, "Z" ));
    let buff = Buffer.alloc(compiledCode.length, compiledCode);
    const rStream = new readable();
    rStream._read = ()=>{};
    rStream.push(buff, 'uft8');
    rStream.push(null);

    return rStream.pipe(fs.createWriteStream(path.join(
        "./" + opts.outputOpts.outputFile))
    ).on("finish", ()=>{
        opts.done();
    });
}

module.exports = function(opts) {
    return process(opts);
}