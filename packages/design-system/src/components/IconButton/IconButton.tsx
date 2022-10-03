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
  ...props
}: IconButtonProps) => {
  return (
    <S.Wrapper
      border={border}
      display={display}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Icon type={icon} {...props} />
    </S.Wrapper>
  );
};

export default IconButton;
