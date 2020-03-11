---
layout: post
title: '[Svelte] Store'
featured-img: svelte/svelte-log.svg
height-img: 200px
category: [tech, svelte]
---
{% include toc.html %}

Vue.js의 상태관리 라이브러리로 vuex를 공식 지원합니다. Svelte는 상태관리 라이브러리를 따로 지원하지 않고, Svelte 내부(`svelte/store`)에 포함되어 있습니다.

store는 서로 관계 없는 컴포넌트끼리 데이터를 접근해야 할 경우 사용됩니다. 예를 들어 밑의 그림과 같이,

|store 사용이 필요할 때|store를 사용하면|
|:---:|:---:|
|![store 사용이 필요할 때](/assets/img/posts/svelte/need_use_store.png)|![store를 사용하면](/assets/img/posts/svelte/use_store.png)|

`A` 컴포넌트의 데이터를 `B`와 `C` 컴포넌트에서 사용해야 할 때, store를 사용하면 간편하게 데이터 전달할 수 있습니다.

# Writable stores
Svelte의 store은 `subscribe` 함수를 포함하는 단순한 객체입니다. `subscribe` 함수는 관찰하고 있는 값이 변경 될 때 마다 컴포넌트에게 알려주는 역할을 합니다.

## 사용 방법
아래 예제로 사용방법을 살펴보도록 하겠습니다.

```html
<!-- App.svelte -->
<script>
  import { count } from './stores.js';
  import Incrementer from './Incrementer.svelte';
  import Decrementer from './Decrementer.svelte';
  import Resetter from './Resetter.svelte';

  let count_value;

  const unsubscribe = count.subscribe(value => {
    count_value = value;
  });
</script>

<h1>The count is {count_value}</h1>

<Incrementer/>
<Decrementer/>
<Resetter/>
```

```html
<!-- Decrementer.svelte -->
<script>
  import { count } from './stores.js';

  function decrement() {
    count.update(n => n - 1);
  }
</script>

<button on:click={decrement}>
  -
</button>
```

```html
<!-- Incrementer.svelte -->
<script>
  import { count } from './stores.js';

  function increment() {
    count.update(n => n + 1);
  }
</script>

<button on:click={increment}>
  +
</button>
```

```html
<!-- Resetter.svelte -->
<script>
  import { count } from './stores.js';

  function reset() {
    count.set(0);
  }
</script>

<button on:click={reset}>
  reset
</button>
```

```js
// stores.js
import { writable } from 'svelte/store';

export const count = writable(0);
```

### `stores.js`
`stores.js`를 살펴도록 하겠습니다.

```js
export const count = writable(0);
```

`count` 변수가 `writable(0)`로 생성 되었습니다. _writable store_ 라고 하는데, 이렇게 생성한 변수는 `set`과 `update`, `subscribe` 함수를 포함하는 객체가 됩니다.

### `Incrementer.svelte`
`+` 버튼을 클릭하게 되면, `increment` 함수가 호출됩니다.

```js
function increment() {
  count.update(n => n + 1);
}
```

위의 `count.update`의 `n`은 현재의 `count`가 관찰하고 있는 값을 저장하고 있습니다. `n => n + 1`은 `n + 1`을 리턴한다는 의미입니다. 리턴된 값으로 `count`가 관찰하는 값을 업데이트 합니다. 즉, 이전에 관찰하는 값보다 1이 더 큰 값으로 업데이트 됩니다.

`writable(0)`로 `count` 변수를 생성하였기 때문에, `count`가 관찰하고 있는 값의 초기값은 0이 됩니다.

### `Decrementer.svelte`
`-` 버튼을 클릭하게 되면, `decrement` 함수가 호출됩니다.

```js
function decrement() {
  count.update(n => n - 1);
}
```

`increment` 함수와 동일하게 `count.update`를 사용합니다. `n => n - 1`로 `n - 1`을 리턴하기 때문에, 이전에 관찰하는 값보다 1 작은 값으로 업데이트 됩니다.

### `Resetter.svelte`
`reset` 버튼을 클릭하게 되면, `reset` 함수가 호출됩니다.

```js
function reset() {
  count.set(0);
}
```

`count.set(0)`를 호출하는데, 이 의미는 `count`가 관찰하고 있는 값을 0으로 세팅한다는 것을 의미합니다.

### `App.svelte`
이번에는 `App.svelte` 코드를 살펴보도록 하겠습니다.

```js
const unsubscribe = count.subscribe(value => {
  count_value = value;
});
```

`count`가 관찰하고 있는 값이 변경 될 때마다 `subscribe` 함수의 콜백함수가 실행됩니다.

## 자원 해제

## 자동 구독 (Auto-subscriptions)

# Readable stores

# Derived stores

# Custom stores

# Store bindings

### 참고
- [https://svelte.dev/tutorial/writable-stores](https://svelte.dev/tutorial/writable-stores)
- [https://svelte.dev/tutorial/auto-subscriptions](https://svelte.dev/tutorial/auto-subscriptions)
- [https://svelte.dev/tutorial/readable-stores](https://svelte.dev/tutorial/readable-stores)
- [https://svelte.dev/tutorial/derived-stores](https://svelte.dev/tutorial/derived-stores)
- [https://svelte.dev/tutorial/custom-stores](https://svelte.dev/tutorial/custom-stores)
- [https://svelte.dev/tutorial/store-bindings](https://svelte.dev/tutorial/store-bindings)