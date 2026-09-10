import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

/**
 * 루트 ESLint flat config (ESLint 9).
 *
 * 루트 레벨 파일과 자체 eslint 설정이 없는 packages/utils 를 담당한다.
 * 각자 flat config 를 가진 apps/blog-next · packages/design-system · design-system-tailwind
 * 와, ESLint 8 을 유지하는 apps/blog · apps/games 는 여기서 제외한다.
 */
export default tseslint.config(
  {
    ignores: [
      'node_modules/**',
      'apps/**',
      'packages/design-system/**',
      'packages/design-system-tailwind/**',
      '**/dist/**',
      '**/.next/**',
      '**/out/**',
      '**/.prettierrc.js',
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
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
    },
  },
  prettier,
);
