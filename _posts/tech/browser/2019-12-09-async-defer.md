---
layout: post
title: '[Browser] async와 defer'
featured-img: browser/browser.png
category: [tech, browser]
summary: script 태그를 비동기 처리하여 브라우저의 파싱을 차단하지 않는 방법에 대해 이야기할 것입니다.
---
{% include toc.html %}

자바스크립트는 파서 차단 리소스(parser blocking resource)입니다. 브라우저는 HTML을 파싱 하다가 자바스크립트를 만나면 진행하던 파싱을 중단하고 자바스크립트 리소스를 다운로드해 파싱하고 실행합니다. 자세한 내용은 [JavaScript와 CSS](/tech/browser/browser-rendering/#참고-javascript와-css)를 참고 바랍니다.

브라우저는 `<script>`를 만나면 파싱을 차단하고 리소스를 다운로드하고, 파싱하고, 실행하기 때문에 화면을 렌더링 하는데 그만큼 시간이 소모되어 사용성이 떨어집니다. 이번 포스트에서는 `<script>`를 비동기 처리하여 브라우저의 파싱을 차단하지 않는 방법에 대해 이야기할 것입니다.

# `<script>` 사용
`async`와 `defer` 모두 사용하지 않는 기본 모드입니다.

`<script>`는 인라인 코드인 경우 파싱 되고 실행되지만 외부 스크립트인 경우 리소스를 다운로드하고, 파싱 되고, 실행됩니다. 브라우저는 스크립트 파일을 다운로드하고 파싱 되고 실행될 때까지 HTML 파싱을 중단합니다.

## 렌더링 순서
![script 렌더링 순서](/assets/img/posts/browser/script_parsing.png)

위의 그림과 같이 기본적으로는 스크립트를 가져와서 실행이 끝날 때까지 HTML 파싱이 중단되어 화면이 출력되는 시간이 길어집니다.

# `<script ... async>` 사용
`async` 속성은 브라우저에게 스크립트 리소스 다운이 완료되면 파싱을 중단하고 스크립트 파일을 실행하라고 알려주는 역할을 합니다.

## 렌더링 순서
![script async 렌더링 순서](/assets/img/posts/browser/script_async_parsing.png)

위의 그림과 같이 `async` 속성을 추가할 경우, 스크립트 리소스를 다운로드하는 동안에는 파싱이 중단되지 않습니다. 다운로드가 완료되면 HTML 파싱을 중단하고 스크립트를 실행합니다.

## 특징
스크립트의 실행 순서는 다운로드가 완료된 시점에 결정됩니다. 예를 들어,

```html
<script src="a.js" async>
<script src="b.js" async>
<script src="c.js" async>
```

위의 코드와 같이 `a.js`, `b.js`, `c.js` 순서로 정의했다 하더라고, 다운로드가 완료된 시점에 스크립트가 실행되기 때문에 `a.js`, `b.js`, `c.js` 순서로 스크립트가 실행된다는 것을 보장할 수 없습니다. `a.js`를 다운로드하는데 3초, `b.js`를 다운로드하는데 2초, `c.js`를 다운로드하는데 1초가 걸린다면, `c.js`, `b.js`, `a.js` 순서로 스크립트가 실행됩니다.

정의한 순서로 스크립트를 실행하는 것을 보장하기 위해 HTML5에서 `async=false`가 추가되었습니다. `async=false`로 지정하면 정의 순서대로 스크립트가 실행됩니다. `async`속성의 기본값은 `true`입니다.

## 지원 브라우저
![async 지원 브라우저](/assets/img/posts/browser/async_support.png)

[can i use](https://caniuse.com/#search=script%20async){: target="_blank" }에서 `async`를 지원하는 브라우저를 확인한 그림입니다. 더 자세한 지원 내용 확인은 링크 확인 부탁드립니다.

can i use를 통해 지원 브라우저를 살펴보면 크게,

- Chrome: 8 이상부터
- IE: 10 이상부터
- Safari: 5.1 이상부터

위의 내용과 같이 지원합니다. 거의 모든 브라우저에서 `async` 속성을 지원합니다.

# `<script ... defer>` 사용
`defer` 속성은 브라우저에게 HTML 파싱이 완료되면 스크립트 파일을 실행하라고 알려주는 역할을 합니다.

## 렌더링 순서
![script defer 렌더링 순서](/assets/img/posts/browser/script_defer_parsing.png)

`defer` 속성을 추가할 경우, 위의 그림과 같이 렌더링 합니다. 스크립트 리소스를 다운로드하는 동안에 파싱이 중단되지 않으며, 파싱이 완료된 이후 스크립트가 실행됩니다.

## 특징
`async` 속성과 `defer` 속성의 렌더링 동작을 비교해 살펴보도록 하겠습니다.

### `async`와 공통점
`async`와 `defer` 모두 스크립트 리소스를 다운로드하는 동안에 파싱이 중단되지 않습니다.

### `async`와 차이점
`async`와 `defer`는 2가지 차이점이 있습니다.

1. `async`는 스크립트 리소스 다운로드가 완료된 시점에 스크립트가 실행되지만, `defer`는 HTML 파싱 하는 동안에 스크립트 리소스를 다운로드하고 HTML 파싱이 완료되면 스크립트가 실행됩니다.
2. `async`(default 값인 `async=true`일 경우)는 다운로드가 완료된 시점에 스크립트가 실행되어 스크립트 실행 순서를 보장할 수 없지만, `defer`의 경우 정의된 순서대로 스크립트가 실행됩니다.

## 지원 브라우저
![defer 지원 브라우저](/assets/img/posts/browser/defer_support.png)

[can i use](https://caniuse.com/#search=script%20defer){: target="_blank" }에서 `defer`를 지원하는 브라우저를 확인한 그림입니다. 더 자세한 지원 내용 확인은 링크 확인 부탁드립니다.

can i use를 통해 지원 브라우저를 살펴보면 크게,

- Chrome: 8 이상부터
- IE: 10 이상부터 (6-9는 부분적으로 지원)
- Safari: 5 이상부터

위의 내용과 같이 지원합니다. 거의 모든 브라우저에서 `defer` 속성을 지원합니다. `async` 속성보다 `defer` 속성이 더 구형 브라우저까지 지원합니다.

# 무엇을 사용할 것인가
브라우저는 기본적으로 `<script>` 태그를 만나면 파싱을 중단하고 스크립트를 다운, 파싱, 실행 과정을 진행합니다. `<body>` 태그가 닫히기 바로 직전에 `<script>` 태그를 선언하었다면, 이미 거의 모든 HTML 파싱이 종료된 상태이기 때문에, `async` 속성을 사용하든 `defer` 속성을 사용하든 크게 의미가 없게 됩니다.

이번에는 `<scirpt>`가 `<body>` 태그가 닫히기 바로 직전에 선언되지 않아 `async` 혹은 `defer` 속성을 사용해야 할 때, 어떤 속성을 사용하는 것이 좋은지 살펴보도록 하겠습니다.

## `async`를 사용해야 할 때
스크립트 파일에 종속성이 없는 경우 `async` 속성을 사용하는 것이 좋습니다.

`async`는 스크립트 리소스 다운로드가 완료되면 파싱을 중단하고 스크립트가 실행되기 때문에, 어느 시점에 HTML 파싱이 중단될지 보장할 수 없습니다. DOM에 종속성이 없어서  HTML 파싱 중 어느 시점에 스크립트가 실행되든지 상관없을 경우 `async` 속성을 사용하는 것이 좋습니다.

`async`(`async=true`인 경우)는 스크립트 리소스 다운로드가 완료된 순서대로 스크립트가 실행되기 때문에, 여러 스크립트가 정의된 경우 어느 스크립트가 먼저 실행될지 보장할 수 없습니다. 스크립트 파일 간에 종속성이 없어서 어떤 순서로 스크립트가 실행돼도 상관없을 경우 `async` 속성을 사용하는 것이 좋습니다.

## `defer`를 사용해야 할 때
`async`과 반대로 종속성이 있는 경우 `defer` 속성을 사용하는 것이 좋습니다.

DOM과 종속성이 있어서, DOM이 전부 생성되어야 정상적인 동작을 할 수 있는 경우 `defer` 속성을 사용하는 것이 좋습니다.

스크립트 간에 종속성이 있어서, 스크립트 실행 순서가 항상 `<script>` 정의 순서로 실행되어야 하는 경우 `defer` 속성을 사용하는 것이 좋습니다.

# 부록

## `defer`, `async`를 동시 사용하면?
`async`와 `defer` 속성이 모두 지정된 경우 `async` 속성을 지원하는 최신 브라우저는 기본적으로 `async` 속성을 따라갑니다. 하지만 `async` 속성을 지원하지 않는 구형 브라우저는 `defer` 속성의 지원 여부에 따라 결정됩니다. `defer` 속성을 지원하는 경우 `defer` 속성에 의해 비동기적으로 스크립트를 실행하지만 `defer` 조자 지원하지 않는 브라우저의 경우에는 동기적으로 스크립트를 실행합니다.

## `<noscript>`
자바스크립트 실행이 비활성화되어 있거나 자바스크립트 기능이 없는 구형 브라우저(최신 브라우저는 자바스크립트를 지원하지 않는 경우를 찾아볼 수 없습니다)의 경우 `<noscript>` 태그 내의 HTML이 파싱 되어 화면에 그려집니다.

#### 참고
- [https://blog.asamaru.net/2017/05/04/script-async-defer/](https://blog.asamaru.net/2017/05/04/script-async-defer/)
- [https://appletree.or.kr/blog/web-development/javascript/script-태그의-async와-defer-속성/](https://appletree.or.kr/blog/web-development/javascript/script-태그의-async와-defer-속성/)
- [https://muckycode.blogspot.com/2015/01/javascript-html-script-async-defer.html](https://muckycode.blogspot.com/2015/01/javascript-html-script-async-defer.html)
- [https://realmojo.tistory.com/96](https://realmojo.tistory.com/96)