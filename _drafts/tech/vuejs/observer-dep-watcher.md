---
layout: post
title: '[Inside Vue] 5. Observer, Dep and Watcher'
featured-img: vuejs/vuejs.png
category: [tech, vuejs]
---
{% include toc.html %}

이번 포스트에서는 Observer와 Dep, Watcher에 대해 이야기 하도록 하겠습니다. Vue는 data 변경 패턴을 [감시자(옵저버) 패턴](https://ko.wikipedia.org/wiki/옵서버_패턴)을 사용하기 때문에 옵저버 패턴에 관한 사전 지식이 있다면, 이해 하는데 도움이 될 것 같습니다.

# Observer

## `observe` 함수

## `dependArray` 함수

## `Observer` 클래스

# Dep
`Dep` 클래스의 상단 주석을 보면

```js
/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
export default class Dep {
```

라고 기록되어 있습니다. `Dep`는 여러개의 지시문(directives)을 구독(subscribe) 할 수 있는 관찰 가능한 객체입니다. [옵저버 패턴 wiki](https://ko.wikipedia.org/wiki/옵서버_패턴)를 보고 비교하자면, `Dep`은 옵저버들의 목록을 객체에 등록하여 관리하는 역할을 하는 것으로 보입니다.

# Watcher

# 요약

# 다음으로 볼 것

#### 참고
- [https://github.com/numbbbbb/read-vue-source-code/blob/master/04-dynamic-data-observer-dep-and-watcher.md](https://github.com/numbbbbb/read-vue-source-code/blob/master/04-dynamic-data-observer-dep-and-watcher.md)
