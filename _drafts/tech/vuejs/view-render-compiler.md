---
layout: post
title: '[Inside Vue] 8. View Render - 컴파일러'
featured-img: vuejs/vuejs.png
category: [tech, vuejs]
---
{% include toc.html %}

이번 포스트에서는 `baseCompile` 함수에서 사용하는 `parse`, `optimize`, `generate` 함수에 대해 이야기합니다. `parse`, `optimize`, `generate` 함수는 모두 많은 양의 코드를 보유(?)하고 있습니다. 자세히 코드를 살펴보지는 않고 어떤 작업들을 하는지만 살펴볼 것입니다. 

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

`baseCompile` 함수를 보면, `parse` 함수에서 단순한 문자열인 `template`를 `ast`([Abstract Syntax Tree](https://ko.wikipedia.org/wiki/추상_구문_트리))로 변환하는 것을 볼 수 있습니다. 그 후 `optimize` 함수와 `generate` 함수를 거쳐 `render` 함수와 `staticRenderFns`를 생성합니다.

```js
export const createCompiler = createCompilerCreator(function baseCompile (
  template: string,
  options: CompilerOptions
): CompiledResult {
  const ast = parse(template.trim(), options)
  console.log('[AFTER Parse]', ast)
  if (options.optimize !== false) {
    optimize(ast, options)
    console.log('[AFTER Optimize]', ast)
  }
  const code = generate(ast, options)
  console.log('[AFTER Generate]', ast)
  return {
    ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  }
})
```

이후 내용에서는 `ast`를 `console.log`로 살펴볼 것입니다. [CodePen](https://codepen.io/beomy/pen/OJLbqZW?editors=1012)에서 `ast`를 살펴 볼 수 있습니다. CodePen에서 사용하는 Vue는 `console.log`를 추가한 위의 코드를 빌드한 버전입니다.

## `parse` 함수
`parse` 함수는 `template`를 `ast`로 빌드하는 함수입니다. 단순 문자열인 `template`를 이해하기 쉬운 트리 형태로 변경해 줍니다. `ast`는 `optimize` 함수와 `generate` 함수에서도 사용됩니다.

`parse` 함수는 `compiler/parser/index.js` 파일에 정의되어 있습니다. 코드량이 많기 때문에 이번 포스트에서 코드 언급 하지는 않겠습니다. `parse` 함수는 헬퍼 함수들을 정의하고 `parseHTML` 함수를 호출합니다. 

하나의 코드를 예로들어, AST를 살펴보도록 하겠습니다.

{% raw %}
```html
<template>
  <div id="app">
    {{ newName ? newName + 'true' : newName + 'false' }}
    <span>This is static node</span>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      name: 'foo'
    }
  },
  computed: {
    newName () {
      return this.name + 'new!'
    }
  }
}
</script>
```
{% endraw %}

위의 코드에서 `parse` 함수를 통해 생성되는 `ast`는 아래와 같습니다.

```js
{  
  type:1,
  tag:'div',
  attrsList:[  
    {  
      name:'id',
      value:'app'
    }
  ],
  attrsMap:{  
    id:'app'
  },
  parent:undefined,
  children:[  
    {  
      type:2,
      expression:'"\\n  "+_s(newName ? newName + \'true\' : newName + \'false\')+"\\n  "',
      text:'\n  {{ newName ? newName + \'true\' : newName + \'false\' }}\n  '
    },
    {  
      type:1,
      tag:'span',
      attrsList:[  

      ],
      attrsMap:{  

      },
      parent:[  
        Circular
      ],
      children:[  
        Array
      ],
      plain:true
    }
  ],
  plain:false,
  attrs:[  
    {  
      name:'id',
      value:'"app"'
    }
  ]
}
```

[CodePen](https://codepen.io/beomy/pen/OJLbqZW?editors=1012)에서 `ast`를 살펴볼 수 있습니다.

## `optimize` 함수

## `generate` 함수

# 요약

# 다음으로 볼 것

#### 참고
- [https://github.com/numbbbbb/read-vue-source-code/blob/master/06-view-render-introduction.md](https://github.com/numbbbbb/read-vue-source-code/blob/master/06-view-render-introduction.md)
