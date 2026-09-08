/**
 * 개발 모드 전용 마크다운 콘텐츠 워처.
 *
 * `.md` 는 모듈 그래프에 없어 Next(Turbopack)가 변경을 감지하지 못한다.
 * posts/·drafts/ 변경을 감지하면 모듈 그래프에 포함된 센티널
 * (src/lib/content-version.ts)의 값을 갱신해 Fast Refresh 를 트리거한다.
 *
 * instrumentation.ts 의 register() 에서 dev + nodejs 런타임일 때만 동적 import 된다.
 */
import { watch, writeFileSync } from 'fs';
import path from 'path';

const SENTINEL_TEMPLATE = (version: number) => `/**
 * 마크다운 콘텐츠 버전 센티널.
 *
 * \`.md\` 파일은 모듈 그래프에 포함되지 않아 Next(Turbopack)가 변경을 감지하지 못한다.
 * 개발 모드 워처(src/lib/content-watcher.ts)가 posts/·drafts/ 변경을 감지하면 이 파일의
 * 값을 갱신하고, 이 모듈을 import 하는 데이터 레이어(posts.ts)가 Fast Refresh 로 다시
 * 실행되어 마크다운 변경이 화면에 반영된다.
 *
 * 커밋 값은 항상 0 으로 유지한다. (개발 중 자동 변경분은 커밋하지 말 것)
 */
export const CONTENT_VERSION = ${version};
`;

const globalRef = globalThis as typeof globalThis & {
  __contentWatcherStarted?: boolean;
};

if (!globalRef.__contentWatcherStarted) {
  globalRef.__contentWatcherStarted = true;

  const root = process.cwd();
  const sentinel = path.join(root, 'src/lib/content-version.ts');
  const watchDirs = ['posts', 'drafts'].map((d) => path.join(root, d));

  const writeSentinel = (version: number) => {
    try {
      writeFileSync(sentinel, SENTINEL_TEMPLATE(version));
    } catch {
      // ignore
    }
  };

  let timer: NodeJS.Timeout;
  const bump = () => {
    clearTimeout(timer);
    // 저장 시 이벤트가 몰려오므로 디바운스
    timer = setTimeout(() => writeSentinel(Date.now()), 80);
  };

  for (const dir of watchDirs) {
    try {
      watch(dir, { recursive: true }, (_event, filename) => {
        if (!filename || String(filename).endsWith('.md')) bump();
      });
      console.log(
        `[content-watch] watching ${path.relative(root, dir)}/ for .md changes`,
      );
    } catch {
      // 디렉터리가 없으면 무시 (drafts 등)
    }
  }

  // 종료 시 센티널을 0 으로 리셋해 git 변경분을 남기지 않는다.
  const reset = () => writeSentinel(0);
  process.once('SIGINT', () => {
    reset();
    process.exit(0);
  });
  process.once('SIGTERM', () => {
    reset();
    process.exit(0);
  });
  process.once('exit', reset);
}
