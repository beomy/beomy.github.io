---
layout: post
title: '[Svelte] Svelte 소개'
featured-img: svelte/svelte-log.svg
height-img: 200px
category: [tech, svelte]
---
{% include toc.html %}

Vue.js, React, Angular를 프론트엔드 프레임워크 3대장이라고 흔히들 말합니다. 이번 포스트에서는 새롭게 등장한 Svelte라는 프레임워크를 소개합니다. Svelte는 프론트엔드 프레임워크 3대장이라고 불리는 다른 프레임워크보다 낮은 러닝커브를 가집니다. Svelte는 아직 정식 한글 문서를 제공하지 않고 있습니다.

# Svelte 특징
Svelte는 날씬한 호리호리한 이라는 뜻입니다. 단어의 뜻답게 적은 코드와 작은 용량이 장점입니다. Svelte는 가상 돔(Virtual DOM)을 사용하지 않습니다. 가상 돔을 사용하지 않기 때문에 DOM의 변경을 찾기 위한 런타임(Runtime)이 필요하지 않습니다.

지금부터 Svelte 공식 문서에서 소개하는 Svelte의 3가지 특징을 이야기 하도록 하겠습니다.

## Write less code
Svelte를 사용하면 적은 양의 코드로 동일한 동작을 하는 어플리케이션을 만들 수 있습니다. Vue.js와 React, Svelte를 사용하여 동일한 동작을 하는 코드를 작성해 보도록 하겠습니다.

Vue.js로 작성한 코드는 아래와 같습니다.

{% raw %}```html
<template>
  <div>
    <input type="number" v-model.number="a">
    <input type="number" v-model.number="b">

    <p>{{a}} + {{b}} = {{a + b}}</p>
  </div>
</template>

<script>
  export default {
    data: function() {
      return {
        a: 1,
        b: 2
      };
    }
  };
</script>
```{% endraw %}

React로 작성한 코드는 아래와 같습니다.

```jsx
import React, { useState } from 'react';

export default () => {
  const [a, setA] = useState(1);
  const [b, setB] = useState(2);

  function handleChangeA(event) {
    setA(+event.target.value);
  }

  function handleChangeB(event) {
    setB(+event.target.value);
  }

  return (
    <div>
      <input type="number" value={a} onChange={handleChangeA}/>
      <input type="number" value={b} onChange={handleChangeB}/>

      <p>{a} + {b} = {a + b}</p>
    </div>
  );
};
```

Svelte로 작성한 코드는 아래와 같습니다.

```html
<script>
  let a = 1;
  let b = 2;
</script>

<input type="number" bind:value={a}>
<input type="number" bind:value={b}>

<p>{a} + {b} = {a + b}</p>
```

React로 작성된 코드는 422자, Vue.js로 작성된 코드는 263자, Svelte로 작성된 코드는 145자로 Svelte로 작성된 코드가 가장 간결한 것을 볼 수 있습니다. Svelte는 높은 가독성을 유지하면서 적은 량의 코드를 작성 할 수 있습니다.

코드량이 줄어들면 2가지 장점이 있습니다.

### 작은 번들 파일 크기
코드량이 줄어들면 당연히, 컴파일 되어 생성된 번들 파일의 크기도 줄어듭니다.

### 적은 유지보수 비용

## No Virtual DOM
가상 돔을 사용하지 않아 빌드되어 나온 파일의 크기가 작음

## Truly reactive
가상 돔을 사용하지 않기 때문에 컴파일러라고 소개함
가상 돔을 사용하지 않는 어느 부분이 변경되었는지 정확히 알 수 있는 컴파일러

# Svelte 선택 시 유의사항

## CDN으로 Svelte 사용 불가능

## 브라우저 지원 체크

## Svelte 생태계

### router 라이브러리

#### 참고
- [https://velog.io/@ashnamuh/hello-svelte](https://velog.io/@ashnamuh/hello-svelte)
- [https://heropy.blog/2019/09/29/svelte/](https://heropy.blog/2019/09/29/svelte/)
- [https://ui.toast.com/weekly-pick/ko_20191002/](https://ui.toast.com/weekly-pick/ko_20191002/)
- [https://svelte.dev/blog/write-less-code](https://svelte.dev/blog/write-less-code)
- [https://svelte.dev/blog/virtual-dom-is-pure-overhead](https://svelte.dev/blog/virtual-dom-is-pure-overhead)
- [https://svelte.dev/blog/svelte-3-rethinking-reactivity](https://svelte.dev/blog/svelte-3-rethinking-reactivity)
- [https://github.com/sveltejs/svelte/issues/558](https://github.com/sveltejs/svelte/issues/558)