---
layout: post
title: '[JavaScript] 자바스크립트 런타임'
featured-img: javascript/js.png
category: [tech, javaScript]
---
{% include toc.html %}

이번 포스트에서는 자바스크립트 런타임의 동작 원리를 이야기 하도록 하겠습니다.

[런타임(runtime)](https://ko.wikipedia.org/wiki/런타임)이란 프로그래밍 언어가 구동되는 환경을 말합니다.(위키 링크를 보면 런타임 환경이라고 보시면 될 것 같습니다.) Node.js나 크롬 등의 여러 브라우저들은 자바스크립트가 구동되는 환경이기 때문에, Node.js나 브라우저들을 자바스크립트 런타임이라고 합니다.

# 싱글 스레드, 논-블로킹 언어: JavaScript
자바스크립트는 싱글 스레드, 논-블로킹 언어입니다. 자바스크립트에서 싱글 스레드는 무엇을 의미하는지, 논-블로킹은 무엇인지 알아 보도록 하겠습니다.

## 싱글 스레드
싱글 스레드는 하나의 힙 영역과 하나의 콜스택을 가집니다. 하나의 콜스택을 가진다는 의미는 한번에 한가지 일 밖에 하지 못한다는 의미입니다. 예를 들어 네트워크 요청을 한다면, 응답이 올 때까지 다른 일은 하지 못하고 마냥 기다릴 수 밖에 없습니다.

## 콜스택
[콜스택](https://ko.wikipedia.org/wiki/콜_스택)은 함수가 실행되는 순서를 기억하고 있습니다. 함수를 실행하려면 스택의 가장 위에 해당 함수를 넣게 되고, 함수에서 리턴이 일어나면 스택의 가장 위쪽에서 함수를 꺼냅니다. 간단한 코드 예제를 살펴보도록 하겠습니다.

### 콜스택 예제
![콜스택](/assets/img/posts/javascript/call_stack.gif)

### 콜스택 에러 메세지
에러를 디버깅하면서 콜스택을 보셨을 것입니다.

![에러 콜스택](/assets/img/posts/javascript/error_call_stack.png)

위의 그림과 같이 에러가 발생했을 때, 어떤 함수에서 에러가 발생했는지 로그로 보여주는데, 에러 로그에 출력되는 것들이 콜스택의 값들입니다.

### 스택 오버플로우
스택이 가득차게 되면 에러가 발생하는데,

![에러 콜스택](/assets/img/posts/javascript/stack_overflow.png)

위의 코드와 같이 `Uncaught RangeError: Maxium call stack size exceeded` 라는 오류를 보셨을 것입니다. 에러 문구에서 알수 있듯이, 콜스택이 가득차서 발생하는 에러입니다.

## 논-블로킹
싱글 스레드는 스택이 하나밖에 없기 때문에, 한번에 한가지 일 밖에 할 수 없습니다. 예를 들어 네트워크 요청을 한다면 응답이 올 때까지 다른 일은 하지 못하고 마냥 기다릴 수 밖에 없습니다.

### 블로킹
이것이 왜 문제가 되느냐? 웹 브라우저에서 코드가 실행되는데, 코드가 종료될 때까지 유저가 클릭을 해도 어떠한 반응을 하지 않는 상태가 됩니다. 사용자에게 원활한 UI를 제공해야 한다면, 콜스택이 멈추게 해서는 안됩니다. 콜스택이 멈춘 상태를 블로킹 상태라고 합니다.

![블로킹](/assets/img/posts/javascript/blocking.gif)

ajax는 실제로는 비동기로 동작하지만, 이해를 위해 동기적으로 동작한다 가정한 예제입니다. 위의 그림과 같이 블로킹이 되면 사용자 화면의 버튼을 클릭해도 반응이 없는, 사용자와 인터랙션(interaction) 할 수 없는 상태가 됩니다.

![블로킹](/assets/img/posts/javascript/blocking.png)

위의 그림과 같은 경고 메시지를 보신적이 있다면, 사용자 인터랙션이 없는 블로킹 상태를 보셨다는 것입니다. 블로킹 상태를 해결하는 방법은 논-블로킹, 비동기 콜백을 사용하는 것입니다.

### 논-블로킹
![논-블로킹](/assets/img/posts/javascript/none_blocking.gif)

위의 코드처럼 5초 동안 아무런 동작를 하지 못하는 것이 아니라, 5초 후 호출되는 비동기 콜백으로 블로킹 문제를 해결할 수 있습니다. 어떻게 5초 후 `setTimeout`의 콜백 함수가 호출되는지는 아래의 내용에서 더 자세히 설명하도록 하겠습니다.

# 자바스크립트 런타임
싱글 스레드인 자바스크립트가 매번 5초가 지났는지 체크하지 않고, 5초 후에 콜백을 호출 할 수 있는 이유는 브라우저가 자바스크립트를 실행하는 것 이상의 의미를 가지기 때문입니다.

![자바스크립트 런타임](/assets/img/posts/javascript/javascript_runtime.png)

위의 그림은 크롬의 자바스크립트 런타임을 표현한 그림입니다. 이 후에 이야기 할 포스팅 내용들은 크롬의 자바스크립트 런타임을 기준으로 설명하도록 하겠습니다.

자바스크립트 런타임은 자바스크립트 엔진, Web API, 콜백 큐, 이벤트 루프, 랜더 큐로 구성됩니다. 렌터 큐는 포스팅 마지막의 부록에서 자세히 설명하도록 하겠습니다.

## 자바스크립트 엔진: V8
자바스크립트 런타임을 자바스크립트 엔진을 포함하고 있습니다. 크롬은 자바스크립트 엔진으로 [V8](https://v8.dev/)을 사용하고 있습니다.

![V8 엔진 로고](/assets/img/posts/javascript/v8.png){:.width25.aligncenter}

V8은 구글에서 개발한 오픈소스 자바스크립트 엔진입니다. C++로 만들어져 있으며, Node.js, 크롬 브라우저 등에서 사용됩니다.

V8은 싱글 스레드를 제공합니다. 싱글 스레드는 하나의 콜스택(Call Stack)과 하나의 힙(Heap)을 제공합니다. 콜스택은 위에서 이야기 했듯이 함수의 호출 순서를 저장합니다. 힙은 할당된 메모리들이 저장되는 영역입니다.

하나의 콜스택을 가지고 있다는 말은 한번에 하나의 동작만 할 수 있다는 의미입니다. 하지만 버젓이 `setTimeout`이나 `ajax`(HTTP 요청), DOM 이벤트등 콜백으로 비동기 동작을 하도록 코딩하고 있습니다. 심지어 V8 소스에는 이러한 메소드들이 정의되어 있지도 않습니다.

`setTimeout(..., 5000)`가 호출 되었을 때, 누가 5초를 카운트하고 5초 후에 콜백 함수를 실행 시키는 걸까요? 이 역할을 하는 친구가 바로 Web API 입니다.

## Web API
Web API는 자바스크립트 엔진에서 정의되지 않았던 `setTimeout`이나 HTTP 요청 메소드, DOM 이벤트 등의 메소드를 지원합니다.

## 콜백 큐
콜백 큐는 Web API 결과 값을 쌓아 두는 큐입니다. 예를 들어 자바스크립트에서 `setTimeout(cb, 5000)`를 호출하게 되면, Web API는 타이머를 동작시켜 5초 후에 콜백 큐에, `cb`을 쌓습니다.

## 이벤트 루프
이벤트 루프는 콜스택과 콜백 큐를 관찰하는 역할을 합니다. 콜스택이 비어 있으면 콜백 큐의 첫번째 콜백을 스택에 쌓습니다.

# 자바스크립트 런타임 동작 예제
지금까지의 이야기한 자바스크립트 엔진, Web API, 콜백 큐, 이벤트 루프의 관계를 좀 더 이해하기 쉽도록 예제를 통해 설명해 보도록 하겠습니다.

## `setTimeout`
![자바스크립트 런타임 예제](/assets/img/posts/javascript/javascript_runtime_settimeout.gif)

### 참고: setTimeout은 동작하는 최소 시간을 보장한다
setTimeout는 정확히 얼마 후 동작하겠다는 의미가 아니라 얼마 후 동작하는 최소 시간을 보장한다는 의미가 더 정확합니다. 왜나하면 정해진 시간 후 콜백이 콜백 큐에 쌓이는데, 콜백 큐에 쌓인 콜백이 콜스택에 들어오기 위해서는 콜스택이 비어 있어야 합니다. 정해진 시간이 지난 후 그 이후에 콜스택이 비어있을 때 setTimeout의 콜백이 실행 됩니다.

## `setTimeout(..., 0)`
![자바스크립트 런타임 예제](/assets/img/posts/javascript/javascript_runtime_settimeout_0.gif)

`setTimeout(..., 0)` 0초 후 실행을 시킨다는 의미입니다. 즉시 실행 될 것 같지만 실제로는 즉시 실행 되지 않습니다. 그 이유는 콜스택이 비어있지 않기 때문입니다. 이벤트 루프는 콜스택이 비어있을 때까지 기다리다가 콜스택이 비게 되면 콜백 큐의 첫번째 콜백을 스택에 쌓습니다.

즉 `setTimeout(..., 0)`는 스택이 비어있을 때까지 기다린 후 호출되어야 할 때 사용될 수 있습니다.

## `ajax`
`ajax`도 `setTimeout`과 동일하게 동작합니다.

![자바스크립트 런타임 예제](/assets/img/posts/javascript/javascript_runtime_ajax.gif)

# 부록: 렌더 큐
렌더 큐는 이벤트 큐와 유사합니다. 렌더 큐와 이벤트 큐의 차이점은 렌더 큐가 이벤트 큐보다 더 높은 우선순위를 가진다(렌더 큐의 콜백이 먼저 콜스택에 들어가게 된다)는 점입니다.

![렌더 큐](/assets/img/posts/javascript/render_queue.png)

위의 그림은 자바스크림트 런타임에 렌터 큐를 추가한 그림입니다.

브라우저는 1초에 60프레임 속도로 화면을 다시 그립니다(Repaint). 하지만 자바스크립트가 하는 일들로 인해 Repaint 작업에 영항을 받습니다. 렌더도 큐에 쌓여 있는 하나의 콜백처럼 동작하기 때문에, 콜스택에 코드가 있으면 렌더링하지 못합니다.

느린 동기식 루프를 실행하면, 콜스택에 코드가 쌓여있기 때문에 렌더가 동작하지 않습니다. 이벤트 루프를 막지 말라고 하는 것이 이러한 현상을 뜻합니다. 콜스택에 쓸데없는 느린 코드를 쌓아서 브라우저가 할 일(렌더링)을 못하게 하는 일이 없어야 합니다. 단위가 큰 코드는 작은 단위로 쪼개거나, 오래 걸리는 작업들은 비동기로 동작시키는 것이 좋습니다.

#### 참고
- [https://www.youtube.com/watch?v=8aGhZQkoFbQ](https://www.youtube.com/watch?v=8aGhZQkoFbQ)