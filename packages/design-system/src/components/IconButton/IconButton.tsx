import Icon from '../Icon';
import { IconButtonProps } from './IconButton.types';
import * as S from './IconButton.styles';

const IconButton = ({
  icon,
  border,
  display,
  size,
  onClick,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  ...props
}: IconButtonProps) => {
  return (
    <S.Wrapper
      border={border}
      display={display}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      onBlur={onBlur}
      {...props}
    >
      <Icon type={icon} size={size} />
    </S.Wrapper>
  );
};

export default IconButton;
