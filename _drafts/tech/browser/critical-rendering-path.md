---
layout: post
title: '[Browser] Critical Rendering Path 최적화'
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

# Critical Rendering Path 최적화
이번에 이야기 할 렌더링 최적화는 브라우저의 도움을 받아 브라우저의 초기 출력을 빠르게 할 수 있는 방법에 대해 이야기 할 것입니다.

일반적으로 Critical Rendering Path 최적회란 HTML, CSS 및 자바스크립트 간의 종속성 그래프를 이해하고 최적화하는 것을 말합니다.

## CSS
기본적으로, CSS는 렌더링 차단 리소스(render blocking resource)입니다. 즉 CSSOM이 생성될 때까지 브라우저는 렌더링하지 않습니다. 렌더 트리를 이용하여 레이아웃과 페인팅 동작을 하기 때문에, 렌더 트리를 만들 때 사용되는 HTML과 CSS는 둘 다 렌더링 차단 리소스가 됩니다.

CSS는 렌더링 차단 리소스이기 때문에, 최초 렌더링에 걸리는 시간을 최적화하려면 CSS를 간단하게 만들고, 클라이언트에 최대한 빠르게 다운로드되어야 합니다.

미디어 유형과 미디어 쿼리를 사용하면 일부 CSS 리소스를 렌더링 비차단 리소스로 표시할 수 있습니다. 브라우저는 차단 리소스이든 비차단 리소스이든 상관없이 모든 CSS 리소스를 다운로드합니다.

### 미디어 유형, 미디어 쿼리 사용
페이지가 인쇄될 때나 대형 모니터에 출력하는 경우 등 몇가지 특수한 경우에만 사용되는 CSS가 있다면, 해당 CSS가 렌더링을 차단하지 않는 것이 좋습니다. 이 경우에 미디어 유형과 미디어 쿼리를 사용면 CSS 리소스를 렌더링 비차단 리소스로 표시할 수 있습니다.

```html
<link href="style.css"    rel="stylesheet">
<link href="style.css"    rel="stylesheet" media="all">
<link href="print.css"    rel="stylesheet" media="print">
<link href="portrait.css" rel="stylesheet" media="orientation:landscape">
<link href="other.css"    rel="stylesheet" media="min-width: 40em">
```

- 첫번째 스타일시트 선언은 미디어 유형이나 미디어 쿼리를 제공하지 않았기 때문에 모든 경우에 적용됩니다. 즉, 항상 렌더링을 차단합니다.
- 두번째 스타일시트 선언은 미디어 유형을 `all`로 설정되었습니다. 첫뻔째와 두번째는 사실상 똑같아서 두번째 스타일시트 또한 항상 렌더링을 차단합니다.
- 세번째 스타일시트 선언은 미디어 유형을 사용헙니다. 콘텐츠가 인쇄될 때만 적용되어 처음 로드될 때 페이지 렌더링이 차단되지 않습니다.
- 네번째 스타일시트 선언은 미디어 쿼리를 `orientation:landscape`로 설정되었습니다. 기기의 방향이 가로일 때 렌더링을 차단합니다.
- 다섯번째 시트일시트 선언은 미디어 쿼리를 `min-width: 40em`로 설정되었습니다. 기기의 너비의 조건이 일치하면 렌더링을 차단합니다.

렌더링 차단은 페이지의 초기 렌더링을 보류만 할 뿐 항상 다운로드합니다. 즉, 어느 경우든지 비차단 리소스의 우선순위가 낮더라도 브라우저는 여전히 CSS 리소스를 다운로드합니다.

## JavaScript
기본적으로, 자바스크립트는 파서 차단 리소스(parser blocking resource)입니다. 자바스크립트를 사용하면 콘텐츠, 스타일, 사용자와의 상호작용 등 거의 모든 것을 수정할 수 있습니다. 그렇기 때문에 자바스크립트는 DOM 생성을 차단하고 페이지 렌더링을 지연시킬 수도 있습니다.

최적화하기 위해서 자바스크립트를 비동기로 설정하고, Critical Rendering Path에서 불필요한 자바스크립트를 제거해야 합니다.

Critical Rendering Path에서 불필요한 자바스크립트를 제거는 코드 최적화에 가깝습니다. 이번 포스트에서는 브라우저의 도움을 받을 수 있는 비동기 설정 방법에 초점을 두었습니다.

