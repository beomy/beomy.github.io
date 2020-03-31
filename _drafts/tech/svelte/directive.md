---
layout: post
title: '[Svelte] 디렉티브'
featured-img: svelte/svelte-log.svg
height-img: 200px
category: [tech, svelte]
---
{% include toc.html %}

이번 포스트에서는 디렉티브를 만드는 방법을 이야기 하도록 하겠습니다.

# 디렉티브 만들기
Svelte에서는 액션(Action)이라고 이야기 하는데, `use:액션 이름`으로 디렉티브를 사용할 수 있습니다. Vue.js에서는 디렉티브를 `v-디렉티브 이름`으로 사용할 수 있습니다.

Vue.js와 Svelte 각각 `pannable`이라는 디렉티브를 만들어 보도록 하겠습니다.

## Vue.js 예제
Vue.js에서는 아래 코드와 같이 디렉티브를 만들 수 있습니다.

{% raw %}
```html
<!-- App.vue -->
<template>
  <div
    v-pannable
    @panstart="handlePanStart"
    @panmove="handlePanMove"
    @panend="handlePanEnd"
    class="box"
    :style="`transform: translate(${coords.x}px,${coords.y}px) rotate(${coords.x * 0.2}deg)`"
  ></div>
</template>
<script>
import Vue from 'vue'
import pannable from './pannable'

Vue.directive('pannable', pannable)

new Vue({
  el: '.box',
  data () {
    return {
      coords: {
        x: 0, y: 0
      }
    }
  },
  methods: {
    handlePanStart() {
    },
    handlePanMove(event) {
      this.coords.x += event.detail.dx
      this.coords.y += event.detail.dy
    },
    handlePanEnd(event) {
      this.coords.x = 0
      this.coords.y = 0
    }
  }
})
</script>
```
{% endraw %}

```js
// pannable.js
export default {
  bind (node) {
    let x
    let y

    function handleMousedown(event) {
      console.log('test', x, y)
      x = event.clientX;
      y = event.clientY;

      node.dispatchEvent(new CustomEvent('panstart', {
        detail: { x, y }
      }));

      window.addEventListener('mousemove', handleMousemove);
      window.addEventListener('mouseup', handleMouseup);
    }
    
    function handleMousemove(event) {
      const dx = event.clientX - x;
      const dy = event.clientY - y;
      x = event.clientX;
      y = event.clientY;

      node.dispatchEvent(new CustomEvent('panmove', {
        detail: { x, y, dx, dy }
      }));
    }

    function handleMouseup(event) {
      x = event.clientX;
      y = event.clientY;

      node.dispatchEvent(new CustomEvent('panend', {
        detail: { x, y }
      }));

      window.removeEventListener('mousemove', handleMousemove);
      window.removeEventListener('mouseup', handleMouseup);
    }

    node.addEventListener('mousedown', handleMousedown);

  },
  unbind (node) {
    node.removeEventListener('mousedown', handleMousedown);
  }
}
```

![Vue.js의 디렉티브](/assets/img/posts/svelte/vue_custom_directive.gif)

위의 코드의 실행결과는 [CodePen](https://codepen.io/beomy/pen/MWwLrxe)에서 확인할 수 있습니다.

## Svelte 예제
Svelte에서는 아래 코드와 같이 디렉티브를 만들 수 있습니다.

```js
// pannable.js
export function pannable(node) {
  let x;
  let y;

  function handleMousedown(event) {
    x = event.clientX;
    y = event.clientY;

    node.dispatchEvent(new CustomEvent('panstart', {
      detail: { x, y }
    }));

    window.addEventListener('mousemove', handleMousemove);
    window.addEventListener('mouseup', handleMouseup);
  }

  function handleMousemove(event) {
    const dx = event.clientX - x;
    const dy = event.clientY - y;
    x = event.clientX;
    y = event.clientY;

    node.dispatchEvent(new CustomEvent('panmove', {
      detail: { x, y, dx, dy }
    }));
  }

  function handleMouseup(event) {
    x = event.clientX;
    y = event.clientY;

    node.dispatchEvent(new CustomEvent('panend', {
      detail: { x, y }
    }));

    window.removeEventListener('mousemove', handleMousemove);
    window.removeEventListener('mouseup', handleMouseup);
  }

  node.addEventListener('mousedown', handleMousedown);

  return {
    destroy() {
      node.removeEventListener('mousedown', handleMousedown);
    }
  };
}
```

```html
<!-- App.svelte -->
<script>
  import { spring } from 'svelte/motion';
  import { pannable } from './pannable.js';

  const coords = { x: 0, y: 0 }

  function handlePanStart() {
  }

  function handlePanMove(event) {
    coords.x += event.detail.dx
    coords.y += event.detail.dy
  }

  function handlePanEnd(event) {
    coords.x = 0
    coords.y = 0
  }
</script>

<style>
  .box {
    --width: 100px;
    --height: 100px;
    position: absolute;
    width: var(--width);
    height: var(--height);
    left: calc(50% - var(--width) / 2);
    top: calc(50% - var(--height) / 2);
    border-radius: 4px;
    background-color: #ff3e00;
    cursor: move;
  }
</style>

<div class="box"
  use:pannable
  on:panstart={handlePanStart}
  on:panmove={handlePanMove}
  on:panend={handlePanEnd}
  style="transform:
    translate({coords.x}px,{coords.y}px)
    rotate({coords.x * 0.2}deg)"
></div>
```

![Svelte의 디렉티브](/assets/img/posts/svelte/svelte_custom_directive.gif)

## Vue.js와 Svelte 차이
위의 두 개의 코드를 보시면 둘의 차이를 알 수 있습니다. 디렉티브를 만들 때 Vue.js와 Svelte의 차이는 아래와 같습니다.

### 사용 방법

### Object VS Function
Vue.js에서 디렉티브는 `bind`, `unbind` 등 디렉티브의 라이프 사이클 함수가 존재하지만, Svelte에서 디렉티브는 단순한 함수입니다.

### 라이프 사이클
Vue.js의 디렉티브는 할당받은 자원을 `unbind` 라이프 사이클 함수에서 해제하지만

# 디렉티브 파라미터

## Vue.js

## Svelte

# Action 함수

#### 참고
- [https://svelte.dev/tutorial/actions](https://svelte.dev/tutorial/actions)
- [https://svelte.dev/tutorial/adding-parameters-to-actions](https://svelte.dev/tutorial/adding-parameters-to-actions)