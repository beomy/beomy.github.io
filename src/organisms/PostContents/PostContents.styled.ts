import styled from '@emotion/styled';

const StyledContents = styled.div`
  img {
    display: block;
    vertical-align: middle;
    max-width: 100%;
    height: auto;
    width: auto;
    margin: 0 auto;
    border-radius: 10px;
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
    width: 100%;
    overflow-x: auto;
    border-collapse: collapse;
    border-spacing: 0;
    border: ${({ theme }: any) => `1px solid ${theme.colors.border}`};
    border-radius: 4px;
    th {
      background-color: ${({ theme }: any) => theme.colors.bg1};
    }
    th,
    td {
      padding: 6px 13px;
      border: ${({ theme }: any) => `1px solid ${theme.colors.border}`};
    }
  }
  h1 {
    margin: 45px 0 20px 0;
    font-size: ${({ theme }: any) => theme.fontSizes[5]};
  }
  h2 {
    margin: 40px 0 20px 0;
    font-size: ${({ theme }: any) => theme.fontSizes[4]};
  }
  h3 {
    margin: 35px 0 20px 0;
    font-size: ${({ theme }: any) => theme.fontSizes[3]};
  }
  h4 {
    margin: 30px 0 20px 0;
    font-size: ${({ theme }: any) => theme.fontSizes[2]};
  }
  blockquote {
    margin: 2rem 0;
    border-left: 4px solid rgb(32, 201, 151);
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    background: rgb(248, 249, 250);
    padding: 1rem 1rem 1rem 2rem;
    color: rgb(33, 37, 41);
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
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  #참고 {
    margin-top: 50px;
    margin-bottom: 0;
    + ul {
      margin: 0;
      line-height: 1.5;
    }
  }
`;

export default StyledContents;
