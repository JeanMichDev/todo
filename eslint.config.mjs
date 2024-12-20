import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import tailwind from "eslint-plugin-tailwindcss";

export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat?.recommended,
  {
    rules: {
      "react/react-in-jsx-scope": 0,
      "react/prop-types": 0,
      "@typescript-eslint/no-unused-vars": 0,
    },
  },
  { ignores: ["**/tailwind.config.js"] },
  ...tailwind.configs["flat/recommended"],
];