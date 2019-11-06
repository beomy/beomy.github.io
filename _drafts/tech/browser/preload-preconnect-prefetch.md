---
layout: post
title: '[Browser] 리소스 우선순위 - preload, preconnect, prefetch'
featured-img: browser/browser.png
category: [tech, browser]
---
{% include toc.html %}

이번 포스트에서는 [[Browser] Critical Rendering Path 최적화](/tech/browser/critical-rendering-path/#리소스-우선순위-지정)에서 이야기한 리소스 우선순위를 지정 할 수 있는 `link` 태그의 `preload`와 `preconnect`, `prefetch`에 대해 이야기 하도록 하겠습니다. 

# preload
`preload`는 `<link rel="preload" as="...">`와 같이 사용합니다.

현재 페이지에서 사용될 것이 확인할 리소스들을 `preload`해야 합니다. 즉, `preload`는 브라우저에게 현재 페이지에서 필요한 리소스를 빠르게 가져오게 합니다.

## 사례

## 브라우저 지원 현황

# prefetch
미래에 사용될 것이라고 예상되는 리소스들을 `prefetch`해야 합니다.

## 사례

## 브라우저 지원 현황

# preconnect

## 사례

## 브라우저 지원 현황

# Vue와 prefetch

#### 참고
- [https://developers.google.com/web/fundamentals/performance/resource-prioritization?hl=ko](https://developers.google.com/web/fundamentals/performance/resource-prioritization?hl=ko)
- [https://medium.com/@koh.yesl/preload-prefetch-and-priorities-in-chrome-15d77326f646](https://medium.com/@koh.yesl/preload-prefetch-and-priorities-in-chrome-15d77326f646)
- [https://medium.com/@jeongwooahn/vue-js-lazy-load-적용하기2-3f1a2f4a4ee8](https://medium.com/@jeongwooahn/vue-js-lazy-load-적용하기2-3f1a2f4a4ee8)
- [https://developer.mozilla.org/en-US/docs/Web/HTML/Preloading_content](https://developer.mozilla.org/en-US/docs/Web/HTML/Preloading_content)
- [https://css-tricks.com/prefetching-preloading-prebrowsing/](https://css-tricks.com/prefetching-preloading-prebrowsing/)
- [https://caniuse.com/#search=preload](https://caniuse.com/#search=preload)
- [https://caniuse.com/#search=prefetch](https://caniuse.com/#search=prefetch)
- [https://caniuse.com/#search=preconnect](https://caniuse.com/#search=preconnect)