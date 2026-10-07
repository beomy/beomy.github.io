import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

/**
 * ESLint flat config (ESLint 9).
 *
 * 기존 .eslintrc.js 의 standard preset 을 걷어내고 blog-next 와 동일한 lean 구성으로
 * 통일한다. 포맷팅은 prettier 가 전담한다. (Storybook 6.5 는 은퇴 예정이라
 * storybook 전용 lint 룰은 도입하지 않는다.)
 */
export default tseslint.config(
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'storybook-static/**',
      '.storybook/**',
      '**/.prettierrc.js',
      'svgr.config.js',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    plugins: { react, 'jsx-a11y': jsxA11y, 'react-hooks': reactHooks },
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    settings: { react: { version: 'detect' } },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...jsxA11y.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'react/prop-types': 'off',
      'react/jsx-filename-extension': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/jsx-uses-react': 'warn',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      // emotion Theme augmentation 등 의도된 빈 인터페이스/객체 타입 패턴 허용.
      '@typescript-eslint/no-empty-object-type': 'off',
    },
  },
  prettier,
);
