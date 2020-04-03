---
layout: post
title: '[Svelte] 데이터 바인딩 기초'
featured-img: svelte/svelte-log.svg
height-img: 200px
category: [tech, svelte]
summary: Svelte의 기본적인 데이터 바인딩을 이야기합니다.
---
{% include toc.html %}

이번 포스트에서는 데이터 바인딩을 이야기합니다. Vue.js에서 `v-model`로 데이터 바인딩 하는 방법을 Svelte에서는 어떻게 바인딩 하는지 알아보도록 하겠습니다.

# `input`
`<input>` 태그의 데이터 바인딩을 살펴보도록 하겠습니다. 데이터 바인딩을 하지 않으면, `value` 속성에 값을 할당하고 `input` 이벤트가 발생할 때마다 `value` 속성을 업데이트해 줘야 합니다. 데이터 바인딩으로 이 과정을 생략할 수 있습니다.

## `type="text"`
`<input>` 태그의 `type` 속성이 `text` 혹은 정의되어 있지 않을 경우, Vue.js는 아래와 같이 `v-model`을 사용하여 아래와 같이 데이터 바인딩을 구현할 수 있습니다.

{% raw %}
```html
<template>
  <div>
    <input v-model="name">
    <h1>Hello {{ name }}!</h1>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        name: 'world'
      }
    }
  }
</script>
```
{% endraw %}

위의 코드를 Svelte에서는 아래 코드와 같이 구현할 수 있습니다.

```html
<script>
  let name = 'world';
</script>

<input bind:value="{name}">
<h1>Hello {name}!</h1>
```

Svelte의 `bind:value`는 Vue.js의 `v-model`과 동일한 역할을 합니다.

## `type="number"`, `type="range"`
`<input>` 태그 `value` 속성의 값의 데이터 타입이 `Number`로 지정하는 방법을 살펴보도록 하겠습니다. Vue.js에서는 아래와 같이 구현할 수 있습니다.

{% raw %}
```html
<template>
  <div>
    <label>
      <input v-model.number="a" type="number" min="0" max="10">
      <input v-model.number="a" type=range min="0" max="10">
    </label>

    <label>
      <input v-model.number="b" type="number" min="0" max="10">
      <input v-model.number="b" type=range min="0" max="10">
    </label>

    <p>{{ a }} + {{ b }} = {{ a + b }}</p>
  </div>
</template>
<script>
  export default {
    data () {
      return: {
        a: 1,
        b: 2
      }
    }
  }
</script>
```
{% endraw %}

Vue.js는 `v-model.number`을 사용하여 바인딩 된 데이터 타입을 `Number`로 지정할 수 있습니다. Svelte는 아래 코드와 같이 구현할 수 있습니다.

```html
<script>
  let a = 1;
  let b = 2;
</script>

<label>
  <input type="number" bind:value="{a}" min="0" max="10">
  <input type="range" bind:value="{a}" min="0" max="10">
</label>

<label>
  <input type="number" bind:value="{b}" min="0" max="10">
  <input type="range" bind:value="{b}" min="0" max="10">
</label>

<p>{a} + {b} = {a + b}</p>
```

Svelte에서는 Vue.js와는 달리 별도의 코드를 추가할 필요 없이 `<input>` 태그의 `type` 속성이 `number` 또는 `range`일 경우 자동으로 `Number` 타입으로 지정됩니다.

## `type="checkbox"`
`<input type="checkbox">`를 살펴보도록 하겠습니다. Vue.js에서는 아래 코드와 같이 `<input type="checkbox">`을 사용할 수 있습니다.

{% raw %}
```html
<template>
  <div>
    <label>
      <input v-model="yes" type="checkbox">
      Yes! Send me regular email spam
    </label>

    <p v-if="yes">Thank you. We will bombard your inbox and sell your personal details.</p>
    <p v-else>You must opt in to continue. If you're not paying, you're the product.</p>

    <button :disabled="!yes">
      Subscribe
    </button>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        yes: false
      }
    }
  }
</script>
```
{% endraw %}

