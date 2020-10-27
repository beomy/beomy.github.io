---
layout: post
title: '[Svelte] 애니메이션'
featured-img: svelte/svelte-log.svg
height-img: 200px
category: [tech, svelte]
summary: Svelte는 애니메이션을 간편히 사용할 수 있도록 애니메이션 디렉티브를 제공합니다.
---

Svelte는 애니메이션을 간편히 사용할 수 있도록 애니메이션 디렉티브를 제공합니다. 이번 포스트에서는 애니메이션 디렉티브를 이야기하도록 하겠습니다.

# 애니메이션
애니메이션을 간단하게 사용할 수 있는 애니메이션 디렉티브 사용 방법을 살펴보겠습니다.

## `flip` 함수
[`crossfade` 트랜지션](/tech/svelte/transitions#crossfade-트랜지션) 예제에 Todo 아이템이 추가, 삭제됐을 때에 애니메이션을 추가하는 예제를 살펴보겠습니다.

{% raw %}
```html
<script>
  import { quintOut } from 'svelte/easing';
  import { crossfade } from 'svelte/transition';
  import { flip } from 'svelte/animate';

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
    { id: uid++, done: false, description: 'mow the lawn' },
    { id: uid++, done: false, description: 'feed the turtle' },
    { id: uid++, done: false, description: 'fix some bugs' },
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
        animate:flip
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
        animate:flip
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

![애니메이션](/assets/img/posts/svelte/animation.gif)

위의 예제와 [`crossfade` 디렉티브](/tech/svelte/transitions#crossfade-트랜지션) 예제는 애니메이션 디렉티브인 `animate:flip`가 추가되었다는 부분만 차이가 있습니다.

`flip`은 [First, Last, Invert, Play](https://aerotwist.com/blog/flip-your-animations/)의 약어로 애니메이션 기법 중 하나입니다. 단순히 말하면, `filp`은 시작 위치와 마지막 위치를 계산하고 애니메이션을 적용하여 `x` 및 `y`를 변환합니다.

### 파라미터
`flip` 함수는 아래와 같은 파라미터를 가집니다.

- `delay` (number, default 0): 단위는 ms로 설정한 시간이 지난 후에 애니메이션을 시작합니다.
- `duration` (number \| function, default: `d => Math.sqrt(d) * 120`): 숫자 혹은 함수가 올 수 있습니다.
  - `number`: 단위는 ms입니다.
  - `function`: `distance: number => duration: number` 형태의 함수가 와야 합니다. `distance`는 애니메이션으로 움직여야 할 픽셀입니다. 함수의 리턴 값은 ms 단위의 지속시간입니다.
- `easing` (function, default cubicOut): easing 함수입니다. [https://svelte.dev/docs#svelte_easing](https://svelte.dev/docs#svelte_easing) 참고 바랍니다.

# 커스텀 애니메이션 만들기
애니메이션 또한 트랜지션과 동일하게 원하는 애니메이션을 만들 수 있습니다.

## 애니메이션 함수
애니메이션 함수의 형태와 애니메이션 함수의 파라미터로 사용되는 `DOMRect` 객체의 형태는 아래와 같습니다.

```js
animation = (node: HTMLElement, { from: DOMRect, to: DOMRect } , params: any) => {
  delay?: number,
  duration?: number,
  easing?: (t: number) => number,
  css?: (t: number, u: number) => string,
  tick?: (t: number, u: number) => void
}
```

```js
DOMRect {
  bottom: number,
  height: number,
  ​​left: number,
  right: number,
  ​top: number,
  width: number,
  x: number,
  y: number
}
```

### 파라미터
애니메이션 함수는 3개의 파라미터를 가집니다.

- `node`: 첫 번째 파라미터는 애니메이션이 적용되는 HTML 요소입니다.
- `{ from: DOMRect, to: DOMRect }`: 두 번째 파라미터는 애니메이션을 시작될 때의 정보 `from`과 애니메이션이 끝날 때의 정보 `to`를 속성으로 가지는 객체입니다.
  - `DOMRect`: 애니메이션이 적용되는 요소의 위치 크기 등의 정보를 가지는 객체입니다.
- `params`: 세 번째 파라미터는 `animate:애니메이션 이름={params}`의 `params`로 전달될 값입니다. 모든 형태의 값을 전달할 수 있습니다.

### 리턴 값
애니메이션 함수는 객체를 리턴해야 합니다. 리턴하는 객체는 아래의 속성을 가져야 하는데, 트랜지션 함수의 객체와 동일합니다.

- `delay`: 단위는 ms로 설정한 시간이 지난 후에 애니메이션을 시작합니다.
- `duration`: 단위는 ms로 설정한 시간 동안 애니메이션이 동작합니다.
- `easing`: `p => t` 형태의 easing 함수입니다. [https://svelte.dev/docs#svelte_easing](https://svelte.dev/docs#svelte_easing) 참고 바랍니다.
- `css`: `(t, u) => css` 함수입니다. `t`는 0 ~ 1 사이의 값이고, `u`는 `u === 1 - t`입니다. 요소가 추가될 때 `t`는 0에서 1로 증가하고, 요소가 제거될 때 `t`는 1에서 0으로 감소합니다. `t`(혹은 `u`)의 변화에 따른 CSS 문자열을 리턴해야 합니다.
- `tick`: `(t, u) => {...}` 함수입니다. 매 tick마다 호출되는 콜백 함수입니다.

# 애니메이션 사용 시 주의사항
애니메이션을 사용할 때 몇 가지 주의사항들을 살펴보겠습니다.

## key가 있는 `each` 블록 안에서 사용
key가 정의된 `each` 블록 안에서 애니메이션이 동작합니다. `{#each todos.filter(t => t.done) as todo (todo.id)}` 와 같이 key가 정의된 `each` 블록 내부에서 애니메이션 디렉티브를 사용해야 합니다.

## 배열이 재정렬 될 때 트리거 됨
`each` 블록의 배열이 재정렬 될 때에만 애니메이션이 동작합니다. 즉,

```html
<!-- When `list` is reordered the animation will run-->
{#each list as item, index (item)}
  <li animate:flip>{item}</li>
{/each}
```

위의 코드의 `list`가 재정렬 될 때 애니메이션이 동작합니다.

## `each` 블록 직계 요소에 사용
애니메이션 디렉티브는 key가 정의된 `each` 블록의 직계 자식 요소에 정의되어야 합니다.

#### 참고
- [https://svelte.dev/tutorial/animate](https://svelte.dev/tutorial/animate)
- [https://svelte.dev/docs#flip](https://svelte.dev/docs#flip)
- [https://aerotwist.com/blog/flip-your-animations/](https://aerotwist.com/blog/flip-your-animations/)
- [https://svelte.dev/docs#animate_fn](https://svelte.dev/docs#animate_fn)