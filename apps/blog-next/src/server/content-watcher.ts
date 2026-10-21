/**
 * 개발 모드 전용 마크다운 콘텐츠 워처.
 *
 * `.md` 는 모듈 그래프에 없어 Next(Turbopack)가 변경을 감지하지 못한다.
 * posts/·drafts/ 변경을 감지하면 모듈 그래프에 포함된 센티널(앱 루트의 content-version.ts,
 * git 미추적·scripts/content-version.mjs 가 생성)의 값을 갱신해 Fast Refresh 를 트리거한다.
 *
 * instrumentation.ts 의 register() 에서 dev + nodejs 런타임일 때만 동적 import 된다.
 */
import { watch } from 'fs';
import path from 'path';
import {
  ensureContentVersion,
  writeContentVersion,
} from '../../scripts/content-version.mjs';

const globalRef = globalThis as typeof globalThis & {
  __contentWatcherStarted?: boolean;
};

if (!globalRef.__contentWatcherStarted) {
  globalRef.__contentWatcherStarted = true;

  const root = process.cwd();
  const watchDirs = ['posts', 'drafts'].map((d) => path.join(root, d));

  ensureContentVersion(root);

  let timer: NodeJS.Timeout;
  const bump = () => {
    clearTimeout(timer);
    // 저장 시 이벤트가 몰려오므로 디바운스
    timer = setTimeout(() => {
      try {
        writeContentVersion(root, Date.now());
      } catch {
        // ignore
      }
    }, 80);
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
}
