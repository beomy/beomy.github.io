---
layout: post
title: '[Svelte] 데이터 바인딩'
featured-img: svelte/svelte-log.svg
height-img: 200px
category: [tech, svelte]
---
{% include toc.html %}

이번 포스트에서는 데이터 바인딩을 이야기 합니다. Vue.js에서 `v-model`로 데이터 바인딩 하는 방법을 Svelte에서는 어떻게 바인딩하는지 알아보도록 하겠습니다.

# `input`
`<input>` 태그의 데이터 바인딩을 살펴보도록 하겠습니다. 데이터 바인딩을 하지 않는 다면, `value` 속성에 값을 할당 하고 `input` 이벤트가 발생 할 때 마다 `value` 속성을 업데이트 해줘야 합니다. 데이터 바인딩으로 이 과정을 생략할 수 있습니다.

## `type="text"`
`<input>` 태그의 `type` 속성이 `text` 혹은 정의되어 있지 않을 경우, Vue.js는 아래와 같이 `v-model`을 사용하여 아래와 같이 데이터 바인딩을 구현할 수 있습니다.

{% raw %}
```html
<template>
  <div>
    <input v-model="name">
    <h1>Hello {{name}}!</h1>
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

위의 코드를 Svelte에서는 아래 코드와 같이 구현 할 수 있습니다.

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

    <p>{{a}} + {{b}} = {{a + b}}</p>
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

Svelte에서는 Vue.js와는 달리 별도의 코드를 추가할 필요없이 `<input>` 태그의 `type` 속성이 `number` 또는 `range`일 경우 자동으로 `Number` 타입으로 지정됩니다.

## `type="checkbox"`
`<input type="checkbox">`일 경우를 살펴보도록 하겠습니다. Vue.js에서는 아래 코드와 같이 `<input type="checkbox">`을 사용할 수 있습니다.

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

# `textarea`

# `select`

## `multiple`

# `contenteditable`

# Each 블록 바인딩

# Media 요소

# Dimension

# `this` 바인딩

# 컴포넌트 바인딩

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
- [https://svelte.dev/tutorial/media-elements](https://svelte.dev/tutorial/media-elements)
- [https://svelte.dev/tutorial/dimensions](https://svelte.dev/tutorial/dimensions)
- [https://svelte.dev/tutorial/bind-this](https://svelte.dev/tutorial/bind-this)
- [https://svelte.dev/tutorial/component-bindings](https://svelte.dev/tutorial/component-bindings)