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

# Repaint(Redraw) 란?
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

![Repaint 예시 그림](/assets/img/posts/browser/repaint.png)

위의 코드를 크롬 개발자 도구의 Performance에서 체크한 그림입니다. 위의 그림을 보면 paint가 주기적으로 발생하는 것을 볼 수 있습니다. [repaint.html](/example/browser/reflow-repaint/repaint.html){: target="_blank" }에서 위의 코드 예제를 확인 할 수 있습니다.

# Reflow(Layout) 란?
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

![Reflow 예시 그림](/assets/img/posts/browser/reflow.png)

위의 코드를 크롬 개발자 도구의 Performance에서 체크한 그림입니다. 위의 그림을 보면 repaint와 layout이 반복적으로 발생하는 것을 볼 수 있습니다. [reflow.html](/example/browser/reflow-repaint/reflow.html){: target="_blank" }에서 위의 코드 예제를 확인 할 수 있습니다.

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

# Reflow 최적화
Repaint는 변경 된 화면을 실제 화면에 반영하는 과정으로 최적화 할 수 있는 방법은 화면 변화를 최소화 할 수 있는 방법 밖에 없습니다. 하지만 Reflow는 렌더 트리의 변화를 최소화 하는 등.. Reflow를 최적화 할 수 있는 방법이 몇가지 있습니다. 지금부터는 Reflow를 최적화 할 수 있는 11가지 방법을 이야기 하도록 하겠습니다.

## 1. 스타일을 변경할 경우 가장 하위 노드의 클래스를 변경한다.
가장 하위 노드의 스타일을 변경할 경우, 전체 노드가 아닌 일부 노드로 reflow를 영향을 최소화 할 수 있습니다. 하지만 실무에서는 보통 변경해야 할 노드들이 정해져 있기 때문에 적용 범위가 크지 않을 수 있습니다.

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

![최상위 노드에서 reflow 발생시](/assets/img/posts/browser/reflow_1-1.png)

위의 그림은 위의 코드(최상위 노드에서 reflow가 발생 할 경우)를 Performance 체크한 그림입니다. Layout에 148.3ms 시간이 소요된 것을 확인 할 수 있습니다. [reflow_1-1.html](/example/browser/reflow-repaint/reflow_1-1.html){: target="_blank" }에서 예제를 확인 할 수 있습니다.

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

![최하위 노드에서 reflow 발생시](/assets/img/posts/browser/reflow_1-2.png)

위의 그림은 위의 코드(최하위 노드에서 reflow가 발생 할 경우)를 Performance 체크한 그림입니다. Layout에 87.8ms 시간이 소요된 것을 확인 할 수 있습니다. [reflow_1-2.html](/example/browser/reflow-repaint/reflow_1-2.html){: target="_blank" }에서 예제를 확인 할 수 있습니다.

최상위 노드에서 reflow가 발생할 경우는 148.3ms, 최하위 노드에서 reflow가 발생할 경우는 87.8ms로 최하위 노드에서 reflow가 발생할 경우 더 적은 reflow 시간이 소모되는 것을 확인 할 수 있습니다.

## 2. 인라인 스타일을 사용하지 않는다.
인라인 스타일은 HTML이 다운로드 될 때, 레이아웃에 영향을 미쳐 추가 리플로우를 발생시킵니다. 또한 관심사 분리가 재대로 이루어지지 않으면 앞으로 유지보수가 힘들어 질 수 있기 때문에 앞으로의 유지보수를 위해서라도 인라인 스타일은 사용하지 않는 것이 좋습니다.

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

![Fast 3G 인라인 스타일](/assets/img/posts/browser/reflow_2.png)

위의 그림은 위의 코드(인라인 스타일을 사용한)를 Fast 3G로 Newwork를 확인한 그림입니다. [reflow_2.html](/example/browser/reflow-repaint/reflow_2.html){: target="_blank" }에서 예제를 확인 할 수 있습니다.

![Fast 3G 인라인 스타일 사용 안함](/assets/img/posts/browser/reflow_1-1_network.png)

위의 그림은 1번에서 살펴 본 [reflow_1-1.html](/example/browser/reflow-repaint/reflow_1-1.html){: target="_blank" }을 Fast 3G로 Network를 확인한 그림입니다.

위의 두 사진에서 빨간 글씨로 씌여진 Load 타임 스탬프를 비교해보면, 인라인 스타일을 사용한 경우는 1.02s, 인라인 스타일을 사용하지 않는 경우는 853ms로 인라인 스타일을 사용하지 않는 경우 더 빠르게 DOM이 그려지는 것을 확인 할 수 있습니다.

