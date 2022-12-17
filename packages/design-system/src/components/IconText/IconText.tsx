import type { IconTextProps } from './IconText.types';
import Icon from '../Icon';
import * as S from './IconText.styles';

const IconText = ({ icon, children, ...props }: IconTextProps) => {
  return (
    <S.Wrapper {...props}>
      <Icon type={icon} />
      <span>{children}</span>
    </S.Wrapper>
  );
};

export default IconText;
