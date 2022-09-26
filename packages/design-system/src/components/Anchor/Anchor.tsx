import React from 'react';
import type { AnchorProps } from './Anchor.types';
import * as S from './Anchor.styles';

const Anchor = ({ type = 'normal', to, ...props }: AnchorProps) => {
  return to ? (
    <S.Link type={type} to={to} {...props} />
  ) : (
    <S.A type={type} {...props} />
  );
};

export default Anchor;
