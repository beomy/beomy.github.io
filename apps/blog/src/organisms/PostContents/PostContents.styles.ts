import styled from '@emotion/styled';

export const Wrapper = styled.div`
  img {
    display: block;
    max-width: 100%;
    height: auto;
    width: auto;
    margin: 0 auto;
    border-radius: 10px;
    background-color: ${({ theme }) => theme.colors.white};
  }
  pre {
    border-radius: 10px;
  }
  :not(pre) {
    code[class*='language-'] {
      word-break: break-word;
    }
  }

  table {
    display: table;
    table-layout: fixed;
    width: 100%;
    overflow-x: auto;
    border-collapse: collapse;
    border-spacing: 0;
    border: ${({ theme }) => `1px solid ${theme.colors.grey[90]}`};
    border-radius: 4px;
    th,
    td {
      padding: 6px 13px;
      border: ${({ theme }) => `1px solid ${theme.colors.grey[90]}`};
    }
  }
  h1 {
    margin: 45px 0 20px 0;
    font-size: ${({ theme }) => theme.fontSizes[5]};
  }
  h2 {
    margin: 40px 0 20px 0;
    font-size: ${({ theme }) => theme.fontSizes[4]};
  }
  h3 {
    margin: 35px 0 20px 0;
    font-size: ${({ theme }) => theme.fontSizes[3]};
  }
  h4 {
    margin: 30px 0 20px 0;
    font-size: ${({ theme }) => theme.fontSizes[2]};
  }
  blockquote {
    margin: 2rem 0;
    border-left: 4px solid ${({ theme }) => theme.colors.green[80]};
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    background: ${({ theme }) => theme.colors.grey[98]};
    padding: 1rem 1rem 1rem 2rem;
    h1,
    h2,
    h3,
    h4 {
      margin-top: 1.25rem;
    }
    p:first-of-type {
      margin-top: 0;
    }
    p:last-child {
      margin-bottom: 0;
    }
  }
  p {
    margin: 1rem 0;
    > img {
      margin: 2rem auto;
    }
  }

  #참고 {
    margin-top: 50px;
    margin-bottom: 0;
    + ul {
      margin: 0;
      line-height: 1.5;
    }
  }

  [data-language] {
    position: relative;
    &:before {
      position: absolute;
      top: 0;
      right: 0;
      padding: 0 10px;
      font-size: ${({ theme }) => theme.fontSizes[0]};
    }
  }
  [data-language='http']:before {
    content: 'HTTP';
  }
  [data-language='html']:before {
    content: 'HTML';
  }
  [data-language='js']:before {
    content: 'JS';
  }
  [data-language='ts']:before {
    content: 'TS';
  }
  [data-language='bash']:before {
    content: 'BASH';
  }
  [data-language='scss']:before {
    content: 'SCSS';
  }
  [data-language='json']:before {
    content: 'JSON';
  }
  [data-language='css']:before {
    content: 'CSS';
  }
`;
