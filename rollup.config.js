import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";

import pkg from "./package.json";

const globals = {};

const extensions = [".ts", ".js"];

export default {
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
