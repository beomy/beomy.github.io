---
layout: post
title: '[Browser] Reflow와 Repaint'
featured-img: browser/browser.png
category: [tech, browser]
---
{% include toc.html %}

이번 포스트에서는 화면이 수정 될 때, 렌더링 과정을 최적화 하는 방법에 대해 이야기 할 것입니다. 화면을 다시 그리는 과정은 크게 Reflow(Layout 이라고도 함)와 Repaint(Redraw 라고도 함) 두 개로 나눌 수 있습니다.

- Reflow는 화면의 구조(Layout)이 변경 되었을 때 동작하는 과정입니다.
- Repaint는 화면의 변화가 있을 때 화면을 다시 그리는 동작을 하는 과정입니다.

# Repaint (Redraw)
Repaint는 화면에 변화가 있을 때 화면을 그리는 과정입니다.

화면의 구조가 변경되었을 때에는 Reflow 과정을 거쳐 화면 구조를 다시 계산 한후 Repaint 과정을 통해 화면을 다시 그립니다. 즉 화면의 구조가 변경 되었을 때에는 Reflow와 Repaint 모두 발생합니다.

화면의 구조가 변경되지 않은 화면의 변화만 있을 경우 Repaint 과정을 통해 화면을 다시 그립니다. 즉 화면의 구조가 변경되지 않은 화면의 변화만 있는 경우 Repaint만 발생합니다. 예를 들면 `opacity`, `background-color`, `visibility`, `outline` 등의 스타일 변경시에는 Repaint만 동작합니다.

```html
<html>
  <head>
    <style>
      .repaint {
        width: 100px;
        height: 100px;
        background-color: orange;
        transition-duration: 2s;
      }
      .repaint:hover {
        background-color: red;
      }
    </style>
  </head>
  <body>
    <div class="repaint"></div>
  </body>
</html>
```

~~Repaint 예시 그림~~

위의 코드를 크롬 개발자 도구의 Performance에서 체크한 그림입니다. 위의 그림을 보면 repaint이 주기적으로 발생하는 것을 볼 수 있습니다. [/example/browser/reflow-repaint/repaint.html](/example/browser/reflow-repaint/repaint.html){: target="_blank" }에서 위의 코드 예제를 확인 할 수 있습니다.

