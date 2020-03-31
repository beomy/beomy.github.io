---
layout: post
title: '[Svelte] 커스텀 디렉티브'
featured-img: svelte/svelte-log.svg
height-img: 200px
category: [tech, svelte]
---
{% include toc.html %}

이번 포스트에서는 커스텀 디렉티브를 만드는 방법을 이야기 하도록 하겠습니다.

# 커스텀 디렉티브 만들기
`pannable`이라는 커스텀 디렉티브를 만들어 보도록 하겠습니다.

## Vue.js
[CodePen](https://codepen.io/beomy/pen/MWwLrxe)

## Svelte
Svelte에서는 아래 코드와 같이 커스텀 디렉티브를 만들 수 있습니다.

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

  const coords = spring({ x: 0, y: 0 }, {
    stiffness: 0.2,
    damping: 0.4
  });

  function handlePanStart() {
    coords.stiffness = coords.damping = 1;
  }

  function handlePanMove(event) {
    coords.update($coords => ({
      x: $coords.x + event.detail.dx,
      y: $coords.y + event.detail.dy
    }));
  }

  function handlePanEnd(event) {
    coords.stiffness = 0.2;
    coords.damping = 0.4;
    coords.set({ x: 0, y: 0 });
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
    translate({$coords.x}px,{$coords.y}px)
    rotate({$coords.x * 0.2}deg)"
></div>
```

# 커스텀 디렉티브에 파라미터 전달하기

## Vue.js

## Svelte

#### 참고
- [https://svelte.dev/tutorial/actions](https://svelte.dev/tutorial/actions)
- [https://svelte.dev/tutorial/adding-parameters-to-actions](https://svelte.dev/tutorial/adding-parameters-to-actions)