---
layout: post
title: '[Browser] Reflow와 Repaint'
featured-img: browser/browser.png
category: [tech, browser]
---
{% include toc.html %}

이번 포스트에서는 화면이 수정 될 때, 렌더링 과정을 최적화 하는 방법에 대해 이야기 할 것입니다. 화면을 다시 그리는 과정은 크게 Reflow(Layout 이라고도 함)와 Repaint(Redraw 라고도 함) 두 개로 나눌 수 있습니다.

# Repaint(Redraw)
Repaint는 화면에 변화가 있을 때 화면을 그리는 과정입니다. 당연히 화면의 구조가 변경 될 때 뿐만 아니라 DOM 노드의 배경색 변경 등 구조가 변경 되지않는 화면의 업데이트 될 때에도 발생합니다. 예를 들면 `opacity`, `background-color`, `visibility`, `outline` 등의 스타일 변경시 Repaint가 동작합니다.

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

위의 코드를 실행하여 Performance를 체크한 그림입니다. 위의 그림을 보면 repaint이 주기적으로 발생하는 것을 볼 수 있습니다.

# Reflow(Layout)
Reflow는 DOM 노드의 위치와 길이 등을 다시 계산하여 화면 구조(Layout)이 변경되었을 때, 렌더 트리를 재생성하는 과정입니다. (렌더 트리에 관한 내용은 [[Browser] 브라우저 렌더링](/tech/browser/browser-rendering/#렌더-트리-구축) 참고 바랍니다.)

DOM 노드의 크기 혹은 위치가 변경되면, 하위 노드나 상위 노드까지 영향을 미칠 수 있습니다.

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

위크 코드를 실행하여 Performance를 체크한 그림입니다. 위의 그림을 보면 repaint와 layout이 반복적으로 발생하는 것을 볼 수 있습니다.

## Reflow가 발생하는 경우

## 최적화 방법

#### 참고
- [https://github.com/wonism/TIL/blob/master/front-end/browser/reflow-repaint.md](https://github.com/wonism/TIL/blob/master/front-end/browser/reflow-repaint.md)
- [https://webclub.tistory.com/346](https://webclub.tistory.com/346)
- [https://wit.nts-corp.com/2017/06/05/4571](https://wit.nts-corp.com/2017/06/05/4571)