위의 코드를 Svelte에서는 아래와 같이 구현할 수 있습니다.

```html
<script>
  let yes = false;
</script>

<label>
  <input type="checkbox" bind:checked="{yes}">
  Yes! Send me regular email spam
</label>

{#if yes}
  <p>Thank you. We will bombard your inbox and sell your personal details.</p>
{:else}
  <p>You must opt in to continue. If you're not paying, you're the product.</p>
{/if}

<button disabled="{!yes}">
  Subscribe
</button>
```

## `type="radio"`
`<input type="radio">`의 경우 여러 개의 `<input>` 태그들에 동일한 데이터를 바인딩 해야 합니다. Vue.js에서는 아래와 같이 구현할 수 있습니다.

{% raw %}
```html
<template>
  <div>
    <label>
      <input type="radio" value="One" v-model="picked">
      One
    </label>
    <br>
    <label>
      <input type="radio" value="Two" v-model="picked">
      Two
    </label>
    <br>
    <span>선택: {{picked}}</span>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        picked: null
      }
    }
  }
</script>
```
{% endraw %}

Vue.js에서는 `v-model`에 동일한 데이터를 바인딩하고 `value`에 각각의 `<input>` 태그들을 선택했을 경우에 저장되는 데이터를 지정합니다. Svelte에서는 아래와 같이 구현할 수 있습니다.

```html
<script>
  let picked = null;
</script>
<label>
  <input type="radio" value="One" bind:group="{picked}">
  One
</label>
<br>
<label>
  <input type="radio" value="Two" bind:group="{picked}">
  Two
</label>
<br>
<span>선택: {picked}</span>
```

Svelte에서는 `bind:group`을 사용하여 데이터를 바인딩하고 `value`에 각각의 `<input>` 태그들을 선택했을 경우에 저장되는 데이터를 지정합니다.

### `bind:group`
`bind:group`는 `<input type="radio">`에서뿐만 아니라 여러 개의 `<input>` 태그에 하나의 데이터를 바인딩 해야 할 때 사용할 수 있습니다. Vue.js에서는 아래와 같이 구현할 수 있습니다.

{% raw %}
```html
<template>
  <div>
    <label v-for="(name, index) of names" :key="index">
      <input type="checkbox" :value="name" v-model="checkedNames">
      {{ name }}
    </label>
    <br>
    <span>체크한 이름: {{ checkedNames }}</span>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        names: ['jack', 'John', 'Mike'],
        checkedNames: []
      }
    }
  }
</script>
```
{% endraw %}

위의 코드를 Svelte에서는 아래 코드와 같이 구현할 수 있습니다.

```html
<script>
  const names = ['jack', 'John', 'Mike'];
  let checkedNames = [];
</script>
{#each names as name, index (index)}
  <label>
    <input type="checkbox" value="{name}" bind:group="{checkedNames}">
    {name}
  </label>
{/each}
<br>
<span>체크한 이름: {checkedNames}</span>
```

위의 코드와 같이 Svelte에서 `bind:group`는 `<input type="radio">`에서뿐만 아니라 동일한 데이터를 바인딩을 해야 할 경우 사용할 수 있습니다.

# `textarea`
`<textarea>` 태그의 데이터 바인딩 방법을 살펴보도록 하겠습니다. Vue.js에서는 아래와 같이 사용할 수 있습니다.

{% raw %}
```html
<template>
  <textarea v-model={value}></textarea>
</template>
<script>
  export default {
    data () {
      return {
        value: 'Some Text'
      }
    }
  }
</script>
<style>
	textarea { width: 100%; height: 200px; }
</style>
```
{% endraw %}

위의 코드를 Svelte에서는 아래와 같이 구현할 수 있습니다.

```html
<script>
  let value = 'Some Text';
</script>

<style>
  textarea { width: 100%; height: 200px; }
</style>

<textarea bind:value="{value}"></textarea>
```

