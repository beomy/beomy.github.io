---
layout: post
title: '[Svelte] Svelte 요소'
featured-img: svelte/svelte-log.svg
height-img: 200px
category: [tech, svelte]
summary: Svelte는 유용한 몇가지 내장 요소(element)를 제공합니다.
---

Svelte는 유용한 몇 가지 내장 요소(element)를 제공합니다.

# `<svelte:self>`
`<svelte:self>`는 컴포넌트가 재귀적으로 자신을 포함할 수 있게 하는 요소입니다. 이 요소는 폴더 트리 구조와 같은 형태를 표현해야 할 때 유용합니다.

```html
<!-- App.svelte -->
<script>
  import Folder from './Folder.svelte';

  let root = [
    {
      type: 'folder',
      name: 'Important work stuff',
      files: [
        { type: 'file', name: 'quarterly-results.xlsx' }
      ]
    },
    {
      type: 'folder',
      name: 'Animal GIFs',
      files: [
        {
          type: 'folder',
          name: 'Dogs',
          files: [
            { type: 'file', name: 'treadmill.gif' },
            { type: 'file', name: 'rope-jumping.gif' }
          ]
        },
        {
          type: 'folder',
          name: 'Goats',
          files: [
            { type: 'file', name: 'parkour.gif' },
            { type: 'file', name: 'rampage.gif' }
          ]
        },
        { type: 'file', name: 'cat-roomba.gif' },
        { type: 'file', name: 'duck-shuffle.gif' },
        { type: 'file', name: 'monkey-on-a-pig.gif' }
      ]
    },
    { type: 'file', name: 'TODO.md' }
  ];
</script>

<Folder name="Home" files={root} expanded/>
```

```html
<!-- File.svelte -->
<script>
  export let name;
  $: type = name.slice(name.lastIndexOf('.') + 1);
</script>

<style>
  span {
    padding: 0 0 0 1.5em;
    background: 0 0.1em no-repeat;
    background-size: 1em 1em;
  }
</style>

<span style="background-image: url(tutorial/icons/{type}.svg)">{name}</span>
```

```html
<!-- Folder.svelte -->
<script>
  import File from './File.svelte';

  export let expanded = false;
  export let name;
  export let files;

  function toggle() {
    expanded = !expanded;
  }
</script>

<style>
  span {
    padding: 0 0 0 1.5em;
    background: url(tutorial/icons/folder.svg) 0 0.1em no-repeat;
    background-size: 1em 1em;
    font-weight: bold;
    cursor: pointer;
  }

  .expanded {
    background-image: url(tutorial/icons/folder-open.svg);
  }

  ul {
    padding: 0.2em 0 0 0.5em;
    margin: 0 0 0 0.5em;
    list-style: none;
    border-left: 1px solid #eee;
  }

  li {
    padding: 0.2em 0;
  }
</style>

<span class:expanded on:click={toggle}>{name}</span>

{#if expanded}
  <ul>
    {#each files as file}
      <li>
        {#if file.type === 'folder'}
          <svelte:self {...file}/>
        {:else}
          <File {...file}/>
        {/if}
      </li>
    {/each}
  </ul>
{/if}
```

![svelte:option self 사용](/assets/img/posts/svelte/use_svelte_options_self.gif)


`Folder.svelte`를 보면, 폴더일 경우 아래와 같이 작성을 해야 합니다.

```html
{#if file.type === 'folder'}
  <Folder {...file}/>
{:else}
  <File {...file}/>
{/if}
```

하지만 자기 자신을 `import` 하는 것은 불가능하기 때문에, 아래와 같이 작성되어야 합니다.

```html
{#if file.type === 'folder'}
  <svelte:self {...file}/>
{:else}
  <File {...file}/>
{/if}
```

# `<svelte:component>`
`<svelte:component>`를 사용하면 아래와 같은 if 블록 대신,

