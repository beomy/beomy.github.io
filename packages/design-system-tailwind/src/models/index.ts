/**
 * 공용 타입.
 *
 * emotion 기반 구 디자인 시스템의 `StyledProps` 와 호환되는 최소 타입만 제공합니다.
 * (Tailwind 버전에는 emotion `Theme` 에 의존하는 `CssProps` 가 없습니다.)
 */
export type StyledProps<T = Record<string, unknown>> = Partial<T>;
