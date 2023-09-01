module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    commonjs: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
    'prefer-const': 'off',
    '@typescript-eslint/ban-types': 'off',
    'no-lonely-if': 'error',
    'no-negated-condition': 'error',
    'no-nested-ternary': 'error',
    'no-useless-return': 'error',
    'no-warning-comments': 'warn',
    'require-await': 'error',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-var-requires': 'off',
  },
}
