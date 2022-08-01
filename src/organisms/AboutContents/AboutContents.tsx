import { H1 } from '@/atoms';
import type { AboutContentsProps } from './AboutContents.types';
import * as S from './AboutContents.styles';

const AboutContents = ({ title, children }: AboutContentsProps) => {
  return (
    <S.Wrapper>
      <H1>{title}</H1>
      {children}
    </S.Wrapper>
  );
};

export default AboutContents;
