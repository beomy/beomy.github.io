import styled from '@emotion/styled';

export const Wrapper = styled.div`
  position: fixed;
  z-index: 9;
  top: 70px;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: end;
  padding: 0 10px;
  box-sizing: border-box;
  ${({ theme }) => theme.sizes.mediaQueries.xs} {
    width: 100%;
  }
`;
