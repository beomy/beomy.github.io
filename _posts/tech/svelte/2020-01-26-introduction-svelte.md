---
layout: post
title: '[Svelte] Svelte 소개'
featured-img: svelte/svelte-log.svg
height-img: 200px
category: [tech, svelte]
summary: 새롭게 등장한 Svelte라는 프레임워크를 소개합니다.
---

Vue.js, React, Angular를 프론트엔드 프레임워크 3대장이라고 흔히들 말합니다. 이번 포스트에서는 새롭게 등장한 Svelte라는 프레임워크를 소개합니다. 아직 정식 한글 문서를 제공하지 않고 있지만, 프레임워크 3대장이라고 불리는 다른 프레임워크보다 낮은 러닝 커브를 가집니다.

# Svelte 특징
Svelte라는 단어는 날씬한, 호리호리한이라는 뜻입니다. 단어의 뜻답게 적은 코드와 작은 용량이 장점입니다. Svelte는 가상돔(Virtual DOM)을 사용하지 않습니다. 지금부터 Svelte 공식 문서에서 소개하는 Svelte의 3가지 특징을 이야기하도록 하겠습니다.

## Write less code
Svelte를 사용하면 적은 양의 코드로 동일한 동작을 하는 애플리케이션을 만들 수 있습니다. Vue.js와 React, Svelte를 사용하여 동일한 동작을 하는 코드를 작성해 보도록 하겠습니다.

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

React로 작성된 코드는 422자, Vue.js로 작성된 코드는 263자, Svelte로 작성된 코드는 145자로 Svelte로 작성된 코드가 가장 간결한 것을 볼 수 있습니다. Svelte는 높은 가독성을 유지하면서 적은 양의 코드를 작성할 수 있습니다.

코드 양이 줄어들면 2가지 장점이 있습니다.

### 번들 크기 감소
코드 양이 줄어들면 컴파일 되어 생성된 번들 파일의 크기도 줄어듭니다. 번들의 크기가 작으면 SPA(Single Page Application)의 단점을 보완할 수 있습니다.

SPA의 전형적인 단점은 첫 로딩 시 사용되는 모든 리소스를 다운로드하고, 파싱하고, 실행되기 때문에 첫 로딩에 많은 시간이 걸린다는 것입니다. 번들 크기가 줄어들면, 그만큼 다운로드해야 할 리소스가 줄고, 파싱 할 양이 줄기 때문에 첫 로딩 속도가 개선됩니다.

