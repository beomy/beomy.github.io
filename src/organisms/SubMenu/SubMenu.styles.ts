import styled from '@emotion/styled';
import { LinkStyles } from '@/atoms';

export const Wrapper = styled.ul`
  display: flex;
  padding: 0;
  align-items: center;
  justify-content: center;
  ${({ theme }: any) => `${theme.mediaQueries.sm}`} {
    display: none;
  }
  ${LinkStyles.Wrapper} {
    text-transform: capitalize;
  }
`;
