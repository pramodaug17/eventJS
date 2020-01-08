const rollup = require("rollup");

module.exports = async function() {
    let inputOptions = {
        input: "event.js"
    };
    let outputOptions = {};

    const bundle = await rollup.rollup(inputOptions);

    const { output: [ { code } ] } = await bundle.generate(outputOptions);

    return bundle.write({
        file: "dist/bundle.js",
        format: "esm"
    });
}