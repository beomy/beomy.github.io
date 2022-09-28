import { css } from '@emotion/react';

export const spinIn = css`
  animation: spinIn 0.2s;

  @keyframes spinIn {
    from {
      scale: 0.3;
      rotate: 180deg;
    }
    to {
      scale: 1;
      rotate: 0deg;
    }
  }
`;
