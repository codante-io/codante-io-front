import jsESLint from "@eslint/js";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import eslintConfigPrettier from "eslint-config-prettier";
import tsESLint from "typescript-eslint";
import globals from "globals";
import { fixupPluginRules } from "@eslint/compat";

export default [
  jsESLint.configs.recommended,
  ...tsESLint.configs.recommended,
  eslintConfigPrettier,

  {
    files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
    ignores: [
      "**/node_modules/",
      "**/dist/",
      "**/build/",
      "**/public/",
      "**/.husky/",
      "**/.husky/",
      "**/.github/",
      "**/.vscode/",
      "**/.cache/",
      "**/dist",
    ],
    plugins: {
      react,
      "react-hooks": fixupPluginRules(reactHooks),
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "no-console": "warn",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/ban-ts-comment": "off",
    },
  },
];
