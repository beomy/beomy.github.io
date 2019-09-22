---
layout: post
title: '[Browser] 브라우저 구조'
featured-img: javascript/js.png
category: [tech, etc]
---
{% include toc.html %}

# DOM

# CSSOM

# 파서
토큰을 사용함, 알고리즘은 State Machine을 사용함

# 스크립트와 스타일시트의 진행 순서

## 스크립트
`<script>` 태그를 만나면 즉시 파싱하고 실행한다. 스크립트가 실행되는 동안 문서의 파싱은 중단된다.
스크립트를 `defer`로 표시하면, 문서 파싱은 중단되지 않고 문서 파싱이 오나료된 이후에 스크립트가 실행된다.
HTML5는 스크립트를 비동기로 처리하는 속성을 추가했기 때문에 별도의 맥락에 의해 파싱되고 실행된다.

`defer`와 `async` 차이?
- [https://blog.asamaru.net/2017/05/04/script-async-defer/](https://blog.asamaru.net/2017/05/04/script-async-defer/)

## 스타일시트
스타일시트는 DOM 트리를 변경하지 않기 때문에 문서 파싱을 기다리거나 중단 할 이유가 없다.
그러나 스크립트가 스타일 정보를 요청하는 경우, 스타일이 파싱되지 않는 상태라면 스크립트 에러가 발생할 수 있다. 이런 문제를 해결하기 위해 파이어폭스는 로드 중이거나 파싱 중인 스타일 시트가 있는 경우 모든 스크립트의 실행을 중지한디. 한편 웹킷은 로드되지 않은 스타일 시트 가운데 문제가 될 만한 속성이 있을 때에만 스크립트를 중단한다.

# 렌더 트리 구축
DOM 트리가 구축되는 동안 브라우저는 렌더 트리를 구축한다.
표시해야 할 순서로 내용을 그려낼 수 있도록 하기 위해 렌더 트리를 구축한다.

파이어폭스는 렌더 트리의 구성 요소를 형상(frames)라고 부르고 웹킷은 렌더러(renderer) 또는 렌더 객체(render object)라는 용어를 사용한다.

# DOM 트리와 렌더 트리의 관계
`head` 요소와 같은 비시각적 DOM 요소는 렌더 트리에 추가되지 않는다.

# 트리를 구축하는 과정
파이어폭스는 형상 만들기를 `FrameConstructor`에 위임하고 `FrameConstructor`는 스타일을 결정하여 형상을 만든자

웹킷에서는 스타일을 결정하고 렌더러를 만드는 과정을 attachment라고 부른다. 모든 DOM 노드에서 `attach` 메소드가 았다. attatchment는 동기적으로 DOM 트리에 노드를 추가하면서 새 노드의 `attach` 메소드를 호출한다.

# 스타일 계산


#### 참고
- [https://janghanboram.github.io/2018/06/06/browser-rendering/](https://janghanboram.github.io/2018/06/06/browser-rendering/)
- [https://d2.naver.com/helloworld/59361](https://d2.naver.com/helloworld/59361)
- [http://taligarsiel.com/Projects/howbrowserswork1.htm#Render_tree_construction](http://taligarsiel.com/Projects/howbrowserswork1.htm#Render_tree_construction)
- [https://grosskurth.ca/papers/browser-refarch.pdf](https://grosskurth.ca/papers/browser-refarch.pdf)
- [https://yilpe93.github.io/2018/06/18/etc/web-browser/](https://yilpe93.github.io/2018/06/18/etc/web-browser/)
- [https://sangbui.com/sb-files/BrowserArchitecture_ClientSide.pdf](https://sangbui.com/sb-files/BrowserArchitecture_ClientSide.pdf)
- [https://medium.com/@monica1109/how-does-web-browsers-work-c95ad628a509](https://medium.com/@monica1109/how-does-web-browsers-work-c95ad628a509)
- [https://developers.google.com/web/fundamentals/performance/critical-rendering-path?hl=ko](https://developers.google.com/web/fundamentals/performance/critical-rendering-path?hl=ko)