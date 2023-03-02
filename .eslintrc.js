module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: 'airbnb-base',
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': 'error',
    quotes: 'off',
    avoidEscape: true,
    allowTemplateLiterals: true
  },
  plugins: ['prettier']
};