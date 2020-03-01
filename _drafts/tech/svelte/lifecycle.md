---
layout: post
title: '[Svelte] 라이프 사이클'
featured-img: svelte/svelte-log.svg
height-img: 200px
category: [tech, svelte]
---
{% include toc.html %}

이번 포스트에서는 컴포넌트의 생명주기(Lifecycle)를 이야기 합니다. 생명주기를 라이프 사이클이라고도 하는데, 앞으로는 생명주기라는 단어 대신 라이프 사이클이라는 단어를 사용하도록 하겠습니다.

라이프 사이클 함수란 컴포넌트가 화면에 마운트(화면에 출력) 되거나, 화면이 업데이트 혹은 화면에서 언마운트(화면에서 제거)됬을 때 실행되는 콜백 함수들을 말합니다.

# onMount

# onDestroy

# beforeUpdate, afterUpdate

# tick

#### 참고
- [https://svelte.dev/tutorial/onmount](https://svelte.dev/tutorial/onmount)
- [https://svelte.dev/tutorial/ondestroy](https://svelte.dev/tutorial/ondestroy)
- [https://svelte.dev/tutorial/update](https://svelte.dev/tutorial/update)
- [https://svelte.dev/tutorial/tick](https://svelte.dev/tutorial/tick)