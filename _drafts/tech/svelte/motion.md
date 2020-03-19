---
layout: post
title: '[Svelte] Motion'
featured-img: svelte/svelte-log.svg
height-img: 200px
category: [tech, svelte]
---
{% include toc.html %}

Svelte에서는 변수를 DOM에 바인딩하고 DOM이 업데이트 되면 자동으로 변수의 값을 업데이트 할 수 있습니다. Svelte에서는 변수의 값이 업데이트 되었을 때 애니메이션을 사용할 수 있는 Motion 기능을 제공합니다. 이번 포스트에서는 Svelte에서 제공하는 Motion을 알아보도록 하겠습니다.

# Tweened
프로그레스바 예제로 `tweened` Motion을 살펴보도록 하겠습니다.

```html
<script>
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';

  const progress = tweened(0, {
    duration: 400,
    easing: cubicOut
  });
</script>

<style>
  progress {
    display: block;
    width: 100%;
  }
</style>

<progress value={$progress}></progress>

<button on:click="{() => progress.set(0)}">
  0%
</button>

<button on:click="{() => progress.set(0.25)}">
  25%
</button>

<button on:click="{() => progress.set(0.5)}">
  50%
</button>

<button on:click="{() => progress.set(0.75)}">
  75%
</button>

<button on:click="{() => progress.set(1)}">
  100%
</button>
```

![프로그레스바](/assets/img/posts/svelte/progressbar.gif)

위의 코드와 그림은 `tweened` Motion을 사용한 코드와 그 결과입니다. `tweened` 함수를 살펴보겠습니다.

## `tweened` 함수
```js
store = tweened(value: any, options)
```

`tweened` 함수는 2개의 인자를 가집니다. 첫번째 인자는 변경되는 값이고 두번째 인자는 옵션입니다. `tweened` 함수는 store를 리턴합니다. `options`에 설정할 수 있는 값을 살펴보겠습니다.

- `delay` (number, default 0): 단위는 ms로, 설정한 시간 후에 시작됩니다.
- `duration` (number, default 400): 단위는 ms로, 설정한 시간 동안 실행됩니다.
- `easing` (function, default t => t): `easing` 함수입니다. Svelte에는 기본으로 30가지 템플릿([https://svelte.dev/docs#svelte_easing](https://svelte.dev/docs#svelte_easing) 참고)을 제공합니다. 커스텀하게 만들 수도 있습니다.
- `interpolate` (function): 두 값 사이를 보간하여 좀 더 부드럽게 보여주기 위해서 사용되는 옵션입니다. `(a, b) => t => value` 형태가 와야 합니다. `a`는 시작값, `b`는 목표값, `t`는 0과 1사이의 숫자이고, `value`는 결과값입니다.

`store.set`과 `store.update`의 두번째 인자에 `options`(위에서 설명한 옵션)를 전달 할 수 있습니다. 전달된 옵션은 기본값(인스턴스를 생성할 때 사용한 `tweened(value, options)`의 `options`가 기본값입니다.)에 오버라이드(override)됩니다. `set`과 `update` 함수의 리턴값은 Promise입니다. tween 작업이 완료 되면 Promise가 resolve됩니다.

# Spring

#### 참고
- [https://svelte.dev/tutorial/tweened](https://svelte.dev/tutorial/tweened)
- [https://svelte.dev/tutorial/spring](https://svelte.dev/tutorial/spring)
- [https://svelte.dev/docs#svelte_easing](https://svelte.dev/docs#svelte_easing)