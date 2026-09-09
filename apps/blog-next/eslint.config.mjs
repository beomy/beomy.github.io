import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';

/**
 * ESLint flat config (ESLint 9).
 *
 * eslint-config-next 16 은 네이티브 flat config 배열을 제공하므로 FlatCompat 없이
 * 직접 스프레드한다. (FlatCompat + @eslint/eslintrc 는 eslint-plugin-react 의 순환
 * 구조를 직렬화하다 크래시하므로 사용하지 않는다.)
 *
 * next/core-web-vitals 는 eslint-plugin-react-hooks v7 을 통해 React Compiler 룰
 * (purity, set-state-in-render, immutability, preserve-manual-memoization 등)까지
 * 함께 활성화한다.
 */
const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    rules: {
      '@next/next/no-img-element': 'off',
      'react/no-unescaped-entities': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  {
    ignores: ['.next/**', 'out/**', 'node_modules/**', 'public/**'],
  },
];

export default eslintConfig;
