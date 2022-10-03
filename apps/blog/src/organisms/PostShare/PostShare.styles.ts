import styled from '@emotion/styled';
import { FieldSet } from '@beomy/design-system';

export const Wrapper = styled(FieldSet)`
  button {
    + button {
      margin-left: 5px;
    }
  }
`;
