---
layout: post
title: '[Svelte] 논리 블록'
featured-img: svelte/svelte-log.svg
height-img: 200px
category: [tech, svelte]
summary: Svelte 내의 HTML에서 조건문, 반복문을 표현하는 방법을 이야기합니다.
---

이번 포스트에서는 HTML에서 조건문, 반복문을 표현하는 방법을 이야기합니다. Vue.js에는 없는 await 블록 기능은 Svelte의 장점이라고 생각합니다.

# 조건문 블록
Vue.js에서는 `v-if`, `v-else-if`, `v-else`로 조건문 블록을 구현할 수 있습니다. 아래의 코드는 Vue.js로 구현한 조건문 블록입니다.

{% raw %}
```html
<template>
  <div>
    <p v-if="x > 10">{{x}} is greater than 10</p>
    <p v-else-if="5 > x">{{x}} is less than 5</p>
    <p v-else>{{x}} is between 5 and 10</p>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        x: 7
      }
    }
  }
</script>
```
{% endraw %}

Svelte에서는 동일한 기능을 아래 코드와 같이 구현할 수 있습니다.

```html
<script>
  let x = 7;
</script>

{#if x > 10}
  <p>{x} is greater than 10</p>
{:else if 5 > x}
  <p>{x} is less than 5</p>
{:else}
  <p>{x} is between 5 and 10</p>
{/if}
```

# 반복문 블록
Vue.js에서는 `v-for`로 반복문 블록을 구현할 수 있습니다. 아래 코드는 Vue.js로 구현한 반복문 블록입니다.

{% raw %}
```html
<template>
  <div>
    <h1>The Famous Cats of YouTube</h1>
    <ul>
      <li v-for="({ id, name }, i) of cats" :key="id">
        <a target="_blank" href="https://www.youtube.com/watch?v={id}">{{i + 1}}: {{name}}</a>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        cats: [
          { id: 'J---aiyznGQ', name: 'Keyboard Cat' },
          { id: 'z_AbfPXTKms', name: 'Maru' },
          { id: 'OUtn3pvWmpg', name: 'Henri The Existential Cat' }
        ]
      }
    }
  }
</script>
```
{% endraw %}

아래 코드는 Svelte로 위의 코드와 동일한 기능을 구현한 코드입니다.

```html
<script>
  let cats = [
    { id: 'J---aiyznGQ', name: 'Keyboard Cat' },
    { id: 'z_AbfPXTKms', name: 'Maru' },
    { id: 'OUtn3pvWmpg', name: 'Henri The Existential Cat' }
  ];
</script>

<h1>The Famous Cats of YouTube</h1>

<ul>
  {#each cats as { id, name }, i (id)}
    <li>
      <a target="_blank" href="https://www.youtube.com/watch?v={id}">{i + 1}: {name}</a>
    </li>
  {/each}
</ul>
```

## key
Vue.js 코드에서 `<li>` 태그에 `:key="..."` 속성이 있는 것을 볼 수 있습니다. `key` 속성은 `v-for`의 리스트에서 변경된 위치를 정확히 찾아 DOM에 변경된 부분만 적용하기 위해 사용됩니다.

Svelte에서도 Vue.js의 `key` 속성과 동일한 역할을 하는 코드가 있습니다. 그 부분은 위의 코드에서 `(id)`로 작성된 부분입니다. 괄호(`(...)`) 안에 중복되지 않는 유니크한 키 값을 정의하여 변경된 부분만 정확히 DOM에 반영할 수 있게 됩니다.

## key의 특징
Svelte는 반복문 블록에 내부적으로 [`Map`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Map)을 사용하기 때문에 key에 숫자나 문자열뿐만 아니라 객체가 정의될 수도 있습니다. 하지만 key는 숫자나 문자열이 오는 것이 더 안전합니다. 그 이유는, 예를 들어 API 서버에게 응답받은 리스트를 화면에 그려야 한다면 그 과정은 아래와 같을 것입니다.

1. API 서버의 API를 호출하여 결과 값은 기다린다.
2. API 서버로부터 결과 값을 응답받는다.
3. API 서버에게 받은 결과 값을 변수에 저장한다.
4. 저장한 변수를 반복문 블록으로 화면에 나타낸다.

API를 다시 호출해서 위의 4가지 과정을 다시 거치게 되더라도 서버에게 응답받은 결과 값은 동일하기 때문에 화면의 변화는 없을 것입니다. 하지만 key를 객체로 정의하였다면 객체가 동일한 값을 가지는 객체라도 서로 다른 객체이기 때문에 화면 전체를 다시 그리게 됩니다. 이런 이유로 key는 객체보다는 API 응답 값 중의 유니크한 id가 되는 것이 더 좋습니다.

# await 블록
많은 웹 애플리케이션은 비동기 데이터 처리를 합니다. Svelte는 HTML 안에서 직접 비동기 데이터 처리를 할 수 있습니다.

```html
<script>
  let promise = getRandomNumber();

  function getRandomNumber() {
    return new Promose((resolve, reject) => {
      setTimeout(() => {
        resolve(Math.round(Math.random() * 100));
      }, 1000)
    })
  }

  function handleClick() {
    promise = getRandomNumber();
  }
</script>

<button on:click={handleClick}>
  generate random number
</button>

{#await promise}
  <p>...waiting</p>
{:then number}
  <p>The number is {number}</p>
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}
```

위의 코드를 간단히 살펴보도록 하겠습니다.
- `{#awit promise}`와 `{:then number}` 사이: 비동기 작업이 응답하기 전에 화면에 노출되는 블록입니다.
- `{:then number}`와 `{:catch error}` 사이: 비동기 작업이 응답하여 응답된 결과가 화면에 노출되는 블록입니다.
- `{:catch error}`와 `{/await}` 사이: 비동기 작업에서 에러가 발생할 경우 에러 값이 화면에 노출되는 블록입니다.

비동기 작업에 에러(혹은 `reject`)가 발생하지 않는 것을 확신할 수 있다면 `catch` 블록을 생략할 수 있습니다. `catch` 블록을 생략한 코드는 아래와 같습니다.

```html
{#await promise}
  <p>...waiting</p>
{:then number}
  <p>The number is {number}</p>
{/await}
```

뿐만 아니라 비동기 작업을 기다리는 동안 화면에 노출될 필요가 없을 경우에 위의 코드의 첫 번째 블록도 생략 가능합니다. 아래 코드와 같이 생략할 수 있습니다.

```html
{#await promise then number}
  <p>The number is {number}</p>
{/await}
```

#### 참고
- [https://svelte.dev/tutorial/if-blocks](https://svelte.dev/tutorial/if-blocks)
- [https://svelte.dev/tutorial/else-blocks](https://svelte.dev/tutorial/else-blocks)
- [https://svelte.dev/tutorial/else-if-blocks](https://svelte.dev/tutorial/else-if-blocks)
- [https://svelte.dev/tutorial/each-blocks](https://svelte.dev/tutorial/each-blocks)
- [https://svelte.dev/tutorial/keyed-each-blocks](https://svelte.dev/tutorial/keyed-each-blocks)
- [https://svelte.dev/tutorial/await-blocks](https://svelte.dev/tutorial/await-blocks)