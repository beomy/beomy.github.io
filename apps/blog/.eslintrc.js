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
    jest: true,
  },
  plugins: ['react', 'jsx-a11y', 'prettier', 'jest', '@typescript-eslint'],
  extends: [
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:jest/recommended',
    'standard',
    'plugin:prettier/recommended',
  ],
  rules: {
    // 기존 루트 .eslintrc.js 에서 상속하던 룰을 인라인(루트는 flat config 로 전환됨).
    'prettier/prettier': 'error',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-unused-vars': [2, { argsIgnorePattern: '^_' }],
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
        ],
      },
    ],
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
