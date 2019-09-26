module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
  },
  plugins: [
    'eslint-plugin-import-order-alphabetical',
  ],
  rules: {
    semi: [ 'error', 'never' ],
    'max-len': [ 'error', { code: 120, ignoreUrls: true } ],
    'key-spacing': [ 'error', { afterColon: true, beforeColon: false } ],
    'array-bracket-spacing': [ 'error', 'always' ],
    'object-curly-spacing': [ 'error', 'always' ],
    'comma-spacing': [ 'error', { before: false, after: true } ],
    'import-order-alphabetical/order': [ 'error', { 'newlines-between': 'never' } ],
    'comma-dangle': [ 'error', 'always-multiline' ],
  },
}
