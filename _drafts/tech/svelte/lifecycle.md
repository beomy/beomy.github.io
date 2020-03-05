---
layout: post
title: '[Svelte] 라이프 사이클'
featured-img: svelte/svelte-log.svg
height-img: 200px
category: [tech, svelte]
---
{% include toc.html %}

이번 포스트에서는 컴포넌트의 생명주기(Lifecycle)를 이야기 합니다. 생명주기를 라이프 사이클이라고도 하는데, 앞으로는 생명주기라는 단어 대신 라이프 사이클이라는 단어를 사용하도록 하겠습니다.

라이프 사이클 함수란 컴포넌트가 화면에 마운트(화면에 출력) 되거나, 화면이 업데이트 혹은 화면에서 언마운트(화면에서 제거)됬을 때 실행되는 콜백 함수들을 말합니다.

Vue.js의 라이프 사이클 함수는 `beforeCreate`, `created`, `beforeMount`, `mounted`, `beforeUpdate`, `updated`, `beforeDestroy`, `destroyed` 8가지가 있습니다. Svelte는 Vue.js보다 더 단순히 `onMount`, `onDestroy`, `beforeUpdate`, `afterUpdate` 4가지 종류가 있습니다.

# `onMount`
가장 많이 사용되는 라이프 사이클 함수는 `onMount` 함수입니다. 이 함수는 컴포넌트가 처음으로 DOM에 랜더링 되었을 때 실행되는 함수입니다. 네트워크를 통해 데이터를 가져와야 할 경우 `onMount`를 사용하는 것이 좋습니다.

Vue.js에서는 `mounted` 라이프 사이클 함수와 유사합니다. 저는 개인적으로 Vue.js에서 네트워크를 통해 데이터를 가져와야 할 경우 `created` 라이프 사이클 함수를 사용하지만, 마운트 된 후 데이터를 가져오는 것을 알아보기 위해 `mounted` 라이프 사이클 함수에서 데이터를 가져와 보도록 하겠습니다. Vue.js에서는 `mounted` 라이프 사이클 함수를 아래와 같이 사용합니다.

{% raw %}
```html
<template>
  <div>
    <h1>Photo album</h1>

    <div class="photos">
      <template v-if="photos.length !== 0">
        <figure v-for="(photo, index) of photos" :key="index">
          <img :src="photo.thumbnailUrl" :alt="photo.title">
          <figcaption>{{ photo.title }}</figcaption>
        </figure>
      </template>
      <p v-else>loading...</p>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        photos: []
      }
    },
    async mounted () {
      const res = await fetch(`https://jsonplaceholder.typicode.com/photos?_limit=20`);
      this.photos = await res.json();
    },
  }
</script>
<style>
  .photos {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 8px;
  }

  figure, img {
    width: 100%;
    margin: 0;
  }
