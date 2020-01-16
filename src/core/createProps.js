import defaultOpts from "./var/defaultOpts.js"

export default function createCbProperty(opt) {
    var prop = {};

    for (var k in  defaultOpts) {
        if (opt && k in opt)
            prop[k] = opt[k];
    }

    return prop;
}