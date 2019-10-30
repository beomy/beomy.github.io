---
layout: post
title: '[Browser] 브라우저 렌더링'
featured-img: browser/browser.png
category: [tech, browser]
---
{% include toc.html %}

이번 포스트에서는 브라우저가 화면을 렌더링 하는 과정에 대해 이야기 할 것입니다. 렌더링 과정을 이해하면 웹페이지의 렌더링 최적화에 도움이 될 수 있겠죠? 렌더링 최적화 방법은 [[Browser] Critical Rendering Path 최적화](/tech/browser/critical-rendering-path)에서 다룰 예정입니다.

# 브라우저 구조
브라우저의 렌더링 과정을 이야기 하기 전에 브라우저의 구조를 잠시 살펴보겠습니다.

![브라우저 구조](/assets/img/posts/browser/browser_architecture.png)

- User Interface: 주소 표시줄, 이전/다음 버튼, 북마크 메뉴 등. 요청한 페이지를 보여주는 창을 제외하 나머지 모든 부분
- Browser Engine: User Interface와 Rendering Engine 사이의 동작을 제어
- Rendering Engine: 요청한 콘텐츠를 표시, HTML을 요쳥하면 HTML과 CSS를 파싱하여 화면에 표시함
- Networking: HTTP 요청과 같은 네트워크 호출에 사용됨
- Javascript Interpreter(또는 Engine): 자바스크립트 코드를 해석하고 실행함. 크롬에서는 [V8 엔진]({{ site.url }}/tech/javascript/javascript-runtime/#자바스크립트-엔진-v8)을 사용함 
- Display Backend: 기본적인 위젯(콤보 박스 등..)을 그림
- Data Persistence: Local Storage, 쿠키 등 클라이언트 사이드에서 데이터를 저장하는 영역

구조는 브라우저마다 조금씩 다를 수 있습니다.

|파이어폭스 브라우저|크롬 브라우저|
|:--:|:--:|
|![파이어폭스 구조](/assets/img/posts/browser/firefox_architecture.png)|![크롬 구조](/assets/img/posts/browser/chrome_architecture.png)|

파이어폭스 브라우저와 크롬 브라우저의 구조는 위의 그림과 같이 차이가 있습니다. 이번 포스트에서는 브라우저의 구조에서 렌더링 엔진에 대해 이야기 할 것입니다.

# 렌더링 엔진
렌더링 엔진의 역할은 요청 받은 내용을 브라우저 화면에 나타내는 일입니다. HTML, CSS, JavaScript 등의 파일을 브라우저가 화면에 표시 할 수 있도록 변환하여 픽셀 단위로 나타냅니다.

## 렌더링 엔진들
브라우저 마다 사용하는 렌더링 엔진들이 다릅니다. 렌더링 엔진이 브라우저 마다 다르기 때문에, 같은 소스가 브라우저 마다 다르게 그려지는 크로스 브라우징 이슈가 발생하게 됩니다.(자바스크립트 엔진이 달라 발생하기도 합니다.)

|브라우저|렌더링 엔진|
|:--:|:--:|
|IE|Trident|
|Edge|EdgeHTML, Blink|
|Chrome|Webkit, Blink(버전 28 이후)|
|Safari|Webkit|
|FireFox|Gecko|

크롬 브라우저(정확히는 크로미움은)는 사파리 브라우저에서 사용하는 Webkit을 사용하다가 버전 28 이후 Webkit 소스를 Fork하여 Blink 엔진을 만들어 사용하고 있습니다.

### 참고: 크로미움이란?
크롬은 크로미움 기반으로 만들어진 브라우저라는 이야기를 많이 들어보셨을 것입니다.

[크로미움](https://ko.wikipedia.org/wiki/크로미엄_(웹_브라우저))은 딱 들었을 때, 이해하기 어려운 엔진일 것 같다라는 느낌이 들지만(~~내부를 이해하는 것은 어렵겠지만..~~) 단순한 오픈 소스 웹 브라우저입니다. [https://chromium.woolyss.com/download/ko/](https://chromium.woolyss.com/download/ko/)에서 다운 받아 브라우저로 사용할 수도 있습니다.

크로미움은 V8이라는 자바스크립트 엔진과 Blink라는 렌더링 엔진을 사용하는 브라우저입니다. 크롬이 크로미움 기반으로 만들어졌다는 것은 오픈 소스인 크로미움 브라우저 코드 위에 살을 덧붙여 개발되었다는 의미입니다.

크로미움 기반의 크롬이 절반 이상 점유율을 차지하고 있습니다([브라우저 점유율](https://www.koreahtml5.kr/front/stats/browser/browserUseStats.do) 참고). 이제는 Edge 브라우저도 크로미움 기반의 브라우저가 되었습니다. Edge 브라우저가 사용하던 EdgeHTML 렌더링 엔진을 포기하고 크로미움 기반의 브라우저를 만들겠다고 발표를 했습니다.([Edge 브라우저의 크로미움 도입 발표](https://blogs.windows.com/windowsexperience/2018/12/06/microsoft-edge-making-the-web-better-through-more-open-source-collaboration/) 참고)

## 동작 과정 요약
렌더링 엔진은 요청한 문서의 내용을 얻는 것에서 시작합니다. 문서는 보통 8KB 단위로 전송됩니다.

![렌더링 엔진 동작 과정 요약](/assets/img/posts/browser/rendering_engine_process_summary.png)

위의 그림은 렌더링 엔진의 기본 동작 과정을 나타낸 그림입니다.

렌더링 엔진은 HTML 문서를 파싱하여 DOM 트리를 만들고, CSS 문서를 파싱하여 CSSOM 트리를 만듭니다. DOM과 CSSOM을 이용하여 렌더 트리를 만듭니다.

렌더 트리 생성이 끝나면 Layout(Reflow라고도 합니다)이 시작됩니다. 이 과정은 각 노드가 화면의 정확한 위치에 표시하기 위해 위치와 크기를 계산하는 과정을 말합니다.  마지막으로 계산된 위치과 크기 등의 스타일들이 실제 픽셀로 표현하는 과정을 Paint(Rasterizing라고도 합니다.)라고 합니다.
₩
## 동작 과정 상세
![웹킷 렌더링 엔진 동작 과정](/assets/img/posts/browser/webkit_rendering_engine_process.png)

위의 그림은 Webkit의 렌더링 동작 과정입니다. 위의 렌더링 동작 과정을 간략히 이야기하면,

1. <span style="background: #FFC000;">HTML</span>을 <span style="background: #5B9BD5;">파싱</span>하여 DOM 노드를 만드는데, <span style="background: #A5A5A5;">DOM 노드들을 병합</span> <span style="background: #70AD47;">DOM 트리</span>를 만듭니다.
2. <span style="background: #FFC000;">CSS</span>를 <span style="background: #5B9BD5;">파싱</span>하여, <span style="background: #70AD47;">스타일 규칙</span>을 만듭니다.
3. <span style="background: #70AD47;">DOM 트리</span>와 <span style="background: #70AD47;">스타일 규칙</span>을 사용하여, <span style="background: #5B9BD5;">Attachment</span> 라는 과정을 통해 <span style="background: #70AD47;">Render 트리</span>를 생성합니다.
4. <span style="background: #70AD47;">Render 트리</span>를 <span style="background: #5B9BD5;">배치(Layout)</span>합니다.
5. <span style="background: #70AD47;">Render 트리</span>를 화면에 <span style="background: #5B9BD5;">그립(Painting)</span>니다.

위의 5가지 과정을 통해 브라우저는 렌더링을 합니다. (색깔 별로 위의 그림의 과정을 표시했습니다.)

![게코 렌더링 엔진 동작 과정](/assets/img/posts/browser/gecko_rendering_engine_process.png)

위의 그림은 Gecko의 렌더링 동작 과정입니다.

Webkit과 Gecko는 용어가 약간 다르지만 렌더링 과정은 유사합니다.

|Webkit|Gecko|설명|
|:----:|:---:|:-:|
|Render Tree|Frame Tree|렌더링 되는 노드 트리|
|Render Object|Frame|렌더링 되는 노드|
|Layout|Reflow|렌더링 되는 노드를 배치하는 과정|
|Attachment|Frame Constructor|렌더링 되는 노드 트리를 만드는 과정|
|-|Content Sink|DOM 노드를 만드는 과정|

Webkit과 Gecko는 위의 표 정도의 차이를 가지고 있습니다.

# Parser
파싱은 서버로 부터 전송 받은 문서의 문자열을 브라우저가 이해할 수 있는 구조로 변환하는 과정을 파싱이라고 합니다. 파싱 결과는 문서 구조를 나타내는 노드 트리인데, 파싱 트리(parse tree) 또는 문법 트리(syntax tree) 라고 합니다.

## DOM(Documnet Object Model)
![DOM 파싱 요약](/assets/img/posts/browser/dom_parsing_summary.png)

위의 그림은 [동작 과정 상세]({{ site.url }}/tech/browser/browser-rendering/#동작-과정-상세)에서 이야기한 DOM을 파싱하는 과정입니다. 이 과정에 대해 좀 더 자세히 이야기 하도록하겠습니다.

![DOM Parsing](/assets/img/posts/browser/dom_parsing.png)

1. 변환(Conversion): HTML의 원시 바이트(raw bytes)를 읽어와 해당 파일에 지정된 인코딩(UTF-8 등...)에 따라 문자열로 변환하는 과정입니다.
2. 토큰화(Tokenizing): 문자열을 [W3C HTML5 표준](http://www.w3.org/TR/html5/)에 따라 고유 토큰(`<html>`, `<body>`등, 꺽쇠괄호로 묶인 문자열)으로 변환합니다. 각 코든은 특별한 의미와 고유한 규칙을 가집니다.
3. 렉싱(Lexing): 토큰을 해당 속성 및 규칙을 정의한 객체(Nodes)로 변환합니다.
4. DOM 생성(Dom construction): HTML은 상위-하위 관계로 정의할 수 있어, 트리 구조로 나타낼 수 있습니다. 렉싱과정을 거쳐 생성된 노드들을 트리 구조로 변환합니다.

![DOM Tree](/assets/img/posts/browser/dom_tree.png)

위에서 이야기한 4가지 과정을 모두 거치면 위의 그림과 같은 트리 형태의 DOM이 만들어집니다. 브라우저는 이후 모든 페이지 처리를 이 DOM을 사용합니다.

## CSSOM(CSS Object Model)
![CSS 파싱 요약](/assets/img/posts/browser/css_parsing_summary.png)

이번에는 위의 그림과 같이 CSS를 파싱하는 부분을 이야기 하도록 하겠습니다. 

![CSSOM 생성](/assets/img/posts/browser/cssom_construction.png)

위의 그림과 같이 DOM을 생성하는 과정 그대로 CSSOM을 생성합니다.

브라우저는 DOM을 생성하는 동안 외부 CSS를 참조하는 `<link>` 태그를 만나게 되면 브라우저에 리소스를 요청합니다. CSS의 원시 바이트(raw bytes)가 문자열로 변환된 후 차례로 토큰과 노드로 변환되고 마지막으로 CSSOM(CSS Object Model)이라는 트리 구조를 만듭니다.

![CSSOM Tree](/assets/img/posts/browser/cssom_tree.png)

CSSOM이 트리 구조를 가지는 이유는 하향식으로 규칙을 적용하기 때문입니다. 최종 스타일을 계산할 때 브라우저는 해당 노드에 적용 가능한 가장 일반적인 규칙으로 시작해 더 구체적인 규칙을 적용하는 방식입니다.

위의 CSSOM 트리 그림을 보시면 하양식 규칙 적용을 좀 더 쉽게 이해 할 수 있습니다. `body` 태그 내에 있는 `span` 태그 안에 포함된 텍스트의 크기는 16px이고 색상은 빨간색입니다. 하지만 `span` 태그가 `p` 태그의 하위인 경우 해당 콘텐츠는 표시되지 않습니다.

### 참고: JavaScript와 CSS
HTML과 CSS, 자바스크립트를 파싱하여 렌더 트리를 형성하고 화면에 그리는 과정을 최적화 하면 브라우저의 렌더링 속도를 높여 사용성을 개선할 수 있습니다. 자바스크립트와 CSS가 렌더링 과정에 어떤 영향을 미치는지 살펴보도록 하겠습니다.

#### JavaScript
자바스크립트는 파서 차단 리소스(parser blocking resource)입니다. 브라우저는 문서를 파싱하다가 자바스크립트를 만나면 진행하던 파싱을 중지하고 자바스크립트 엔진에게 권한을 넘겨 자바스크립트를 파싱하고 실행합니다.

자바스크립트가 실행되는 동안 문서의 파싱은 중단됩니다. 자바스크립트는 파싱을 중단시키기 때문에, 보통 자바스크립트를 `<head>` 태그가 아닌 `<body>` 태그가 닫히기 바로 전에 사용되도록 하는 것이 좋습니다.

`<script>` 태그에 `defer` 속성을 주면, 문서 파싱은 중단되지 않고 문서 파싱이 완료된 이후에 자바스크립트가 실행됩니다.
HTML5에서 스크립트를 비동기(`async`)로 처리하는 속성이 추가되었습니다. 자바스크립트가 별도의 맥락에 의해 파싱되고 실행된다.

[defer와 async 차이](https://blog.asamaru.net/2017/05/04/script-async-defer/)에서 `defer` 속성과 `async` 속성의 차이를 확인 하실 수 있습니다.

#### CSS
CSS는 렌더링 차단 리소스(render blocking resource)입니다.

CSS는 DOM 트리를 변경하지 않기 때문에 문서 파싱을 기다리거나 중단할 이유가 없습니다. 그러나 자바스크립트에서 스타일 정보를 요청하는 경우, CSS가 파싱되지 않은 상태라면 스크립트 에러가 발생 할 수 있습니다.

이런 문제를 해결하기 위해 파이어폭스는 로드 중이거나 파싱 중인 CSS가 있는 경우 모든 자바스크립트 실행을 중지합니다. 반면 웹킷은 로드되지 않은 CSS 가운데 문제가 될 만한 속성이 있을 때에만 자바스크립트를 중단합니다.

# Attachment
CSSOM 트리와 DOM 트리를 결합하여, 표시해야 할 순서로 내용을 그려낼 수 있도록 하기 위해 렌더 트리를 형성합니다. 이 과정을 웹킷에서는 Attachment라고 합니다. 렌더 트리는 화면에 표시되는 각 요소의 위치를 계산하는 레이아웃에 사용되고 픽셀을 화면에 그리는 페인트 과정에도 사용됩니다.

## 렌더 트리 구축
![Attachment 요약](/assets/img/posts/browser/attachment_summary.png)

위의 그림의 attachment 과정을 이야기 하도록 하겠습니다. 브라우저가 DOM 및 CSSOM을 렌더 트리에 결합합니다. 렌더 트리는 페이지에 표시되는 모든 DOM 콘텐츠와 각 노드에 대한 모든 CSSOM 스타일 정보를 가집니다.

![Render Tree 형성](/assets/img/posts/browser/render_tree_construction.png)

렌더 트리를 생성하려면 브라우저는 대략 3가지 작업을 수행합니다.

1. DOM 트리의 루트에서 시작하여 화면에 표시되는 노드 각각을 탐색합니다.
- 화면에 표시되지 않는 일부 노드들(`script`, `meta` 태그 등..)은 렌더 트리에 반영되지 않습니다.
- CSS에 의해 화면에서 숨겨지는 노드들은 렌더 트리에 반영되지 않습니다. 예를 들면 위의 예시에서 `span` 노드의 경우 `display:none`이 설정되기 때문에 렌더 트리에 반영되지 않습니다.
2. 화면에 표시되는 각 노드에 대해 적절하게 일치하는 CSSOM 규칙을 찾아 적용합니다.
3. 화면에 표시되는 노드를 콘텐츠 및 계산된 스타일과 함께 내보냅니다.

## DOM 트리와 렌더 트리의 관계
렌더 트리 구축의 1번에서 잠깐 이야기 한 것처럼 화면에 표시되지 않는 노드들은 렌더 트리에 포함되지 않습니다. 예를 들어, `head` 요소와 같은 비시각적 DOM 요소는 렌더 트리에 추가되지 않습니다.

뿐만 아니라 CSS로 인해 `display` 속성에 `none` 값이 할당 된 노드들을 렌더 트리에 추가되지 않습니다. 하지만, `visibility:hidden`은 렌더 트리에 포함됩니다. `visibility` 속성에 `hidden` 값이 할당 된 노드는 화면에 공간을 차지하기 때문에 렌더 트리에 포함됩니다.

# Layout
![Layout 요약](/assets/img/posts/browser/layout_summary.png)

렌더 트리가 생성되고, 기기의 뷰포트 내에서 렌더 트리의 노드가 정확한 위치와 크기를 계산하는 과정을 Layout(혹은 Reflow)라고 합니다. 모든 상대적인 측정값은 화면에서 절대적인 픽셀로 변환됩니다. 즉 CSS에 상대적인 값인 %로 할당 된 값들은 절대적인 값은 px단위로 변환 됩니다.

# Painting
![Painting 요약](/assets/img/posts/browser/painting_summary.png)

렌더 트리의 각 노드를 화면의 실제 픽셀로 나타내는 과정을 Painting(혹은 rasterizing)라고 합니다. Painting 과정 후 브라우저 화면에 UI가 나타나게 됩니다.

# 요약
지금까지 이야기 했던 내용들을 핵심만 요약하여 5가지로 정리해 보면,

1. HTML 마크업을 처리하고 DOM 트리를 빌드합니다. (DOM 파싱)
2. CSS 마크업을 처리하고 CSSOM 트리를 빌드합니다. (CSS 파싱)
3. DOM 및 CSSOM을 결합하여 렌더 트리를 형성합니다. (Attachment)
4. 렌더 트리에서 레이아웃을 실행하여 각 노드의 기하학적 형태를 계산합니다. (Layout)
5. 개별 노드를 화면에 페인트합니다. (Painting)

위의 5단계를 걸처 브라우저는 화면에 렌더링하게 됩니다.

#### 참고
- [https://developers.google.com/web/fundamentals/performance/critical-rendering-path?hl=ko](https://developers.google.com/web/fundamentals/performance/critical-rendering-path?hl=ko)
- [https://janghanboram.github.io/2018/06/06/browser-rendering/](https://janghanboram.github.io/2018/06/06/browser-rendering/)
- [https://d2.naver.com/helloworld/59361](https://d2.naver.com/helloworld/59361)
- [http://taligarsiel.com/Projects/howbrowserswork1.htm#Render_tree_construction](http://taligarsiel.com/Projects/howbrowserswork1.htm#Render_tree_construction)
- [https://grosskurth.ca/papers/browser-refarch.pdf](https://grosskurth.ca/papers/browser-refarch.pdf)
- [https://yilpe93.github.io/2018/06/18/etc/web-browser/](https://yilpe93.github.io/2018/06/18/etc/web-browser/)
- [https://sangbui.com/sb-files/BrowserArchitecture_ClientSide.pdf](https://sangbui.com/sb-files/BrowserArchitecture_ClientSide.pdf)
- [https://medium.com/@monica1109/how-does-web-browsers-work-c95ad628a509](https://medium.com/@monica1109/how-does-web-browsers-work-c95ad628a509)
- [https://blog.lgcns.com/1911](https://blog.lgcns.com/1911)
- [https://cisctbd.github.io/Report.pdf](https://cisctbd.github.io/Report.pdf)
- [https://blog.asamaru.net/2017/05/04/understanding-the-critical-rendering-path/](https://blog.asamaru.net/2017/05/04/understanding-the-critical-rendering-path/)