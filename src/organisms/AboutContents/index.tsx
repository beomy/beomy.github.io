import { ReactNode } from 'react';
import { H1 } from '@/atoms';
import StyledAboutContents from './AboutContents.styled';

interface IProp {
  title: string;
  children: ReactNode;
}

function AboutContents({ title, children }: IProp) {
  return (
    <StyledAboutContents>
      <H1>{title}</H1>
      {children}
    </StyledAboutContents>
  );
}

export default AboutContents;
