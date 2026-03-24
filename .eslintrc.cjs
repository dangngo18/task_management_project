module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:react-hooks/recommended",
    "prettier",
  ],
  rules: {
    "react-hooks/exhaustive-deps": "warn",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-unused-vars": "warn",
  },
};