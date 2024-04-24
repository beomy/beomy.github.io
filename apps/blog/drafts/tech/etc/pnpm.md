---
layout: post
title: '[ETC] PNPM'
featured-img: etc/pnpm.png
category: [tech, etc]
summary: 패키지 매니저로 NPM, Yarn, PNPM 등이 있습니다. 그 중 PNPM은 Performant Node Package Manager 약자로 고성능 노드 패키지 매니저라는 뜻을 가지고 있습니다.
---

> ##### TL;DR
> - PNPM은 심볼릭 링크와 하드 링크를 사용하여 `node_modules`를 구성합니다.
>   - `./node_modules/express`는 `./node_modules/.pnpm/express@4.19.2/node_modules/express`의 싱볼릭 링크
>   - `./node_modules/.pnpm/express@4.19.2/node_modules/express`는 `~/Library/pnpm/store/v3/files/{해시}`의 하드 링크

패키지 매니저로 NPM, Yarn, PNPM 등이 있습니다. 그 중 PNPM은 Performant Node Package Manager 약자로 고성능 노드 패키지 매니저라는 뜻을 가지고 있습니다. [Turborepo는 PNPM 사용을 권장](https://turbo.build/repo/docs/getting-started/create-new)하는 등 다른 서비스에서도 PNPM의 성능을 인정하고 있습니다.

## PNPM는 정말 빠른가?
개발자에서 좋은 성능을 만들어 준다는 것은 매우 매혹적인 이야기입니다. 패키지 매니저가 빠른 성능을 제공하면 패키지를 설치하는 속도를 단축시켜주어 개발 경험을 향상 시키고, CI에서 배포하는데 걸리는 시간을 단축시켜줍니다.

### PNPM 공식 문서에서 이야기하는 속도
아래 표는 [PNPM 공식 문서의 밴치 마크](https://pnpm.io/benchmarks)로 가장 유명한 3개의 패키지 매니저인 NPM, Yarn, PNPM을 비교한 표입니다. [`package.json`에 나열된 패키지](https://github.com/pnpm/pnpm.io/blob/main/benchmarks/fixtures/alotta-files/package.json)를 설치/업데이트 하는데 걸리는 시간를 측정하였습니다.

|                                  행동                                   |                       조건                       |                         설명                          |                                 결과                                 |
|:---------------------------------------------------------------------:|:----------------------------------------------:|:---------------------------------------------------:|:------------------------------------------------------------------:|
|                        **install**<br />clean                         | Cache: X<br />lockfile: X<br />node_modules: X |  lock 파일도, 캐시도, node_modules 폴더도 없는 완전히 새로 설치하는 경우  | npm: 30.3s<br />pnpm: 8.1s<br />Yarn: 7.3s<br />**Yarn Pnp: 3.6s** |
| **install**<br />with cache<br />with lockfile<br />with mode_modules | Cache: O<br />lockfile: O<br />node_modules: O |     패키지 설치가 완료된 후 다시 설치 명령어를 실행하여 패키지를 설치하는 경우      |   npm: 1.5s<br />**pnpm: 1s**<br />Yarn: 5.2s<br />Yarn Pnp: n/a   |
|            **install**<br />with cache<br />with lockfile             | Cache: O<br />lockfile: O<br />node_modules: X |          개발자가 레포지토리를 가져와서 처음 패키지를 설치하는 경우           | npm: 8.1s<br />pnpm: 2.6s<br />Yarn: 5.4s<br />**Yarn Pnp: 1.4s**  |
|                      **install**<br />with cache                      | Cache: O<br />lockfile: X<br />node_modules: X |     개발자가 레포지토리를 가져와서 lock 파일 없이 처음 패키지를 설치하는 경우     |   npm: 13s<br />pnpm: 5.7s<br />Yarn: 7.3s<br />**Yarn Pnp: 3s**   |
|                    **install**<br />with lockfile                     | Cache: X<br />lockfile: O<br />node_modules: X |                CI 서버에서 패키지를 설치하는 경우                 | npm: 11.8s<br />pnpm: 5.2s<br />Yarn: 5.4s<br />**Yarn Pnp: 1.4s** |
|          **install**<br />with cache<br />with mode_modules           | Cache: O<br />lockfile: X<br />node_modules: O |            lock 파일 삭제 후 다시 패키지를 설치하는 경우             |  **npm: 1.7s**<br />pnpm: 2.4s<br />Yarn: 6.9s<br />Yarn Pnp: n/a  |
|         **install**<br />with lockfile<br />with mode_modules         | Cache: X<br />lockfile: O<br />node_modules: O |              캐시를 삭제하고 패키지를 다시 설치하는 경우               |   npm: 1.4s<br />**pnpm: 1s**<br />Yarn: 5.2s<br />Yarn Pnp: n/a   |
|                  **install**<br />with mode_modules                   | Cache: X<br />lockfile: X<br />node_modules: O |          캐시와 lock 파일 삭제 후 다시 패키지를 설치하는 경우           |  **npm: 1.7s**<br />pnpm: 5.3s<br />Yarn: 6.9s<br />Yarn Pnp: n/a  |
|                              **update**                               |                                                | package.json에서 버전을 변경하고 패키지를 다시 설치하여 종속성을 업데이트 한 경우 |  npm: 6.6s<br />pnpm: 3.5s<br />Yarn: 5.8s<br />**Yarn Pnp: 3s**   |

Yarn Pnp는 `node_modules` 폴더가 존재하지 않기 때문에 `node_modules` 폴더가 있는 조건은 모두 `n/a`입니다. 가장 빠른 성능을 보인 패키지 매니저는 굵은 글씨로 표시했습니다. 아래 그림은 위의 표의 결과를 그래프로 나타낸 그림입니다.

![NPM, PNPM, Yarn, Yarn Pnp 성능 비교](/assets/img/posts/etc/npm_pnpm_yarn_yarn_pnp_from_pnpm.svg)

위의 표와 그림으로 PNPM과 다른 패키지 매니저를 비교해 보면 아래와 같습니다.

- PNPM VS NPM: PNPM이 9가지 행동 중 7가지가 NPM보다 빠릅니다.
- PNPM VS Yarn: PNPN이 9가지 행동 중 8가지가 Yarn보다 빠릅니다.
- PNPM VS Yarn Pnp: Yarn Pnp이 5가지 행동 중 5가지 모두 PNPM보다 빠릅니다.

PNPM은 NPM과 Yarn 보다는 빠르지만 Yarn Pnp보다는 느린 것을 알 수 있습니다. 하지만 Yarn Pnp는 node_modules를 사용하지 않는 전혀 다른 방식으로 동작하기 때문에 단순 비교하지 못하는 부분이 있는 것을 감안해야 합니다.

### Yarn 공식 문서에서 이야기하는 속도
아래 그림은 [Yarn 공식 문서에서 비교한 NPM, Yarn, PNPM 성능](https://yarnpkg.com/features/performances)입니다. Next, Gatsby 프로젝트의 설치 시간을 비교하였습니다. 아래 그림에서 Yarn은 Yarn pnp(`nodeLinker: "pnp"`)를, Yarn (NM)은 Yarn node-modules(`nodeLinker: "node-modules"`)를, Classic은 Yarn 1버전을 이야기 합니다.

![NPM, PNPM, Yarn, Yarn Pnp 성능 비교](/assets/img/posts/etc/npm_pnpm_yarn_yarn_pnp_from_yarn.png)

위의 그림으로 PNPM과 다른 패키지 매니저를 비교해 보면 아래와 같습니다.

- PNPM VS NPM: PNPM이 8가지 행동 중 6가지가 NPM보다 빠릅니다.
- PNPM VS Yarn NM: PNPM이 8가지 행동 중 6가지가 Yarn NM보다 빠릅니다.
- PNPM VS Yarn Pnp: PNPM이 8가지 행동 중 4가지가 Yarn Pnp보다 빠릅니다.
- PNPM VS Yarn Classic: PNPM이 8가지 행동 중 7가지가 Yarn Clasic보다 빠릅니다.

PNPM이 전반적으로 다른 패키지 매니저보다 더 좋은 성능을 보이는 것을 알 수 있습니다. 다만 설치해야 하는 패키지에 따라 성능이 다를 수 있으니 참고해야 합니다.

## PNPM 컨샙
PNPM이 NPM이나 Yarn Classic과 구별되는 가장 큰 점은 패키지를 저장하는 방법입니다. `./node_modules`, `./node_modules/.pnpm`, `~/Library/pnpm/store/v3` 이 세 디렉토리 관계를 알면 PNPM의 패키지 저장 방법을 이해하기 쉽습니다. 아래 그림은 세 디렉토리 관계 관계를 나타낸 그림입니다.

~~그림~~

프로젝트에 `express`를 설치하면 아래와 같이 `./node_modules`에 패키지가 설치됩니다.

```bash
ls -l ./node_modules

express -> .pnpm/express@4.19.2/node_modules/express
```

`./node_modules/express`는 `./node_modules/.pnpm/express@4.19.2/node_modules/express`의 싱볼릭 링크입니다. `./node_modules`에는 프로젝트에서 설치한 패키지들의 심볼릭 링크들이 저장됩니다. `./node_modules/.pnpm`의 디렉토리 형태는 아래와 같습니다.

```bash
ls -l ./node_modules/.pnpm

cookie@0.6.0
express@4.19.2
...
```

`./node_modules/.pnpm`에는 프로젝트에서 설치한 패키지들이 필요한 모든 패키지들이 하드 링크로 저장되어 있습니다. 여기서 만약 `msw`라는 패키지를 추가로 설치하면 `./node_modules`와 `./node_modules/.pnpm`의 다랙토리 형태는 아래와 같습니다.

```bash
ls -l ./node_modules

express -> .pnpm/express@4.19.2/node_modules/express
msw -> .pnpm/msw@2.2.14/node_modules/msw
```

```bash
ls -l ./node_modules/.pnpm

cookie@0.5.0 # msw에서 사용하는 패키지
cookie@0.6.0 # express에서 사용하는 패키지
express@4.19.2
msw@2.2.14
...
```

`./node_modules/express`와 마찬가지로 `./node_modules/msw`도 `./node_modules/.pnpm/msw@2.2.14/node_modules/msw`의 싱볼릭 링크입니다. `./node_modules`에는 프로젝트에서 설치한 `express`와 `msw`의 심볼릭 링크가 있고 `./node_modules/.pnpm`에는 `express`와 `msw`에서 필요한 모든 패키지가 버전별로 저장됩니다.

`./node_modules/.pnpm`에 하드 링크되어 있는 원본 파일 경로는 아래와 같이 `pnpm store path` 명령어를 실행하여 확인할 수 있습니다. 이것을 PNPM은 Content-addressable 스토어라고 이야기 합니다.

```bash
pnpm store path

~/Library/pnpm/store/v3
```

`~/Library/pnpm/store/v3/files` 경로에 이제까지 설치했던 패키지의 원본 파일들이 아래와 같이 해시값으로 된 디렉토리 형태로 보관되어 있습니다.

```bash
ls ~/Library/pnpm/store/v3/files

00 0b 16 21 2c 37 42 4d 58 63 6e 79 84 8f 9a a5 b0 bb c6 d1 dc e7 f2 fd
...
```

`package.json`의 inode를 비교하면 아래와 같이 동일한 값인 것을 볼 수 있는데, 같은 inode를 가리키고 있기 때문에 하드 링크를 여러개 만들더라도 용량을 더 차지하지는 않습니다.

```bash
ls -li ~/Library/pnpm/store/v2/files/19/{package.json 해시값}
12238952 # 동일한 inode

ls -li node_modules/.pnpm/cookie@0.4.2/node_modules/cookie/package.json
12238952 # 동일한 inode
```

각 프로젝트에서 Content-addressable 스토어에 있는 원본 패키지를 하드 링크로 가져와 사용하기 때문에, 두 개의 프로젝트 모두에서 `express@4.19.2`를 설치하더라도 `express@4.19.2`는 한번 Content-addressable 스토어에 한번 저장됩니다.

> ##### Hard Link와 Symbolic(Soft) Link, inode
> - inode: 파일 모드, 링크 수, 파일 크기, 파일 주소 등 파일의 메타정보를 담고 있습니다. inode는 파일의 우편번호 같은 역할을 하는데, 동일한 inode를 가지고 있다는 뜻은 동일한 파일을 가르키고 있다는 말과 같습니다.
> - Symbolic(Soft) Link: 심볼릭 링크는 소프트 링크라고도 하는데, 윈도우의 바로가기와 유사합니다. 심볼릭 링크를 만들면 새로운 inode가 만들어지고 이 inode는 원본의 inode를 가르킵니다.
> - Hard Link: 원본의 복사본을 만드는 것과 비슷하지만 복사와 다르게 원본과 동일한 inode를 가지기 때문에 하드 링크된 파일이 수정되면 원본 파일도 함께 수정됩니다. 원본 파일이 삭제되어도 하드 링크된 파일은 유지되기 때문에 데이터를 안전하게 관리하고자 할 때 주로 사용됩니다.

## PNPM 장점
PNPM은 기존의 NPM에서 디스크 공간 절약, 설치 속도 향상, 플랫 하지 않은 `node_modules`를 보완했다고 이야기합니다. 아래에서 하나씩 살펴보도록 하겠습니다.

### 디스크 공간 절약
[PNPM 컨샙](/tech/etc/pnpm/#pnpm-컨샙) 이야기 했던 패키지 구성 방법으로 PNPM은 디스크 공약을 절약할 수 있습니다.

NPM을 사용한다면 각각의 프로젝트 마다 패키지가 `node_modules`에 설치되지만, PNPM은 각각의 프로젝트에 사용되는 패키지가 중복 없이 Content-addressable 스토어에 설치됩니다. 예를 들어 A와 B, 2개의 프로젝트가 10개의 패키지를 사용하는데 이 패키지가 모두 동일한 패키지라면 NPM은 총 20번 패키지를 저장하지만 PNPM은 10번 패키지를 저장합니다.

동일한 패키지가 다른 버전으로 각각의 프로젝트에서 사용된다면 버전별로 Content-addressable 스토어에 설치됩니다. 예를 들어 A Project에서는 `cookie@0.6.0`이 사용되고, B Project에서는 `cookie@0.5.0`이 사용된다면 서로 다른 버전으로 Content-addressable 스토어에 설치됩니다.

### 설치 속도 향상
PNPM은 아래 그림과 같이 3가지 절차를 거처 패키지를 설치합니다.

![PNPM 패키지 설치](/assets/img/posts/etc/pnpm_package_install.svg)

1. Dependency resolution: 필요한 모든 종속성을 스토어에 가져옵니다.
2. Directory structure calculation: 종속성 기반으로 `node_modules` 디렉토리 구조가 계산됩니다.
3. Linking dependencies: 스토어에서 `node_modules`로 하드 링크됩니다.

이런 방식은 아래 그림과 같이 기존의 모든 종속성을 확인하고 가져오고, `node_modules`에 쓰는 3가지 절차, Resolving, Fetching, Linking보다 빠릅니다.

![NPM 패키지 설치](/assets/img/posts/etc/npm_package_install.svg)

### 플랫 하지 않은 `node_modules`
NPM이나 Yarn Classic은 종속성을 설치하면 패키지가 `node_modules`로 끌어올려집니다. 이런 동작은 [유령 종속성(의존성)](/tech/etc/yarn-berry/#유령-의존성phantom-dependency) 문제를 만드는데, 프로젝트에 종속성으로 추가하지 않은 패키지를 엑세스해서 사용할 수 있게 됩니다. 유령 종속성 패키지를 액세스해 사용하고 있다가 패키지가 업데이트 되어 유령 종속성 패키지가 제거가 되면 문제가 발생할 수 있기 때문에 유령 종속성 사용은 피해야 합니다.

PNPM은 아래 그림과 같이 심볼릭 링크를 사용하기 때문에 프로젝트의 `node_modules`에는 프로젝트의 종속성에 포함된 패키지만 설치되어 유령 종속성 문제가 발생하지 않습니다.

![PNPM 싱볼릭 링크](/assets/img/posts/etc/pnpm_sym_link.svg)

## 부록

### PNPM의 속도에 대한 고찰
어떠한 패키지를 설치하여 성능을 측정하였는지 따라 결과가 다르고, PNPM, Yarn 공식 문서에서 제공하는 성능 측정 결과도 조금씩 다르기 때문에 제가 NPM, Yarn, PNPM 이 3개의 패키지 매니저를 찾아보면서 고민해본 성능에 대한 고찰을 공유하려고 합니다.

#### Yarn Pnp는 다른 패키지 매니저와 단순 비교가 가능할까?
Yarn Pnp는 `node_modules` 폴더 없이 `.yarn/cache`에 압축 파일로 저장된 패키지와 종속성 정보를 담고 있는 `.pnp.cjs` 파일로 종속성을 관리하는 메커니즘을 가지고 있습니다. 그렇기 때문에 패키지를 설치없이 프로젝트를 즉시 시작(Plug & Play)할 수 있습니다.

Yarn Pnp는 레파지토리에 필요한 패키지를 압축 파일로 모두 가지고 있기 때문에 다른 패키지 매니저들과 달리 레파지토리를 가져오는데 시간이 더 걸릴 수 있습니다. 이런 특징 때문에 Yarn Pnp는 전반적으로 더 나은 성능을 보이긴 하지만 설치 명령어가 실행되는데 걸리는 시간으로 단순 비교하기에는 무리가 있어 보입니다.

#### 개발/배포에서 가장 중요한 성능은?
개발하면서 아래의 상황에서 주로 패키지를 설치/업데이트 하게 됩니다.

- 패키지 추가하거나 패키지 버전을 업데이트 하는 경우
- 배포를 위해 CI 서버를 통해 패키지를 설치하는 경우
- 레파지토리를 처음 클론 받고 패키지를 설치하는 경우

개발을 하면서 lock 파일은 보통 함께 관리되기 때문에 lock 파일이 존재하는 위의 3가지 상황을 PNPM 공식 문서와, Yarn 공식 문서에서 성능을 확인해 보겠습니다. Yarn Pnp는 위에서 이야기한 다른 메커니즘 때문에 제외하고 살펴보겠습니다.

3가지 상황에서 PNPM에서 이야기 하는 성능은 아래와 같이 모두 PNPM이 빠릅니다.

- `update`: PNPM이 3.5s로 가장 빠름
- `install, Cache: X, lockfile: O, node_modules: X`: PNPM이 5.2s로 가장 빠름
- `install, Cache: O, lockfile: O, node_modules: X`: PNPM이 2.6s로 가장 빠름

Yarn에서 이야기 하는 성능은 아래와 같습니다.

- `Full cold`: Next 2.88s, Gatsby 13.46s로 PNPM이 가장 빠름
- `Cache and lockfile`: Next 849.01ms, Gatsby 3.03s로 PNPM이 가장 빠름
- `Recurrent calls`: Next 413.08ms로 NPM이, Gatsby 1.88s로 Yarn (NM)이 가장 빠름

Yarn의 공식문서에서는 `Recurrent calls`를 제외하고 PNPM이 가장 빠른 것을 확인할 수 있습니다. PNPM, Yarn 공식 문서를 종합해 보면 대부분의 경우 PNPM이 더 나은 성능을 보이고 있습니다.

##### 참고
- [https://jeonghwan-kim.github.io/2023/10/20/pnpm](https://jeonghwan-kim.github.io/2023/10/20/pnpm)
- [https://pnpm.io/](https://pnpm.io/)
- [http://www.metalpen.net/blog/?p=439](http://www.metalpen.net/blog/?p=439)
- [https://yarnpkg.com/features/pnp](https://yarnpkg.com/features/pnp)
- [https://inpa.tistory.com/entry/LINUX-📚-하드-링크hard-link-심볼릭-링크symbolic-link-아이노드inode](https://inpa.tistory.com/entry/LINUX-📚-하드-링크hard-link-심볼릭-링크symbolic-link-아이노드inode)
