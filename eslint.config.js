import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  {
    ignores: [
      "node_modules",
      "test-results",
      "playwright-report",
      "eslint.config.js",
    ],
  },
  {
    rules: {
      "@typescript-eslint/no-floating-promises": "error",
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
);