바인딩 해야 하는 속성 이름과 변수의 이름이 동일할 때(위의 코드에서는 `bind:value`의 `value`와 `let value`의 `value`), 아래와 같이 약어 기능을 제공합니다.

```html
<textarea bind:value></textarea>
```

`<textarea>` 태그의 데이터 바인딩 방법은 `<input type="text">` 태그와 동일합니다.

# `select`
`<select>` 태그의 데이터 바인딩 방법을 살펴보도록 하겠습니다. Vue.js에서는 아래와 같이 사용할 수 있습니다.

{% raw %}
```html
<template>
  <div>
    <select v-model="selected">
      <option
        v-for="item of list"
        :key="item.id"
        :value="item"
      >
        {{ item.text }}
      </option>
    </select>
    <span>선택함: {{ selected ? selected.id : 'waiting...' }}</span>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        list: [
          { id: 1, text: 'A' },
          { id: 2, text: 'B' },
          { id: 3, text: 'C' }
        ],
        selected: null
      }
    }
  }
</script>
```
{% endraw %}

위의 코드를 Svelte는 아래 코드와 같이 구현할 수 있습니다.

```html
<script>
  const list = [
    { id: 1, text: 'A' },
    { id: 2, text: 'B' },
    { id: 3, text: 'C' }
  ]
  let selected
</script>
<select bind:value="{selected}">
  {#each list as item (item.id)}
    <option value="{item}">{item.text}</option>
  {/each}
</select>
<span>선택함: {selected ? selected.id : 'waiting...'}</span>
```

`bind:value`로 데이터 바인딩 되는 값의 타입은 Object, String은 물론 모든 타입이 가능합니다. 바인딩 데이터의 초깃값이 정의되어 있지 않다면 리스트의 첫 번째 값이 디폴트 값으로 저장됩니다.

## `multiple`
`<select>` 태그는 `multiple` 속성을 지원합니다. `multiple` 속성을 설정하면 바인딩 된 데이터는 배열 타입이 됩니다. Vue.js에서는 아래 코드와 같이 사용할 수 있습니다.

{% raw %}
```html
<template>
  <div>
    <select v-model="selected" multiple>
      <option
        v-for="item of list"
        :key="item.id"
        :value="item"
      >
        {{ item.text }}
      </option>
    </select>
    <span>선택함: {{ selected ? selected.map(x => x.id).join(',') : 'waiting...' }}</span>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        list: [
          { id: 1, text: 'A' },
          { id: 2, text: 'B' },
          { id: 3, text: 'C' }
        ],
        selected: []
      }
    }
  }
</script>
```
{% endraw %}

위의 코드를 Svelte에서는 아래와 같이 작성할 수 있습니다.

```html
<script>
  const list = [
    { id: 1, text: 'A' },
    { id: 2, text: 'B' },
    { id: 3, text: 'C' }
  ]
  let selected = []
</script>
<select multiple bind:value="{selected}">
  {#each list as item (item.id)}
    <option value="{item}">{item.text}</option>
  {/each}
</select>
<span>선택함: {selected ? selected.map(x => x.id).join(',') : 'waiting...'}</span>
```

# `contenteditable`
`contenteditable="true"`를 사용하면 `textContent`와 `innerHTML` 바인딩을 지원합니다. Vue.js에서는 지원하지 않는 기능입니다. Svelte는 아래와 같이 사용할 수 있습니다.

```html
<script>
  let html = '<p>Write some text!</p>';
</script>

<div
  contenteditable="true"
  bind:innerHTML={html}
></div>

<pre>{html}</pre>

<style>
  [contenteditable] {
    padding: 0.5em;
    border: 1px solid #eee;
    border-radius: 4px;
  }
</style>
```

# Each 블록 바인딩
이번에는 반복문 블록 안에서 데이터 바인딩 하는 방법을 알아보도록 하겠습니다. Vue.js에서는 아래 코드와 같이 사용할 수 있습니다.

