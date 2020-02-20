---
layout: post
title: '[Svelte] 데이터 바인딩'
featured-img: svelte/svelte-log.svg
height-img: 200px
category: [tech, svelte]
---
{% include toc.html %}

이번 포스트에서는 데이터 바인딩을 이야기 합니다. Vue.js에서 `v-model`로 데이터 바인딩 하는 방법을 Svelte에서는 어떻게 바인딩하는지 알아보도록 하겠습니다.

# `input`
`<input>` 태그의 데이터 바인딩을 살펴보도록 하겠습니다. 데이터 바인딩을 하지 않는 다면, `value` 속성에 값을 할당 하고 `input` 이벤트가 발생 할 때 마다 `value` 속성을 업데이트 해줘야 합니다. 데이터 바인딩으로 이 과정을 생략할 수 있습니다.

## `type="text"`
`<input>` 태그의 `type` 속성이 `text` 혹은 정의되어 있지 않을 경우, Vue.js는 아래와 같이 `v-model`을 사용하여 아래와 같이 데이터 바인딩을 구현할 수 있습니다.

{% raw %}
```html
```
{% endraw %}

## `type="number"`, `type="range"`

## `type="checkbox"`

## `type="radio"`

# `textarea`

# `select`

## `multiple`

# `contenteditable`

# Each 블록 바인딩

# Media 요소

# Dimension

# `this` 바인딩

# 컴포넌트 바인딩

#### 참고
- [https://svelte.dev/tutorial/text-inputs](https://svelte.dev/tutorial/text-inputs)
- [https://svelte.dev/tutorial/numeric-inputs](https://svelte.dev/tutorial/numeric-inputs)
- [https://svelte.dev/tutorial/checkbox-inputs](https://svelte.dev/tutorial/checkbox-inputs)
- [https://svelte.dev/tutorial/group-inputs](https://svelte.dev/tutorial/group-inputs)
- [https://svelte.dev/tutorial/textarea-inputs](https://svelte.dev/tutorial/textarea-inputs)
- [https://svelte.dev/tutorial/select-bindings](https://svelte.dev/tutorial/select-bindings)
- [https://svelte.dev/tutorial/multiple-select-bindings](https://svelte.dev/tutorial/multiple-select-bindings)
- [https://svelte.dev/tutorial/contenteditable-bindings](https://svelte.dev/tutorial/contenteditable-bindings)
- [https://svelte.dev/tutorial/each-block-bindings](https://svelte.dev/tutorial/each-block-bindings)
- [https://svelte.dev/tutorial/media-elements](https://svelte.dev/tutorial/media-elements)
- [https://svelte.dev/tutorial/dimensions](https://svelte.dev/tutorial/dimensions)
- [https://svelte.dev/tutorial/bind-this](https://svelte.dev/tutorial/bind-this)
- [https://svelte.dev/tutorial/component-bindings](https://svelte.dev/tutorial/component-bindings)