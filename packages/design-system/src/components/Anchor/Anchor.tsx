import React from 'react';
import type { AnchorProps } from './Anchor.types';
import * as S from './Anchor.styles';

const Anchor = ({ to, ...props }: AnchorProps) => {
  return to ? <S.Link to={to} {...props} /> : <S.A {...props} />;
};

export default Anchor;
