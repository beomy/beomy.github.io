---
layout: post
title: '[Svelte] Transitions'
featured-img: svelte/svelte-log.svg
height-img: 200px
category: [tech, svelte]
---
{% include toc.html %}

Svelte는 DOM에 요소들이 추가, 제거되었을 때 트랜지션을 효과적으로 지원하는 트랜지션 디렉티브를 제공합니다. 이번 포스트에서는 Svelte에서 트랜지션을 사용하는 방법을 이야기하도록 하겠습니다.

# 트랜지션 사용하기
트랜지션을 간단하게 사용하는 방법을 살펴보겠습니다.

```html
<script>
  import { fade } from 'svelte/transition';
  let visible = true;
</script>

<label>
  <input type="checkbox" bind:checked={visible}>
  visible
</label>

{#if visible}
  <p transition:fade>
    Fades in and out
  </p>
{/if}
```

- `svelte/transition`에서 `fade`를 가져옵니다.
- `visible`의 값이 변경되어 화면에 나타나거나, 제거될 때 `fade` 트랜지션이 적용됩니다.

## 파라미터 추가하기
`svelte/transition`에서 가져온 `fade`를 트랜지션 함수라고 부르도록 하겠습니다. 트랜지션 함수에 파라미터를 전달하는 것이 가능합니다. 트랜지션 함수 중 하나인 `fly`를 살펴보겠습니다.

{% raw %}
```html
<script>
  import { fly } from 'svelte/transition';
  let visible = true;
</script>

<label>
  <input type="checkbox" bind:checked={visible}>
  visible
</label>

{#if visible}
  <p transition:fly="{{ y: 200, duration: 2000 }}">
    Flies in and out
  </p>
{/if}
```
{% endraw %}

- `svelte/transition`에서 `fly`를 가져옵니다.
- `visible`의 값이 변경되어 화면에 나타나거나, 제거될 때 `fly` 트랜지션이 적용됩니다.

파라미터를 전달하는 방법은 간단합니다. 데이터를 바인딩 하는 방법과 동일하게 파라미터로 전달하려는 값을 바인딩 하면 됩니다.

