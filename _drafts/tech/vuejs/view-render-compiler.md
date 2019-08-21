---
layout: post
title: '[Inside Vue] 8. View Render - 컴파일러'
featured-img: vuejs/vuejs.png
category: [tech, vuejs]
---
{% include toc.html %}

이번 포스트에서는 `baseCompile` 함수에서 사용하는 Parser, Optimizer, Generator에 대해 이야기합니다. Parser, Optimizer, Generator는 모두 많은 양의 코드를 보유(?)하고 있습니다. 자세히 코드를 살펴보지는 않고 어떤 작업들을 하는지 살펴볼 것입니다. 

# `baseCompile` 함수
```js
// `createCompilerCreator` allows creating compilers that use alternative
// parser/optimizer/codegen, e.g the SSR optimizing compiler.
// Here we just export a default compiler using the default parts.
export const createCompiler = createCompilerCreator(function baseCompile (
  template: string,
  options: CompilerOptions
): CompiledResult {
  const ast = parse(template.trim(), options)
  if (options.optimize !== false) {
    optimize(ast, options)
  }
  const code = generate(ast, options)
  return {
    ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  }
})
```

`baseCompile` 함수를 보면, `template`는 단순한 문자열이고, `parse` 함수에서 `template`를 `ast`로 변환하는 것을 볼 수 있습니다. 그 후 `optimize` 함수와 `generate` 함수를 거치 `render` 함수와 `staticRenderFns`를 생성합니다.

## `parser` 함수
`parser` 함수는 `template`를 [AST](https://ko.wikipedia.org/wiki/추상_구문_트리)(Abstract Syntax Tree)로 빌드하는 역할을 합니다. 단순 문자열인 `template`를 이해할 수 있고, `optimizer` 함수와 `generator` 함수에서 사용하는 트리로 바꿔줍니다.

## `optimizer` 함수

## `generator` 함수

# 요약

# 다음으로 볼 것

#### 참고
- [https://github.com/numbbbbb/read-vue-source-code/blob/master/06-view-render-introduction.md](https://github.com/numbbbbb/read-vue-source-code/blob/master/06-view-render-introduction.md)
