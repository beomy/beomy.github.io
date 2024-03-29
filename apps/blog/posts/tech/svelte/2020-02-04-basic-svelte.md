---
layout: post
title: '[Svelte] Svelte 기초 문법'
featured-img: svelte/svelte.png
height-img: 200px
category: [tech, svelte]
summary: Svelte의 기본 문법을 Vue.js와 비교하여 이야기합니다.
---

이번 포스트에서는 Svelte의 기본 문법을 이야기합니다.

## data 정의
화면에 반응형으로 표시되는 데이터를 Vue.js에서 정의하는 방법은 아래와 같습니다.

```html
<template>
  <h1>Hello {{name.toUpperCase()}}</h1>
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

Svelte에서는 동일한 코드를 아래와 같이 사용할 수 있습니다.

```html
<script>
  let name = 'world';
</script>

<h1>Hello {name.toUpperCase()}!</h1>
```

Svelte에서 데이터는 단순히 변수를 정의하듯 사용하면 됩니다. Vue.js 보다 코드가 간결하고 직관적입니다.

Vue.js의 `{{...}}` 괄호 안에 자바스크립트 사용이 가능한 것처럼, Svelte의 `{...}` 괄호 안에는 자바스크립트 사용이 가능합니다.

## 속성 정의
HTML 요소에 동적 속성을 정의할 수 있습니다. 먼저 Vue.js 코드로 살펴보면,

```html
<template>
  <img :src="src" :alt="`${name} dances.`" />
</template>

<script>
  export default {
    data () {
      return {
        src: 'tutorial/image.gif',
        name: 'Rick Astley'
      }
    }
  }
</script>
```

위의 코드와 같이 Vue.js의 반응형 속성을 정의할 수 있습니다. 이제는 Svelte 코드를 살펴보도록 하겠습니다.

```html
<script>
  let src = 'tutorial/image.gif';
  let name = 'Rick Astley';
</script>

<img src="{src}" alt="{name} dances.">
```

Svelte는 반응형 데이터를 HTML에 선언했던 것과 동일하게 HTML에 `{...}`을 사용하여 동적 속성을 정의할 수 있습니다. Vue.js에서 동적 송성을 `:src` 등으로 표현하는 것과 달리 Svelte는 `{...}`을 사용하여 동적 속성을 정의할 수 있어 코드에 통일성이 있습니다.

### 속성 약어
Svelte는 간략한 코드를 더욱 간략하게 할 수 있도록 속성 약어를 제공합니다. 약어는 아래 코드와 같이 사용할 수 있습니다.

```html
<script>
  let src = 'tutorial/image.gif';
  let name = 'Rick Astley';
</script>

<img {src} alt="{name} dances.">
```

속성 이름과 반응형 데이터 변수명이 동일하다면 위의 코드와 같이 약어를 사용할 수 있습니다.

### `class` 속성 약어
HTML 요소의 속성 중 `class` 속성은 자주 사용되는 속성 중 하나입니다. Svelte는 `class` 속성 약어 기능을 제공합니다.

Svelte에서 HTML 요소에 `class` 속성을 주고 싶을 때, 보통 아래와 같이 사용합니다.

```html
<button
  class="{current === 'foo' ? 'active' : ''}"
  on:click="{() => current = 'foo'}"
>foo</button>
```

위의 코드를 아래 코드와 같이 작성 가능합니다.

```html
<button
  class:active="{current === 'foo'}"
  on:click="{() => current = 'foo'}"
>foo</button>
```

위의 코드와 같이 코드를 작성하면, 코드 가독성도 좋아지며 코드 양도 줄어들게 됩니다. 여기서 그치지 않고 Svelte는 조금 더 코드 양을 줄이기 위해 약어 기능을 제공합니다.

```html
<div class:big={big}>
  <!-- ... -->
</div>
```

위의 코드와 같이 HTML 요소에 정의할 class 이름과 변수 이름이 동일할 경우 아래 코드와 같이 약어로 작성할 수 있습니다.

```html
<div class:big>
  <!-- ... -->
