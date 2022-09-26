import type { Theme } from '@emotion/react';
import { css } from '@emotion/react';

type StyleProps = {
  theme: Theme;
};

export const GlobalStyles = ({ theme }: StyleProps) => css`
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
      'Apple SD Gothic Neo', 'Malgun Gothic', '맑은 고딕', 나눔고딕,
      'Nanum Gothic', 'Noto Sans KR', 'Noto Sans CJK KR', arial, 돋움, Dotum,
      Tahoma, Geneva, sans-serif;
    font-size: ${theme.fontSizes[2]};
    color: ${theme.colors.title};
    background-color: ${theme.colors.background};
    word-break: break-word;
    margin: 0;
    padding: 0;
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
