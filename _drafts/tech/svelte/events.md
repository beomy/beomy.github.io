---
layout: post
title: '[Svelte] 이벤트'
featured-img: svelte/svelte-log.svg
height-img: 200px
category: [tech, svelte]
---
{% include toc.html %}

이번 포스트에서는 Svelte에서 이벤트를 다루는 방법을 이야기 합니다.

# DOM 이벤트
[[Svelte] 반응형을 위한 문법](/tech/svelte/reactivity-syntax/#이벤트-리스너)에서 이벤트 리스너에 대해 이야기를 했습니다. 아래 코드와 같이 이벤트를 감지 할 수 있습니다.

```html
<script>
  let m = { x: 0, y: 0 };

  function handleMousemove(event) {
    m.x = event.clientX;
    m.y = event.clientY;
  }
</script>

<style>
  div { width: 100%; height: 100%; }
</style>

<div on:mousemove={handleMousemove}>
  The mouse position is {m.x} x {m.y}
</div>
```

`click` 이벤트 뿐만 아니라 위의 코드의 `mousemove` 이벤트와 같이 `on:이벤트 이름`으로 속성을 정의해 주면 DOM 이벤트를 감지 할 수 있게 됩니다.

# 인라인 핸들러
핸들러 함수를 아래 코드와 같이 인라인으로 작성할 수 있습니다.

```html
<script>
  let m = { x: 0, y: 0 };
</script>

<style>
  div { width: 100%; height: 100%; }
</style>

<div on:mousemove="{e => m = { x: e.clientX, y: e.clientY }}">
  The mouse position is {m.x} x {m.y}
</div>
```

속성을 정의할 때 따옴표(`""`) 사용은 선택사항지만 사용하는 것을 권장합니다.

일부 프레임워크에서는 성능상의 이유로 인라인 이벤트 핸들러 사용을 피하라고 추천합니다. 하지만 Svelte는 컴파일 되면서 최적화 되기 때문에 인라인 핸들러를 사용해야 할 때에는 성능의 고민 없이 사용하면 됩니다.

# 이벤트 수식어

# 컴포넌트 이벤트

# 이벤트 포워딩

# 참고
- [https://svelte.dev/tutorial/dom-events](https://svelte.dev/tutorial/dom-events)
- [https://svelte.dev/tutorial/inline-handlers](https://svelte.dev/tutorial/inline-handlers)
- [https://svelte.dev/tutorial/event-modifiers](https://svelte.dev/tutorial/event-modifiers)
- [https://svelte.dev/tutorial/component-events](https://svelte.dev/tutorial/component-events)
- [https://svelte.dev/tutorial/event-forwarding](https://svelte.dev/tutorial/event-forwarding)
- [https://svelte.dev/tutorial/dom-event-forwarding](https://svelte.dev/tutorial/dom-event-forwarding)