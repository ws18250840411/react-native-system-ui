import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import turboPlugin from "eslint-plugin-turbo";
import tseslint from "typescript-eslint";
import onlyWarn from "eslint-plugin-only-warn";
import pluginReactHooks from "eslint-plugin-react-hooks";

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config[]}
 * */
export const config = [
    js.configs.recommended,
    eslintConfigPrettier,
    ...tseslint.configs.recommended,
    {
        plugins: {
            turbo: turboPlugin,
        },
        rules: {
            "turbo/no-undeclared-env-vars": "warn",
        },
    },
    {
        plugins: {
            onlyWarn,
        },
    },
    {
        plugins: {
            "react-hooks": pluginReactHooks,
        },
        settings: { react: { version: "detect" } },
        rules: {
            ...pluginReactHooks.configs.recommended.rules,
            "react/react-in-jsx-scope": "off",
        },
    },
    {
        ignores: ["dist/**"],
    },
];
