---
layout: post
title: '[Svelte] 반응형을 위한 문법'
featured-img: svelte/svelte-log.svg
height-img: 200px
category: [tech, svelte]
---
{% include toc.html %}

이번 포스트에서는 사용자 행동에 따라 반응형으로 동작하는 웹을 만들기 위한 Svelte 문법을 이야기합니다. Vue.js에 이벤트 리스너(Event Listener)를 등록하듯 Svelte에서 이벤트 리스너를 등록하는 방법과 Vue.js의 `computed` 속성, `watch` 속성과 유사한 동작을 하는 Svelte의 `$` 문법을 이야기합니다.

# 이벤트 리스너
Svelte에서 이벤트 리스너를 등록하는 방법을 살펴보도록 하겠습니다. Vue.js에서 클릭 이벤트를 등록하는 방법은 아래와 같습니다.

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

위의 코드와 같이 `on:이벤트 이름="{핸들러 함수}"`로 이벤트 리스너를 등록할 수 있습니다. `이벤트 이름`에는 `click`, `change`와 같이 DOM 이벤트 이름을 선언해 주면 됩니다. 실행되는 `핸들러 함수`는 단순 함수로 정의하면 됩니다.

# $ 문법
Svelte의 `$` 문법은 Vue.js의 `computed`와 `watch`를 합쳐 놓은 문법으로 볼 수 있습니다. `$` 문법을 Vue.js의 `computed`와 유사하게 사용하는 방법, `watch`와 유사하게 사용하는 방법 2가지를 이야기하겠습니다.

## 선언형 문법
`$`의 선언형 문법은 Vue.js의 `computed`와 유사합니다. Vue.js에서 `computed`는 아래와 같이 사용됩니다.

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

`$` 문법은 잘 사용하지는 않지만, [Label](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/label)이라는 자바스크립트 문법입니다. Svelte에서는 참조 된 값이 변경될 때마다 이 코드가 다시 실행한다는 의미의 라벨 이름으로 `$`를 사용하는 것입니다. 위의 코드의 경우 `count`가 변경되면 `$:` 이하의 자바스크립트가 다시 실행됩니다.

## 실행형 문법
`$`의 실행형 문법은 Vue.js의 `watch`와 유사합니다. Vue.js에서 `watch`는 아래와 같이 사용됩니다.

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

`$`의 선언형 문법을 사용했을 때와 동일하게 참조 된 값이 변경될 때마다 `$:` 이하의 자바스크립트가 다시 실행됩니다. 위의 코드의 경우 `count`가 변경될 때 `if` 문이 실행됩니다.

# 주의사항
Vue.js와 Svelte는 반응형 동작 방식이 다릅니다. Vue.js에서는 `push`, `splice`, `sort`, `pop` 등의 Array 메서드를 사용하면 반응형이 동작하지만 Svelte에서는 변수의 재할당이 되어야 반응형이 동작합니다.

Vue.js와 Svelte 코드 두 개를 비교해 보도록 하겠습니다. 먼저 Vue.js 코드를 살펴보도록 하겠습니다.

{% raw %}
```html
<template>
  <div>
    <p>{{numbers.join(' + ')}} = {{sum}}</p>

    <button @click="addNumber">
      Add a number
    </button>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        number: [1, 2, 3, 4]
      }
    },
    computed: {
      sum () {
        return this.numbers.reduce((t, n) => t + n, 0)
      }
    },
    methods: {
      addNumber () {
        this.number.push(this.number.length + 1)
      }
    }
  }
</script>
```
{% endraw %}

위의 코드와 같이 Vue.js는 Array 메서드인 `push`를 사용하여 값을 변경되면 반응형이 동작합니다. 동일한 동작을 하는 Svelte 코드는 아래와 같습니다.

```html
<script>
  let numbers = [1, 2, 3, 4];

  function addNumber() {
    numbers = [...numbers, numbers.length + 1];
    /*
    또는,
    numbers.push(numbers.length + 1);
    numbers = numbers;
    또는,
    numbers[numbers.length] = numbers.length + 1;
    */
  }

  $: sum = numbers.reduce((t, n) => t + n, 0);
</script>

<p>{numbers.join(' + ')} = {sum}</p>

<button on:click={addNumber}>
  Add a number
</button>
```

위의 코드와 같이 Svelte는 변수에 재할당이 되어야 반응형이 동작합니다.

재할당 할 때 한 가지 규칙이 있습니다. 반응형으로 업데이트되어야 하는 변수가 재할당식에 왼쪽에 와야 합니다. 예를 들어 아래 코드는 반응형 동작을 하지 않습니다.

```js
const foo = obj.foo;
foo.bar = 'baz';
```

반응형으로 업데이트되어야 하는 변수, `obj`가 재할당식에 왼쪽에 와야 반응형으로 동작을 할 수 있는데, 위의 코드의 경우 `foo`가 왼쪽에 있기 때문에 반응형 동작을 하지 않습니다. 위의 코드가 반응형으로 동작하기 위해서는,

```js
obj.foo.bar = 'baz';
```

```js
const foo = obj.foo;
foo.bar = 'baz';
obj = obj;
```

위의 코드와 같이 재할당식에 왼쪽에 `obj`가 오도록 수정해야 합니다.

# 고찰
Vue.js를 사용하는 입장에서 Svelte를 사용하면서 느꼈던 단점들을 정리해보았습니다. 장점들도 많지만 단점들만 작성해 보았어요.

## 코드 관리
Vue.js의 경우, 데이터는 `data` 속성에, 사용되는 함수들은 `methods` 속성에 그 밖에 `computed` 속성과 `watch` 속성이 있어 의도에 따라 코드를 분리할 수 있습니다. 반면에, Svelte는 `<script>` 태그 안에 이벤트 핸들러 함수와, 화면에 나타나는 데이터들, 혹은 화면에는 나타나지는 않지만 필요한 변수들 모두 정의됩니다. 프로젝트 규모가 커지고, 코드 양이 많아지면 Svelte의 경우 코드가 여기저기 나눠질 가능성이 있어 보였습니다.

## 반응형 동작
반응형 동작의 경우에는 Vue.js는 `splice`, `sort`, `push`, `pop` 등의 Array 메서드를 사용하면 반응형이 동작하지만 Svelte의 경우에는 재할당이 일어나야만 반응형이 동작하기 때문에 익숙하지 않아 불편했습니다. 또한 Array 메서드를 사용하고도 재할당 코드를 작성해야 하는 불필요한 코드가 추가되는 단점이 있었습니다.

#### 참고
- [https://svelte.dev/tutorial/reactive-assignments](https://svelte.dev/tutorial/reactive-assignments)
- [https://svelte.dev/tutorial/reactive-declarations](https://svelte.dev/tutorial/reactive-declarations)
- [https://svelte.dev/tutorial/reactive-statements](https://svelte.dev/tutorial/reactive-statements)
- [https://svelte.dev/tutorial/updating-arrays-and-objects](https://svelte.dev/tutorial/updating-arrays-and-objects)