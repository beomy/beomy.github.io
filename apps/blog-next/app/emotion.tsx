'use client';

import { useState } from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import createCache from '@emotion/cache';
import type { EmotionCache } from '@emotion/cache';
import type { SerializedStyles } from '@emotion/react';
import { CacheProvider } from '@emotion/react';
import type { ReactNode } from 'react';

/**
 * App Router 에서 Emotion 스타일을 SSR/정적 렌더링 시 <head> 로 추출하기 위한 레지스트리.
 * https://emotion.sh/docs/ssr#advanced-approach 의 Next App Router 패턴.
 */
export default function EmotionRegistry({ children }: { children: ReactNode }) {
  const [{ cache, flush }] = useState(() => {
    const cache: EmotionCache = createCache({ key: 'css' });
    cache.compat = true;
    const prevInsert = cache.insert.bind(cache);
    let inserted: string[] = [];
    cache.insert = (...args: Parameters<EmotionCache['insert']>) => {
      const selector = args[0] as string;
      const serialized = args[1] as SerializedStyles;
      // 전역 스타일(<Global>: selector === '')은 SSR flush 집계에서 제외한다.
      // 집계 태그에 테마별 body 규칙이 박제되면, 클라이언트 <Global> 이 테마를
      // 갱신해도 뒤에 남은 SSR 잔재가 덮어써 다크 테마가 적용되지 않는다.
      // 전역 스타일은 클라이언트 <Global> 이 직접 관리하도록 맡긴다.
      if (selector !== '' && cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name);
      }
      return prevInsert(...args);
    };
    const flush = () => {
      const prev = inserted;
      inserted = [];
      return prev;
    };
    return { cache, flush };
  });

  useServerInsertedHTML(() => {
    const names = flush();
    if (names.length === 0) return null;
    let styles = '';
    for (const name of names) {
      styles += cache.inserted[name];
    }
    return (
      <style
        data-emotion={`${cache.key} ${names.join(' ')}`}
        dangerouslySetInnerHTML={{ __html: styles }}
      />
    );
  });

  return <CacheProvider value={cache}>{children}</CacheProvider>;
}
