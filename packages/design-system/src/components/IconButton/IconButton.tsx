import Icon from '../Icon';
import { IconButtonProps } from './IconButton.types';
import * as S from './IconButton.styles';

const IconButton = ({
  icon,
  border,
  display,
  onClick,
  onMouseEnter,
  onMouseLeave,
  size,
  ...props
}: IconButtonProps) => {
  return (
    <S.Wrapper
      border={border}
      display={display}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      {...props}
    >
      <Icon type={icon} size={size} />
    </S.Wrapper>
  );
};

export default IconButton;
