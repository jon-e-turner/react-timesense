// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const jest = require('eslint-plugin-jest');

module.exports = defineConfig([
  ...expoConfig,
  {
    files: ['__tests__/**'],
    ...jest.configs['flat/recommended'],
    ...jest.configs['flat/style'],
  },
  {
    ignores: ['dist/*'],
  },
]);