## 3. 애니메이션이 있는 노드는 `position`을 `fixed` 또는 `absolute`로 지정한다.
애니메이션 효과는 많은 Reflow 비용이 발생하게 됩니다. `position` 속성을 `fixed` 또는 `absolute`의 값을 줘서, 지정된 노드를 전체 노드에서 분리시켜 해당 노드만 Reflow가 발생하도록 제한할 수 있습니다.

애니메이션 효과를 줘야 하는 노드에 `position` 속성이 적용되지 않았다면 애니메이션 시작 시 `position` 속성 값을 `fixed` 또는 `absolute`로 변경하였다가 애니메이션 종료 후 다시 원복 시키는 방법을 사용할 수 있습니다.

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

![position 지정](/assets/img/posts/browser/reflow_3.png)

위의 그림은 애니메이션 효과가 들어간 노드에 `position: absolute`이 주어진 경우 Performance를 측정한 결과입니다. [reflow_3.html](/example/browser/reflow-repaint/reflow_3.html){: target="_blank" }에서 위의 코드 예제를 확인 할 수 있습니다. 위의 그림을 보면 Layout에 13.4ms가 사용 된 것을 볼수 있습니다.

![최하위 노드에서 reflow 발생시](/assets/img/posts/browser/reflow_1-2.png)

반면, 위의 그림을 보면 [reflow_1-2.html](/example/browser/reflow-repaint/reflow_1-2.html){: target="_blank" } 예제와 같이 `position`이 지정되어 있지 않을 경우에는 Layout에 87.8ms이 사용된 것을 볼 수 있습니다.

## 4. 퀄리티, 퍼포먼스의 타협점을 찾는다.
3번에서 말씀 드렸듯이 애니메이션 효과는 많은 Reflow가 발생합니다. 퀄리티가 좋은 애니메이션은 좋은 퀄리티 만큼 많은 Reflow가 발생하고, 퀄리티가 낮은 애니메이션은 적은 Reflow가 발생합니다.

예를 들어 10px을 이동해야 하는 애니메이션 효과가 있다고 하면, 한번에 1px씩 움직이는 애니메이션일 경우 10번의 Reflow가 발생하지만 한번에 2px씩 움직이는 애니메이션일 경우에는 5번의 Reflow가 발생합니다.

따라서 퀄리티와 퍼포먼스 간의 타협점을 찾아 최적의 방법을 찾아야 합니다.

## 5. `<table>` 레이아웃을 피한다.
`<table>`은 점진적으로 렌더링되지 않고, 모두 로드되고 테이블 너비가 계산 된 후 화면에 그려집니다. 테이블 안의 콘텐츠의 값에 따라 테이블 너비가 계산되어 집니다.

콘텐츠의 값에 따라 테이블 너비가 계산되어지기 때문에, 테이블 콘텐츠의 작은 변경만 있어도 테이블 너비가 다시 계산되어지고 테이블의 모든 노드들이 Reflow가 발생합니다. 이러한 이유로 `<table>`을 레이아웃 용도로 사용하는 일은 피해야 합니다.

`<table>`을 사용할 때 `table-layout:fixed` 값을 지정하는 것이 좋습니다. 테이블의 콘텐츠의 길이에 따라 테이블의 너비가 계산되어 지는 것이 아니기 때문에, `table-layout`의 기본 값인 `auto`에 비해 성능이 더 좋습니다. `<table>`을 레이아웃 용도가 아닌 데이터 표시 용도로 사용할 때도 `table-layout:fixed`를 지정하는 것이 성능면에서 더 좋습니다.

```html
<html>
  <head>
    <style>
      th, td {
        border: 1px solid #000
      }
      table {
        width: 1000px;
      }
      .table-fixed {
        table-layout: fixed;
      }
    </style>
  </head>
  <body>
    <table>
      <thead>
        <tr>
          <th>title1</th>
          <th>title2</th>
          <th>title3</th>
          <th>title4</th>
          <th>title5</th>
        </tr>
      </thead>
      <tr>
        <td>텍스트텍스트</td>
        <td>텍스트텍스트텍스트</td>
        <td>텍스트텍스트텍스트텍스트</td>
        <td>텍스트텍스트텍스트텍스트</td>
        <td>텍스트텍스트텍스트텍스트텍스트</td>
      </tr>
    </table>
    <table class="table-fixed">
      <thead>
        <tr>
          <th>title1</th>
          <th>title2</th>
          <th>title3</th>
          <th>title4</th>
          <th>title5</th>
        </tr>
      </thead>
      <tr>
        <td>텍스트텍스트</td>
        <td>텍스트텍스트텍스트</td>
        <td>텍스트텍스트텍스트텍스트</td>
        <td>텍스트텍스트텍스트텍스트</td>
        <td>텍스트텍스트텍스트텍스트텍스트</td>
      </tr>
    </table>
  </body>
</html>
```

