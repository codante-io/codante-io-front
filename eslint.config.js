import eslintConfigPrettier from "eslint-config-prettier";

export default [
  eslintConfigPrettier,
  {
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
  },
  {
    rules: {
      "no-console": "warn",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/ban-ts-comment": "off",
    },
  },
];
