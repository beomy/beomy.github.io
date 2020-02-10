---
layout: post
title: '[Svelte] 논리 블럭'
featured-img: svelte/svelte-log.svg
height-img: 200px
category: [tech, svelte]
---
{% include toc.html %}

이번 포스트에서는 HTML에서 조건문, 반복문을 표현하는 방법을 이야기합니다. Vue.js에는 없는 await 블럭 기능은 Svelte의 장점이라고 생각합니다.

# 조건문 블럭
Vue.js에서는 `v-if`, `v-else-if`, `v-else`로 조건문 블럭을 구현할 수 있습니다. 아래의 코드는 Vue.js에 구현한 조건문 블럭입니다.

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

# 반복문 블럭
## key

# await 블럭

#### 참고
- [https://svelte.dev/tutorial/if-blocks](https://svelte.dev/tutorial/if-blocks)
- [https://svelte.dev/tutorial/else-blocks](https://svelte.dev/tutorial/else-blocks)
- [https://svelte.dev/tutorial/else-if-blocks](https://svelte.dev/tutorial/else-if-blocks)
- [https://svelte.dev/tutorial/each-blocks](https://svelte.dev/tutorial/each-blocks)
- [https://svelte.dev/tutorial/keyed-each-blocks](https://svelte.dev/tutorial/keyed-each-blocks)
- [https://svelte.dev/tutorial/await-blocks](https://svelte.dev/tutorial/await-blocks)