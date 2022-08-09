import type { IconTextProps } from './IconText.types';
import * as S from './IconText.styles';

const IconText = ({ Icon, children, iconSize, ...props }: IconTextProps) => {
  return (
    <S.Wrapper {...props}>
      <S.Icon>
        <Icon size={iconSize} />
      </S.Icon>
      <span>{children}</span>
    </S.Wrapper>
  );
};

export default IconText;
