import type { AnchorProps } from './Anchor.types';
import React, { useMemo } from 'react';
import { Link } from 'gatsby';
import * as S from './Anchor.styles';

const Anchor = (props: AnchorProps) => {
  const component = useMemo(() => (props.to ? Link : 'a'), [props.to]);
  return <S.Wrapper as={component} {...props} />;
};

export default Anchor;
