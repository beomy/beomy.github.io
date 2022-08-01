import type { LinkProps } from './Link.types';
import * as S from './Link.styles';

const Link = ({
  children,
  to,
  activeClassName = 'active',
  ...props
}: LinkProps) => {
  return (
    <S.Wrapper to={to} activeClassName={activeClassName} {...props}>
      {children}
    </S.Wrapper>
  );
};

export default Link;
