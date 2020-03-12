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
위의 예제에는 관찰하기 위해 사용된 자원을 해제하는 코드가 빠져있습니다. `count.subscribe` 함수의 리턴 값은 관찰을 해제해 주는 함수입니다. `App.svelte`를 아래 코드와 같이 수정합니다.

```html
<script>
  import { onDestroy } from 'svelte';
  import { count } from './stores.js';
  import Incrementer from './Incrementer.svelte';
  import Decrementer from './Decrementer.svelte';
  import Resetter from './Resetter.svelte';

  let count_value;

  const unsubscribe = count.subscribe(value => {
    count_value = value;
  });

  onDestroy(unsubscribe);
</script>

<h1>The count is {count_value}</h1>
```

`onDestory` 라이프 사이클 함수를 사용하여 컴포넌트가 제거 되었을때 관찰을 위해 사용한 자원을 해제하였습니다.

## 자동 구독 (Auto-subscriptions)
`subscribe`를 사용하여 관찰하는 값이 변경 되었을 경우 화면에 표시 될 변수를 업데이트 하고, 컴포넌트가 제가 되었을 때 `subscribe`의 리턴 값을 `onDestroy` 라이프 사이플 함수에서 호출 하는 이 일련의 과정을 자동화 해주는 `$` 기능을 제공합니다. `App.svelte` 코드가 아래와 같이 변경됩니다.

```html
<script>
  import { count } from './stores.js';
  import Incrementer from './Incrementer.svelte';
  import Decrementer from './Decrementer.svelte';
  import Resetter from './Resetter.svelte';
</script>

<h1>The count is {$count}</h1>
```

위의 코드와 같이 store 이름 앞에 `$`를 붙여 사용하면 자동 구독을 할 수 있습니다. 자동 구독을 사용하더라고 `subscribe` 함수는 `<script>` 태그 어느 곳에든지 사용할 수 있습니다.

### 주의사항
자동 구독 기능을 사용하려면 몇가지 주의해야 할 내용들이 있습니다.

#### store 변수 정의는 최상위 스코프에 있어야 합니다.
최상위 스코프에 있다라는 것은, 블록안에서 변수가 정의되지 않고 `<scirpt>` 태그 하위에 바로 정의되어야 하는 것을 의미합니다.

`import` 된 store 변수 혹은 최상위 스코프에서 정의된 store 변수는 자동 구독을 할 수 있습니다.

#### `$`를 접두사로 사용하는 변수를 선언할 수 없습니다.
자동 구독을 위해 `$` 접두사를 사용하기 때문에, Svelte는 `$` 접두사를 사용하는 변수 선언을 막았습니다.

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