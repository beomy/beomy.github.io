---
layout: post
title: '[Svelte] 데이터 바인딩 고급'
featured-img: svelte/svelte.png
height-img: 200px
category: [tech, svelte]
summary: Svelte의 데이터 바인딩을 이야기합니다. 많이 사용되지는 않지만 필요할 때 사용하면 편리한 기능들입니다.
---

이번 포스트에서는 [[Svelte] 데이터 바인딩 기초](/tech/svelte/bindings-basic)에 이어 두 번째 데이터 바인딩을 이야기합니다. 많이 사용되지는 않지만 필요할 때 사용하면 편리한 기능들입니다.

## Media 태그
Svelte에서 `<audio>`와 `<video>` 미디어 태그는 바인딩 할 수 있는 몇 가지 속성을 제공합니다. 바인딩 할 수 있는 속성은 아래 코드와 같이 사용할 수 있습니다.

```html
<video
  poster="https://sveltejs.github.io/assets/caminandes-llamigos.jpg"
  src="https://sveltejs.github.io/assets/caminandes-llamigos.mp4"
  on:mousemove={handleMousemove}
  on:mousedown={handleMousedown}
  bind:currentTime={time}
  bind:duration
  bind:paused
></video>
```

### 8가지 Readonly 속성
아래 목록은 readonly로 바인딩 할 수 있는 8가지 속성입니다.

- `duration` *Number* (readonly): 총 재생 길이(초 단위)
- `buffered` *Array* (readonly): `{start, end}` 객체들의 배열로, 버퍼 된 위치를 표시함
- `seekable` *Array* (readonly): `{start, end}` 객체들의 배열로, 위치를 찾을 수 있는 범위를 표시함
- `played` *Array* (readonly): `{start, end}` 객체들의 배열로, 재생했던 위치들을 표시함
- `seeking` *Boolean* (readonly): 찾는 중인지를 표시하는 플래그
- `ended` *Boolean* (readonly): 재생이 끝났는지를 표시하는 플래그
- `videoWidth` *Number* (readonly): `<video>` 태그에서 사용할 수 있는 속성으로 `<video>` 태그의 너비를 나타냄.
- `videoHegiht` *Number* (readonly): `<video>` 태그에서 사용할 수 있는 속성으로 `<video>` 태그의 높이를 나타냄.

### 4가지 Read, Write 가능한 속성
아래 목록은 write와 read 둘 다 가능한 4가지 속성입니다.

- `currentTime` *Number*: 현재 재생 위치를 나타냄(초 단위)
- `playbackRate` *Number*: 재생 속도를 나타냄(normal: 1)
- `paused` *Boolean*: 일시정지됐는지 표시하는 플래그
- `volume` *Number*: 음량의 크기를 나타냄(0과 1 사이의 값)

## Dimension
블록 레벨의 요소들(`<div>`, `<p>` 태그, 혹은 블록 레벨 스타일이 지정된 태그들..)은 `clientWidth`, `clientHeight`, `offsetWidth`, `offsetHeight`를 readonly로 바인딩 할 수 있습니다. 이 값들을 변경해도 width와 height는 변경되지 않습니다. 아래 코드와 같이 사용할 수 있습니다.

```html
<script>
  let w;
  let h;
  let size = 42;
  let text = 'edit me';
</script>

<style>
  input { display: block; }
  div { display: inline-block; }
  span { word-break: break-all; }
</style>

<input type=range bind:value={size}>
<input bind:value={text}>

<p>size: {w}px x {h}px</p>

<div bind:clientWidth={w} bind:clientHeight={h}>
  <span style="font-size: {size}px">{text}</span>
</div>
```

### 주의사항
`clientWidth`, `clientHeight`, `offsetWidth`, `offsetHeight` 속성을 바인딩 하여 사용할 때 주의해야 할 몇 가지 내용들이 있습니다.

#### 성능 이슈
위의 4가지 속성을 바인딩하고 사용하는 것은 성능상 오버헤드가 발생하기 때문에 많은 요소에 사용하는 것을 추천하지 않습니다.

#### 바인딩 할 수 없는 태그들
`display:inline` 스타일 사용하는 태그나, `<span>` 등의 인라인 요소들에는 바인딩 할 수 없습니다. `<canvas>`와 같이 다른 태그들을 포함할 수 없는 태그에도 사용할 수 없습니다.

바인딩 할 수 없는 태그들에 위의 4가지 속성을 바인딩 해야 한다면 블록 레벨 요소로 감싸고 그 블록 레벨 요소에 바인딩 하여 사용해야 합니다.

