---
layout: post
title: '[Svelte] Vue와 Svelte 비교'
featured-img: svelte/svelte-log.svg
height-img: 200px
category: [tech, svelte]
summary: Svelte와 Vue를 사용하면서 느낀 차이점을 이야기해 보려고 합니다.
---
{% include toc.html %}

Svelte와 Vue를 사용하면서 느낀 차이점을 이야기해 보려고 합니다.

# 반응형 동작
Svelte와 Vue의 가장 큰 차이는 반응형 동작 방식이라고 생각합니다.

Vue는 array 메서드(`push`, `pop`, `shift`, `unshift`, `splice`, `sort` 등)를 사용하면 반응형으로 화면이 갱신되지만, Svelte는 변수의 데이터 재할당이 일어나야 화면을 갱신합니다. 이런 특징으로 아래와 같이 작성된 Vue 코드는 아래와 같습니다. [CodePen](https://codepen.io/beomy/pen/XWmaMeW?editors=1010)에서 확인할 수 있습니다.

{% raw %}
```html
<template>
  <div>
    <div v-for="(obj, i) of arr" :key="i">
      <span
        v-for="(inArr, j) of obj.inArr"
        :key="j"
        @click="addItem(obj.inArr)"
      >
        {{ inArr }}
      </span>
    </div>
  </div>
</template>
<script>
  export default {
      data () {
      return {
        arr: [{
          inArr: [1, 2, 3]
        }, {
          inArr: [4, 5, 6]
        }]
      }
    },
    methods: {
      addItem (inArr) {
        inArr.push(Math.max(...inArr) + 1)
      }
    }
  }
</script>
```
{% endraw %}

아래와 같은 Svelte 코드로 작성될 수 있습니다. [data-assign](/assets/example/svelte/vue-vs-svelte/data-assign)에서 결과를 확인할 수 있습니다.

```html
<script>
  let arr = [{
    inArr: [1, 2, 3]
  }, {
    inArr: [4, 5, 6]
  }]

  function addItem(inArr) {
    inArr.push(Math.max(...inArr) + 1)
    arr = arr
  }
</script>

{#each arr as obj, i (i)}
  <div>
    {#each obj.inArr as inArr, j (j)}
      <span on:click={() => addItem(obj.inArr)}>{inArr}</span>
    {/each}
  </div>
{/each}
```

`arr = arr`이라는 코드가 어색하다면 아래와 같이 작성할 수도 있습니다. 가장 왼쪽에 반응형으로 동작해야 하는 변수가 오면 됩니다.

```html
<script>
  let arr = [{
    inArr: [1, 2, 3]
  }, {
    inArr: [4, 5, 6]
  }]

  function addItem(i) {
    arr[i].inArr = [...arr[i].inArr, Math.max(...arr[i].inArr) + 1]
  }
</script>

{#each arr as obj, i (i)}
  <div>
    {#each obj.inArr as inArr, j (j)}
      <span on:click={() => addItem(i)}>{inArr}</span>
    {/each}
  </div>
{/each}
```

Svelte는 변수의 데이터가 재할당 되어야 반응형이 동작하기 때문에 위에 코드와 같이 불필요한 코드를 추가해야 하는 불편함이 있습니다. Svelte를 처음 접한 사람이라면 `acc = acc`를 불필요한 코드로 보고 코드를 지울 수도 있어 보입니다.

# `$`와 `computed` 차이
`$` 문법은 Svelte의 독특한 문법입니다. `$` 문법은 Vue의 `computed`와 `watch`를 합쳐놓은 기능과 유사한데, `computed`보다는 `watch`에 가깝다고 생각이 듭니다. 아래 코드는 Vue의 `computed`를 사용한 예제입니다. [CodePen](https://codepen.io/beomy/pen/JjYJZbp)에서 확인할 수 있습니다.

{% raw %}
```html
<template>
  <div>
    <button @click="addNumber">추가</button>
    {{ multiple }}
  </div>
</template>
<script>
  export default {
    data () {
      return {
        numbers: [1, 2, 3]
      }
    },
    computed: {
      multiple () {
        return this.numbers.map(x => x*2)
      }
    },
    methods: {
      addNumber () {
        this.numbers.push(this.getRandomArbitrary(1, 10))
        console.log(this.multiple)
      },
      getRandomArbitrary (min, max) {
        return Math.floor(Math.random() * (max - min) + min)
      }
    }
  }
</script>
```
{% endraw %}

![Vue computed](/assets/img/posts/svelte/vue_computed.gif)

위의 실행 결과 그림을 보면 HTML의 출력 결과와 Console 창의 출력 결과가 동일한 것을 볼 수 있습니다. 위의 코드의 `numbers`가 변경되면 즉시 `multiple`에도 반영됩니다. Svelte 코드로 아래와 같이 작성될 수 있습니다. [svelte-$](/assets/example/svelte/vue-vs-svelte/svelte-$)에서 결과를 확인할 수 있습니다.

```html
<script>
  let numbers = [1, 2, 3]
  $: multiple = numbers.map(x => x*2)

  function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
  }

  function addNumber () {
    numbers = [...numbers, getRandomArbitrary(1, 10)]
    console.log(multiple)
  }
</script>

<button on:click={addNumber}>추가</button>

{multiple}
```

![Svelte $](/assets/img/posts/svelte/svelte_$.gif)

Svelte에서 `numbers`가 변경되면 `$:` 부분의 코드인 `multiple` 변수에 `numbers`의 변경 값을 반영하는 코드가 실행됩니다. Svelte는 `numbers`가 변경되면 즉시 `multiple`에 반영되지 않습니다. 위의 실행 결과와 같이 HTML의 출력 결과와 Console 창의 출력 결과가 다르게 됩니다.

# 사용되지 않은 CSS
Svelte의 특징 중에 또 다른 하나는 `.svelte` 내에 사용하지 않는 스타일 있다면 컴파일 시 warning을 출력합니다. 그뿐만 아니라 사용되지 않는 스타일은 컴파일된 CSS 파일에 추가되지 않습니다. Svelte 문법을 사용하지 않고 순수 자바스크립트로 추가된 스타일을 사용하지 않은 스타일로 인식합니다. 예를 하나 살펴보겠습니다. ([CodePen](https://codepen.io/beomy/pen/mdewKGN)에서 확인할 수 있습니다.)

{% raw %}
```html
<template>
  <div id="app" @click="toggleClass">
    TOGGLE CLASS
  </div>
</template>
<script>
  export default {
    methods: {
      toggleClass () {
        document.querySelector('#app').classList.toggle('active')
      }
    }
  }
</script>
<style>
  #app {
    width: 100px;
    height: 100px;
  }
  .active {
    background: blue;
  }
</style>
```
{% endraw %}

![CSS 차이](/assets/img/posts/svelte/css_diff.gif)

자바스크립트를 사용하여 `active` 클래스가 토글 되는 예제입니다. Svelte 코드로 아래와 같이 작성할 수 있습니다. [css-diff](/assets/example/svelte/vue-vs-svelte/css-diff)에서 결과를 확인할 수 있습니다.

```html
<script>
  function toggleClass () {
    document.querySelector('#app').classList.toggle('active')
  }
</script>

<div id="app" on:click={toggleClass}>
  TOGGLE CLASS
</div>

<style>
  #app {
    width: 100px;
    height: 100px;
  }
  .active {
    background: blue;
  }
</style>
```

![스타일이 적용 안됨](/assets/img/posts/svelte/svelte-css-remove.gif)

위의 실행 결과를 보면 `active` 클래스는 추가되지만 스타일이 적용되지 않는 것을 볼 수 있습니다. 빌드 되어 생성된 `bundle.css` 파일을 살펴보면,

```css
#app.svelte-1kepsqp{width:100px;height:100px}

/*# sourceMappingURL=bundle.css.map */
```

`bundle.css`에서 `.active` 스타일이 존재하지 않는 것을 볼 수 있습니다. 이런 기능은 사용하지 않는 스타일이 제거되어 최적화에 도움이 됩니다. 위의 예제와 같이 사용될 수 있는 스타일의 경우 `public` 디렉터리 안에 `global.css`와 같은 별도의 CSS 파일에 정의해 주는 것이 좋습니다.

# 여러 개의 최상위 요소
Vue는 아래와 같이 `<template>` 안에 하나의 최상위 요소만 가질 수 있습니다.

```html
<template>
  <div>
    Vue는 하나의 최상위 요소만 가질 수 있습니다.
  </div>
</template>
```

이러한 특징은 컴포넌트를 분리할수록 DOM 트리가 깊어질 수 있으며, 이 특징을 고려하여 스타일이 작성되어야 합니다. 반면 Svelte는 제한 없이 여러 개의 최상위 요소를 가질 수 있습니다.

```html
<div>Svelte는</div>
<div>여러 개의 최상위 요소를</div>
<div>가질 수 있습니다.</div>
```

# 컴포넌트에 디렉티브, class 적용
Vue는 아래와 같이 컴포넌트에 디렉티브 사용이 자유롭습니다.

{% raw %}
```html
<template>
  <Child v-custom-directive />
</template>
<script>
  import Child from './Child'
  export default {
    components: {
      Child
    }
  }
</script>
```
{% endraw %}

뿐만 아니라 아래 코드와 같이 컴포넌트의 `class`와 `style`을
 사용하는 방법도 편리합니다.

{% raw %}
```html
<template>
  <Child class="active" style="margin:10px;" />
</template>
<script>
  import Child from './Child'
  export default {
    components: {
      Child
    }
  }
</script>
```
{% endraw %}

하지만 Svelte는 컴포넌트에 `transition`, `animate`, `use` 등의 디렉티브를 사용할 수 없습니다. 이러한 디렉티브를 사용해야 할 경우 네이티브 태그를 사용하는 부모 요소에 사용해야 합니다.

{% raw %}
```html
<script>
  import { fade } from 'svelte/transition';
  import { flip } from 'svelte/animate';
  import Child from './Child.svelte'

  function custom () {
  }
</script>
<!-- 아래와 같이 사용할 수 없습니다. -->
<Child
  transition:fade
  animate:flip="{{duration: 200}}"
  use:custom
/>

<!-- 아래와 같은 방식으로 사용할 수 있습니다. -->
<div
  transition:fade
  animate:flip="{{duration: 200}}"
  use:custom
>
  <Child />
</div>
```
{% endraw %}

또한 컴포넌트에 `class`와 `style`을 사용해도 적용되지 않습니다.

{% raw %}
```html
<script>
  import Child from './Child.svelte'
</script>
<!-- 아래와 같이 사용할 수 없습니다. -->
<Child class="active" style="margin: 10px;" />
```
{% endraw %}

위의 같이 작성되었다면, `Child` 컴포넌트에서 `class`와 `style`를 props로 전달받아 별도의 처리를 해주어야 합니다. 심지어 `class`는 예약어이기 때문에 `className`과 같은 예약어와 겹치지 않는 이름을 사용해야 합니다.