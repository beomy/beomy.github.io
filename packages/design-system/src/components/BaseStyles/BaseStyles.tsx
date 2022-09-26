import type { Theme } from '@emotion/react';
import React from 'react';
import { Global } from '@emotion/react';
import { GlobalStyles } from './BaseStyles.styles';

const BaseStyles = () => {
  return <Global styles={(theme: Theme) => GlobalStyles({ theme })} />;
};

export default BaseStyles;
