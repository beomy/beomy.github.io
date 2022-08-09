import { getYear } from 'date-fns';
import { FiGithub, FiLinkedin } from 'react-icons/fi';
import { A, Span } from '@/atoms';
import * as S from './Footer.styles';

const Footer = () => {
  return (
    <S.Wrapper>
      <S.Nav>
        <A href="https://github.com/beomy" target="_blank" p="5px 10px">
          <FiGithub size={20} />
        </A>
        <A
          href="https://www.linkedin.com/in/효범-이-930453134"
          target="_blank"
          p="5px 10px"
        >
          <FiLinkedin size={20} />
        </A>
      </S.Nav>
      <Span color="text2" fontSize={1}>
        © {getYear(new Date())} Beomy. All rights reserved.
      </Span>
    </S.Wrapper>
  );
};

export default Footer;
