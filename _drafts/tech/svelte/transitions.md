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

## `fade` 트렌지션
`fade` 트렌지션을 요소의 `opacity`를 조절하는 트렌지션입니다. 점차 불투명에서 투명으로, 투명에서 불투명으로 변경됩니다.

### 실행 화면
![fade 트렌지션](/assets/img/posts/svelte/fade_transition.gif)

### 파라미터
- `delay` (number, default 0): 단위는 ms로 설정한 시간이 지난 후에 트렌지션을 시작합니다.
- `duration` (number, default 400): 단위는 ms로 설정한 시간동안 트렌지션됩니다.

## `blur` 트렌지션
`blur` 트렌지션은 요소를 흐릿하게 보였다가 뚜렷하게 보이도록 변경하거나, 점차 요소를 흐릿하게 하여 요소를 제거합니다.

### 실행 화면
![blur 트렌지션](/assets/img/posts/svelte/blur_transition.gif)

### 파라미터
- `delay` (number, default 0): 단위는 ms로 설정한 시간이 지난 후에 트렌지션을 시작합니다.
- `duration` (number, default 400): 단위는 ms로 설정한 시간동안 트렌지션됩니다.
- `easing` (function, default cubicInOut): easing 함수입니다. [https://svelte.dev/docs#svelte_easing](https://svelte.dev/docs#svelte_easing) 참고 바랍니다.
- `opacity` (number, default 0): 애니메이션의 불투명도 값입니다. 설정한 불투명도 값 만큼 불투명해졌다 사라집니다.
- `amount` (number, default 5): 흐릿해지는 애니매니션의 크기입니다.

## `fly` 트렌지션
`fly` 트렌지션은 단어 그대로 요소가 날라오면서 요소를 추가, 제거하는 트렌지션입니다.

### 실행 화면
![fly 트렌지션](/assets/img/posts/svelte/fly_transition.gif)

### 파라미터
- `delay` (number, default 0): 단위는 ms로 설정한 시간이 지난 후에 트렌지션을 시작합니다.
- `duration` (number, default 400): 단위는 ms로 설정한 시간동안 트렌지션됩니다.
- `easing` (function, default cubicOut): easing 함수입니다. [https://svelte.dev/docs#svelte_easing](https://svelte.dev/docs#svelte_easing) 참고 바랍니다.
- `x` (number, default 0): 애니메이션에 적용하는 x 위치(offset)입니다. 설정한 만큼 x 위치를 변경합니다.
- `y` (number, default 0) - 애니메이션에 적용하는 y 위치(offset)입니다. 설정한 만큼 y 위치를 변경합니다.
- `opacity` (number, default 0): 애니메이션의 불투명도 값입니다. 설정한 불투명도 값 만큼 불투명해졌다. 사라집니다.

## `slide` 트렌지션
`slide` 트렌지션은 위에서 아래로 슬라이드로 나타나거나 제거되는 트렌지션입니다.

### 실행 화면
![slide 트렌지션](/assets/img/posts/svelte/slide_transition.gif)

### 파라미터
- `delay` (number, default 0): 단위는 ms로 설정한 시간이 지난 후에 트렌지션을 시작합니다.
- `duration` (number, default 400): 단위는 ms로 설정한 시간동안 트렌지션됩니다.
- `easing` (function, default cubicOut): easing 함수입니다. [https://svelte.dev/docs#svelte_easing](https://svelte.dev/docs#svelte_easing) 참고 바랍니다.

## `scale` 트렌지션
`opacity`와 `scale`을 사용하는 트렌지션입니다. 말로 설명하기 어려우니.. 밑의 그림으로 확인바랍니다.

### 실행 화면
![scale 트렌지션](/assets/img/posts/svelte/scale_transition.gif)

### 파라미터
- `delay` (number, default 0): 단위는 ms로 설정한 시간이 지난 후에 트렌지션을 시작합니다.
- `duration` (number, default 400): 단위는 ms로 설정한 시간동안 트렌지션됩니다.
- `easing` (function, default cubicOut): easing 함수입니다. [https://svelte.dev/docs#svelte_easing](https://svelte.dev/docs#svelte_easing) 참고 바랍니다.
- `start` (number, default 0) - 애니매이션의 크기(`scale`)입니다. 설정한 크기만큼 커지거나 작아지면서 사라집니다.
- `opacity` (number, default 0): 애니메이션의 불투명도 값입니다. 설정한 불투명도 값 만큼 불투명해졌다. 사라집니다.

## `draw` 트렌지션
`draw` 트렌지션은 SVG 요소의 선을 그리듯이 화면에 나타내는 트렌지션입니다.

### 실행 화면
![draw 트렌지션](/assets/img/posts/svelte/draw_transition.gif)

### 파라미터
- `delay` (number, default 0): 단위는 ms로 설정한 시간이 지난 후에 트렌지션을 시작합니다.
- `speed` (number, default undefined): 애니메이션의 속도입니다.
- `duration` (number \| function, default 800): 단위는 ms로 설정한 시간동안 트렌지션됩니다.
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

## 트렌지션 함수
Svelte에서 제공하는 트렌지션 템플릿은 단순한 함수입니다. `fade` 트렌지션은 실제로 아래 코드와 같이 구현되어 있습니다.

```js
function fade(node, {
  delay = 0,
  duration = 400
}) {
  const o = +getComputedStyle(node).opacity;

  return {
    delay,
    duration,
    css: t => `opacity: ${t * o}`
  };
}
```

트렌지션 함수를 사용하면 얼마든지 커스텀한 트렌지션을 만들 수 있습니다.

### 파라미터
트렌지션 함수는 2개의 파라미터를 가집니다.

- `node`: 첫번째 파라미터는 트렌지션이 적용되는 HTML 요소입니다.
- `options`: 두번째 파라미터는 `transition:fade="options"`에 `options`로 전달될 값입니다. 두번째 파라미터에는 모든 형태의 값을 전달 할 수 있습니다.

### 리턴값
트렌지션 함수는 객체를 리턴해야 합니다. 리턴하는 객체는 아래의 속성을 가져야 합니다.

- `delay`: 단위는 ms로 설정한 시간이 지난 후에 트렌지션을 시작합니다.
- `duration`: 단위는 ms로 설정한 시간동안 트렌지션됩니다.
- `easing`: `p => t` 형태의 easing 함수 입니다. [https://svelte.dev/docs#svelte_easing](https://svelte.dev/docs#svelte_easing) 참고 바랍니다.
- `css`: `(t, u) => css` 함수입니다. `t`는 0 ~ 1 사이의 값이고, `u`는 `u === 1 - t`입니다. 요소가 삽입 될 때 `t`는 0에서 1로 증가하고, 요소가 제거 될 때 `t`는 1에서 0으로 감소합니다.
- `tick`: `(t, u) => {...}` 함수입니다. 매 tick 마다 호출되는 콜백함수입니다.

`css`와 `tick` 속성은 이 후 내용에서 더 자세히 살펴보도록 하겠습니다.

## CSS로 트렌지션 만들기
CSS를 사용하여 트렌지션 함수를 만드는 방법은 트렌지션 함수의 리턴값 중 `css` 속성을 사용하는 것입니다.

`css` 속성은 `(t, u) => css` 형태의 함수가 와야 합니다. 간단히 이야기 하면, 파라미터인 `t`(혹은 `u`)의 변화에 따라 CSS 문자열을 리턴하는 함수를 만들면 됩니다. 아래 예제를 보면,

```html
<script>
  import { fade } from 'svelte/transition';
  import { elasticOut } from 'svelte/easing';

  let visible = true;

  function spin(node, { duration }) {
    return {
      duration,
      css: t => {
        const eased = elasticOut(t);

        return `
          transform: scale(${eased}) rotate(${eased * 1080}deg);
          color: hsl(
            ${~~(t * 360)},
            ${Math.min(100, 1000 - 1000 * t)}%,
            ${Math.min(50, 500 - 500 * t)}%
          );`
      }
    };
  }
</script>

<style>
  .centered {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }

  span {
    position: absolute;
    transform: translate(-50%,-50%);
    font-size: 4em;
  }
</style>

<label>
  <input type="checkbox" bind:checked={visible}>
  visible
</label>

{#if visible}
  <div class="centered" in:spin="{{duration: 8000}}" out:fade>
    <span>transitions!</span>
  </div>
{/if}
```

![CSS를 사용한 트렌지션](/assets/img/posts/svelte/use_css_transition.gif)

## JavaScript로 트렌지션 만들기

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