### 유지 보수 비용 감소
코드 양이 줄어들면 유지 보수에 사용되는 비용이 감소합니다. 프로젝트 개발 시간과 버그의 개수는 코드 양에 따라 선형적으로 증가하는 것이 아니라 2차식으로 증가한다고 합니다([https://svelte.dev/blog/write-less-code](https://svelte.dev/blog/write-less-code) 참고함). 코드를 유지 보수하는 입장에서도 코드를 읽고 이해하는데 코드 양이 적으면 좀 더 빠르고 쉽게 이해할 수 있습니다.

## No Virtual DOM
Vue.js와 React는 가상돔을 사용합니다. Vue.js와 React는 가상돔이 빠르다는 인식을 프론트엔드 개발자들에게 심어주었습니다. 물론 가상돔은 대부분의 경우 실제돔(Real DOM)보다 빠릅니다.

### 가상돔은 항상 빠르지 않습니다.
하지만 가상돔을 사용하는 것이 항상 빠른 것은 아닙니다. 가상돔이 변경되면, 새로운 가상돔과 변경되기 전의 가상돔을 비교하여 변경된 내용을 실제돔에 적용을 하는데, 이때 가상돔을 비교하는 오버헤드가 발생합니다. 오버헤드가 발생하지 않는다면 React에서 `shouldComponentUpdate`를 사용하여 최적화하는 방법은 필요 없을 것입니다.

### 런타임 프레임워크를 포함하지 않습니다.
Svelte는 가상돔을 사용하지 않습니다. 가상돔은 변경된 내용을 알기 위한 수단으로 사용됩니다. Svelte는 가상돔을 사용하지 않아도 변경된 내용을 알 수 있는 다른 수단을 사용하기 때문에 가상돔을 사용하지 않습니다.

가상돔을 사용하지 않아서 번들에는 변경된 내용을 알기 위해 사용되는 런타임 프레임워크가 포함되지 않습니다. 런타임 프레임워크를 포함하지 않기 때문에 번들 크기가 더 작아지게 됩니다.

## Truly reactive
Vue.js와 React는 런타임에 가상돔을 비교하여 변경된 내용을 파악하는 방식을 사용합니다. 반면에 Svelte는 빌드 타임(Build Time)에 어느 부분이 변경될지 파악하는 방식을 사용합니다. Svelte는 어느 부분이 변경될지 파악하고 그 부분의 상태(state)가 변경될 경우 반응형으로 화면을 갱신하는 진짜 반응형입니다.

### Svelte는 컴파일러입니다.
Svelte는 공식 문서에는 컴파일러라고 소개합니다. [위키백과](https://ko.wikipedia.org/wiki/컴파일러)에서

> 컴파일러는 특정 프로그래밍 언어로 쓰여 있는 문서를 다른 프로그래밍 언어로 옮기는 프로그램을 말한다.

라고 정의하고 있습니다. Svelte는 빌드 타임에 돔을 업데이트하는 효율적인 명령 코드로 변환하기 때문에 컴파일러라고 소개하는 것으로 생각됩니다.

# Svelte 사용 시 유의사항
Svelte를 프로젝트에 도입하기 전에 고려해야 할 몇 가지 사항들에 대해 이야기해보도록 하겠습니다.

## CDN으로 Svelte 사용 불가능합니다.
Svelte는 앞에서 이야기 한 것처럼 빌드 타임에 반응형이 결정됩니다. 빌드 타임에 결정되기 때문에 런타임에 오버헤드를 줄여 성능을 향상시킬 수 있는 장점이 있지만, 런타임 프레임워크를 포함하고 있지 않기 때문에 CDN 등으로 Svelte를 사용할 수 없습니다.

## 브라우저 지원 체크가 필요합니다.
공식 문서에서 정식으로 어느 브라우저까지 지원한다고 이야기하고 있지 않습니다. IE11 이하의 구형 브라우저에서 Svelte를 사용하기 위해서는 별도의 설정 작업이 필요합니다.

참고: [Github](https://github.com/sveltejs/svelte/issues/558)에 Svelte에 브라우저 지원 이슈가 올라와 있습니다.

## Svelte 생태계를 생각해야 합니다.
Svelte는 신규 프레임워크인 만큼 지금은 Vue.js나 React 만큼 생태계가 크지 않습니다. state 관리는 별도의 라이브러리가 아닌 Svelte에서 정식으로 지원합니다.

### CLI 라이브러리
React의 `create-react-app`이나 Vue.js의 `vue-cli`와 같이 간편하게 프로젝트를 생성할 수 있는 CLI 라이브러리가 아직 존재하지 않습니다. 다만, Github에 [`rollup`](https://github.com/sveltejs/template), [`webpack`](https://github.com/sveltejs/template-webpack) 두 가지 버전의 보일러 플레이트(boilerplate)가 올라와 있어 클론으로 프로젝트를 간단히 생성할 수 있습니다.

### router 라이브러리
Svelte에서 공식으로 제공하는 router 라이브러리가 없습니다. (`svelte-spa-router`가 많이 사용되는 router 라이브러리로 보입니다.)

# 요약
### Svelte의 특징 및 장점
- 코드를 간결하게 작성할 수 있습니다.
- 가상돔을 사용하지 않습니다.
  - 변경된 위치를 정확하게 알아 돔을 비교하는 런타임 프레임워크가 필요 없습니다.
  - 돔을 비교하는데 드는 오버헤드가 없습니다.
  - 돔을 비교하는 런타임 프레임워크가 없어 번들의 크기가 작습니다.
- 진짜 반응형 프레임워크입니다.
  - 변경된 위치를 찾아 변경하는 것이 아니라, 변경된 위치를 정확하게 아는 진짜 반응형입니다.

### Svelte 사용 시 유의사항
- CDN으로 svelte를 사용할 수 없습니다.
- 구형 브라우저에서 동작하는지 확인해 보아야 합니다.
- 신규 프레임워크이기 때문에 생태계가 아직 크지 않습니다.

#### 참고
- [https://velog.io/@ashnamuh/hello-svelte](https://velog.io/@ashnamuh/hello-svelte)
- [https://heropy.blog/2019/09/29/svelte/](https://heropy.blog/2019/09/29/svelte/)
- [https://ui.toast.com/weekly-pick/ko_20191002/](https://ui.toast.com/weekly-pick/ko_20191002/)
- [https://svelte.dev/blog/write-less-code](https://svelte.dev/blog/write-less-code)
- [https://svelte.dev/blog/virtual-dom-is-pure-overhead](https://svelte.dev/blog/virtual-dom-is-pure-overhead)
- [https://svelte.dev/blog/svelte-3-rethinking-reactivity](https://svelte.dev/blog/svelte-3-rethinking-reactivity)
- [https://github.com/sveltejs/svelte/issues/558](https://github.com/sveltejs/svelte/issues/558)