---
layout: post
title: '[Browser] 리소스 우선순위 - preload, preconnect, prefetch'
featured-img: browser/browser.png
category: [tech, browser]
---
{% include toc.html %}

이번 포스트에서는 [[Browser] Critical Rendering Path 최적화](/tech/browser/critical-rendering-path/#리소스-우선순위-지정)에서 이야기한 리소스 우선순위를 지정 할 수 있는 `link` 태그의 `preload`와 `preconnect`, `prefetch`에 대해 이야기 하도록 하겠습니다. 

# preload
현재 페이지에서 사용될 것이 확실한 리소스들을 `preload`해야 합니다. 즉, `preload`는 브라우저에게 현재 페이지에서 필요한 리소스를 빠르게 가져오게 합니다.

```html
<link rel="preload" as="script" href="super-important.js">
<link rel="preload" as="style" href="critical.css">
```

`preload`는 위의 코드와 같이 `<link rel="preload" as="...">`와 같이 사용합니다.

## 주의 사항
`preload`를 사용할 때 주의해야 할 몇가지 사항을 살펴보도록 하겠습니다.

### `as` 속성 사용
`as` 속성을 사용하여 리소스의 유형을 브라우저에 알려줘야 합니다. 올바른 유형이 설정되어 있지 않다면 브라우저는 해당 리소스를 사용하지 않습니다.

### 중복 리소스 참조
`preload`는 브라우저가 반드시 리소스를 가져오게 만듭니다. 리소스를 두 번 가져오게 하거나, 필요하지 않는 것을 가져오지 하지 않도록 주의해야 합니다.

### 반드시 사용되는 리소스에만 사용
`preload`는 현재 페이지에서 반드시 사용되는 리소스에만 사용되어야 합니다.

![preload 경고](/assets/img/posts/browser/res_prio_timeout.png)

`<link rel="preload" as="...">`를 이용하여 리소스를 가져왔지만 현재 페이지에서 3초 내로 사용되지 않는 리소스는 위의 그림과 같은 경로가 출력 됩니다.

## 사용 사례
이번에는 `preload`를 사용하기 좋은 리소스를 살펴보도록 하겠습니다.

### 폰트
사용자가 사이트의 폰트를 기다리는 시간을 감소시키고, 시스템 폰트와 선언된 포트의 충돌을 해결 할 수 있습니다.

```html
<link rel="preload" as="font" crossorigin="crossorigin" type="font/woff2" href="myfont.woff2">
```

위의 코드와 같이 폰트를 `preload` 할 수 있습니다. 위의 코드와 같이 사용하면 브라우저에게 폰트가 즉시 필요하다는 것을 알려줄 수 있습니다.

### Critical Rendering Path의 CSS와 JavaScript
페이지 성능을 측정할 때 중요한 개념 중, Critical Rendering Path가 있습니다([[Browser] Critical Rendering Path 최적화](/tech/browser/critical-rendering-path) 참고). Critical Rendering Path란 초기 렌더링 전에 반드시 로드되어야 할 리소스를 말합니다.

```html
<link rel="preload" as="script" href="super-important.js">
<link rel="preload" as="style" href="critical.css">
```

위의 코드와 같이 초기 렌더링에 반드시 필요한 리소스를 `preload`하는 것이 초기 렌더링 속도를 높일 수 있습니다.

## 브라우저 지원 현황
브라우저 별 `preload` 지원 현황을 살펴보도록 하겠습니다.

~~Can I Use 그림~~

[Can I Use](https://caniuse.com/#search=preload)는 위의 코드와 같이 브라우저 별로 `preload`를 지원한다고 정의하였습니다.

# preconnect
현재 페이지에서 외부 도메인의 리소스를 참고하는 것을 브라우저에게 알려 미리 외부 도메인과 연결을 구축할 수 있게 합니다.

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