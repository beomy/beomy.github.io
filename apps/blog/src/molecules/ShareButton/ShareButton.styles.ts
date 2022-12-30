import styled from '@emotion/styled';
import { IconButtonStyles } from '@beomy/design-system';
import { StyledProps } from '@beomy/design-system/models';
import { ShareButtonProps } from './ShareButton.types';

export const Wrapper = styled(IconButtonStyles.Wrapper, {
  shouldForwardProp: (props) => !['resetButtonStyle', 'border'].includes(props),
})<StyledProps<ShareButtonProps> & { resetButtonStyle: boolean }>``;