## `this` 바인딩
이번에는 `this`를 바인딩 하는 방법을 살펴보도록 하겠습니다. Svelte에서 `this`를 바인딩 하는 것은 Vue.js에서 `ref`를 사용하는 것과 유사합니다.

Vue.js에서 `ref`를 HTML 태그와 컴포넌트 모두 사용 가능한 것처럼 Svelte에서도 HTML 태그와 컴포넌트 모두 `this`를 바인딩 할 수 있습니다. HTML 태그에 `this`를 바인딩 할 경우 HTML 요소가 바인딩 되고, 컴포넌트에 `this`를 바인딩 한 경우 컴포넌트가 바인딩 됩니다.

Vue.js에서는 아래와 같이 `ref`를 사용할 수 있습니다.

```html
<template>
  <canvas
    ref="canvas"
    :width="32"
    :height="32"
  ></canvas>
</template>
<script>
  export default {
    data () {
      return {
        frame: null
      }
    },
    mounted () {
      const ctx = this.$refs.canvas.getContext('2d');

      (function loop() {
        this.frame = requestAnimationFrame(loop);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        for (let p = 0; p < imageData.data.length; p += 4) {
          const i = p / 4;
          const x = i % canvas.width;
          const y = i / canvas.height >>> 0;

          const t = window.performance.now();

          const r = 64 + (128 * x / canvas.width) + (64 * Math.sin(t / 1000));
          const g = 64 + (128 * y / canvas.height) + (64 * Math.cos(t / 1000));
          const b = 128;

          imageData.data[p + 0] = r;
          imageData.data[p + 1] = g;
          imageData.data[p + 2] = b;
          imageData.data[p + 3] = 255;
        }

        ctx.putImageData(imageData, 0, 0);
      }())
    },
    beforeDestroy () {
      cancelAnimationFrame(this.frame)
    }
  }
</script>
<style>
  canvas {
    width: 100%;
    height: 100%;
    background-color: #666;
    -webkit-mask: url(svelte-logo-mask.svg) 50% 50% no-repeat;
    mask: url(svelte-logo-mask.svg) 50% 50% no-repeat;
  }
</style>
```

위의 코드를 Svelte에서는 아래와 같이 작성할 수 있습니다.

```html
<script>
  import { onMount } from 'svelte';

  let canvas;

  onMount(() => {
    const ctx = canvas.getContext('2d');
    let frame = requestAnimationFrame(loop);

    function loop(t) {
      frame = requestAnimationFrame(loop);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      for (let p = 0; p < imageData.data.length; p += 4) {
        const i = p / 4;
        const x = i % canvas.width;
        const y = i / canvas.height >>> 0;

        const r = 64 + (128 * x / canvas.width) + (64 * Math.sin(t / 1000));
        const g = 64 + (128 * y / canvas.height) + (64 * Math.cos(t / 1000));
        const b = 128;

        imageData.data[p + 0] = r;
        imageData.data[p + 1] = g;
        imageData.data[p + 2] = b;
        imageData.data[p + 3] = 255;
      }

      ctx.putImageData(imageData, 0, 0);
    }

    return () => {
      cancelAnimationFrame(frame);
    };
  });
</script>

<style>
  canvas {
    width: 100%;
    height: 100%;
    background-color: #666;
    -webkit-mask: url(svelte-logo-mask.svg) 50% 50% no-repeat;
    mask: url(svelte-logo-mask.svg) 50% 50% no-repeat;
  }
</style>

<canvas
  bind:this={canvas}
  width={32}
  height={32}
></canvas>
```

컴포넌트가 마운트 된 후에 `canvas` 변수에 값이 할당되기 때문에, `onMount`라는 라이프 사이클을 사용했습니다. 라이프 사이클은 이후 포스팅에서 좀 더 자세히 알아보도록 하겠습니다. 지금은 컴포넌트가 화면에 마운트 될 때 호출되는 콜백으로 이해하시면 됩니다. `onMount` 콜백 함수에서 리턴되는 함수는 컴포넌트가 제거되었을 때 호출됩니다.

Vue.js에서는 `<canvas ref="canvas">`로 태그를 선언하고, `<canvas>` 태그에 접근할 때는 `this.$refs.canvas`로 접근할 수 있습니다.

Svelte에서는 `<script>` 태그 안에 `let canvas`로 `canvas` 변수를 정의한 후, `<canvas bind:this="{canvas}">`로 태그를 선언하고, `<canvas>` 태그에 접근할 때는 `canvas` 변수를 통해 접근할 수 있습니다.

## 컴포넌트 바인딩
DOM 속성을 바인딩 할 수 있는 것처럼 컴포넌트의 props를 바인딩 할 수 있습니다. Vue.js에서 props에 `.sync` 수식어를 선언하는 것과 유사한 개념입니다. Vue.js에서는 아래와 같이 컴포넌트의 props를 바인딩 할 수 있습니다.