# 트랜지션 종류
Svelte는 7개의 트랜지션을 제공합니다. 자세한 내용은 [https://svelte.dev/docs#svelte_transition](https://svelte.dev/docs#svelte_transition)를 참고 부탁드립니다.

## `fade` 트랜지션
`fade` 트랜지션을 요소의 `opacity`를 조절하는 트랜지션입니다. 점차 불투명에서 투명으로, 투명에서 불투명으로 변경됩니다.

### 실행 화면
![fade 트랜지션](/assets/img/posts/svelte/fade_transition.gif)

### 파라미터
- `delay` (number, default 0): 단위는 ms로 설정한 시간이 지난 후에 트랜지션을 시작합니다.
- `duration` (number, default 400): 단위는 ms로 설정한 시간 동안 트랜지션 됩니다.

## `blur` 트랜지션
`blur` 트랜지션은 요소를 흐릿하게 보였다가 뚜렷하게 보이도록 변경하거나, 점차 요소를 흐릿하게 하여 요소를 제거합니다.

### 실행 화면
![blur 트랜지션](/assets/img/posts/svelte/blur_transition.gif)

### 파라미터
- `delay` (number, default 0): 단위는 ms로 설정한 시간이 지난 후에 트랜지션을 시작합니다.
- `duration` (number, default 400): 단위는 ms로 설정한 시간 동안 트랜지션 됩니다.
- `easing` (function, default cubicInOut): easing 함수입니다. [https://svelte.dev/docs#svelte_easing](https://svelte.dev/docs#svelte_easing) 참고 바랍니다.
- `opacity` (number, default 0): 애니메이션의 불투명도 값입니다. 설정한 불투명도 값만큼 불투명해졌다 사라집니다.
- `amount` (number, default 5): 단위는 px로 흐릿해지는 애니메이션의 크기입니다.

## `fly` 트랜지션
`fly` 트랜지션은 단어 그대로 요소가 날라오면서 요소를 추가, 제거하는 트랜지션입니다.

### 실행 화면
![fly 트랜지션](/assets/img/posts/svelte/fly_transition.gif)

### 파라미터
- `delay` (number, default 0): 단위는 ms로 설정한 시간이 지난 후에 트랜지션을 시작합니다.
- `duration` (number, default 400): 단위는 ms로 설정한 시간 동안 트랜지션 됩니다.
- `easing` (function, default cubicOut): easing 함수입니다. [https://svelte.dev/docs#svelte_easing](https://svelte.dev/docs#svelte_easing) 참고 바랍니다.
- `x` (number, default 0): 애니메이션에 적용하는 x 위치(offset)입니다. 설정한 만큼 x 위치를 변경합니다.
- `y` (number, default 0) - 애니메이션에 적용하는 y 위치(offset)입니다. 설정한 만큼 y 위치를 변경합니다.
- `opacity` (number, default 0): 애니메이션의 불투명도 값입니다. 설정한 불투명도 값만큼 불투명해졌다 사라집니다.

## `slide` 트랜지션
`slide` 트랜지션은 위에서 아래로 슬라이드로 나타나거나 제거되는 트랜지션입니다.

### 실행 화면
![slide 트랜지션](/assets/img/posts/svelte/slide_transition.gif)

### 파라미터
- `delay` (number, default 0): 단위는 ms로 설정한 시간이 지난 후에 트랜지션을 시작합니다.
- `duration` (number, default 400): 단위는 ms로 설정한 시간 동안 트랜지션 됩니다.
- `easing` (function, default cubicOut): easing 함수입니다. [https://svelte.dev/docs#svelte_easing](https://svelte.dev/docs#svelte_easing) 참고 바랍니다.

## `scale` 트랜지션
`opacity`와 `scale`을 사용하는 트랜지션입니다.

### 실행 화면
![scale 트랜지션](/assets/img/posts/svelte/scale_transition.gif)

### 파라미터
- `delay` (number, default 0): 단위는 ms로 설정한 시간이 지난 후에 트랜지션을 시작합니다.
- `duration` (number, default 400): 단위는 ms로 설정한 시간 동안 트랜지션 됩니다.
- `easing` (function, default cubicOut): easing 함수입니다. [https://svelte.dev/docs#svelte_easing](https://svelte.dev/docs#svelte_easing) 참고 바랍니다.
- `start` (number, default 0) - 애니메이션의 크기(`scale`)입니다. 설정한 크기만큼 커지거나 작아지면서 사라집니다.
- `opacity` (number, default 0): 애니메이션의 불투명도 값입니다. 설정한 불투명도 값만큼 불투명해졌다. 사라집니다.

## `draw` 트랜지션
`draw` 트랜지션은 SVG 요소의 선을 그리듯이 화면에 나타내는 트랜지션입니다.

### 실행 화면
![draw 트랜지션](/assets/img/posts/svelte/draw_transition.gif)

### 파라미터
- `delay` (number, default 0): 단위는 ms로 설정한 시간이 지난 후에 트랜지션을 시작합니다.
- `speed` (number, default undefined): 애니메이션의 속도입니다.
- `duration` (number \| function, default 800): 단위는 ms로 설정한 시간 동안 트랜지션 됩니다.
- `easing` (function, default cubicInOut): easing 함수입니다. [https://svelte.dev/docs#svelte_easing](https://svelte.dev/docs#svelte_easing) 참고 바랍니다.

## `crossfade` 트랜지션
`crossfade` 트랜지션은 이제까지 이야기한 트랜지션과 다른 방법으로 사용해야 합니다. 예제 코드와 실행 결과로 살펴보도록 하겠습니다.

### 예제 코드
{% raw %}
```html
<script>
import { quintOut } from 'svelte/easing';
import { crossfade } from 'svelte/transition';

const [send, receive] = crossfade({
  duration: d => Math.sqrt(d * 200),

  fallback(node, params) {
    const style = getComputedStyle(node);
    const transform = style.transform === 'none' ? '' : style.transform;

    return {
      duration: 600,
      easing: quintOut,
      css: t => `
        transform: ${transform} scale(${t});
        opacity: ${t}
      `
    };
  }
});

let uid = 1;

let todos = [
  { id: uid++, done: false, description: 'write some docs' },
  { id: uid++, done: false, description: 'start writing blog post' },
  { id: uid++, done: true,  description: 'buy some milk' },
];

function add(input) {
  const todo = {
    id: uid++,
    done: false,
    description: input.value
  };

  todos = [todo, ...todos];
  input.value = '';
}

function remove(todo) {
  todos = todos.filter(t => t !== todo);
}

function mark(todo, done) {
  todo.done = done;
  remove(todo);
  todos = todos.concat(todo);
}
</script>

<div class='board'>
<input
  placeholder="what needs to be done?"
  on:keydown={e => e.which === 13 && add(e.target)}
>

<div class='left'>
  <h2>todo</h2>
  {#each todos.filter(t => !t.done) as todo (todo.id)}
    <label
      in:receive="{{key: todo.id}}"
      out:send="{{key: todo.id}}"
    >
      <input type=checkbox on:change={() => mark(todo, true)}>
      {todo.description}
      <button on:click="{() => remove(todo)}">remove</button>
    </label>
  {/each}
</div>

<div class='right'>
  <h2>done</h2>
  {#each todos.filter(t => t.done) as todo (todo.id)}
    <label
      class="done"
      in:receive="{{key: todo.id}}"
      out:send="{{key: todo.id}}"
    >
      <input type=checkbox checked on:change={() => mark(todo, false)}>
      {todo.description}
      <button on:click="{() => remove(todo)}">remove</button>
    </label>
  {/each}
</div>
</div>

<style>
.board {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1em;
  max-width: 36em;
  margin: 0 auto;
}

.board > input {
  font-size: 1.4em;
  grid-column: 1/3;
}

h2 {
  font-size: 2em;
  font-weight: 200;
  user-select: none;
  margin: 0 0 0.5em 0;
}

label {
  position: relative;
  line-height: 1.2;
  padding: 0.5em 2.5em 0.5em 2em;
  margin: 0 0 0.5em 0;
  border-radius: 2px;
  user-select: none;
  border: 1px solid hsl(240, 8%, 70%);
  background-color:hsl(240, 8%, 93%);
  color: #333;
}

input[type="checkbox"] {
  position: absolute;
  left: 0.5em;
  top: 0.6em;
  margin: 0;
}

.done {
  border: 1px solid hsl(240, 8%, 90%);
  background-color:hsl(240, 8%, 98%);
}

button {
  position: absolute;
  top: 0;
  right: 0.2em;
  width: 2em;
  height: 100%;
  background: no-repeat 50% 50% url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23676778' d='M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M17,7H14.5L13.5,6H10.5L9.5,7H7V9H17V7M9,18H15A1,1 0 0,0 16,17V10H8V17A1,1 0 0,0 9,18Z'%3E%3C/path%3E%3C/svg%3E");
  background-size: 1.4em 1.4em;
  border: none;
  opacity: 0;
  transition: opacity 0.2s;
  text-indent: -9999px;
  cursor: pointer;
}

label:hover button {
  opacity: 1;
}
</style>
```
{% endraw %}

### 실행 화면
![crossfade 트랜지션](/assets/img/posts/svelte/crossfade_transition.gif)

### 사용방법
`crossfade` 트랜지션의 사용방법은 다른 트랜지션을 사용하는 방법과 조금 다릅니다. 사용방법을 순서대로 살펴보겠습니다.

- `import { crossfade } from 'svelte/transition';`로 `crossfade` 함수를 가져옵니다.
- `const [send, receive] = crossfade(params)`로 함수를 호출합니다.
- `crossfade` 함수의 파라미터로 `duration`, `delay`, `fallback` 속성을 포함한 객체를 전달합니다.
  - `duration` (number \| function, default: `d => Math.sqrt(d) * 30`): 단위는 ms로 트랜지션 지속시간입니다. 함수일 경우 `d`는 거리입니다.
  - `delay` (number, default: 0): 단위는 ms로 설정한 시간 후에 트랜지션이 시작됩니다.
  - `easing` (function, default: cubicOut): easing 함수입니다. [https://svelte.dev/docs#svelte_easing](https://svelte.dev/docs#svelte_easing) 참고 바랍니다.
  - `fallback` (function): 이동할 대상이 없는 경우 실행되는 트랜지션을 정의합니다.
- `crossfade` 함수의 리턴 값은 `[send, receive]` 형태의 배열입니다.
  - `send`: 내보내는 트랜지션입니다. {% raw %}`out:send="{{key: todo.id}}"`{% endraw %} 형태로 사용해야 합니다. 유니크한 key를 가진 객체를 파라미터로 전달해야 합니다.
  - `receive` 받는 트랜지션입니다. {% raw %}`in:receive="{{key: todo.id}}"`{% endraw %} 형태로 사용해야 합니다. `send` 트랜지션과 동일하게 유니크한 key를 가진 객체를 파라미터로 전달해야 합니다.

받는 대상, 보내는 대상이 없는 경우 `fallback`에 정의한 트랜지션이 동작하게 되는데, `fallback`에 트랜지션을 정의하는 방법은 [/tech/svelte/transitions/#커스텀-트랜지션-만들기](/tech/svelte/transitions/#커스텀-트랜지션-만들기)에서 자세히 이야기하도록 하고 지금은 넘어가도록 하겠습니다.

`send`와 `receive` 트랜지션을 사용할 때, 받을 때 사용한 `in`과 내보낼 때 사용한 `out`에 대해 살펴보겠습니다.

# 트랜지션 In/Out
트랜지션을 사용할 때, `transition` 디렉티브 대신에 `in`, `out` 디렉티브를 사용할 수 있습니다. `in`, `out` 디렉티브를 사용하면 요소가 추가, 제거될 때 각각 다른 트랜지션을 설정할 수 있습니다. `in`, `out` 트랜지션을 사용하는 예제를 살펴보도록 하겠습니다.

{% raw %}
```html
<script>
  import { fade, fly } from 'svelte/transition';
  let visible = true;
</script>

<label>
  <input type="checkbox" bind:checked={visible}>
  visible
</label>

{#if visible}
  <p in:fly="{{ y: 200, duration: 2000 }}" out:fade>
    Flies in, fades out
  </p>
{/if}
```
{% endraw %}

![트랜지션 In/Out](/assets/img/posts/svelte/in_fly_out_fade_transition.gif)

위의 예제는 요소가 추가될 때는 `fly` 트랜지션, 제거될 때는 `fade` 트랜지션이 동작하는 예시입니다.

# 커스텀 트랜지션 만들기
Svelte에서 제공하는 7가지 트랜지션 외의 트랜지션이 필요할 때, 원하는 트랜지션을 만들 수 있습니다. CSS와 자바스크립트를 사용하여 트랜지션을 만드는 방법을 이야기하도록 하겠습니다.

`crossfade` 트렌지션 함수의 `fallback`도 커스텀 트랜지션과 동일한 방법으로 정의하면 됩니다.

## 트랜지션 함수
Svelte에서 제공하는 트랜지션 템플릿은 단순한 함수입니다. `fade` 트랜지션은 실제로 아래 코드와 같이 구현되어 있습니다.

```js
function fade(node, {
  delay = 0,
  duration = 400
}) {
  const o = +getComputedStyle(node).opacity;

  return {
    delay,
    duration,
    css: t => `opacity: ${t * o}`
  };
}
```

트랜지션 함수를 사용하면 얼마든지 커스텀 한 트랜지션을 만들 수 있습니다.

### 파라미터
트랜지션 함수는 2개의 파라미터를 가집니다.

- `node`: 첫 번째 파라미터는 트랜지션이 적용되는 HTML 요소입니다.
- `options`: 두 번째 파라미터는 `transition:fade="options"`에 `options`로 전달될 값입니다. 두 번째 파라미터에는 모든 형태의 값을 전달할 수 있습니다.

### 리턴 값
트랜지션 함수는 객체를 리턴해야 합니다. 리턴하는 객체는 아래의 속성을 가져야 합니다.

- `delay`: 단위는 ms로 설정한 시간이 지난 후에 트랜지션을 시작합니다.
- `duration`: 단위는 ms로 설정한 시간 동안 트랜지션 됩니다.
- `easing`: `p => t` 형태의 easing 함수입니다. [https://svelte.dev/docs#svelte_easing](https://svelte.dev/docs#svelte_easing) 참고 바랍니다.
- `css`: `(t, u) => css` 함수입니다. `t`는 0 ~ 1 사이의 값이고, `u`는 `u === 1 - t`입니다. 요소가 추가될 때 `t`는 0에서 1로 증가하고, 요소가 제거될 때 `t`는 1에서 0으로 감소합니다. `t`(혹은 `u`)의 변화에 따른 CSS 문자열을 리턴해야 합니다.
- `tick`: `(t, u) => {...}` 함수입니다. 매 tick마다 호출되는 콜백 함수입니다.

`css`와 `tick` 속성을 사용하면 커스텀 한 트랜지션을 만들 수 있습니다. `tick` 속성은 매 `tick`마다 호출되는 콜백 함수이기 때문에 `tick`을 사용하여 만들어진 트랜지션은 매끄러운 애니메이션이 동작하지 않을 수 있습니다. 커스텀 한 트랜지션을 만들 때는 `css` 속성을 사용하여 만드는 것을 권장합니다.

## CSS로 트랜지션 만들기
트랜지션 함수의 `css` 속성을 사용하여 트랜지션 함수를 만들어 보도록 하겠습니다.

`css` 속성은 `(t, u) => css` 형태의 함수가 와야 합니다. 간단히 이야기하면, 파라미터인 `t`(혹은 `u`)의 변화에 따라 CSS 문자열을 리턴하는 함수를 만들면 됩니다. 아래 예제를 보면,

{% raw %}
```html
<script>
  import { fade } from 'svelte/transition';
  import { elasticOut } from 'svelte/easing';

  let visible = true;

  function spin(node, { duration }) {
    return {
      duration,
      css: t => {
        const eased = elasticOut(t);

        return `
          transform: scale(${eased}) rotate(${eased * 1080}deg);
          color: hsl(
            ${~~(t * 360)},
            ${Math.min(100, 1000 - 1000 * t)}%,
            ${Math.min(50, 500 - 500 * t)}%
          );`
      }
    };
  }
</script>

<style>
  .centered {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }

  span {
    position: absolute;
    transform: translate(-50%,-50%);
    font-size: 4em;
  }
</style>

<label>
  <input type="checkbox" bind:checked={visible}>
  visible
</label>

{#if visible}
  <div class="centered" in:spin="{{duration: 8000}}" out:fade>
    <span>transitions!</span>
  </div>
{/if}
```
{% endraw %}

![CSS를 사용한 트랜지션](/assets/img/posts/svelte/use_css_transition.gif)

위의 코드를 살펴보면, `css` 속성에 `t`의 변화에 따라 `transform`과 `color`의 CSS 문자열을 리턴하는 `spin` 트랜지션 함수를 볼 수 있습니다.

## JavaScript로 트랜지션 만들기
트랜지션 함수의 `tick` 속성을 사용하여 트랜지션 함수를 만들어 보도록 하겠습니다.

일반적으로는 CSS를 사용해서 트랜지션을 만들어야 하지만 자바스크립트를 사용해야 하는 효과가 있을 수 있습니다. 자바스크립트를 사용한 타자 효과를 표현한 트랜지션 예제를 살펴보겠습니다.

```html
<script>
  let visible = false;

  function typewriter(node, { speed = 50 }) {
    const valid = (
      node.childNodes.length === 1 &&
      node.childNodes[0].nodeType === 3
    );

    if (!valid) {
      throw new Error(`This transition only works on elements with a single text node child`);
    }

    const text = node.textContent;
    const duration = text.length * speed;

    return {
      duration,
      tick: t => {
        const i = ~~(text.length * t);
        node.textContent = text.slice(0, i);
      }
    };
  }
</script>

<label>
  <input type="checkbox" bind:checked={visible}>
  visible
</label>

{#if visible}
  <p in:typewriter>
    The quick brown fox jumps over the lazy dog
  </p>
{/if}
```

![타자기 트랜지션](/assets/img/posts/svelte/typewriter_transition.gif)

# 트랜지션 이벤트
Svelte는 트랜지션이 언제 시작되고 끝이 나는지 알려주는 트랜지션 이벤트를 제공합니다. 사용하는 방법은 다른 DOM 이벤트와 동일합니다. 예제 코드를 살펴보도록 하겠습니다.

{% raw %}
```html
<script>
  import { fly } from 'svelte/transition';

  let visible = true;
  let status = 'waiting...';
</script>

<p>status: {status}</p>

<label>
  <input type="checkbox" bind:checked={visible}>
  visible
</label>

{#if visible}
  <p
    transition:fly="{{ y: 200, duration: 2000 }}"
    on:introstart="{() => status = 'intro started'}"
    on:outrostart="{() => status = 'outro started'}"
    on:introend="{() => status = 'intro ended'}"
    on:outroend="{() => status = 'outro ended'}"
  >
    Flies in and out
  </p>
{/if}
```
{% endraw %}

- `introstart`: 요소가 추가되는 트랜지션의 시작 이벤트입니다.
- `outrostart`: 요소가 제거되는 트랜지션의 시작 이벤트입니다.
- `introend`: 요소가 추가되는 트랜지션의 종료 이벤트입니다.
- `outroend`: 요소가 제거되는 트랜지션의 종료 이벤트입니다.

# `local` 수식어
Svelte의 트랜지션은 `local` 수식어를 제공합니다. `local` 수식어를 사용하면 상위 블록에 요소가 추가될 경우에만 트랜지션이 동작합니다. 말로는 이해하기 어려우니 예제를 하나 살펴보도록 하겠습니다.

```html
<script>
  import { slide } from 'svelte/transition';

  let showItems = true;
  let i = 5;
  let items = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
</script>

<style>
  div {
    padding: 0.5em 0;
    border-top: 1px solid #eee;
  }
</style>

<label>
  <input type="checkbox" bind:checked={showItems}>
  show list
</label>

<label>
  <input type="range" bind:value={i} max=10>
</label>

{#if showItems}
  {#each items.slice(0, i) as item}
    <div transition:slide|local>
      {item}
    </div>
  {/each}
{/if}
```

위의 코드와 같이 `transition:slide|local` 사용하여 `local` 수식어를 사용할 수 있습니다. 위의 코드는 `local` 수식어를 사용했기 때문에 상위 블록에 요소인 `{#each }` 블록에 요소가 추가될 때에만 트랜지션이 동작합니다. `local` 수식어 사용한 경우와 사용하지 않은 경우를 비교해 보겠습니다.

|`local` 미사용|`local` 사용|
|:---:|:---:|
|![local 미사용](/assets/img/posts/svelte/not_use_local.gif)|![local 사용](/assets/img/posts/svelte/use_local.gif)|

위의 2개의 그림을 비교해서 보면,

- `local` 수식어 미사용: 전체 리스트가 나타날 때와 목록이 추가될 때 트랜지션이 동작하는 것을 볼 수 있습니다.
- `local` 수식어 사용: 전체 리스트가 나타날 때는 트랜지션이 동작하지 않지만 목록이 추가될 때는 트랜지션이 동작하는 것을 볼 수 있습니다.

#### 참고
- [https://svelte.dev/tutorial/transition](https://svelte.dev/tutorial/transition)
- [https://svelte.dev/tutorial/adding-parameters-to-transitions](https://svelte.dev/tutorial/adding-parameters-to-transitions)
- [https://svelte.dev/tutorial/in-and-out](https://svelte.dev/tutorial/in-and-out)
- [https://svelte.dev/tutorial/custom-css-transitions](https://svelte.dev/tutorial/custom-css-transitions)
- [https://svelte.dev/tutorial/deferred-transitions](https://svelte.dev/tutorial/deferred-transitions)
- [https://svelte.dev/tutorial/transition-events](https://svelte.dev/tutorial/transition-events)
- [https://svelte.dev/tutorial/local-transitions](https://svelte.dev/tutorial/local-transitions)
- [https://svelte.dev/tutorial/deferred-transitions](https://svelte.dev/tutorial/deferred-transitions)