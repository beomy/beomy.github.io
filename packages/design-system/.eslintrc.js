module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  plugins: ['react', 'jsx-a11y', 'prettier', '@typescript-eslint'],
  extends: [
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'standard',
    'plugin:prettier/recommended',
    '../../.eslintrc.js',
    'plugin:storybook/recommended',
  ],
  rules: {
    'react/prop-types': 'off',
    'react/jsx-filename-extension': 'off',
    'react/jsx-props-no-spreading': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/*.test.[jt]s',
          '**/*.spec.[jt]s',
          '**/*.test.[jt]sx',
          '**/*.spec.[jt]sx',
          '.storybook/**',
        ],
      },
    ],
    'react/jsx-uses-react': 'warn',
  },
  settings: {
    'import/resolver': {
      typescript: {
        project: '.',
      },
    },
    react: {
      version: 'detect',
    },
  },
};
