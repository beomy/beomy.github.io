---
layout: post
title: '[Svelte] Svelte 요소'
featured-img: svelte/svelte-log.svg
height-img: 200px
category: [tech, svelte]
summary: Svelte는 유용한 몇가지 내장 요소(element)를 제공합니다.
---
{% include toc.html %}

Svelte는 유용한 몇가지 내장 요소(element)를 제공합니다.

# `<svelte:selft>`
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

아래와 같이 표현 할 수 있습니다.

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

위의 코드에서 사용된 `this`는 컴포넌트나 falsy 값이 올 수 있습니다. falsy가 올 경우 컴포넌트가 렌더링 되지 않습니다.

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

<style>
  div {
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  kbd {
    background-color: #eee;
    border-radius: 4px;
    font-size: 6em;
    padding: 0.2em 0.5em;
    border-top: 5px solid rgba(255,255,255,0.5);
    border-left: 5px solid rgba(255,255,255,0.5);
    border-right: 5px solid rgba(0,0,0,0.2);
    border-bottom: 5px solid rgba(0,0,0,0.2);
    color: #555;
  }
</style>

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

# `<svelte:body>`

# `<svelte:head>`

# `<svelte:options>`

#### 참고
- [https://svelte.dev/tutorial/svelte-self](https://svelte.dev/tutorial/svelte-self)
- [https://svelte.dev/tutorial/svelte-component](https://svelte.dev/tutorial/svelte-component)
- [https://svelte.dev/tutorial/svelte-window](https://svelte.dev/tutorial/svelte-window)
- [https://svelte.dev/tutorial/svelte-window-bindings](https://svelte.dev/tutorial/svelte-window-bindings)
- [https://svelte.dev/tutorial/svelte-body](https://svelte.dev/tutorial/svelte-body)
- [https://svelte.dev/tutorial/svelte-head](https://svelte.dev/tutorial/svelte-head)
- [https://svelte.dev/tutorial/svelte-options](https://svelte.dev/tutorial/svelte-options)