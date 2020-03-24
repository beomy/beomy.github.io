---
layout: post
title: '[Svelte] Transitions'
featured-img: svelte/svelte-log.svg
height-img: 200px
category: [tech, svelte]
---
{% include toc.html %}

DOM에 요소들이 추가, 제거 되었을 때 트렌지션을 효과적으로 지원하는 트렌지션 디렉티브를 제공합니다. 이번 포스트에서는 Svelte에서 트렌지션을 사용하는 방법을 이야기 하도록 하겠습니다.

# 트렌지션 사용하기
트렌지션을 간단하게 사용하는 방법을 살펴보겠습니다.

```html
<script>
  import { fade } from 'svelte/transition';
  let visible = true;
</script>

<label>
  <input type="checkbox" bind:checked={visible}>
  visible
</label>

{#if visible}
  <p transition:fade>
    Fades in and out
  </p>
{/if}
```

- `svelte/transition`에서 `fade`를 가져옵니다.
- `visible`의 값이 변경되어 화면에 나타나거나, 제거 될 때 `fade` 트렌지션이 적용됩니다.

## 파라미터 추가하기
`svelte/transition`에서 가져온 `fade`를 트렌지션 함수라고 부르도록 하겠습니다. 트렌지션 함수에 파마미터를 전달하는 것이 가능합니다. 트렌지션 함수 중 하나인 `fly`를 살펴보겠습니다.

{% raw %}
```html
<script>
  import { fly } from 'svelte/transition';
  let visible = true;
</script>

<label>
  <input type="checkbox" bind:checked={visible}>
  visible
</label>

{#if visible}
  <p transition:fly="{{ y: 200, duration: 2000 }}">
    Flies in and out
  </p>
{/if}
```
{% endraw %}

- `svelte/transition`에서 `fly`를 가져옵니다.
- `visible`의 값이 변경되어 화면에 나타나거나, 제거 될 때 `fly` 트렌지션이 적용됩니다.

파라미터를 전달하는 방법은 간단합니다. 데이터를 바인딩하는 방법과 동일하게 파라미터로 전달하려는 값을 바인딩하면 됩니다.

