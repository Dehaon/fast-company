module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ["plugin:react/recommended", "standard"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module"
  },
  plugins: ["react"],
  rules: {
    indent: [
      "error",
      2,
      {
        SwitchCase: 1,
        flatTernaryExpressions: false,
        offsetTernaryExpressions: true
      }
    ],
    semi: [2, "always"],
    "space-before-function-paren": [
      "error",
      {
        anonymous: "always",
        named: "never"
      }
    ],
    quotes: [
      "error",
      "double",
      { allowTemplateLiterals: true, avoidEscape: true }
    ],
    "multiline-ternary": ["off"]
  }
};
