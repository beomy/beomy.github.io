import type { AnchorProps } from './Anchor.types';
import React from 'react';
import { Link } from 'gatsby';
import * as S from './Anchor.styles';

const Anchor = (props: AnchorProps) => {
  return <S.Wrapper as={props.to ? Link : 'a'} {...props} />;
};

export default Anchor;