비동기 설정 방법을 이야기하기 전에 비동기 설정을 해야하는 이유인 자바스크립트의 종속성에 대해 이야기 하도록 하겠습니다.

### JavaScript와 HTML의 종속성
자바스크립트는 DOM 노드와 CSS 스타일을 수정할 수 있는 강력한 기능과 유연성을 보여줍니다. 하지만 페이지의 렌더링 방식과 시기에 있어 많은 제한이 있습니다.

```css
/* style.css */
body { font-size: 16px }
p { font-weight: bold }
span { color: red }
p span { display: none }
img { float: right }
```

```html
<!-- index.html -->
<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <link href="style.css" rel="stylesheet">
    <title>Critical Path: Script</title>
  </head>
  <body>
    <p>Hello <span>web performance</span> students!</p>
    <script>
      var span = document.getElementsByTagName('span')[0];
      span.textContent = 'interactive'; // change DOM text content
      span.style.display = 'inline';  // change CSSOM property
      // create a new element, style it, and append it to the DOM
      var loadTime = document.createElement('div');
      loadTime.textContent = 'You loaded this page on: ' + new Date();
      loadTime.style.color = 'blue';
      document.body.appendChild(loadTime);
    </script>
  </body>
</html>
```

- 자바스크립트를 사용하면 DOM에 접근하여 화면에 표시되지 않는 `span` 노드를 가져올 수 있습니다. 숨겨진 노드는 렌더 트리에 표시되지 않지만 DOM에는 존재합니다. `textContent` 메소드를 통해 해당 텍스트를 변경할 수 있으며, display 속성을 `none`에서 `inline`으로 변경 할 수도 있습니다. 위의 예제는 `Hello interactive student!`가 표시됩니다.
- 자바스크립트를 사용하면 DOM에 새로운 노드를 추가, 제거, 수정 할 수 있습니다. 위의 예제의 자바스크립트에서 `div` 노드를 생성하고, 해당 텍스트를 설정하고, 스타일을 지정하고 추가합니다.

만약 위의 인라인 스크립트가 `span` 태그 위로 이동하면 `span` 노드를 찾을 수 없다고 에러가 발생하게 됩니다. 예를 들어 `getElementsByTagName('span')`는 `null`을 반환합니다. 이 현상은 자바스크립트가 문서에 삽입된 정확한 위치에서 실행된다는 것을 보여줍니다.

HTML 파서는 `script` 태그를 만나면 DOM 생성 프로세스를 중지하고 자바스크립트 엔진에 권한을 넘깁니다. 자바스크립트 엔진의 실행이 완료 된 후 브라우저가 중지했던 시점부터 DOM 생성을 다시 시작합니다.

`script` 태그의 뒷부분에서 정의된 어떠한 태그들도 아직 생성되지 않았기 때문에 노드를 찾을 수 없습니다. 또한 인라인 스크립트를 실행하면 DOM 생성이 차단되고, 이로 인해 초기 렌더링도 지연됩니다.

이러한 이유들로 인하여 자바스크립트는 화면에 그려지는 태그들이 모두 파싱된 후인 `body` 태그를 닫기 직전에 `script` 태그를 선언하는 것이 좋습니다.

### JavaScript와 CSS의 종속성
자바스크립트는 DOM 뿐만 아니라 CSSOM 속성도 읽고 수정할 수 있습니다. 위의 예시에서 `span` 노드의 display 속성을 `none`에서 `inline`으로 변경한 것이 CSSOM 속성을 수정한 것입니다.

CSS를 파싱하는 동안 자바스크립트에서 스타일 정보를 요청하는 경우, CSS가 파싱이 끝나지 않은 상태라면 자바스크립트 오류가 발생할 수 있습니다. CSS 파싱으로 생성되는 CSSOM 생성과, JavaScript에서 스타일 수정시 발생하는 CSSOM 수정 사이에 경쟁 조건(race condition)이 발생됩니다.

브라우저는 이 문제를 해결하기 위해 CSSOM을 생성하는 작업이 완료할 때까지 자바스크립트 실행 및 DOM 생성을 지연시킵니다. DOM, CSSOM, 자바스크립트 실행 간에 종속성 때문에 브라우저가 화면에 페이지를 처리하고 렌더링할 때 상당한 지연이 발생할 수 있습니다.

