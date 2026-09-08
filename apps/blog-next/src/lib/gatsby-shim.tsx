/**
 * `gatsby` 모듈 shim.
 *
 * 공유 패키지 `@beomy/design-system`의 `Anchor` 컴포넌트가 `gatsby`의 `Link`를
 * 직접 import 하기 때문에, Next 환경에서도 해당 import가 동작하도록
 * next.config.mjs 에서 `gatsby` 를 이 파일로 alias 한다.
 *
 * 데이터 레이어 API(graphql/useStaticQuery/PageProps)는 이 프로젝트에서
 * 직접 사용하지 않고 Next 네이티브 방식으로 대체했으므로 no-op 스텁만 제공한다.
 */
import type { AnchorHTMLAttributes, ForwardedRef } from 'react';
import { forwardRef } from 'react';
import NextLink from 'next/link';

type GatsbyLinkProps = {
  to: string;
  partiallyActive?: boolean;
  activeClassName?: string;
  activeStyle?: React.CSSProperties;
  replace?: boolean;
  state?: unknown;
  getProps?: unknown;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>;

export const Link = forwardRef(function Link(
  {
    to,
    // gatsby 전용 props 는 DOM 으로 흘려보내지 않는다.
    partiallyActive: _partiallyActive,
    activeClassName: _activeClassName,
    activeStyle: _activeStyle,
    replace: _replace,
    state: _state,
    getProps: _getProps,
    children,
    ...rest
  }: GatsbyLinkProps,
  ref: ForwardedRef<HTMLAnchorElement>,
) {
  return (
    <NextLink href={to ?? '#'} ref={ref} {...rest}>
      {children}
    </NextLink>
  );
});

export const navigate = (to: string) => {
  if (typeof window !== 'undefined') {
    window.location.assign(to);
  }
};

export const withPrefix = (path: string) => path;
export const withAssetPrefix = (path: string) => path;

// 데이터 레이어 no-op 스텁 (직접 사용하지 않음)
export const graphql = () => undefined;
export const useStaticQuery = () => ({});

export default {
  Link,
  navigate,
  withPrefix,
  withAssetPrefix,
  graphql,
  useStaticQuery,
};
