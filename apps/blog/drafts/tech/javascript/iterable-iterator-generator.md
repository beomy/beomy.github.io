---
layout: post
title: '[JavaScript] Iterable, Iterator, Generator'
featured-img: javascript/js.png
category: [tech, javascript]
summary:
---

# Iterable 객체
- `[Symbol.iterator]`라는 메서드를 가집니다.
- `[Symbol.iterator]` 메서드는 Iterator 객체를 리턴합니다.

# Iterator 객체
- `next`라는 메서드를 가집니다.
- `next` 메서드는 `done`, `value` 두 속성을 갖는 객체를 리턴해야 합니다.
  - `done`: 반복이 끝났는지 표시합니다.
  - `value`: 현재 순서의 값을 나타냅니다.

# Well-formed iterable
- Iterator이면서 iterable인 객체를 말합니다.

# Generator
- Generator 함수(`function*`)는 iterable 객체를 반환하는 함수입니다.
- Generator 함수의 `yield` 키워드를 사용(ex `yield 1`)하면 Iterator 객체의 value 값을 넘겨줄 수 있습니다.

#### 참고
- [https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Iteration_protocols](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Iteration_protocols)
- [https://helloworldjavascript.net/pages/260-iteration.html](https://helloworldjavascript.net/pages/260-iteration.html)
- [https://armadillo-dev.github.io/javascript/what-is-iterable-and-iterator/](https://armadillo-dev.github.io/javascript/what-is-iterable-and-iterator/)
