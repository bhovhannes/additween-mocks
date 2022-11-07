const babel = require("@rollup/plugin-babel");
const commonjs = require("@rollup/plugin-commonjs");
const nodeResolve = require("@rollup/plugin-node-resolve");

const pkg = require("./package.json");

const globals = {};

const extensions = [".ts", ".js"];

module.exports = {
    input: "src/index.ts",
    output: [
        {
            file: pkg.main,
            format: "umd",
            name: "additweenMocks",
            sourcemap: true,
            globals,
        },
        {
            file: pkg.module,
            format: "esm",
            sourcemap: true,
            globals,
        },
    ],
    external: [],
    plugins: [
        nodeResolve({
            extensions,
        }),
        commonjs(),
        babel({
            extensions,
            babelHelpers: "runtime",
        }),
    ],
};
