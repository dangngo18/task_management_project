module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:react-hooks/recommended",
    "prettier",
  ],
  rules: {
    "react-hooks/exhaustive-deps": "warn",
  },
};