import typescriptEslint from "@typescript-eslint/eslint-plugin";
import jest from "eslint-plugin-jest";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    ignores: ["**/dist/", "**/.yarn/", "coverage/**/*", "node_modules/**/*", "dist/**/*"],
}, ...compat.extends(
    "eslint:recommended",
    "plugin:jest/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
), {
    plugins: {
        "@typescript-eslint": typescriptEslint,
        jest,
    },

    languageOptions: {
        globals: {},
        parser: tsParser,
    },

    rules: {
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/camelcase": "off",
        "@typescript-eslint/interface-name-prefix": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/no-empty-function": "off",
        "@typescript-eslint/no-use-before-define": ["error", {
            functions: false,
            classes: false,
        }],
    },
}, {
    files: ["**/*.spec.ts"],
    rules: {
        "@typescript-eslint/explicit-function-return-type": "off",
    },
}, {
    files: ["**/*.js"],
    languageOptions: {
        globals: {
            module: true,
            require: true,
            process: true,
        },
    },
    rules: {
        "@typescript-eslint/no-require-imports": "off",
        "@typescript-eslint/no-var-requires": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
    },
}];