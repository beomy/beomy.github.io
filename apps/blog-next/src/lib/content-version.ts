/**
 * 마크다운 콘텐츠 버전 센티널.
 *
 * `.md` 파일은 모듈 그래프에 포함되지 않아 Next(Turbopack)가 변경을 감지하지 못한다.
 * 개발 모드 워처(src/lib/content-watcher.ts)가 posts/·drafts/ 변경을 감지하면 이 파일의
 * 값을 갱신하고, 이 모듈을 import 하는 데이터 레이어(posts.ts)가 Fast Refresh 로 다시
 * 실행되어 마크다운 변경이 화면에 반영된다.
 *
 * 커밋 값은 항상 0 으로 유지한다. (개발 중 자동 변경분은 커밋하지 말 것)
 */
export const CONTENT_VERSION = 0;
