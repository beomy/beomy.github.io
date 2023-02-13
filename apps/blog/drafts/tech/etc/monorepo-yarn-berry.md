---
layout: post
title: '[ETC] Monorepo - Yarn Berry'
featured-img: etc/monorepo.png
category: [tech, etc]
summary: 이번 포스트에서는 Yarn Berry를 사용하여 모노레포를 구성해 보도록 하겠습니다.
---

이번 포스트에서는 `Yarn Berry`를 사용하여 모노레포를 구성해 보도록 하겠습니다. 이번에 구성할 모노레포는 Emotion와 React를 사용한 서비스 프로젝트와 디자인 시스템 프로젝트입니다. 이전 포스트 [[ETC] Monorepo - 개념](/tech/etc/monorepo-concept/)과 [[ETC] Yarn Berry](/tech/etc/yarn-berry/)는 이번 포스트를 이해하는데 도움을 줄 수 있습니다.

## 프로젝트 생성하기
현재 Node LTS 버전인 18버전을 사용하여 `Yarn Berry` 모노레포를 만들어보도록 하겠습니다. 제가 사용하는 Node 버전은 18.12.0입니다.

![노드 버전](/assets/img/posts/etc/node_version.png)

먼저 아래 명령어로 `Yarn`을 전역으로 설치합니다.

```bash
npm i -g yarn
```

`Yarn Berry` 프로젝트는 아래 명령어로 만들 수 있습니다.

```bash
yarn init -2
```

![Yarn Berry 프로젝트 만들기](/assets/img/posts/etc/create_yarn_berry_project.png)

> **`Yarn Classic`에서 `Yarn Berry`로 마이그레이션 하기**
>
> `Yarn Classic`으로 만들어진 프로젝트를 `Yarn Berry`로 업데이트 하고 싶다면, `Yarn Classic` 프로젝트에서 아래 명령어를 실행하면 `Yarn Berry` stable 버전으로 업데이트 됩니다.
>
> ```bash
> yarn set version stable
> ```

## VSCode 설정하기
1. [ZipFS](https://marketplace.visualstudio.com/items?itemName=arcanis.vscode-zipfs) VSCode 확장 프로그램 설치
2. 타입스크립트 설치하기: `yarn add -D typescript`
3. sdk 설치: `yarn dlx @yarnpkg/sdks vscode`
4. 타입스크립트 허용
  - 캡쳐에서 허용
  - Command Pallette(Cmd(Crtl) + Shift + P) -> TypeScript: Select TypeScript Version... -> Use Workspace Version

## yarn workspace 설정하기
```json
{
  "name": "monorepo-yarn-berry",
  "packageManager": "yarn@3.4.1",
  "workspaces": ["packages/*"]
}
```

## 하위 프로젝트 만들기
React와 Emotion을 사용하는 디자인 시스템 프로젝트와 서비스 프로젝트를 만들고, 서비스 프로젝트에서 디자인 시스템 프로젝트의 디자인 컴포넌트를 가져와 사용하는 프로젝트를 만들어 보겠습니다.

### 디자인 시스템 프로젝트

#### `package.json` 생성
`packages/design-system` 디렉토리를 생성하고 아래와 같이 간단하게 `package.json`을 작성 후 필요한 패키지를 설치하도록 하겠습니다.

```json
{
  "name": "@monorepo/design-system",
  "version": "0.0.0",
}
```

#### 패키지 설치
`package.json`을 위에 코드와 같이 작성한 후, 아래 코드와 같이 필요한 패키지를 설치합니다.

```bash
yarn workspace @monorepo/design-system add -D typescript react react-dom @emotion/react @emotion/styled @types/react @types/react-dom
```

#### `peerDependencies` 설정
아래 코드와 같이 `peerDependencies`를 설정해 줍니다.

```json
{
  "name": "@monorepo/design-system",
  "version": "0.0.0",
  "devDependencies": {
    "@emotion/react": "^11.10.5",
    "@emotion/styled": "^11.10.5",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "peerDependencies": {
    "@emotion/react": "11.x",
    "@emotion/styled": "11.x",
    "react": "18.x",
    "react-dom": "18.x"
  }
}
```

#### 디자인 컴포넌트 작성
```js
// packages/design-system/src/Button.tsx
import { ReactNode } from 'react';
import styled from '@emotion/styled';

type ButtonProps = {
  children: ReactNode
}

const StyledButton = styled.button``;

const Button = ({ children }: ButtonProps) => {
  return <StyledButton>{children}</StyledButton>
}

export default Button
```

#### 디자인 컴포넌트 exports
```js
// packages/design-system/src/index.ts
export { default as Button } from './Button'
```

```json
{
  "name": "@monorepo/design-system",
  "version": "0.0.0",
  "main": "./src/index.ts",
  "exports": {
    ".": "./src/index.ts"
  },
  "devDependencies": {
    "@emotion/react": "^11.10.5",
    "@emotion/styled": "^11.10.5",
    "@types/react": "^18.0.27",
    "@types/react-dom": "^18.0.10",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "typescript": "^4.9.5"
  },
  "peerDependencies": {
    "@emotion/react": "11.x",
    "@emotion/styled": "11.x",
    "react": "18.x",
    "react-dom": "18.x"
  }
}
```

### 서비스 프로젝트

#### 프로젝트 생성
```bash
yarn create react-app packages/service --template typescript
rm -rf node_modules package-lock.json
```

#### 프로젝트 이름 변경
```json
{
  "name": "@monorepo/service",
}
```

#### 패키지 설치
```bash
yarn workspace @monorepo/service add @monorepo/design-system @emotion/react @emotion/styled craco
yarn workspace @monorepo/service add -D @emotion/babel-plugin @craco/craco @craco/types
```

#### craco 설정
```js
// craco.config.ts
import { getLoader, loaderByName } from '@craco/craco'
import { CracoConfig } from '@craco/types'

const cracoConfig: CracoConfig = {
  babel: {
    plugins: ['@emotion'],
  },
  webpack: {
    configure: (webpackConfig) => {
      const { isFound: isFoundBabelLoader, match: matchBabelLoader } =
        getLoader(webpackConfig, loaderByName('babel-loader'))
      if (isFoundBabelLoader) {
        matchBabelLoader.loader.include = undefined
        matchBabelLoader.loader.exclude = /node_modules/
      }

      return webpackConfig
    },
  },
}

export default cracoConfig
```

#### 디자인 컴포넌트 사용
```js
// packages/service/src/App.tsx
import Button from '@monorepo/design-system/Button';

function App() {
  return (
    <div>
      <Button>TEST</Button>
    </div>
  );
}

export default App;
```

## 부록

### yarn script 타이핑 최소화
- `"ds": yarn workspace @monorepo/design-system`: `yarn ds add react`
- `"service": yarn workspace @monorepo/service`: `yarn service add react`

### `Yarn Berry` 플러그인
`Yarn Berry`는 패키지 관리를 간편하게 도와주는 플러그인들을 제공합니다. [Yarn Berry Plugins](https://yarnpkg.com/features/plugins)에서 제공하는 플러그인들을 확인할 수 있습니다.

- `yarn plugin import workspace-tools` -> `yarn workspaces foreach run start`

##### 참고
- [https://yarnpkg.com/getting-started/editor-sdks#vscode](https://yarnpkg.com/getting-started/editor-sdks#vscode)
- [https://elvanov.com/2664](https://elvanov.com/2664)