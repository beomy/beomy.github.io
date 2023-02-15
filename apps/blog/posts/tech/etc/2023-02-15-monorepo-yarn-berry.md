---
layout: post
title: '[ETC] Monorepo - Yarn Berry'
featured-img: etc/monorepo.png
category: [tech, etc]
summary: 이번 포스트에서는 Yarn Berry를 사용하여 모노레포를 구성해 보도록 하겠습니다. 이번에 구성할 모노레포는 Emotion와 React, TypeScript를 사용한 서비스 프로젝트와 디자인 시스템 프로젝트입니다.
---

이번 포스트에서는 `Yarn Berry`를 사용하여 모노레포를 구성해 보도록 하겠습니다. 이번에 구성할 모노레포는 Emotion와 React, TypeScript를 사용한 서비스 프로젝트와 디자인 시스템 프로젝트입니다. 이전 포스트 [[ETC] Monorepo - 개념](/tech/etc/monorepo-concept/)과 [[ETC] Yarn Berry](/tech/etc/yarn-berry/), [[ETC] package.json 톺아보기](/tech/etc/package-json/)는 이번 포스트를 이해하는데 도움을 줄 수 있습니다.

이번 포스트에서 생성한 모노레포는 [monorepo-yarn-berry](https://github.com/beomy/monorepo-yarn-berry)에서 확인할 수 있습니다.

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

명령어를 실행하면 위의 그림과 같이 `Yarn Berry` 프로젝트가 생성됩니다.

> **`Yarn Classic`에서 `Yarn Berry`로 마이그레이션 하기**
>
> `Yarn Classic`으로 만들어진 프로젝트를 `Yarn Berry`로 업데이트 하고 싶다면, `Yarn Classic` 프로젝트에서 아래 명령어를 실행하면 `Yarn Berry` stable 버전으로 업데이트 됩니다.
>
> ```bash
> yarn set version stable
> ```

### yarn workspace 설정하기
워크스페이스(workspace)란 모노레포의 하위 프로젝트를 말합니다. 아래 코드와 같이 `package.json`의 `workspaces`에 워크스페이스가 어느 경로에 있는지 작성해 줘야 합니다.

```json
"workspaces": ["packages/*"]
```

위의 코드는 `packages` 디렉토리 하위에 모든 워크스페이스가 있다는 것을 이야기합니다.

## VSCode 설정하기
이번 포스트는 VSCode를 사용하여 모노레포 프로젝트를 생성합니다. 다른 IDE를 사용하고 계신다면 이 부분은 넘기서도 무방합니다. VSCode를 사용한다면 아래 목록의 순서대로 진행합니다.

1. **[ZipFS](https://marketplace.visualstudio.com/items?itemName=arcanis.vscode-zipfs) VSCode 확장 프로그램 설치하기**: `Yarn Berry`는 Zip 형태로 의존성을 관리하기 때문에 Zip 파일을 읽기 위한 확장 프로그램이 필요합니다.
2. **TypeScript 설치하기**: TypeScript를 사용하기 위해 모노레포 프로젝트 루트에 `yarn add -D typescript` 명령어를 사용하여 TypeScript를 설치 해 줍니다.
3. **yarn sdk 설치**: VSCode에서 `Yarn Berry`를 사용하기 위해서는 yarn의 vscode sdk가 필요한데, `yarn dlx @yarnpkg/sdks vscode` 명령어를 사용하여 설치합니다.
4. **TypeScript 허용**  
    yarn sdk 설치가 끝나면, 아래 그림과 같은 팝업이 뜨는데, `Allow`를 클릭하여 TypeScript 사용을 허용해 줍니다.
    ![TypeScript 허용](/assets/img/posts/etc/typescript_allow_1.png)
    만약 위의 팝업이 뜨지 않거나 `Dismiss` 클릭하는 등으로 TypeScript 사용 허용을 해주지 못했다면, 아래 그림과 같이 `Command Pallette`(Cmd(Crtl) + Shift + P) -> `TypeScript: Select TypeScript Version...` -> `Use Workspace Version`를 클릭해 줍니다.
    ![TypeScript 허용](/assets/img/posts/etc/typescript_allow_2.png)

## 하위 프로젝트 만들기
Emotion과 React, TypeScript를 사용하는 디자인 시스템 프로젝트와 서비스 프로젝트를 만들고, 서비스 프로젝트에서 디자인 시스템 프로젝트의 디자인 컴포넌트를 가져와 사용하는 프로젝트를 만들어 보겠습니다.

### 디자인 시스템 프로젝트
먼저 Emotion, React, TypeScript를 사용하는 디자인 시스템 프로젝트를 만들어보겠습니다.

#### `package.json` 생성
`packages/design-system` 디렉토리를 생성하고 아래와 같이 간단한 `package.json`을 작성 후 필요한 패키지를 설치하도록 하겠습니다.

```json
{
  "name": "@monorepo/design-system",
  "version": "0.0.0"
}
```

#### 패키지 설치
`package.json`을 위에 코드와 같이 작성한 후, 아래 코드를 실행하여 필요한 패키지를 설치합니다.

```bash
yarn workspace @monorepo/design-system add -D typescript react react-dom @emotion/react @emotion/styled @types/react @types/react-dom
```

> **`yarn workspace` 명령어**
>
> `yarn workspace <workspaceName> <commandName>` 형태로 특정 워크스페이스의 스크립트를 실행할 수 있습니다.
>
> - `yarn workspace @monorepo/design-system add -D typescript`: `@monorepo/design-system` 프로젝트에 개발자 의존성을 가진 TypeScript를 설치하는 명령어입니다.
> - `yarn workspace @monorepo/design-system run test`: `@monorepo/design-system` 프로젝트의 `test` 스크립트(`package.json`에 `scripts`의 기록된...)를 실행하는 명령어입니다.

#### `peerDependencies` 설정
아래 코드와 같이 `package.json`의 `peerDependencies`를 설정해 줍니다.

```json
"peerDependencies": {
  "@emotion/react": "11.x",
  "@emotion/styled": "11.x",
  "react": "18.x",
  "react-dom": "18.x"
}
```

 디자인 시스템에서 사용하는 Emotion과 React는 디자인 시스템을 사용하는 쪽에서 제공해 줘야 하는 의존 패키기이기 때문에 `peerDependencies`에 정의 되어야 합니다. 만약 Emotion과 React가 `peerDependencies`로 정의되어 있지 않다면, 디자인 시스템과 서비스 프로젝트에서 각각 Emotion과 React 패키지가 존재하게 되어, Emotion의 Theme 등을 공유해서 사용할 수 없게 됩니다.

#### 디자인 컴포넌트 작성
간단한 버튼 디자인 컴포넌트를 아래와 같이 작성합니다.

```tsx
// packages/design-system/src/Button.tsx
import React, { ReactNode } from 'react';
import styled from '@emotion/styled';

type ButtonProps = {
  children: ReactNode
}

const StyledButton = styled.button`
  background-color: transparent;
  padding: 10px;
  border: 1px solid #777;
  border-radius: 5px;
`;

const Button = ({ children }: ButtonProps) => {
  return <StyledButton>{children}</StyledButton>
}

export default Button
```

#### 디자인 컴포넌트 exports
작성한 디자인 컴포넌트를 다른 프로젝트에서 사용할 수 있도록 아래와 같이 exports 설정을 추가하도록 하겠습니다. 먼저 아래 코드와 같이 `index.ts`를 만들고 내보낼 컴포넌트를 작성해 줍니다.

```ts
// packages/design-system/src/index.ts
export { default as Button } from './Button'
```

그 다음 `package.json`에 아래 코드와 같이 `main`과 `exports`를 작성하여 외부 프로젝트에서 사용할 수 있도록 내보내줍니다. 

```json
"main": "./src/index.ts",
"exports": {
  ".": "./src/index.ts"
},
```

### 서비스 프로젝트
작성한 디자인 시스템, Emotion, React, TypeScript를 사용하는 서비스 프로젝트를 만들어 보겠습니다.

#### 프로젝트 생성
`create-react-app`을 사용하여 리엑트 프로젝트를 만들도록 하겠습니다. 아래 명령어를 차례로 실행합니다.

```bash
yarn create react-app packages/service --template typescript
rm -rf node_modules package-lock.json
```

위의 명령어로 프로젝트 생성시 NPM으로 패키지가 설치되기 때문에 `node_modules`와 `package-lock.json`을 제거해줍니다.

#### 프로젝트 이름 변경
아래 코드와 같이 `packages/service/package.json`의 `name` 필드를 모노레포 네임스페이스로 변경해 줍니다.

```json
"name": "@monorepo/service",
```

#### 패키지 설치
아래 코드를 차례로 실행하여 필요한 패키지를 설치합니다.

```bash
yarn workspace @monorepo/service add @monorepo/design-system @emotion/react @emotion/styled craco
yarn workspace @monorepo/service add -D @emotion/babel-plugin @craco/craco @craco/types
```

#### craco 설정
다른 워크스페이스의 코드를 가져와 사용하기 위해서는 webpack 설정을 추가해 주어야 하는데, craco를 사용해서 webpack 설정을 확장해 보도록 하겠습니다. 아래 코드처럼 `craco.config.ts`를 작성하여, Emotion 바벨 플러그인과 webpack의 babel-loader를 확장해 줍니다.

```ts
// packages/service/craco.config.ts
import { getLoader, loaderByName } from '@craco/craco'
import { CracoConfig } from '@craco/types'

const cracoConfig: CracoConfig = {
  babel: {
    plugins: ['@emotion'],
  },
  webpack: {
    configure: (webpackConfig) => {
      const { isFound, match } = getLoader(webpackConfig, loaderByName('babel-loader'))
      if (isFound) {
        match.loader.include = undefined
        match.loader.exclude = /node_modules/
      }

      return webpackConfig
    },
  },
}

export default cracoConfig
```

babel-loader의 `include` 필드를 `undefined`로 재정의 해주어야, 다른 워크스페이스의 코드를 가져와 사용할 수 있게 됩니다. `package.json`의 `scripts` 필드에서 사용했던 `react-script`를 아래 코드와 같이 `craco`로 변경해 줍니다.

```json
"scripts": {
  "start": "craco start",
  "build": "craco build",
  "test": "craco test",
  "eject": "craco eject"
},
```

#### 디자인 컴포넌트 사용
아래 코드와 같이 작성했던 디자인 컴포넌트를 사용합니다.

```tsx
// packages/service/src/App.tsx
import { Button } from '@monorepo/design-system';

function App() {
  return (
    <div>
      <Button>TEST</Button>
    </div>
  );
}

export default App;
```

`yarn workspace @monorepo/service start` 명령어를 실행하여 결과물을 확인할 수 있습니다.

## 부록

### 스크립트 타이핑 최소화
모노레포의 워크스페이스의 스크립트를 실행하기 위해 매번 `yarn workspace @monorepo/design-system`을 타이핑하는 것은 너무 장황할 수 있습니다. 이런 타이핑 양을 줄이기 위해 아래 코드와 같이 `package.json`의 `scripts` 필드를 작성하면 작성해야 할 커맨드 라인이 줄일 수 있습니다.

```json
"scripts": {
  "ds": "yarn workspace @monorepo/design-system",
  "service": "yarn workspace @monorepo/service"
}
```

위의 코드와 같이 작성하면 `yarn ds add react`의 명령어가 `yarn workspace @monorepo/design-system add react`와 동일하게 동작하게 됩니다. `yarn service add react`는 `yarn workspace @monorepo/service add react`와 동일합니다.

### `Yarn Berry` 플러그인
`Yarn Berry`는 패키지를 편리하게 관리할 수 있게 도와주는 플러그인들을 제공합니다. [Yarn Berry Plugins](https://yarnpkg.com/features/plugins)에서 제공하는 플러그인들을 확인할 수 있습니다.

대표적으로, `yarn plugin import workspace-tools` 명령어로 `workspace-tools`를 설치하면 `yarn workspaces foreach <commandName>` 명령어를 사용할 수 있게 됩니다. 이 명령어는 아래 그림과 같이 모든 워크스페이스의 스크립트를 실행합니다.

![yarn workspaces](/assets/img/posts/etc/yarn_workspaces.gif)

##### 참고
- [https://yarnpkg.com/getting-started/editor-sdks#vscode](https://yarnpkg.com/getting-started/editor-sdks#vscode)
- [https://elvanov.com/2664](https://elvanov.com/2664)