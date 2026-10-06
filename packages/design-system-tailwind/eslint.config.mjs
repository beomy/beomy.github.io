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
 * 통일한다. 포맷팅은 prettier 가 전담하므로 eslint-config-prettier 로 충돌 룰을 끈다.
 * eslint-plugin-react / jsx-a11y 는 flat config 를 제공하지 않아 plugin 등록 후
 * recommended 룰만 스프레드한다.
 */
export default tseslint.config(
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'storybook-static/**',
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
      parserOptions: {
        ecmaFeatures: { jsx: true },
        // 에디터(VS Code ESLint)가 저장소 루트를 cwd 로 두고 이 config 를 적용하면 typescript-eslint 가
        // tsconfig 기준 디렉터리 후보를 둘(루트/패키지)로 보고 거부한다 → 이 config 위치로 고정
        tsconfigRootDir: import.meta.dirname,
      },
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
