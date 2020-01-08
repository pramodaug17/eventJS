const rollup = require("rollup");

async function process(opts) {
    let inputOptions = {
        input: opts.entryFile
    };
    let outputOptions = {};
    
    const bundle = await rollup.rollup(inputOptions);
    //const { output: [ { code } ] } = await bundle.generate(outputOptions);
    
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