위의 예제는 `table-layout:auto`와 `table-layout:fixed`의 차이를 비교하는 예제입니다. [table-layout.html](/example/browser/reflow-repaint/table-layout.html){: target="_blank" }에서 테이블 너비 차이를 비교할 수 있습니다.

## 6. IE의 CSS 표현식을 사용하지 않는다.
CSS 표현식(expression)은 비용이 매우 높기 때문에 사용을 피해야 합니다.

```js
.expression {
  width: expression(document.documentElement.clientWidth > 0 ? '1000px' : 'auto');
}
```

위의 코드와 같이 CSS 표현식을 사용할 수 있습니다.

CSS 표현식의 비용이 높은 이유는 Reflow가 발생 할 때마다 자바스크립트 표현식이 다시 계산되기 때문입니다. 만약 애니메이션이 동작한다면, 애니메이션에 의한 Reflow가 발행 할 때마다 자바스크립트 표현식이 계산되게 됩니다.

## 7. CSS 하위 선택자를 최소화 한다.
CSS 하위 선택자를 최소화 하는 것은 Reflow 횟수를 줄이는 방법이 아니라 렌더 트리 계산을 최소화 하는 방법에 대한 내용입니다.

```html
<div class="reflow_box">
  <ul class="reflow_list">
    <li>
      <button type="button" class="btn">버튼</button>
    <li>
    <li>
      <button type="button" class="btn">버튼</button>
    <li>
  </ul>
</div>
```

```js
/* 잘못된 예 */
.reflow_box .reflow_list li .btn{
    display:block;
}
/* 올바른 예 */
.reflow_list .btn {
  display:block;
}
```

위의 코드와 같이 CSS 하위 선택자를 최소화 하는 것이 렌더링 성능에 더 좋습니다.

