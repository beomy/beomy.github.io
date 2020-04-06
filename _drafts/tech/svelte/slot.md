---
layout: post
title: '[Svelte] Slot'
featured-img: svelte/svelte-log.svg
height-img: 200px
category: [tech, svelte]
summary: 컴포넌트가 자식 요소를 가질 수 있게 하는 Slot을 살펴봅니다.
---
{% include toc.html %}

이번 포스트에서는 컴포넌트가 자식 요소를 가질 수 있도록 기능을 제공하는 Slot을 살펴도록하겠습니다.

# Slot
HTML 요소는 아래와 같이 자식 요소를 가질 수 있습니다.

```html
<div>
  <p>I'm a child of the div</p>
</div>
```

컴포넌트도 `<slot>`을 사용하면 자식 요소를 가질 수 있게 됩니다. 아래 코드를 살펴보면,

```html
<!-- Box.svelte -->
<div class="box">
	<slot></slot>
</div>
```

```html
<!-- App.svelte -->
<script>
  import Box from './Box.svelte';
</script>

<Box>
  <h2>Hello!</h2>
  <p>This is a box. It can contain anything.</p>
</Box>
```

`App.svelte` 컴포넌트의 `<Box>`의 자식 요소들이 `Box.svelte` 컴포넌트 안에 `<slot>` 요소의 위치에 나타나게 됩니다.

# Default slot

# Named slot

# Slot props

#### 참고
- [https://svelte.dev/tutorial/slots](https://svelte.dev/tutorial/slots)
- [https://svelte.dev/tutorial/slot-fallbacks](https://svelte.dev/tutorial/slot-fallbacks)
- [https://svelte.dev/tutorial/named-slots](https://svelte.dev/tutorial/named-slots)
- [https://svelte.dev/tutorial/slot-props](https://svelte.dev/tutorial/slot-props)