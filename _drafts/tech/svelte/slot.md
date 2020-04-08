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
컴포넌트의 자식 요소가 정의되어 있지 않은 경우 기본 요소를 정의할 수 있습니다. 사용 방법은 아래와 같습니다.

```html
<!-- Box.svelte -->
<div class="box">
  <slot>
    <em>no content was provided</em>
  </slot>
</div>
```

```html
<script>
  import Box from './Box.svelte';
</script>
 
<Box>
  <h2>Hello!</h2>
  <p>This is a box. It can contain anything.</p>
</Box>

<Box/>
```

`App.svelte`의 `<Box>`의 자식 요소가 정의 되어 있지 않을 경우, `Box.svelte` 컴포넌트의 `<slot>` 태그 안에 요소가 화면에 출력됩니다.

# Named slot
이름이 있는 Slot을 만들 수 있습니다. 예제를 살펴보겠습니다.

```html
<!-- ContactCard.svelte -->
<article class="contact-card">
	<h2>
		<slot name="name">
			<span class="missing">Unknown name</span>
		</slot>
	</h2>

	<div class="address">
		<slot name="address">
			<span class="missing">Unknown address</span>
		</slot>
	</div>

	<div class="email">
		<slot name="email">
			<span class="missing">Unknown email</span>
		</slot>
	</div>
</article>
```

```html
<!-- App.svelte -->
<script>
  import ContactCard from './ContactCard.svelte';
</script>

<ContactCard>
  <span slot="name">
    P. Sherman
  </span>

  <span slot="address">
    42 Wallaby Way<br>
    Sydney
  </span>
</ContactCard>
```

이름이 있는 Slot을 사용하면 원하는 위치에 요소를 배치할 수 있습니다.

`ContactCard.svelte`에는 `<slot name="name">`, `<slot name="address">`, `<slot name="email">` 3개의 Slot이 정의 되어 있습니다. `App.svelte`에는 `slot="name"`과 `slot="address"`를 사용하여 `ContactCard.svelte`의 `<slot name="name">`, `<slot name="address">`가 정의된 위치에 나타납니다. `App.svelte`에 `slot="email"`을 사용하지 않았기 때문에 `ContactCard.svelte`의 `<slot name="email">`은 기본 요소가 나타내게 됩니다.

# Slot props

#### 참고
- [https://svelte.dev/tutorial/slots](https://svelte.dev/tutorial/slots)
- [https://svelte.dev/tutorial/slot-fallbacks](https://svelte.dev/tutorial/slot-fallbacks)
- [https://svelte.dev/tutorial/named-slots](https://svelte.dev/tutorial/named-slots)
- [https://svelte.dev/tutorial/slot-props](https://svelte.dev/tutorial/slot-props)