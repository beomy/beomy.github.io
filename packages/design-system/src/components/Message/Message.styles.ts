import type { CssProps, StyledProps } from '../../models';
import type { MessageProps } from './Message.types';
import styled from '@emotion/styled';
import Color from 'color';
import BeomyIconText from '../IconText';

const getColor = ({ type, theme }: CssProps<MessageProps>) => {
  if (type === 'success') {
    return theme.colors.green[50];
  } else if (type === 'warning') {
    return theme.colors.orange[50];
  } else if (type === 'error') {
    return theme.colors.red[50];
  } else {
    return theme.colors.blue[50];
  }
};

export const IconText = styled(BeomyIconText)<StyledProps<MessageProps>>`
  flex-grow: 1;
  svg {
    margin-right: 10px;
    color: ${({ type, theme }) => getColor({ type, theme })};
  }
  span {
    width: 100%;
  }
`;

export const Wrapper = styled.div`
  display: inline-flex;
  justify-content: space-between;
  padding: 10px;
  margin: 10px 0;
  width: 400px;
  background-color: ${({ theme }) => theme.colors.grey[100]};
  ${({ theme }) => theme.sizes.mediaQueries.xs} {
    width: 100%;
  }
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.grey[70]};
  box-shadow: ${({ theme }) =>
      Color(theme.colors.grey[0]).alpha(0.2).toString()}
    0 4px 16px 0;
  box-sizing: border-box;
`;