```html
<script>
  import RedThing from './RedThing.svelte';
  import GreenThing from './GreenThing.svelte';
  import BlueThing from './BlueThing.svelte';

  const options = [
    { color: 'red',   component: RedThing   },
    { color: 'green', component: GreenThing },
    { color: 'blue',  component: BlueThing  },
  ];

  let selected = options[0];
</script>

<select bind:value={selected}>
  {#each options as option}
    <option value={option}>{option.color}</option>
  {/each}
</select>

{#if selected.color === 'red'}
  <RedThing/>
{:else if selected.color === 'green'}
  <GreenThing/>
{:else if selected.color === 'blue'}
  <BlueThing/>
{/if}
```

아래와 같이 표현할 수 있습니다.

```html
<script>
  import RedThing from './RedThing.svelte';
  import GreenThing from './GreenThing.svelte';
  import BlueThing from './BlueThing.svelte';

  const options = [
    { color: 'red',   component: RedThing   },
    { color: 'green', component: GreenThing },
    { color: 'blue',  component: BlueThing  },
  ];

  let selected = options[0];
</script>

<select bind:value={selected}>
  {#each options as option}
    <option value={option}>{option.color}</option>
  {/each}
</select>

<svelte:component this={selected.component}/>
```

위의 코드에서 사용된 `this`는 컴포넌트나 falsy 값이 올 수 있습니다. falsy가 올 경우 컴포넌트는 렌더링 되지 않습니다.

# `<svelte:window>`
DOM 요소에 이벤트를 등록하는 것처럼 `<svelte:window>`를 사용하여 `window` 객체에 이벤트를 등록할 수 있습니다.

```html
<script>
  let key;
  let keyCode;

  function handleKeydown(event) {
    key = event.key;
    keyCode = event.keyCode;
  }
</script>

<svelte:window on:keydown={handleKeydown}/>

<div style="text-align: center">
  {#if key}
    <kbd>{key === ' ' ? 'Space' : key}</kbd>
    <p>{keyCode}</p>
  {:else}
    <p>Focus this window and press any key</p>
  {/if}
</div>
```

DOM 요소와 동일하게 `preventDefault`와 같은 이벤트 수식어를 사용할 수 있습니다.

## binding
`window` 객체의 `scrolY` 등의 값을 바인딩 할 수 있습니다.

```html
<svelte:window bind:scrollY={y}/>
```

바인딩 할 수 있는 목록은 아래와 같습니다.

- `innerWidth`
- `innerHeihgt`
- `outerWidth`
- `outerHeight`
- `scrollX`
- `scrollY`
- `online`: `window.navigator.onLine`의 별칭입니다.

`scrollX`와 `scrollY`를 제외한 모든 값은 readonly입니다.

# `<svelte:body>`
`<svelte:body>`와 `<svelte:window>`는 사용법이 비슷합니다. `window` 객체에 이벤트를 등록할 수 있듯이, `document.body`에 이벤트를 등록할 수 있습니다.

`window` 객체에는 `mouseenter`, `mouseleave` 이벤트를 등록할 수 없지만, `<svelte:body>`를 사용하면 등록이 가능합니다.

```html
<svelte:body
  on:mouseenter={handleMouseenter}
  on:mouseleave={handleMouseleave}
/>
```

# `<svelte:head>`
`<svelte:head>`를 사용하면 `<head>`에 요소를 추가할 수 있습니다.

```html
<svelte:head>
  <link rel="stylesheet" href="tutorial/dark-theme.css">
</svelte:head>
```

# `<svelte:options>`
`<svelte:options>`를 사용하면 컴파일 옵션을 지정할 수 있습니다.

```html
<svelte:options option={value}/>
```

- `immutable={true}`: 변하지 않는 데이터를 사용할 것이라고 컴파일러에게 알려주는 옵션입니다. 컴파일러는 간단한 검사로 참조 값이 변경되었는지 검사합니다.
- `immutable={false}`: 기본값입니다. 좀 더 보수적(엄격하게)으로 값이 변경되었는지 확인하는 옵션입니다.
- `accessors={true}`: 컴포넌트의 props에 getter와 setter를 추가합니다.
- `accessors={false}`: 기본값입니다.
- `namespace:"..."`: 컴포넌트가 사용될 네임스페이스입니다. 일반적으로 `svg`에서 사용됩니다.
- `tag="..."`: 컴포넌트를 사용자가 정의한 요소로 컴파일할 때 사용되는 옵션입니다.