```html
<!-- Keypad.vue -->
<template>
  <div class="keypad">
    <button @click="select(1)">1</button>
    <button @click="select(2)">2</button>
    <button @click="select(3)">3</button>
    <button @click="select(4)">4</button>
    <button @click="select(5)">5</button>
    <button @click="select(6)">6</button>
    <button @click="select(7)">7</button>
    <button @click="select(8)">8</button>
    <button @click="select(9)">9</button>

    <button :disabled="!value" @click="clear">clear</button>
    <button @click="select(0)">0</button>
    <button :disabled="!value" @click="submit">submit</button>
  </div>
</template>
<script>
  export default {
    props: {
      value
    },
    methods: {
      select (num) {
        this.$emit('update:value', this.value + num)
      },
      clear () {
        this.$emit('update:value', '')
      },
      submit () {
        this.$emit('submit')
      },
    }
  }
</script>
<style>
  .keypad {
    display: grid;
    grid-template-columns: repeat(3, 5em);
    grid-template-rows: repeat(4, 3em);
    grid-gap: 0.5em
  }

  button {
    margin: 0
  }
</style>
```

```html
<!-- App.vue -->
<template>
  <div>
    <h1 :style="color: `${pin ? '#333' : '#ccc'}`">{{ view }}</h1>

    <keypad :value.sync="pin" @submit="handleSubmit"/>
  </div>
</template>
<script>
  import Keypad from '.Keypad'
  export default {
    components: {
      Keypad
    },
    data () {
      return {
        pin: ''
      }
    },
    computed: {
      view () {
        return this.pin ? this.pin.replace(/\d(?!$)/g, '•') : 'enter your pin'
      }
    },
    methods: {
      handleSubmit () {
        alert(`submitted ${this.pin}`)
      }
    }
  }
</script>
```

위의 코드는 Vue.js의 `.sync`를 사용한 예제입니다. Svelte는 아래와 같이 구현할 수 있습니다.

```html
<!-- Keypad.svelte -->
<script>
  import { createEventDispatcher } from 'svelte';

  export let value = '';

  const dispatch = createEventDispatcher();

  const select = num => () => value += num;
  const clear  = () => value = '';
  const submit = () => dispatch('submit');
</script>

<style>
  .keypad {
    display: grid;
    grid-template-columns: repeat(3, 5em);
    grid-template-rows: repeat(4, 3em);
    grid-gap: 0.5em
  }

  button {
    margin: 0
  }
</style>

<div class="keypad">
  <button on:click={select(1)}>1</button>
  <button on:click={select(2)}>2</button>
  <button on:click={select(3)}>3</button>
  <button on:click={select(4)}>4</button>
  <button on:click={select(5)}>5</button>
  <button on:click={select(6)}>6</button>
  <button on:click={select(7)}>7</button>
  <button on:click={select(8)}>8</button>
  <button on:click={select(9)}>9</button>

  <button disabled={!value} on:click={clear}>clear</button>
  <button on:click={select(0)}>0</button>
  <button disabled={!value} on:click={submit}>submit</button>
</div>
```

```html
<!-- App.svelte -->
<script>
  import Keypad from './Keypad.svelte';

  let pin;
  $: view = pin ? pin.replace(/\d(?!$)/g, '•') : 'enter your pin';

  function handleSubmit() {
    alert(`submitted ${pin}`);
  }
</script>

<h1 style="color: {pin ? '#333' : '#ccc'}">{view}</h1>

<Keypad bind:value={pin} on:submit={handleSubmit}/>
```

Svelte에서는 컴포넌트의 props를 바인딩 하는데 Vue.js의 `.sync`와 같은 특별한 문법이 사용할 필요 없습니다. DOM 속성을 바인딩 할 때처럼 `bind:바인딩 속성`을 사용하여 컴포넌트의 props를 바인딩 할 수 있습니다.

### 주의사항
컴포넌트 바인딩을 많이 사용하는 것은 피하는 것이 좋습니다. 컴포넌트 바인딩은 양방향 데이터 통신을 하기 때문에, 값이 수정되었을 때 어디에서 수정된 것인지 찾기 어려울 수 있습니다.

##### 참고
- [https://svelte.dev/tutorial/media-elements](https://svelte.dev/tutorial/media-elements)
- [https://svelte.dev/tutorial/dimensions](https://svelte.dev/tutorial/dimensions)
- [https://svelte.dev/tutorial/bind-this](https://svelte.dev/tutorial/bind-this)
- [https://svelte.dev/tutorial/component-bindings](https://svelte.dev/tutorial/component-bindings)