</div>
```

## 스타일 정의
스타일을 정의하는 방법은 Vue.js와 유사합니다. 스타일은 아래 코드와 같이 정의할 수 있습니다.

```html
<style>
  p {
    color: purple;
    font-family: 'Comic Sans MS', cursive;
    font-size: 2em;
  }
</style>

<p>This is a paragraph.</p>
```

~~Vue.js와 Svelte의 차이는 Vue.js에서는 `<style scoped>`이라고 명시를 해 줘야 로컬(local) 스타일이 되지만, Svelte에서는 기본 값이이 로컬 스타일입니다. Svelte에서 글로벌(global) 스타일을 지정하기 위해서는 `<style global>`로 명시해 주어야 합니다.~~ (Outdated 되었습니다.)

### `:global`
전역 스타일을 지정하기 위해서는 `:global`을 사용해야 합니다. 사용 방법은 Vue.js의 `v-deep`과 유사합니다. Vue.js의 `v-deep`은 아래 코드와 같이 사용할 수 있습니다.

```html
<template>
  <div>
    <h1>HELLOW WORLD<h1>
  </div>
</template>

<style scoped>
  div ::v-deep h1 {
    color: red;
  }
</style>
```

Svelte에서는 아래와 같이 사용할 수 있습니다.

```html
<div>
  <h1>HELLOW WORLD<h1>
</div>

<style>
  div :global(h1) {
    color: red;
  }
</style>
```

위의 코드처럼 작성하면 해당 컴포넌트의 `div` 안에 있는 모든 `h1`(하위 컴포넌트에 사용했더라도)은 `color:red` 스타일이 적용됩니다.

## 컴포넌트 정의
컴포넌트를 정의하고 사용하는 방법도 Vue.js와 유사합니다. `Nested` 컴포넌트가 아래 코드와 같이 정의되었을 때,

```html
<!-- Nested.svelte -->
<p>This is another paragraph.</p>
```

사용하는 방법은 아래 코드와 같습니다.

```html
<script>
  import Nested from './Nested.svelte';
</script>

<style>
  p {
    color: purple;
    font-family: 'Comic Sans MS', cursive;
    font-size: 2em;
  }
</style>

<p>This is a paragraph.</p>
<Nested/>
```

위의 코드의 실행 결과는 아래 그림과 같습니다.

![컴포넌트 사용 결과](/assets/img/posts/svelte/use_component.png)

스타일 정의에서 말씀드렸던 것과 같이 Svelte는 스타일 적용 범위 기본이 로컬 스타일이기 때문에, 컴포넌트 안의 `<p>` 태그에 스타일이 적용되지 않은 것을 확인할 수 있습니다.

## HTML 문자열 표현
문자열로 표현되어 있는 HTML을 화면에 나타내기 위해 `<p>{string}</p>`으로 선언한다면 단순 문자열로 인식되기 때문에 화면에 태그들이 그대로 보이게 됩니다. 이런 문제를 해결하기 위해 Vue.js에서는 `v-html` 디렉티브(directive)를 제공합니다. Vue.js 코드는 아래와 같습니다.

```html
<template>
  <p v-html="string"></p>
</template>
<script>
  export default {
    data () {
      return {
        string: 'this string contains some <strong>HTML!!!</strong>'
      }
    }
  }
</script>
```

Svelte에서는 `@html`을 사용하여 `v-html` 기능을 사용할 수 있습니다. Svelte 코드는 아래와 같습니다.

```html
<script>
  let string = `this string contains some <strong>HTML!!!</strong>`;
</script>

<p>{@html string}</p>
```

##### 참고
- [https://svelte.dev/tutorial/adding-data](https://svelte.dev/tutorial/adding-data)
- [https://svelte.dev/tutorial/dynamic-attributes](https://svelte.dev/tutorial/dynamic-attributes)
- [https://svelte.dev/tutorial/styling](https://svelte.dev/tutorial/styling)
- [https://svelte.dev/tutorial/nested-components](https://svelte.dev/tutorial/nested-components)
- [https://svelte.dev/tutorial/html-tags](https://svelte.dev/tutorial/html-tags)
- [https://svelte.dev/tutorial/classes](https://svelte.dev/tutorial/classes)
- [https://svelte.dev/tutorial/class-shorthand](https://svelte.dev/tutorial/class-shorthand)
