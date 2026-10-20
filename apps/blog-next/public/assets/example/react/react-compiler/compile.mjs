// App.jsx 를 React Compiler 로 변환해 표준 출력에 씁니다.
// compare.html 의 컴파일 후 코드는 이 스크립트의 출력을 붙여 넣은 것입니다.
//
//   npm i -D @babel/core babel-plugin-react-compiler @babel/plugin-transform-react-jsx
//   node compile.mjs App.jsx > App.compiled.js        # 컴파일 후
//   node compile.mjs App.jsx --no-compiler > App.plain.js  # 컴파일 전 (JSX 변환만)
//
// 브라우저는 JSX 를 읽지 못하므로 "컴파일 전" 쪽도 JSX 변환은 거칩니다.
//
// 실제 프로젝트에서는 Vite, Next.js, webpack 같은 빌드 도구가 매 빌드마다 이 일을 대신합니다.
import { readFileSync } from 'node:fs'
import { transformSync } from '@babel/core'

const args = process.argv.slice(2)
const useCompiler = !args.includes('--no-compiler')
const file = args.find((a) => !a.startsWith('--')) ?? 'App.jsx'

const result = transformSync(readFileSync(file, 'utf8'), {
  filename: file,
  babelrc: false,
  configFile: false,
  plugins: [
    // 컴파일러는 다른 플러그인보다 먼저 실행되어야 하므로 맨 앞에 둡니다.
    ...(useCompiler ? [['babel-plugin-react-compiler', { target: '19' }]] : []),
    // JSX 를 _jsx() 호출로 바꿉니다. JSX 를 그대로 남기고 싶다면 '@babel/plugin-syntax-jsx' 로 바꾸세요.
    ['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }],
  ],
})

process.stdout.write(result.code + '\n')