`immutable` 옵션을 사용한 예제를 하나 살펴보겠습니다.

```html
<!-- App.svelte -->
<script>
  import Todo from './Todo.svelte';

  let todos = [
    { id: 1, done: true, text: 'wash the car' },
    { id: 2, done: false, text: 'take the dog for a walk' },
    { id: 3, done: false, text: 'mow the lawn' }
  ];

  function toggle(toggled) {
    todos = todos.map(todo => {
      if (todo === toggled) {
        // return a new object
        return {
          id: todo.id,
          text: todo.text,
          done: !todo.done
        };
      }

      // return the same object
      return todo;
    });
  }
</script>

<h2>Todos</h2>
{#each todos as todo}
  <Todo {todo} on:click={() => toggle(todo)}/>
{/each}
```

```html
<!-- Todo.svelte -->
<script>
  import { afterUpdate } from 'svelte';
  import flash from './flash.js';

  export let todo;

  let div;

  afterUpdate(() => {
    flash(div);
  });
</script>

<style>
  div {
    cursor: pointer;
    line-height: 1.5;
  }
</style>

<!-- the text will flash red whenever
    the `todo` object changes -->
<div bind:this={div} on:click>
  {todo.done ? '👍': ''} {todo.text}
</div>
```

```js
// flash.js
export default function flash(element) {
  requestAnimationFrame(() => {
    element.style.transition = 'none';
    element.style.color = 'rgba(255,62,0,1)';
    element.style.backgroundColor = 'rgba(255,62,0,0.2)';

    setTimeout(() => {
      element.style.transition = 'color 1s, background 1s';
      element.style.color = '';
      element.style.backgroundColor = '';
    });
  });
}
```

![svelte:option 미사용](/assets/img/posts/svelte/not_use_svelte_options_immutable.gif)

`immutable`를 사용하지 않으면 보수적인 검사를 실행하기 때문에, `todos`가 재할당 되었을 때 모든 리스트 목록이 변경된 것으로 인식합니다. 위의 `Todo.svelte` 코드를 아래와 같이 `<svelte:options immutable={true}/>`를 추가하면,

```html
<svelte:options immutable={true}/>

<script>
  import { afterUpdate } from 'svelte';
  import flash from './flash.js';

  export let todo;

  let div;

  afterUpdate(() => {
    flash(div);
  });
</script>

<style>
  div {
    cursor: pointer;
    line-height: 1.5;
  }
</style>

<!-- the text will flash red whenever
    the `todo` object changes -->
<div bind:this={div} on:click>
  {todo.done ? '👍': ''} {todo.text}
</div>
```

![svelte:option immutable 사용](/assets/img/posts/svelte/use_svelte_options_immutable.gif)

간단한 검사만 실행하기 때문에 실제 변경된 요소만 변경되는 것으로 인식하게 됩니다.

#### 참고
- [https://svelte.dev/tutorial/svelte-self](https://svelte.dev/tutorial/svelte-self)
- [https://svelte.dev/tutorial/svelte-component](https://svelte.dev/tutorial/svelte-component)
- [https://svelte.dev/tutorial/svelte-window](https://svelte.dev/tutorial/svelte-window)
- [https://svelte.dev/tutorial/svelte-window-bindings](https://svelte.dev/tutorial/svelte-window-bindings)
- [https://svelte.dev/tutorial/svelte-body](https://svelte.dev/tutorial/svelte-body)
- [https://svelte.dev/tutorial/svelte-head](https://svelte.dev/tutorial/svelte-head)
- [https://svelte.dev/tutorial/svelte-options](https://svelte.dev/tutorial/svelte-options)
- [https://svelte.dev/docs#svelte_options](https://svelte.dev/docs#svelte_options)