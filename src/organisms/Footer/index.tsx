import React from 'react';
import { getYear } from 'date-fns';
import { FaLinkedinIn, FaGithub } from 'react-icons/fa';
import { A, Span } from '@/atoms';
import StyledFooter from './Footer.styled';

function Footer() {
  return (
    <StyledFooter>
      <nav>
        <A href="https://github.com/beomy" target="_blank" p="5px 10px">
          <FaGithub size={20} />
        </A>
        <A
          href="https://www.linkedin.com/in/효범-이-930453134"
          target="_blank"
          p="5px 10px"
        >
          <FaLinkedinIn size={20} />
        </A>
      </nav>
      <Span color="text2" fontSize={1}>
        © {getYear(new Date())} Beomy. All rights reserved.
      </Span>
    </StyledFooter>
  );
}

export default Footer;