### 비동기 JavaScript
기본적으로, 자바스크립트 실행은 파싱을 중지시킵니다. HTML을 파싱하면서 `script` 태그를 만나면 DOM 생성을 중지시키고 자바스크립트 엔진에게 제어 권한을 넘겨 자바스크립트를 실행한 후, DOM 생성을 계속합니다.

```html
<!-- index.html -->
<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <link href="style.css" rel="stylesheet">
    <title>Critical Path: Script</title>
  </head>
  <body>
    <p>Hello <span>web performance</span> students!</p>
    <script src="app.js"></script>
  </body>
</html>
```

```js
// app.js
var span = document.getElementsByTagName('span')[0];
span.textContent = 'interactive'; // change DOM text content
span.style.display = 'inline';  // change CSSOM property
// create a new element, style it, and append it to the DOM
var loadTime = document.createElement('div');
loadTime.textContent = 'You loaded this page on: ' + new Date();
loadTime.style.color = 'blue';
document.body.appendChild(loadTime);
```

위에서 살펴본 인라인 스크립트 뿐만 아니라 위의 코드와 같이 `script` 태그를 통해 포함된 자바스크립트 역시 파싱을 중지시킵니다. 차이점이 있다면, `script` 태그를 사용하여 자바스크립트를 실행 할 경우, 서버에서 자바스크립트를 가져올 때까지 기다려야 합니다. 이로 인해 수십~수천 밀리초의 지연이 추가로 발생할 수 있습니다.

기본적으로 자바스크립트는 파서를 차단합니다. 스크립트가 페이지에서 무엇을 수행할지 모르기 때문에 브라우저는 최악의 시나리오를 가정하고 파서를 차단합니다. 브라우저에 자바스크립트를 바로 실행할 필요가 없음을 알려준다면, 브라우저는 계속해서 DOM을 생성할 수 있고 DOM 생성이 끝난 후에 자바스크립트를 실행 할 수 있을 것입니다.

이 때 사용할 수 있는 것이 비동기 자바스크립트입니다.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <link href="style.css" rel="stylesheet">
    <title>Critical Path: Script Async</title>
  </head>
  <body>
    <p>Hello <span>web performance</span> students!</p>
    <script src="app.js" async></script>
  </body>
