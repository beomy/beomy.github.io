---
layout: post
title: '[Browser] Critical Rendering Path'
featured-img: browser/browser.png
category: [tech, browser]
---
{% include toc.html %}

이번 포스트에서는 렌더링 과정을 이야기 하지 않고, 렌더링 최적화에 대해 이야기 할 것입니다. 렌더링 최적화를 위해서는 우선 렌더링 과정을 이해하는 것이 좋습니다. [[Browser] 브라우저 렌더링](/tech/browser/browser-rendering)에서 브라우저의 렌더링 과정을 설명합니다. 해당 포스트를 본 후 이번 포스팅을 보는 것이 이해 하는더 더 도움이 될 것 같습니다.

# Critical Rendering Path 란?
브라우저가 페이지의 초기 출력을 위해 실행해야 하는 순서를 Critical Rendering Path라고 합니다.

- DOM 트리 구축
- CSSOM 트리 구축
- JavaScript 실행
- 렌더 트리 구축
- 레이아웃 생성
- 페인팅

Critical Rendering Path는 위의 6단계로 구성됩니다. 단계별 자세한 설명은 [[Browser] 브라우저 렌더링](/tech/browser/browser-rendering)를 참고 바랍니다.

# 렌더링 최적화
이번에 이야기 할 렌더링 최적화는 브라우저의 도움을 받아 브라우저의 초기 출력을 빠르게 할 수 있는 방법에 대해 이야기 할 것입니다. (코딩을 어떻게 어떻게 해야 한다를 이야기 하지 않을 것입니다.)

## CSS
기본적으로, CSS는 렌더링 차단 리소스(render blocking resource)입니다. 즉 CSSOM이 생성될 때까지 브라우저는 렌더링하지 않습니다. 렌더 트리를 이용하여 레이아웃과 페인팅 동작을 하기 때문에, 렌더 트리를 만들 때 사용되는 HTML과 CSS는 둘 다 렌더링 차단 리소스가 됩니다.

CSS는 렌더링 차단 리소스이기 때문에, 최초 렌더링에 걸리는 시간을 최적화하려면 CSS를 간단하게 만들고, 클라이언트에 최대한 빠르게 다운로드되어야 합니다.

### 미디어 속성 사용
미디어 유형과 미디어 쿼리를 사용하여 일부 CSS 리소스를 렌더링 비차단 리소스로 표시할 수 있습니다.

## JavaScript

### async 와 defer

## 그 외

## prefetch 와 preload

#### 참고
- [https://developers.google.com/web/fundamentals/performance/critical-rendering-path?hl=ko](https://developers.google.com/web/fundamentals/performance/critical-rendering-path?hl=ko)
- [https://blog.asamaru.net/2017/05/04/understanding-the-critical-rendering-path/](https://blog.asamaru.net/2017/05/04/understanding-the-critical-rendering-path/)