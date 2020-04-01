---
layout: post
title: '[Svelte] 액션'
featured-img: svelte/svelte-log.svg
height-img: 200px
category: [tech, svelte]
---
{% include toc.html %}

이번 포스트에서는 Svelte의 액션(action)에 대해 이야기하도록 하겠습니다. Svelte의 액션은 Vue.js의 커스텀 디렉티브와 유사합니다. Svelte의 액션을 만드는 방법과 Vue.js의 커스텀 디렉티브를 만드는 방법을 비교하며 살펴보도록 하겠습니다.

# 디렉티브 만들기
Vue.js와 Svelte 각각 `pannable`이라는 디렉티브를 만들어 보도록 하겠습니다.

## Vue.js 예제
Vue.js에서는 아래 코드와 같이 `pannable` 디렉티브를 만들 수 있습니다.

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

    node.handleMousedown = function handleMousedown(event) {
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

    node.addEventListener('mousedown', node.handleMousedown);

  },
  unbind (node) {
    node.removeEventListener('mousedown', node.handleMousedown);
  }
}
```

![Vue.js의 pannable 디렉티브](/assets/img/posts/svelte/vue_pannable_directive.gif)

위의 코드의 실행결과는 [CodePen](https://codepen.io/beomy/pen/MWwLrxe)에서 확인할 수 있습니다.

Vue.js에서 만든 커스텀 디렉티브는 `v-디렉티브 이름` 으로 사용할 수 있습니다. Vue.js의 커스텀 디렉티브는 `bind`, `unbind` 등의 몇가지 라이프 사이클 함수를 속성으로 가지는 객체입니다. 커스텀 디렉티브를 사용하기 위해서는 `Vue.directive(...)`을 호출하여 디렉티브를 정의해야 합니다.

`handleMousedown`는 이벤트 리스너를 해제 해줘야 하기 때문에 `node.handleMousedown`를 사용하여 `bind`, `unbind` 라이프 사이클 함수 간의 데이터를 공유했습니다.

## Svelte 예제
Svelte에서는 아래 코드와 같이 `pannable` 액션을 만들 수 있습니다.

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

![Svelte의 pannable 디렉티브](/assets/img/posts/svelte/svelte_pannable_directive.gif)

Svelte에서 만든 액션은 `use:액션 이름`으로 액션을 사용할 수 있습니다. Svelte의 액션은 함수입니다. 리턴 값은 라이프 사이클 함수를 속성으로 가지는 객체입니다. 자세한 내용은 [액션 함수](/tech/svelte/action/#action-함수)에서 말씀드리도록 하겠습니다.

# Vue.js 디렉티브와 Svelte 액션 차이
위의 두 개의 코드를 보시면 둘의 차이를 알 수 있습니다.

## 사용 방법
Vue.js는 디렉티브를 만들고 `Vue.directive(디렉티브 정의)`와 같이 정의를 해줘야 합니다. `v-디렉티브 이름="파라미터"` 형태로 사용하면 됩니다.

Svelte는 액션을 만들었다면 단순히 `import 액션 이름 from 경로`로 가져온 후 `use:액션 이름={파라미터}`형태로 사용하면 됩니다.

## Object VS Function
Vue.js에서 디렉티브는 `bind`, `inserted`, `update`, `componentUpdated`, `unbind` 5개의 디렉티브의 라이프 사이클 함수를 속성으로 가지는 객체입니다.

Svelte에서 디렉티는 함수입니다. 파라미터로 HTML 요소와 디렉티브 파라미터를 가지고, 라이프 사이클 함수를 속성으로 가지는 객체를 리턴합니다. 자세한 내용은 [액션 함수](/tech/svelte/action/#action-함수)에서 말씀드리도록 하겠습니다.

## 라이프 사이클
Vue.js의 디렉티브는 `bind`, `inserted`, `update`, `componentUpdated`, `unbind` 5개의 라이프 사이클 함수를 가집니다.

Svelte의 액션의 함수 본문에는 마운트 될 때의 동작을 정의하고, Vue.js보다 단순한 `update`, `destroy` 2개의 라이프 사이클 함수를 속성으로 가지는 객체를 리턴합니다.

# 디렉티브 파라미터
Vue.js의 커스텀 디렉티브와 Svelte의 액션에 파라미터를 전달하는 방법을 살펴보겠습니다. Vue.js와 Svelte 각각 `longpress`라는 디렉티브를 만들어 보도록 하겠습니다.

## Vue.js 예제
Vue.js에서는 아래 코드와 같이 `longpress` 디렉티브를 만들 수 있습니다.

{% raw %}
```html
<!-- App.vue -->
<template>
  <div id="app">
    <label>
      <input v-model="duration" type="range" max="2000" step="100">
      {{ duration }}ms
    </label>

    <button v-longpress="duration"
      @longpress="() => pressed = true"
      @mouseenter="() => pressed = false"
    >press and hold</button>

    <p v-if="pressed">congratulations, you pressed and held for {{ duration }}ms</p>
  </div>
