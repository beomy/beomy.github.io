---
layout: post
title: '[Inside Vue] 8. View Render - baseCompile 함수'
featured-img: vuejs/vuejs.png
category: [tech, vuejs]
summary: baseCompile 함수에서 사용하는 parse, optimize, generate 함수에 대해 이야기합니다.
---

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
...
const ast = parse(template.trim(), options)
console.log('[AFTER PARSE]', ast)
optimize(ast, options)
console.log('[AFTER OPTIMIZE]', ast)
const code = generate(ast, options)
console.log('[AFTER GENERATE]', code)
...
```

위의 코드와 같이 `console.log`로 `ast`와 `code`를 살펴볼 것입니다. [CodePen](https://codepen.io/beomy/pen/OJLbqZW?editors=1012)에서 위의 코드와 같이 빌드한 Vue를 사용하였습니다.

## `parse` 함수
`parse` 함수는 `compiler/parser/index.js` 파일에 정의되어 있습니다. 코드량이 많기 때문에 이번 포스트에서 코드 언급 하지는 않겠습니다. `parse` 함수는 헬퍼 함수들을 정의하고 `parseHTML` 함수를 호출합니다.

`parse` 함수는 `template`를 `ast`로 빌드하는 함수입니다. 단순 문자열인 `template`를 이해하기 쉬운 트리 형태로 변경해 줍니다. `ast`는 `optimize` 함수와 `generate` 함수에서도 사용됩니다.

하나의 코드를 예로들어, AST를 살펴보도록 하겠습니다.

{% raw %}
```html
<div id="app">
  {{ newName ? newName + 'true' : newName + 'false' }}
  <span>This is static node</span>
</div>

<script>
new Vue({
  el: '#app',
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
});
</script>
```
{% endraw %}

위의 코드에서 `parse` 함수를 통해 생성되는 `ast`는 아래와 같습니다.

{% raw %}
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
{% endraw %}

[CodePen](https://codepen.io/beomy/pen/OJLbqZW?editors=1012)에서 `ast`를 살펴볼 수 있습니다.

## `optimize` 함수
`optimize` 함수는 `compiler/optimizer.js` 파일에 정의되어 있습니다. `optimize` 함수는 AST에서 정적인 부분을 찾는 함수입니다. `optimize` 함수 실행 후의 AST를 살펴보도록 하겠습니다.

{% raw %}
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
      text:'\n  {{ newName ? newName + \'true\' : newName + \'false\' }}\n  ',
      static:false
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
      plain:true,
      static:true,
      staticInFor:false,
      staticRoot:false
    }
  ],
  plain:false,
  attrs:[  
    {  
      name:'id',
      value:'"app"'
    }
  ],
  static:false,
  staticRoot:false
}
```
{% endraw %}

`parse` 함수 이후의 AST와 `optimize` 함수 이후의 AST의 차이점은 static 플래그들이 추가된 점입니다. 정적인 요소들은 `static` 플래그가 `true`로 설정됩니다. [CodePen](https://codepen.io/beomy/pen/OJLbqZW?editors=1012)에서 `ast`를 살펴볼 수 있습니다.

## `generate` 함수
`generate` 함수는 `compiler/codegen/index.js` 파일에 정의되어 있습니다.

{% raw %}
```js
{  
  render:'with(this){return _c(\'div\',{attrs:{"id":"app"}},[_v("\\n  "+_s(newName ? newName + \'true\' : newName + \'false\')+"\\n  "),_c(\'span\',[_v("This is static node")])])}',
  staticRenderFns:[  

  ]
}
```
{% endraw %}

`generate` 함수를 통해 생경되는 `code`는 위의 코드와 같습니다. `code` 객체는 문자열인 `render`와 배열인 `staticRenderFns`로 구성됩니다. [CodePen](https://codepen.io/beomy/pen/OJLbqZW?editors=1012)에서 `code` 객체를 살펴볼 수 있습니다.

`code` 객체에 포함된 `render` 함수는 `vnode = render.call(vm._renderProxy, vm.$createElement)` 이런 방법으로 호출합니다. `call` 메소드를 사용하여 `render` 함수 내의 `this`는 `vm._renderProxy`가 됩니다. 또 `render` 함수는 `with(this)` 메소드를 사용합니다. 이런 과정 때문에 Vue에서 `template`를 사용 할 때, `this`를 사용하지 않아도 됩니다.

# 요약
이번 포스트에서는 컴파일러가 어떻게 `template`를 랜더링 함수로 만들어 내는지 이야기 하였습니다.

`baseCompile` 함수에서 `parse`, `optimize`, `generate` 함수를 통해 `ast`, `code.render`, `code.staticRenderFns`가 생성됩니다.

1. `parse` 함수를 통해 단순 문자열인 `template`가 `ast`로 변경됩니다.
2. `optimize` 함수를 통해 static 플래그들이 추가 됩니다. 정적인 요소들은 `static` 플래그가 `true`로 설정됩니다.
3. `generate` 함수를 통해 `render` 함수와 `staticRenderFns`가 생성됩니다. 

# 다음으로 볼 것
다음 포스트([9. View Render - Patch]({{ site.url }}/tech/vuejs/view-render-patch/))에서는 생성된 `render` 함수와 `__patch__()` 함수로 웹페이지를 업데이트 하는 과정을 이야기 하도록 하겠습니다.

#### 참고
- [https://github.com/numbbbbb/read-vue-source-code/blob/master/07-view-render-compiler.md](https://github.com/numbbbbb/read-vue-source-code/blob/master/07-view-render-compiler.md)
