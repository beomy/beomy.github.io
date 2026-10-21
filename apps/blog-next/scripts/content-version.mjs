/**
 * 마크다운 콘텐츠 버전 센티널(content-version.ts) 생성기.
 *
 * 센티널은 git 에 추적하지 않는다(.gitignore). 모듈 그래프에 포함돼야 하므로 설치(postinstall) 시점에
 * 없으면 만들어 두고, 개발 모드 워처(src/server/content-watcher.ts)가
 * .md 변경마다 값을 갱신한다.
 *
 * CLI: `node scripts/content-version.mjs` (cwd = 앱 루트) — 파일이 없을 때만 생성.
 */
import { existsSync, writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

export const CONTENT_VERSION_FILE = 'content-version.ts';

const template = (version) => `/**
 * 마크다운 콘텐츠 버전 센티널. (자동 생성 파일 — git 에 추적하지 않음)
 *
 * \`.md\` 파일은 모듈 그래프에 포함되지 않아 Next(Turbopack)가 변경을 감지하지 못한다.
 * 개발 모드 워처(src/server/content-watcher.ts)가 posts/·drafts/ 변경을 감지하면 이 파일의
 * 값을 갱신하고, 이 모듈을 import 하는 데이터 레이어(src/server/posts.ts)가 Fast Refresh 로
 * 다시 실행되어 마크다운 변경이 화면에 반영된다.
 *
 * 생성·갱신: scripts/content-version.mjs
 */
export const CONTENT_VERSION = ${version};
`;

/** 센티널을 주어진 값으로 덮어쓴다. */
export function writeContentVersion(root, version) {
  writeFileSync(path.join(root, CONTENT_VERSION_FILE), template(version));
}

/** 센티널이 없을 때만 0 으로 생성한다. 생성했으면 true. */
export function ensureContentVersion(root) {
  if (existsSync(path.join(root, CONTENT_VERSION_FILE))) return false;
  writeContentVersion(root, 0);
  return true;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const root = path.resolve(fileURLToPath(import.meta.url), '../..');
  if (ensureContentVersion(root)) {
    console.log(`[content-version] created ${CONTENT_VERSION_FILE}`);
  }
}
