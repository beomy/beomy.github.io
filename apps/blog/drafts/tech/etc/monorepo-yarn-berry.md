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

`Yarn Berry` 프로젝트는 아래 명령어로 만들 수 있습니다.

```bash
yarn init -2
```

![Yarn Berry 프로젝트 만들기](/assets/img/posts/etc/create_yarn_berry_project.png)

## yarn workspace 구성하기

## 서비스 프로젝트 생성하기

## 디자인 시스템 프로젝트 생성하기

## 부록
### `Yarn Berry` 플러그인

- node_modules에 디펜던시가 있는 라이브러리 사용 불가.
- peerDependency가 있는 경우 핫리로딩 이슈.