</template>
<script>
  import Vue from 'vue'
  import longpress from './longpress'

  Vue.directive('longpress', longpress)

  new Vue({
    el: '#app',
    data () {
      return {
        pressed: false,
        duration: 2000
      }
    },
  })
</script>
```
{% endraw %}

```js
// longpress.js
export default {
  bind (node, binding) {
    let timer
    let duration = binding.value

    node.handleMousedown = () => {
      timer = setTimeout(() => {
        node.dispatchEvent(
          new CustomEvent('longpress')
        );
      }, duration);
    };

    node.handleMouseup = () => {
      clearTimeout(timer)
    };

    node.addEventListener('mousedown', node.handleMousedown);
    node.addEventListener('mouseup', node.handleMouseup);
  },
  update (node, binding) {
    node.duration = binding.value
  },
  unbind (node) {
    node.removeEventListener('mousedown', node.handleMousedown);
    node.removeEventListener('mouseup', node.handleMouseup);
  }
}
```

![Vue.js의 longpress 디렉티브](/assets/img/posts/svelte/vue_longpress_directive.gif)

위의 코드의 실행결과는 [CodePen](https://codepen.io/beomy/pen/zYGbeZz?editors=1010)에서 확인할 수 있습니다.

`v-longpress="duration"`으로 전달된 `duration` 값은 디렉티브의 라이프 사이클 함수의 두 번째 인자인 `binding.value`를 통해 사용할 수 있습니다.

Vue.js 디렉티브는 객체 안에 있는 각각의 라이프 사이클 함수는 서로 다른 스코프를 가지고 있기 때문에 각각의 라이프 사이클 함수에서 정의한 변수는 공유되지 않습니다.

`duration`, `handleMousedown`, `handleMouseup`는 값을 업데이트 하기 위해, 이벤트 리스너를 해제하기 위해 라이프 사이클 함수 간에 공유가 되어야 합니다. node의 하위 속성으로 정의하여 공유하는 방법을 사용했습니다.

## Svelte 예제
Svelte에서는 아래 코드와 같이 `longpress` 액션을 만들 수 있습니다.

```html
<!-- App.svelte -->
<script>
  import { longpress } from './longpress.js';

  let pressed = false;
  let duration = 2000;
</script>

<label>
  <input type=range bind:value={duration} max={2000} step={100}>
  {duration}ms
</label>

<button use:longpress={duration}
  on:longpress="{() => pressed = true}"
  on:mouseenter="{() => pressed = false}"
>press and hold</button>

{#if pressed}
  <p>congratulations, you pressed and held for {duration}ms</p>
{/if}
```

```js
// longpress.js
export function longpress(node, duration) {
  let timer;
  
  const handleMousedown = () => {
    timer = setTimeout(() => {
      node.dispatchEvent(
        new CustomEvent('longpress')
      );
    }, duration);
  };
  
  const handleMouseup = () => {
    clearTimeout(timer)
  };

  node.addEventListener('mousedown', handleMousedown);
  node.addEventListener('mouseup', handleMouseup);

  return {
    update(newDuration) {
      duration = newDuration;
    },
    destroy() {
      node.removeEventListener('mousedown', handleMousedown);
      node.removeEventListener('mouseup', handleMouseup);
    }
  };
}
```

![Svelte의 longpress 디렉티브](/assets/img/posts/svelte/svelte_longpress_directive.gif)

`use:longpress={duration}`으로 전달된 `duration` 값은 액션 함수의 두번째 인자로 전달되어 사용할 수 있습니다. 액션 함수의 `update`, `destroy` 라이프 사이클 함수를 사용했습니다. 밑에서 액션 함수를 좀 더 자세히 살펴보겠습니다.

# Action 함수

#### 참고
- [https://svelte.dev/tutorial/actions](https://svelte.dev/tutorial/actions)
- [https://svelte.dev/tutorial/adding-parameters-to-actions](https://svelte.dev/tutorial/adding-parameters-to-actions)