렌더 트리는 DOM과 CSSOM이 합쳐져서 만들어집니다. DOM은 HTML이 파싱되어 만들어진 트리이고, CSSOM은 CSS가 파싱되어 만들어진 트리입니다. 두 트리를 결합하여 렌더 트리를 만드는데, CSS 하위 선택자가 많아지면 CSSOM 트리의 깊이(Depth)가 깊어지게 되고 결국 렌터 트리를 만드는 시간이 더 오래 걸릴 수 있게 됩니다. 더 자세한 내용은 [렌더 트리 구축](/tech/browser/browser-rendering/#렌더-트리-구축)을 참고 바랍니다.

## 8. 숨겨진 노드의 스타일을 변경한다.
`display:none`으로 숨겨진 노드를 변경 할 때는 Reflow가 발생하지 않습니다. 숨겨진 노드를 표시하기 전에 노드의 콘텐츠를 먼저 변경한 후 화면에 나타내면 Reflow를 줄일 수 있습니다.

## 9. 클래스를 혹은 `cssText` 사용하여 한번에 스타일을 변경한다.
스타일을 변경할 때, 스타일을 각각 변경할 경우 추가 Reflow가 발생할 수 있기 때문에 한번에 스타일을 변경하는 것이 좋습니다.

```js
var div = document.getElementsByTagName('div');
for (var i = 0; i < div.length; i++) {
  div[i].style.height = '80px';
  div[i].style.backgroundColor = '#00f';
  div[i].style.display = 'inline-block';
  div[i].style.overflow = 'hidden';
  div[i].style.fontSize = '40px';
  div[i].style.color = '#fff';
}
```

위의 코드는 각각의 스타일을 바꾸는 방식입니다.

```js
var div = document.getElementsByTagName('div');
for (var i = 0; i < div.length; i++) {
  // class 사용
  div[i].className = 'block'

  // cssText 사용
  div[i].style.cssText = 'height:80px;background-color:#00f;display:inline-block;overflow:hidden;font-size:40px;color:#fff;'
}
```

위의 코드는 class, `cssText`를 사용하여 한번에 스타일을 바꾸는 방법입니다. 위의 코드와 같이 스타일은 한번에 변경하는 것이 좋습니다.

```html
<html>
  <head>
    <style>
      .block {
        height: 80px;
        background-color: #00f;
        display: inline-block;
        overflow: hidden;
        font-size: 40px;
        color: #fff;
      }
    </style>
  </head>
  <body>
    <button id="btn-inline">인라인 스타일 적용</button><button id="btn-class">클래스 스타일 적용</button><button id="btn-css-text">cssText 스타일 적용</button>
    <div>DIV 스타일 테스트</div><!-- 10000번 선언 -->
    <script>
      document.querySelector('#btn-inline').addEventListener('click', function () {
        var div = document.getElementsByTagName('div');
        for (var i = 0; i < div.length; i++) {
          div[i].style.height = '80px';
          div[i].style.backgroundColor = '#00f';
          div[i].style.display = 'inline-block';
          div[i].style.overflow = 'hidden';
          div[i].style.fontSize = '40px';
          div[i].style.color = '#fff';
        }
      })
      document.querySelector('#btn-class').addEventListener('click', function () {
        var div = document.getElementsByTagName('div');
        for (var i = 0; i < div.length; i++) {
          div[i].className = 'block'
        }
      })
      document.querySelector('#btn-css-text').addEventListener('click', function () {
        var div = document.getElementsByTagName('div');
        for (var i = 0; i < div.length; i++) {
          div[i].style.cssText = 'height:80px;background-color:#00f;display:inline-block;overflow:hidden;font-size:40px;color:#fff;'
        }
      })
    </script>
  </body>
</html>
```

위의 코드는 스타일을 각각 변경할 경우, class를 사용할 경우, `cssText`를 사용할 경우의 Performance 차이를 살펴보기 위한 예제입니다. [reflow_11.html](/example/browser/reflow-repaint/reflow_11.html){: target="_blank" }에서 확인 할 수 있습니다.

![각각 변경할 경우](/assets/img/posts/browser/reflow_11-1.png)

위의 그림은 `<button id="btn-inline">`를 클릭하여 스타일을 각각 변경한 경우에 걸린 Layout 시간을 나타낸 그림입니다. Layout에 275.2ms가 사용되었습니다.

![class 사용 할 경우](/assets/img/posts/browser/reflow_11-2.png)

위의 그림은 `<button id="btn-class">`를 클릭하여 class를 사용하여 스타일을 변경 경우에 걸린 Layout 시간을 나타낸 그림입니다. Layout에 255.2ms가 사용되었습니다.

![cssText 사용 할 경우](/assets/img/posts/browser/reflow_11-3.png)

위의 그림은 `<button id="btn-css-text">`를 클릭하여 `cssText`를 사용하여 스타일을 변경 경우에 걸린 Layout 시간을 나타낸 그림입니다. Layout에 279.0ms가 사용되었습니다.

3가지를 비교하면 class를 사용할 경우 Layout에 가장 적은 시간이 사용된 것을 볼 수 있습니다. 스타일을 변경해야 할 경우 class를 사용하는 것이 성능에 가장 좋은 것으로 판단됩니다.

## 10. JavaScript로 DOM을 추가할 경우 DOM Fragment를 사용한다.

## 11. 캐시를 활용한다.

# 고찰
크롬 버전 78.0.3904.108에서 테스트 하였다.

2. 인라인 스타일을 사용할 경우 DOM의 크기가 커진다. 둘의 속도 차이는 DOM을 다운 받는 차이가 아닐까라는 생각이 듬. 과연 두 속도 차이의 의미를 가질 만큼 큰가. 이 둘의 속도 차이의 원인이 DOM의 크기 차이도 있는 것으로 예상된다.
11. cssText를 사용한 것과, css를 각각 입력하는 결과가 동일하다. 단순 인라인으로 스타일을 사용한 것과 같다고 볼 수 있을 것 같다.

# 요약

#### 참고
- [https://github.com/wonism/TIL/blob/master/front-end/browser/reflow-repaint.md](https://github.com/wonism/TIL/blob/master/front-end/browser/reflow-repaint.md)
- [https://webclub.tistory.com/346](https://webclub.tistory.com/346)
- [https://wit.nts-corp.com/2017/06/05/4571](https://wit.nts-corp.com/2017/06/05/4571)
- [http://sdsupport.cafe24.com/reference/css/table-layout.html](http://sdsupport.cafe24.com/reference/css/table-layout.html)
- https://lists.w3.org/Archives/Public/public-html-ig-ko/2011Sep/att-0031/Reflow_____________________________Tip.pdf