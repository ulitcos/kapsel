module.exports = {
  env: {
    browser: true,
    es2016: true,
  },
  extends: ["airbnb-base", "airbnb-typescript", "prettier"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.json",
  },
  rules: {
    "react/jsx-filename-extension": "off", // it does not react
    "@typescript-eslint/no-unused-expressions": "off",
    "import/prefer-default-export": "off",
    "import/no-dynamic-require": "off",
    "global-require": "off",
    "linebreak-style": "off",
    "max-len": ["error", { code: 120 }],
    "prefer-arrow-callback": ["error", { allowNamedFunctions: true }],
    "no-console": ["error", { allow: ["warn", "error"] }],
    "react/prop-types": "off",
    "react/jsx-props-no-spreading": "off",
    "consistent-return": "off",
  },
  ignorePatterns: ["*.scss", "*.html", "*.js"],
};
