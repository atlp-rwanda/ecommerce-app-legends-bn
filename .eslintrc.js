module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    es2021: true,
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
    allowTemplateLiterals: true,
    'babel/new-cap': 1,
    'babel/object-curly-spacing': 1,
    'babel/no-invalid-this': 1,
    'babel/semi': 1,
  },
  plugins: ['prettier', 'babel']
};
