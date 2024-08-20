import jsESLint from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import tsESLint from "typescript-eslint";

export default [
  jsESLint.configs.recommended,
  ...tsESLint.configs.recommended,
  eslintConfigPrettier,
  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
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
    rules: {
      "no-console": "warn",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/ban-ts-comment": "off",
    },
  },
];
