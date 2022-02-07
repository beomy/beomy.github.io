import styled from '@emotion/styled';
import { typography, TypographyProps } from 'styled-system';

const StyledDecoInput = styled.div<TypographyProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  input {
    ${typography};
    height: 100%;
    width: calc(100% - 70px);
  }
  button {
    width: ${(props) => props.fontSize};
    height: ${(props) => props.fontSize};
    .clear {
      visibility: hidden;
      margin-right: 5px;
      &.active {
        visibility: visible;
      }
    }
    .search {
    }
  }
`;

export default StyledDecoInput;