# 트렌지션 종류
Svelte는 6개의 트렌지션을 제공합니다. 자세한 내용은 [https://svelte.dev/docs#svelte_transition](https://svelte.dev/docs#svelte_transition)를 참고 부탁드립니다.

## `fade`
`fade` 트렌지션을 요소의 `opacity`를 조절하는 트렌지션입니다. 점차 불투명에서 투명으로, 투명에서 불투명으로 변경됩니다.

![fade 트렌지션](/assets/img/posts/svelte/fade_transition.gif)

`fade` 트렌지션의 파라미터는 아래와 같습니다.

- `delay` (number, default 0): 단위는 ms로 설정한 시간이 지난 후에 트렌지션을 시작합니다.
- `duration` (number, default 400): 단위는 ms로 설정한 시간 만큼 트렌지션됩니다.

## `blur`
`blur` 트렌지션은 요소를 흐릿하게 보였다가 뚜렷하게 보이도록 변경하거나, 점차 요소를 흐릿하게 하여 요소를 제거합니다.

![blur 트렌지션](/assets/img/posts/svelte/blur_transition.gif)

`blur` 트렌지션의 파라미터는 아래와 같습니다.

- `delay` (number, default 0): 단위는 ms로 설정한 시간이 지난 후에 트렌지션을 시작합니다.
- `duration` (number, default 400): 단위는 ms로 설정한 시간 만큼 트렌지션됩니다.
- `easing` (function, default cubicInOut): easing 함수입니다. [https://svelte.dev/docs#svelte_easing](https://svelte.dev/docs#svelte_easing) 참고 바랍니다.
- `opacity` (number, default 0): 애니메이션의 불투명도 값입니다. 설정한 불투명도 값 만큼 불투명해졌다 사라집니다.
- `amount` (number, default 5): 흐릿해지는 애니매니션의 크기입니다.

## `fly`
`fly` 트렌지션은 단어 그대로 요소가 날라오면서 요소를 추가, 제거하는 트렌지션입니다.

![fly 트렌지션](/assets/img/posts/svelte/fly_transition.gif)

`fly` 트렌지션의 파라미터는 아래와 같습니다.

- `delay` (number, default 0): 단위는 ms로 설정한 시간이 지난 후에 트렌지션을 시작합니다.
- `duration` (number, default 400): 단위는 ms로 설정한 시간 만큼 트렌지션됩니다.
- `easing` (function, default cubicOut): easing 함수입니다. [https://svelte.dev/docs#svelte_easing](https://svelte.dev/docs#svelte_easing) 참고 바랍니다.
- `x` (number, default 0): 애니메이션에 적용하는 x 위치(offset)입니다. 설정한 만큼 x 위치를 변경합니다.
- `y` (number, default 0) - 애니메이션에 적용하는 y 위치(offset)입니다. 설정한 만큼 y 위치를 변경합니다.
- `opacity` (number, default 0): 애니메이션의 불투명도 값입니다. 설정한 불투명도 값 만큼 불투명해졌다. 사라집니다.

## `slide`
`slide` 트렌지션은 위에서 아래로 슬라이드로 나타나거나 제거되는 트렌지션입니다.

![slide 트렌지션](/assets/img/posts/svelte/slide_transition.gif)

`slide` 트렌지션의 파라미터는 아래와 같습니다.

- `delay` (number, default 0): 단위는 ms로 설정한 시간이 지난 후에 트렌지션을 시작합니다.
- `duration` (number, default 400): 단위는 ms로 설정한 시간 만큼 트렌지션됩니다.
- `easing` (function, default cubicOut): easing 함수입니다. [https://svelte.dev/docs#svelte_easing](https://svelte.dev/docs#svelte_easing) 참고 바랍니다.

## `scale`
`opacity`와 `scale`을 사용하는 트렌지션입니다. 말로 설명하기 어려우니.. 밑의 그림으로 확인바랍니다.

![scale 트렌지션](/assets/img/posts/svelte/scale_transition.gif)

`scale` 트렌지션의 파라미터는 아래와 같습니다.

- `delay` (number, default 0): 단위는 ms로 설정한 시간이 지난 후에 트렌지션을 시작합니다.
- `duration` (number, default 400): 단위는 ms로 설정한 시간 만큼 트렌지션됩니다.
- `easing` (function, default cubicOut): easing 함수입니다. [https://svelte.dev/docs#svelte_easing](https://svelte.dev/docs#svelte_easing) 참고 바랍니다.
- `start` (number, default 0) - 애니매이션의 크기(`scale`)입니다. 설정한 크기만큼 커지거나 작아지면서 사라집니다.
- `opacity` (number, default 0): 애니메이션의 불투명도 값입니다. 설정한 불투명도 값 만큼 불투명해졌다. 사라집니다.

## `draw`
`draw` 트렌지션은 SVG 요소의 선을 그리듯이 화면에 나타내는 트렌지션입니다.

![draw 트렌지션](/assets/img/posts/svelte/draw_transition.gif)

`draw` 트렌지션의 파라미터는 아래와 같습니다.

- `delay` (number, default 0): 단위는 ms로 설정한 시간이 지난 후에 트렌지션을 시작합니다.
- `speed` (number, default undefined): 애니메이션의 속도입니다.
- `duration` (number \| function, default 800): 단위는 ms로 설정한 시간 만큼 트렌지션됩니다.
- `easing` (function, default cubicInOut): easing 함수입니다. [https://svelte.dev/docs#svelte_easing](https://svelte.dev/docs#svelte_easing) 참고 바랍니다.

# 트렌지션 In/Out
트렌지션을 사용할 때, `transition` 디렉티브 대신에 `in`, `out` 디렉티브를 사용할 수 있습니다. `in`, `out` 디렉티브를 사용하면 요소가 추가, 제거 될 때 각각 다른 트렌지션을 설정 할 수 있습니다. `in`, `out` 트렌지션을 사용하는 예제를 살펴보도록 하겠습니다.

{% raw %}
```html
<script>
  import { fade, fly } from 'svelte/transition';
  let visible = true;
</script>

<label>
  <input type="checkbox" bind:checked={visible}>
  visible
</label>

{#if visible}
  <p in:fly="{{ y: 200, duration: 2000 }}" out:fade>
    Flies in, fades out
  </p>
{/if}
```
{% endraw %}

위의 예제는 요소가 추가 될 때는 `fly` 트렌지션, 제거 될 때는 `fade` 트렌지션이 동작하는 예시입니다.

# 커스텀 트렌지션 만들기
Svelte에서 제공하는 6가지 트렌지션 외의 트렌지션이 필요할 때, 원하는 트렌지션을 만들 수 있습니다. CSS와 자바스크립트를 사용하여 트렌지션을 만드는 방법을 이야기 하도록 하겠습니다.

## CSS

## JavaScript

# 트렌지션 이벤트

# 로컬 트렌지션

# Deffered 트렌지션

#### 참고
- [https://svelte.dev/tutorial/transition](https://svelte.dev/tutorial/transition)
- [https://svelte.dev/tutorial/adding-parameters-to-transitions](https://svelte.dev/tutorial/adding-parameters-to-transitions)
- [https://svelte.dev/tutorial/in-and-out](https://svelte.dev/tutorial/in-and-out)
- [https://svelte.dev/tutorial/custom-css-transitions](https://svelte.dev/tutorial/custom-css-transitions)
- [https://svelte.dev/tutorial/deferred-transitions](https://svelte.dev/tutorial/deferred-transitions)
- [https://svelte.dev/tutorial/transition-events](https://svelte.dev/tutorial/transition-events)
- [https://svelte.dev/tutorial/local-transitions](https://svelte.dev/tutorial/local-transitions)
- [https://svelte.dev/tutorial/deferred-transitions](https://svelte.dev/tutorial/deferred-transitions)