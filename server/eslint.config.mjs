import js from "@eslint/js";
import * as tseslint from "typescript-eslint";
import * as eslint from "typescript-eslint";
import prettierConfig from "eslint-config-prettier";

/** @type {import('eslint').Linter.Config[]} */

export default tseslint.config(
    {
        ignores: ["**/dist/*"], // Ignore everything by default
    },
    eslint.configs.recommended,
    tseslint.configs.recommended,
    prettierConfig,
    {
        rules: {
            "@typescript-eslint/no-explicit-any": "warn",
            "@typescript-eslint/no-unused-vars": "warn",
            "@/no-empty": "error",
        },
    }
);
