---
layout: post
title: '[Browser] 브라우저 렌더링'
featured-img: etc/browser.png
category: [tech, etc]
---
{% include toc.html %}

이번 포스트에서는 브라우저에서 화면을 렌더링 하는 과정에 대해 이야기 할 것입니다. 브라우저의 렌더링 과정을 이해하면 웹페이지의 렌더링 최적화에 도움이 될 수 있겠죠? 렌더링 최적화 방법은 Critical Rendering Path에서 다룰 예정입니다.

[developers.google.com](https://developers.google.com/web?hl=ko)를 많은 부분 참고하여 작성 되었습니다. (크롬 브라우저의 렌더링과 그 외 브라우저의 렌더링 개념이 혼제되었을 수 있습니다...)

# 브라우저 구조
브라우저의 렌더링 과정을 이야기 하기 전에 브라우저의 구조를 잠시 살펴보겠습니다.

![브라우저 구조](/assets/img/posts/etc/browser_architecture.png)

- User Interface: 주소 표시줄, 이전/다음 버튼, 북마크 메뉴 등. 요청한 페이지를 보여주는 창을 제외하 나머지 모든 부분
- Browser Engine: 사용자 인터페이스와 렌더링 엔진 사이의 동젝을 제어
- Rendering Engine: 요청한 콘텐츠를 표시, HTML을 요쳥하면 HTML과 CSS를 파신하여 화면에 표시함
- Networking: HTTP 요청과 같은 네트워크 호출에 사용됨
- Javascript Interpreter(Engine): 자바스크립트 코드를 해석하고 실행함. 크롬에서는 [V8 엔진]({{ site.url }}/tech/javascript/javascript-runtime/#자바스크립트-엔진-v8)을 사용함 
- Display Backend: 기본적인 위젯(콤보 박스 등..)을 그림
- Data Persistence: Local Storage, 쿠키 등 클라이언트 사이드에서 데이터를 저장하는 영역

위의 그림의 브라우저 구조는 브라우저마다 조금씩 다를 수 있습니다.

|파이어폭스 브라우저|크롬 브라우저|
|:--:|:--:|
|![브라우저 구조](/assets/img/posts/etc/browser_architecture.png)|![브라우저 구조](/assets/img/posts/etc/browser_architecture.png)|

# 렌더링 엔진

## 렌더링 엔진들
- Blink: 크롬, 엣지, 웨일
- Webkit: 사파리
- Gecko: 파이어폭스

## 동작 과정
~~ 요약 그림 ~~

## 동작 과정 예
~~ 웹킷 그림 ~~

~~ Gecko 그림 ~~

# Parser
토큰을 사용함, 알고리즘은 State Machine을 사용함

## DOM
~~ DOM 파싱 부분 그림 ~~

~~ 구글의 DOM 생성 그림 ~~

1. 변환(Conversion)
2. 토큰화(Tokenizing)
3. 렉싱(Lexing)
4. DOM 생성(Dom construction)

~~ 구글의 DOM 트리 그림 ~~

## CSSOM

~~ 구글의 CSSOM 생성 그림 ~~

~~ CSSOM 트리 그림 ~~

## 참고: JavaScript와 CSS

### JavaScript
JavaScript는 파서 차단 리소스(parser blocking resource)

`<script>` 태그를 만나면 즉시 파싱하고 실행한다. 스크립트가 실행되는 동안 문서의 파싱은 중단된다.
스크립트를 `defer`로 표시하면, 문서 파싱은 중단되지 않고 문서 파싱이 오나료된 이후에 스크립트가 실행된다.
HTML5는 스크립트를 비동기로 처리하는 속성을 추가했기 때문에 별도의 맥락에 의해 파싱되고 실행된다.

`defer`와 `async` 차이?
- [https://blog.asamaru.net/2017/05/04/script-async-defer/](https://blog.asamaru.net/2017/05/04/script-async-defer/)

### CSS
CSS는 렌더링 차단 리소스(render blocking resource)

스타일시트는 DOM 트리를 변경하지 않기 때문에 문서 파싱을 기다리거나 중단 할 이유가 없다.
그러나 스크립트가 스타일 정보를 요청하는 경우, 스타일이 파싱되지 않는 상태라면 스크립트 에러가 발생할 수 있다. 이런 문제를 해결하기 위해 파이어폭스는 로드 중이거나 파싱 중인 스타일 시트가 있는 경우 모든 스크립트의 실행을 중지한디. 한편 웹킷은 로드되지 않은 스타일 시트 가운데 문제가 될 만한 속성이 있을 때에만 스크립트를 중단한다.

# Attechment

## 렌더 트리 구축
DOM 트리가 구축되는 동안 브라우저는 렌더 트리를 구축한다.
표시해야 할 순서로 내용을 그려낼 수 있도록 하기 위해 렌더 트리를 구축한다.

파이어폭스는 렌더 트리의 구성 요소를 형상(frames)라고 부르고 웹킷은 렌더러(renderer) 또는 렌더 객체(render object)라는 용어를 사용한다.

## DOM 트리와 렌더 트리의 관계
`head` 요소와 같은 비시각적 DOM 요소는 렌더 트리에 추가되지 않는다.

## 트리를 구축하는 과정
파이어폭스는 형상 만들기를 `FrameConstructor`에 위임하고 `FrameConstructor`는 스타일을 결정하여 형상을 만든자

웹킷에서는 스타일을 결정하고 렌더러를 만드는 과정을 attachment라고 부른다. 모든 DOM 노드에서 `attach` 메소드가 았다. attatchment는 동기적으로 DOM 트리에 노드를 추가하면서 새 노드의 `attach` 메소드를 호출한다.

# Layout
렌더 트리가 생성되고, 기기의 뷰포트 내에서 렌더 트리의 노드가 정확한 위치와 크기를 계산하는 과정을 Layout(혹은 Reflow)라고 한다.

모든 상대적인 측정값은 화면에서 절대적인 픽셀로 변환된다.

# Painting
렌더 트리의 각 노드를 화면의 실제 픽셀로 나타내는 과정을 Paint(혹은 rasterizing)라고 한다.

# 요약
1. HTML 마크업을 처리하고 DOM 트리를 빌드합니다.
2. CSS 마크업을 처리하고 CSSOM 트리를 빌드합니다.
3. DOM 및 CSSOM을 결합하여 렌더링 트리를 형성합니다.
4. 렌더링 트리에서 레이아웃을 실행하여 각 노드의 기하학적 형태를 계산합니다.
5. 개별 노드를 화면에 페인트합니다.

#### 참고
- [https://janghanboram.github.io/2018/06/06/browser-rendering/](https://janghanboram.github.io/2018/06/06/browser-rendering/)
- [https://d2.naver.com/helloworld/59361](https://d2.naver.com/helloworld/59361)
- [http://taligarsiel.com/Projects/howbrowserswork1.htm#Render_tree_construction](http://taligarsiel.com/Projects/howbrowserswork1.htm#Render_tree_construction)
- [https://grosskurth.ca/papers/browser-refarch.pdf](https://grosskurth.ca/papers/browser-refarch.pdf)
- [https://yilpe93.github.io/2018/06/18/etc/web-browser/](https://yilpe93.github.io/2018/06/18/etc/web-browser/)
- [https://sangbui.com/sb-files/BrowserArchitecture_ClientSide.pdf](https://sangbui.com/sb-files/BrowserArchitecture_ClientSide.pdf)
- [https://medium.com/@monica1109/how-does-web-browsers-work-c95ad628a509](https://medium.com/@monica1109/how-does-web-browsers-work-c95ad628a509)
- [https://developers.google.com/web/fundamentals/performance/critical-rendering-path?hl=ko](https://developers.google.com/web/fundamentals/performance/critical-rendering-path?hl=ko)
- [https://blog.lgcns.com/1911](https://blog.lgcns.com/1911)
- [https://cisctbd.github.io/Report.pdf](https://cisctbd.github.io/Report.pdf)