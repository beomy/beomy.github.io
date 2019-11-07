---
layout: post
title: '[Browser] 리소스 우선순위 - preload, preconnect, prefetch'
featured-img: browser/browser.png
category: [tech, browser]
---
{% include toc.html %}

이번 포스트에서는 [[Browser] Critical Rendering Path 최적화](/tech/browser/critical-rendering-path/#리소스-우선순위-지정)에서 이야기한 리소스 우선순위를 지정 할 수 있는 `link` 태그의 `preload`와 `preconnect`, `prefetch`에 대해 이야기 하도록 하겠습니다. 

# preload
현재 페이지에서 사용될 것이 확인할 리소스들을 `preload`해야 합니다. 즉, `preload`는 브라우저에게 현재 페이지에서 필요한 리소스를 빠르게 가져오게 합니다.

```html
<link rel="preload" as="script" href="super-important.js">
<link rel="preload" as="style" href="critical.css">
```

`preload`는 위의 코드와 같이 `<link rel="preload" as="...">`와 같이 사용합니다. `as` 속성을 사용하여 리소스의 유형을 브라우저에 알려줘야 합니다. 올바른 유형이 설정되어 있지 않다면 브라우저는 해당 리소스를 사용하지 않습니다.

## 사용 사례
이번에는 `preload`를 사용하기 좋은 리소스를 살펴보도록 하겠습니다.

### 글꼴

### 주요 경로의 CSS와 JavaScript

## 브라우저 지원 현황

# preconnect

## 사례

### 어디서 왔는지 알기

### 미디어 스트리밍

## 브라우저 지원 현황

# prefetch
미래에 사용될 것이라고 예상되는 리소스들을 `prefetch`해야 합니다.

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