import { getYear } from 'date-fns';
import { Anchor, Icon } from '@beomy/design-system';
import { Span } from '@/atoms';
import * as S from './Footer.styles';

const Footer = () => {
  return (
    <S.Wrapper>
      <S.Nav>
        <Anchor
          href="https://github.com/beomy"
          target="_blank"
          aria-label="github"
        >
          <Icon type="BsGithub" size={20} />
        </Anchor>
        <Anchor
          href="https://www.linkedin.com/in/효범-이-930453134"
          target="_blank"
          aria-label="linkedin"
        >
          <Icon type="BsLinkedin" size={20} />
        </Anchor>
      </S.Nav>
      <Span color="caption" fontSize={1}>
        © {getYear(new Date())} Beomy. All rights reserved.
      </Span>
    </S.Wrapper>
  );
};

export default Footer;
