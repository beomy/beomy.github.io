/**
 * Next 공식 확장 지점(instrumentation). 서버 프로세스 시작 시 1회 실행된다.
 *
 * 개발 모드에서만 마크다운 콘텐츠 워처를 기동한다. (별도 wrapper 스크립트 없이
 * `next dev` 만으로 .md 변경 시 HMR 이 동작하도록)
 */
export async function register() {
  if (process.env.NODE_ENV !== 'development') return;
  if (process.env.NEXT_RUNTIME !== 'nodejs') return;
  await import('@/server/content-watcher');
}