{% raw %}
```html
<template>
  <h1>Todos</h1>

  <div
    v-for="(todo, index) of todos"
    :key="index"
    :class="{ done: todo.done }"
  >
    <input
      v-model="todo.done"
      type="checkbox"
    >

    <input
      v-model="todo.text"
      placeholder="What needs to be done?"
    >
  </div>

  <p>{{ remaining }} remaining</p>

  <button @click="add">Add new</button>
  <button @click="clear">Clear completed</button>
</template>
<script>
  export default {
    data () {
      return {
        todos: [
          { done: false, text: 'finish Svelte tutorial' },
          { done: false, text: 'build an app' },
          { done: false, text: 'world domination' }
        ]
      }
    },
    computed: {
      remaining () {
        return this.todos.filter(t => !t.done).length
      }
    },
    methods: {
      add () {
        this.todos.push({ done: false, text: '' })
      },
      clear () {
        this.todos = this.todos.filter(t => !t.done);
      }
    }
  }
</script>
<style>
  .done {
    opacity: 0.4;
  }
</style>
```
{% endraw %}

위의 코드를 Svelte에서 아래와 같이 구현할 수 있습니다.

```html
<script>
  let todos = [
    { done: false, text: 'finish Svelte tutorial' },
    { done: false, text: 'build an app' },
    { done: false, text: 'world domination' }
  ];

  function add() {
    todos = todos.concat({ done: false, text: '' });
  }

  function clear() {
    todos = todos.filter(t => !t.done);
  }

  $: remaining = todos.filter(t => !t.done).length;
</script>

<style>
  .done {
    opacity: 0.4;
  }
</style>

<h1>Todos</h1>

{#each todos as todo, index (index)}
  <div class:done={todo.done}>
    <input
      type=checkbox
      bind:checked={todo.done}
    >

    <input
      placeholder="What needs to be done?"
      bind:value={todo.text}
    >
  </div>
{/each}

<p>{remaining} remaining</p>

<button on:click={add}>Add new</button>
<button on:click={clear}>Clear completed</button>
```

위의 Svelte 코드는 많은 기능을 사용한 코드입니다.

- `add`와 `clear` 함수는 반응형 동작을 위해 `todos`를 재할당 합니다.
- `$:`는 `todos`가 변경되었을 때 실행됩니다. `!done`인 `todos`의 개수를 `remaining`에 저장합니다.
- `class:done`은 `todo.done`이 ture일 경우 `done` 클래스가 추가됩니다.
- `{#each todos as todo, index (index)}` 블록 내에 `bind:checked`와 `bind:value`를 사용하여 `todos`의 변경 내용이 반영합니다. Vue.js에서 `v-for` 블록문 안에 `v-model`을 사용하는 것과 유사합니다. Svelte는 `{# each}` 블록문 안에 `bind:속성 이름`으로 블록문 안에서 데이터 바인딩 할 수 있습니다.

#### 참고
- [https://svelte.dev/tutorial/text-inputs](https://svelte.dev/tutorial/text-inputs)
- [https://svelte.dev/tutorial/numeric-inputs](https://svelte.dev/tutorial/numeric-inputs)
- [https://svelte.dev/tutorial/checkbox-inputs](https://svelte.dev/tutorial/checkbox-inputs)
- [https://svelte.dev/tutorial/group-inputs](https://svelte.dev/tutorial/group-inputs)
- [https://svelte.dev/tutorial/textarea-inputs](https://svelte.dev/tutorial/textarea-inputs)
- [https://svelte.dev/tutorial/select-bindings](https://svelte.dev/tutorial/select-bindings)
- [https://svelte.dev/tutorial/multiple-select-bindings](https://svelte.dev/tutorial/multiple-select-bindings)
- [https://svelte.dev/tutorial/contenteditable-bindings](https://svelte.dev/tutorial/contenteditable-bindings)
- [https://svelte.dev/tutorial/each-block-bindings](https://svelte.dev/tutorial/each-block-bindings)