</html>
```

위의 코드와 같이 단순히 `script` 태그에 `async` 속성을 추가해 주면 됩니다. `async` 속성을 `script` 태그에 추가하여 자바스크립트가 사용 가능해질 때까지 브라우저에게 DOM 생성을 중지하지 말라고 지시하는 것입니다.

## 리소스 우선순위 지정
브라우저에 전송되는 모든 바이트는 똑같이 중요한 것은 아닙니다. 브라우저는 가장 중요한 리소스(스크립트나 이미지보다 CSS 우선)를 우선 로드하기 위해 가장 중요하다 생각되는 리소스를 추측하여 로드합니다. 하지만 이런 방법은 항상 맞는 방법이 아닙니다. 브라우저에게 리소스의 우선순위를 전달해 주는 방법에 대해 이야기 하도록 하겠습니다. 

### preload 속성
현재 페이지에서 빠르게 가져와야 하는 리소스에 사용되는 속성입니다. `<link rel="preload">`는 브라우저에게 현재 리소스가 필요하며, 가능한 빨리 가져오기를 시도해야 한다고 알립니다.

```html
<link rel="preload" as="script" href="super-important.js">
<link rel="preload" as="style" href="critical.css">
```

위의 코드와 같이 사용하면 됩니다. `as` 속성을 사용하여 리소스의 유형을 알려줘야 합니다. 브라우저는 올바른 유형이 설정되어 있지 않으면 미리 가져온 리소스를 사용하지 않습니다.

`<link rel="preload">`는 브라우저가 반드시 리소스를 가져오게 만듭니다. 리소스를 두 번 가져오게 하거나, 필요하지 않는 것을 가져오지 하지 않도록 주의해야 합니다.

![preload 경고](/assets/img/posts/browser/res_prio_timeout.png)

`<link rel="preload">`를 이용하여 리소스를 가져왔지만 현재 페이지에서 3초 내로 사용되지 않는 리소스는 위의 그림과 같은 경로가 출력 됩니다.

### prefetch 속성
미래에 필요할 수 있는 리소스를 가져와야 할 때 사용되는 속성입니다. `<link rel="prefetch">`는 현재 페이지 로딩이 마치고 사용 가능한 대역폭(bandwidth)이 있을 때(다운 받을 여유가 생겼을 때?) 가장 낮은 우선순위로 리소스를 가져옵니다.

`prefetch`는 사용자가 다음에 할 행동을 미리 준비합니다. 예를 들어, 현재 페이지가 1페이지 라면,

```html
<link rel="prefetch" href="page-2.html">
```

위의 코드와 같이 사용하여 2페이지를 먼저 가져와 준비합니다. 주의 할 점은 위의 코드와 같이 사용하였더라도 `page-2.html`의 HTML만 가져왔지 `page-2.html`에 필요한 리소스는 가져오지 않는다는 것입니다.

# Critical Rendering Path 측정하기
Critical Rendering Path 과정을 크롬의 DevTools로 확인 할수 있습니다. DevTools의 Performance 탭에서 렌더링 성능을 측정할 수 있습니다.

## 타임스탬프
렌더링 성능을 측정하기 전에 몇가지 중요한 타임스탬프(특정 시점)를 살펴보도록 하겠습니다.

![이벤트](/assets/img/posts/browser/dom_navtiming.png)

- `domLoading`: 전체 프로세스의 시작 타임스탬프입니다. 브라우저가 처음 수신한 HTML 문서 바이트의 파싱을 시작하려고 합니다.
- `domInteractive`: 브라우저가 파싱을 완료한 시점입니다. 모든 HTML 및 DOM 생성이 완료되었습니다.
- `domContentLoaded`: DOM이 준비되고 자바스크립트 실행을 차단하는 스타일시트가 없는 시점을 표시합니다. DOM과 CSSOM이 모두 준비 된 상태로 렌더 트리를 생성할 수 있는 시점입니다.
  - 많은 자바스크립트 프레임워크는 자체 로직을 실행하기 전에 이 이벤트(타임스탬프)를 기다립니다. 이런 이유로 브라우저는 `EventStart`와 `EventEnd` 타임스탬프를 캡처합니다. 이 타임스탬프를 통해 실행이 얼마나 오래 걸렸는지 추적할 수 있습니다.
- `domComplete`: 페이지의 모든 리소스(이미지 등) 다운로드가 완료된 시점을 표시합니다.
- `loadEvent`: 페이지 로드의 마지막 단계로, 브라우저가 추가 애플리케이션 로직을 트리거 할 수 있는 onload 이벤트를 발생시킵니다.

위의 타임스탬프 중 `domContentLoaded`와 `loadEvent`는 이후의 렌더링 성능 측정을 이야기 할 때 언급되기 때문에 기억해 둡시다.

## 렌더링 과정 살펴보기

## 최적화 차이 살펴보기

### async 유무의 차이

### preload와 prefetch 차이

# 요약
#### CSS 최적화
- 미디어 유형, 미디어 쿼리를 사용합니다.

#### JavaScript 최적화
- `body` 태그 닫기 직전 `<script>` 태그를 선언합니다.
- `<script ... async>`와 같이 `async` 속성을 사용합니다.

#### 리소스 우선순위 지정
- 현재 페이지에서 빠르게 가져와야 하는 리소스에 `<link rel="preload">`와 같이 `preload` 속성을 사용합니다.
- 미래에 사용할 수 있는 리소스는 `<link rel="prefetch">`와 같이 `prefetch` 속성을 사용합니다.

#### 참고
- [https://developers.google.com/web/fundamentals/performance/critical-rendering-path?hl=ko](https://developers.google.com/web/fundamentals/performance/critical-rendering-path?hl=ko)
- [https://developers.google.com/web/fundamentals/performance/resource-prioritization?hl=ko](https://developers.google.com/web/fundamentals/performance/resource-prioritization?hl=ko)
- [https://blog.asamaru.net/2017/05/04/understanding-the-critical-rendering-path/](https://blog.asamaru.net/2017/05/04/understanding-the-critical-rendering-path/)
- [https://d2.naver.com/helloworld/59361](https://d2.naver.com/helloworld/59361)
- [https://blog.asamaru.net/2017/05/04/script-async-defer/](https://blog.asamaru.net/2017/05/04/script-async-defer/)
- [https://medium.com/@koh.yesl/preload-prefetch-and-priorities-in-chrome-15d77326f646](https://medium.com/@koh.yesl/preload-prefetch-and-priorities-in-chrome-15d77326f646)