# Reflow (Layout)
Reflow는 화면 구조(Layout)이 변경되었을 때, 뷰포트 내에서 렌더 트리의 노드의 정확한 위치와 크기를 계산하는 과정을 Reflow(혹은 Layout)이라고 합니다. ([렌더 트리](/tech/browser/browser-rendering/#렌더-트리-구축)와 [Layout](/tech/browser/browser-rendering/#layout)을 참고 바랍니다.)

DOM 노드의 크기 또는 위치가 변경되면, 하위 노드와 상위 노드까지 영향을 미칠 수 있습니다.

```html
<html>
  <head>
    <style>
      .reflow {
        width: 100px;
        height: 100px;
        background-color: orange;
        transition-duration: 2s;
      }
      .reflow:hover {
        width: 200px;
      }
    </style>
  </head>
  <body>
    <div class="reflow"></div>
  </body>
</html>
```

~~Reflow 예시 그림~~

위의 코드를 크롬 개발자 도구의 Performance에서 체크한 그림입니다. 위의 그림을 보면 repaint와 layout이 반복적으로 발생하는 것을 볼 수 있습니다. [/example/browser/reflow-repaint/reflow.html](/example/browser/reflow-repaint/reflow.html){: target="_blank" }에서 위의 코드 예제를 확인 할 수 있습니다.

## Reflow가 발생하는 경우
- DOM 노드의 추가, 제거
- DOM 노드의 위치 변경
- DOM 노드의 크기 변경(margin, padding, border, width, height 등..) 
- CSS3 애니메이션과 트린지션
- 폰트 변경, 텍스트 내용 변경
- 이미지 크기 변경
- offset, scrollTop, scrollLeft과 같은 계산된 스타일 정보 요청
- 페이지 초기 렌더링
- 윈도우 리사이징

간단하게 화면의 구조가 변경되었다면 Reflow가 발생한다고 이해하면 됩니다.

## 최적화 방법
Repaint는 변경 된 화면을 실제 화면에 반영하는 과정으로 최적화 할 수 있는 방법은 화면 변화를 최소화 할 수 있는 방법 밖에 없습니다. 반면 Reflow는 렌더 트리의 변화를 최소화 하는 등.. Reflow를 최적화 할 수 있는 방법이 몇가지 있습니다. 지금부터는 Reflow를 최적화 할 수 있는 11가지 방법을 이야기 하도록 하겠습니다.

### 1. 스타일을 변경할 경우 가장 하위 노드의 클래스를 변경한다.
가장 하위 노드의 스타일을 변경할 경우, 전체 노드가 아닌 일부 노드로 reflow를 영향을 최소화 할 수 있습니다.

```html
<html>
  <head>
    <style>
      .reflow {
        width: 100px;
        height: 100px;
        background-color: orange;
        transition-duration: 2s;
      }
      .reflow div {
        width: 100%;
        height: 100%;
      }
    </style>
  </head>
  <body>
    <div class="reflow">
      <div>
        ...
        <div>
        </div>
        ...
      </div>
    </div>
    <script>
      document.querySelector('.reflow').addEventListener('click', function (event) {
        document.querySelector('.reflow').style.width = '200px'
      })
    </script>
  </body>
</html>
```

~~최상위 노드에서 reflow 발생시~~

[/example/browser/reflow-repaint/reflow_1-1.html](/example/browser/reflow-repaint/reflow_1-1.html){: target="_blank" }

```html
<html>
  <head>
    <style>
      .reflow {
        width: 100px;
        height: 100px;
        background-color: orange;
        transition-duration: 2s;
      }
      .reflow div {
        width: 100%;
        height: 100%;
      }
    </style>
  </head>
  <body>
    <div>
      <div>
        ...
        <div class="reflow">
        </div>
        ...
      </div>
    </div>
    <script>
      document.querySelector('.reflow').addEventListener('click', function (event) {
        document.querySelector('.reflow').style.width = '200px'
      })
    </script>
  </body>
</html>
```

~~최하위 노드에서 reflow 발생시~~

[/example/browser/reflow-repaint/reflow_1-2.html](/example/browser/reflow-repaint/reflow_1-2.html){: target="_blank" }

### 2. 인라인 스타일을 사용하지 않는다.
```html
<html>
  <body>
    <div class="reflow" style="width: 100px; height: 100px; background-color: orange; transition-duration: 2s;">
      <div style="width: 100%; height: 100%;">
        ...
        <div style="width: 100%; height: 100%;">
        </div>
        ...
      </div>
    </div>
    <script>
      document.querySelector('.reflow').addEventListener('click', function (event) {
        document.querySelector('.reflow').style.width = '200px'
      })
    </script>
  </body>
</html>
```

~~Load 타임스탬프 차이~~

[/example/browser/reflow-repaint/reflow_2.html](/example/browser/reflow-repaint/reflow_2.html){: target="_blank" }

### 3. 애니메이션 효과가 있는 노드는 `position:fixed` 또는 `position:absolute`로 지정한다.
```html
<html>
  <head>
    <style>
      .reflow {
        position: absolute;
        width: 100px;
        height: 100px;
        background-color: orange;
        transition-duration: 2s;
      }
      .reflow div {
        width: 100%;
        height: 100%;
      }
    </style>
  </head>
  <body>
    <div>
      <div>
        ...
        <div class="reflow">
        </div>
        ...
      </div>
    </div>
    <script>
      document.querySelector('.reflow').addEventListener('click', function (event) {
        document.querySelector('.reflow').style.width = '200px'
      })
    </script>
  </body>
</html>
```

[/example/browser/reflow-repaint/reflow_3.html](/example/browser/reflow-repaint/reflow_3.html){: target="_blank" }

~~reflow_1-2와 비교~~

### 4. 퀄리티와 퍼포먼스 간의 타협점을 찾는다.

### 5. `<table>` 레이아웃을 피한다.
~~테스트 방법 못찾음~~

### 6. IE의 경우, CSS에서 JS 표현식을 사용하지 않는다.

### 7. CSS 하위 선택자를 최소화 한다.
이유 설명

### 8. 숨겨진 노드의 스타일을 변경한다.

### 9. `cssText` 혹은 클래스를 사용하여 스타일을 변경한다.

### 10. JavaScript로 DOM을 추가할 경우 DOM Fragment를 사용한다.

### 11. 캐시를 활용한다.

# 고찰

# 요약

#### 참고
- [https://github.com/wonism/TIL/blob/master/front-end/browser/reflow-repaint.md](https://github.com/wonism/TIL/blob/master/front-end/browser/reflow-repaint.md)
- [https://webclub.tistory.com/346](https://webclub.tistory.com/346)
- [https://wit.nts-corp.com/2017/06/05/4571](https://wit.nts-corp.com/2017/06/05/4571)