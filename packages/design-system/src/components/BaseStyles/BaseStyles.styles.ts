import type { CssProps } from '../../models';
import { css } from '@emotion/react';

export const GlobalStyles = ({ theme }: CssProps) => css`
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
      'Apple SD Gothic Neo', 'Malgun Gothic', '맑은 고딕', 나눔고딕,
      'Nanum Gothic', 'Noto Sans KR', 'Noto Sans CJK KR', arial, 돋움, Dotum,
      Tahoma, Geneva, sans-serif;
    font-size: ${theme.fontSizes[2]};
    color: ${theme.colors.body};
    background-color: ${theme.colors.background};
    word-break: break-word;
    margin: 0;
    padding: 0;
  }

  h1,
  h2,
  h3,
  h4,
  h5 {
    color: ${theme.colors.title};
  }

  a {
    color: ${theme.colors.blue[50]};
  }

  input {
    padding: 0;
    margin: 0;
    border: 0;
    background: 0;
    &:focus-visible {
      outline: none;
    }
  }

  input,
  button,
  select,
  optgroup,
  textarea {
    font-size: inherit;
    font-family: inherit;
    line-height: inherit;
  }

  button {
    border: none;
    background: none;
    margin: 0;
    padding: 0;
    cursor: pointer;
  }
`;
