---
layout: post
title: '[Svelte] Svelte 반응형'
featured-img: svelte/svelte-log.svg
height-img: 200px
category: [tech, svelte]
---
{% include toc.html %}

이번 포스트에서는 Vue.js에 이벤트 리스너(Event Listener)를 등록 하듯 Svelte에서 이벤트 리스너를 등록하는 방법을 이야기합니다. 또한 Vue.js `computed` 속성, `watch` 속성과 유사한 동작을 하는 Svelte의 `$` 문법을 이야기 합니다.

# 이벤트 리스너
Svelte에서 이벤트 리스너를 등록하는 방법을 살펴보도록 하겠습니다.

Vue.js에서 클릭 이벤트를 등록하는 방법은 아래와 같습니다.

{% raw %}
```html
<template>
  <button @click="handleClick">Clicked {{count}} {{count === 1 ? 'time' : 'times'}}</button>
</template>
<script>
  export default {
    data () {
      return {
        count: 0
      }
    },
    methods: {
      handleClick () {
        this.count += 1
      }
    }
  }
</script>
```
{% endraw %}

위의 코드를 Svelte에서는 아래와 같이 만들 수 있습니다.

```html
<script>
  let count = 0;

  function handleClick() {
    count += 1;
  }
</script>

<button on:click="{handleClick}">
  Clicked {count} {count === 1 ? 'time' : 'times'}
</button>
```

위의 코드와 같이 `on:이벤트이름="{핸들러함수}"`로 이벤트 리스너를 등록 할 수 있습니다. `이벤트이름`에는 `click`, `change`과 같이 DOM 이벤트 이름을 그대로 선언해 주면 됩니다. 실행되는 `핸들러함수`는 단순 함수로 정의하면 됩니다.

# $ 문법
Svelte의 `$` 문법은 Vue.js의 `computed`와 `watch`를 합쳐 놓은 문법으로 생각하면 됩니다. `$` 문법을 Vue.js의 `computed`와 유사하게 사용하는 방법, `watch`와 유사하게 사용하는 방법 2가지를 이야기 하겠습니다.

## 선언형 문법
`$`의 선언형 문법은 Vue.js의 `computed`와 유사합니다.

Vue.js에서 `computed`는 아래와 같이 사용됩니다.

{% raw %}
```html
<template>
  <div>
    <button @click="handleClick">
      Clicked {{count}} {{count === 1 ? 'time' : 'times'}}
    </button>

    <p>{{count}} doubled is {{doubled}}</p>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        count: 0
      }
    },
    computed: {
      double () {
        return this.count * 2
      }
    },
    methods: {
      handleClick () {
        this.count += 1;
      }
    },
  }
</script>
```
{% endraw %}

Svelte에서는 `$` 문법을 사용해서 아래와 같이 작성할 수 있습니다.

```html
<script>
  let count = 0;
  $: doubled = count * 2;

  function handleClick() {
    count += 1;
  }
</script>

<button on:click={handleClick}>
  Clicked {count} {count === 1 ? 'time' : 'times'}
</button>

<p>{count} doubled is {doubled}</p>
```

`$` 문법은 잘 사용하지는 않지만, [자바스크립트 Label 문법](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/label)입니다. Svelte에서는 참조 된 값이 변경 될 때마다 이 코드가 다시 실행한다는 의미로 라벨 이름으로 `$`를 사용하는 것입니다.

위의 코드의 경우 `count`가 변경 되면 `$:` 이하의 자바스크립트가 다시 실행됩니다.

## 실행형 문법
`$`의 실행형 문법은 Vue.js의 `watch`와 유사합니다.

Vue.js에서 `watch`는 아래와 같이 사용됩니다.

{% raw %}
```html
<template>
  <button @click="handleClick">
    Clicked {{count}} {{count === 1 ? 'time' : 'times'}}
  </button>
</template>
<script>
  export default {
    data () {
      return {
        count: 0
      }
    },
    watch: {
      count (count) {
        if (count >= 10) {
          alert(`count is dangerously high!`);
          this.count = 9;
        }
      }
    },
    methods: {
      handleClick () {
        this.count += 1;
      }
    }
  }
</script>
```
{% endraw %}

Svelte에서는 `$` 문법을 사용해서 아래와 같이 작성할 수 있습니다.

```html
<script>
  let count = 0;

  $: if (count >= 10) {
    alert(`count is dangerously high!`);
    count = 9;
  }

  function handleClick() {
    count += 1;
  }
</script>

<button on:click="{handleClick}">
  Clicked {count} {count === 1 ? 'time' : 'times'}
</button>
```

`$`의 선언형 문법을 사용했을 때와 동일하게 참조 된 값이 변경 될 때마다 `$:` 이하의 자바스크립트가 다시 실행됩니다. 위의 코드의 경우 `count`가 변경 될 때 `if` 문이 실행됩니다.

# 주의사항

#### 참고
- [https://svelte.dev/tutorial/reactive-assignments](https://svelte.dev/tutorial/reactive-assignments)
- [https://svelte.dev/tutorial/reactive-declarations](https://svelte.dev/tutorial/reactive-declarations)
- [https://svelte.dev/tutorial/reactive-statements](https://svelte.dev/tutorial/reactive-statements)
- [https://svelte.dev/tutorial/updating-arrays-and-objects](https://svelte.dev/tutorial/updating-arrays-and-objects)