</style>
```
{% endraw %}

위의 코드를 Svelte에서는 아래와 같이 작성할 수 있습니다.

```html
<script>
  import { onMount } from 'svelte';

  let photos = [];

  onMount(async () => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/photos?_limit=20`);
    photos = await res.json();
  });
</script>

<style>
  .photos {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 8px;
  }

  figure, img {
    width: 100%;
    margin: 0;
  }
</style>

<h1>Photo album</h1>

<div class="photos">
  {#each photos as photo}
    <figure>
      <img src={photo.thumbnailUrl} alt={photo.title}>
      <figcaption>{photo.title}</figcaption>
    </figure>
  {:else}
    <!-- this block renders when photos.length === 0 -->
    <p>loading...</p>
  {/each}
</div>
```

몇가지 주목해야 할 부분이 있습니다.

- `onMount` 함수를 사용하기 위해서는 `import { onMount } from 'svelte'`로 함수를 가져와야 합니다.
- `onMount` 함수의 파라미터로 전달된 콜백함수가 마운트 된 후 실행됩니다.
- `{#each}` 블록의 리스트가 비어 있을 경우 `{:else}` 블록이 화면에 노출됩니다.

## 주의사항
`onMount` 라이프 사이클 함수를 사용할 때 몇가지 주의사항을 살펴보도록 하겠습니다.

### 오래 걸리는 네트워크 작업은 `onMount`에서
네트워크를 통해 데이터를 가져와 느리게 데이터가 세팅이 된다면, `<script>` 태그의 상단이 아닌 `onMount` 라이프 사이클 함수에서 가져오는 것이 좋습니다.

서버 사이드 랜더랑(Server Side Rendering)을 할 때, `onDestroy` 라이프 사이클 함수를 제외한 다른 라이프 사이클 함수들을 실행되지 않습니다. 마운트 된 후에 실행되는 `onMount`에서 데이터를 가져온다면, 데이터를 가져오느라 DOM이 느리게 마운트 되는 문제를 피할 수 있습니다.

### `onMount`에 전달된 파라미터의 리턴 값
`onMount`에 전달된 파라미터의 리턴 값으로 함수가 전달되면, 이 함수는 컴포넌트가 DOM에서 언마운트 될 때 실행됩니다. 이 예제는 [[Svelte] 데이터 바인딩 고급-this 바인딩](http://localhost:3000/tech/svelte/bindings-in-depth/#this-바인딩)에서 한번 살펴보았습니다.

# `onDestroy`
`onDestroy`는 컴포넌트가 제거되었을 때 호출됩니다. 컴포넌트가 할당 받은 자원을 해제 할 때 사용되는 라이프 사이클 함수 입니다.

Vue.js에서 `beforeDestroy` 라이프 사이클 함수와 유사합니다. Vue.js에서는 아래 코드와 같이 `beforeDestroy` 라이프 사이클 함수를 사용합니다.

{% raw %}
```html
<template>
  <p>
    The page has been open for
    {{ seconds }} {{ seconds === 1 ? 'second' : 'seconds' }}
  </p>
</template>
<script>
  export default {
    data () {
      return {
        seconds: 0,
        interval: null
      }
    },
    created () {
      this.interval = setInterval(() => this.seconds += 1, 1000)
    },
    beforeDestroy () {
      clearInterval(this.interval);
    }
  }
</script>
```
{% endraw %}

위의 코드를 Svelte는 아래와 같이 작성할 수 있습니다.

```html
<script>
  import { onDestroy } from 'svelte';

  let seconds = 0;
  const interval = setInterval(() => seconds += 1, 1000);

  onDestroy(() => clearInterval(interval));
</script>
<p>
  The page has been open for
  {seconds} {seconds === 1 ? 'second' : 'seconds'}
</p>
```

Svelte의 라이프 사이클 함수는 어디서 사용할 지는 중요하지 않습니다. 즉 위의 코드를 아래와 같이 작성 할 수 있습니다.

```js
// utils.js
import { onDestroy } from 'svelte';

export function onInterval(callback, milliseconds) {
  const interval = setInterval(callback, milliseconds);

  onDestroy(() => {
    clearInterval(interval);
  });
}
```

```html
<script>
  import { onInterval } from './utils.js';

  let seconds = 0;
  onInterval(() => seconds += 1, 1000);
</script>

<p>
  The page has been open for
  {seconds} {seconds === 1 ? 'second' : 'seconds'}
</p>
```

위의 코드와 같이 Svelte는 라이프 사이클 함수를 다른 파일에 작성하고 컴포넌트에 `import`하여 사용할 수 있기 때문에, 기능별로 모듈화 하기 쉽습니다.

# `beforeUpdate`
`beforeUpdate`는 DOM이 업데이트 되기 직전에 호출되는 라이프 사이클 함수입니다. Vue.js에서도 동일한 이름의 라이프 사이클 함수가 있습니다. Vue.js에서 `beforeUpdate` 사용법은 아래와 같습니다.

{% raw %}
```html
<template>
  <div ref="div">DIV</div>
</template>
<script>
  export default {
    data () {
      return {
        autoscroll: null
      }
    },
    beforeUpdate () {
      const div = this.$refs.div
      this.autoscroll = div && (div.offsetHeight + div.scrollTop) > (div.scrollHeight - 20)
    },
  }
</script>
```
{% endraw %}

위의 코드를 Svelte에서는 아래와 같이 작성할 수 있습니다.

```html
<script>
  import { beforeUpdate } from 'svelte';

  let div;
  let autoscroll;

  beforeUpdate(() => {
    autoscroll = div && (div.offsetHeight + div.scrollTop) > (div.scrollHeight - 20);
  });
</script>
<div bind:this="{div}">DIV</div>
```

`beforeUpdate` 라이프 사이클 함수는 마운트 되기 전에도 호출되기 때문에 DOM에 접근 할 때 DOM이 존재하는지 체크하는 로직이 필요합니다. 위의 코드는 `bind:this`로 `div`를 바인딩합니다. `beforeUpdate`에서 `div`를 사용하기 전에 `div && ...`으로 유효성 체크하는 것을 볼 수 있습니다.

# `afterUpdate`
`afterUpdate`는 DOM이 업데이트 된 직후에 호출되는 라이프 사이클 함수입니다. Vue.js에서 `updated` 라이프 사이클 함수와 유사합니다. Vue.js는 아래와 같이 사용할 수 있습니다.

{% raw %}
```html
```
{% endraw %}

# `tick`
`tick`은 다른 라이프 사이클 함수들과 다르게 언제든 사용할 수 있습니다. 언제든 사용할 수 있다는 뜻은 마운트 된 후에만 호출되는 `onMount`, 제거된 후에만 호출되는 `onDestroy` 와는 달리 언제든 호출 된다는 뜻입니다.

변경된 내용이 있다면 변경 된 내용이 DOM에 반영된 직후에, 변경 된 내용이 없다면 바로 `tick`이 호출 됩니다.

#### 참고
- [https://svelte.dev/tutorial/onmount](https://svelte.dev/tutorial/onmount)
- [https://svelte.dev/tutorial/ondestroy](https://svelte.dev/tutorial/ondestroy)
- [https://svelte.dev/tutorial/update](https://svelte.dev/tutorial/update)
- [https://svelte.dev/tutorial/tick](https://svelte.dev/tutorial/tick)