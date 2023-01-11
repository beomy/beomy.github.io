---
layout: post
title: '[ETC] Monorepo - 개념'
featured-img: etc/monorepo.png
category: [tech, etc]
summary: 모노레포를 사용하면 여러개의 프로젝트를 하나의 저장소(Repository)에서 관리 할 수 있습니다. 이번 포스트에서는 모노레포가 무엇인지 살펴보도록 하겠습니다.
---

모노레포를 사용하면 여러개의 프로젝트를 하나의 저장소(Repository)에서 관리 할 수 있습니다. 이번 포스트에서는 모노레포가 무엇인지 살펴보도록 하겠습니다.

## 프로젝트 관리 발전 과정
~~https://levelup.gitconnected.com/moving-from-multiple-repositories-to-a-lerna-js-mono-repo-faa97aeee35b 그림~~

### 모노리스 어플리케이션 (Monolith application)
- 모놀리식 아키텍쳐 -> BE도 포함된 옛날의 구조 형태

#### 장점

#### 단점

### 멀티레포 (Multi repo)
- 현재 보편적으로 사용되는 형태
- 하나의 서비스는 하나의 저장소

#### 장점
- 다른 프로젝트와 의존성을 가고 있지 않아 독립적으로 빠르게 개발이 가능

#### 단점
- 각 프로젝트의 코드 컨벤션 통일이 어려움
- 코드 재사용이 어려워 중복 코드가 만들어질 가능성이 높음

### 모노레포 (Mono repo)
- 독립된 여러 프로젝트를 하나의 저장소

#### 장점
- 코드 재사용이 용이함

#### 단점
- CI 속도 저하 가능성이 있음

## 모노레포 디펜던시 관리
- 각각의 패키지 별로 package.json -> nx는?
- root package.json은 모노레포의 전체적은 dep, 하위 프로젝트의 package.json은 프로젝트 안의 dep
- root package.json은 모노레포 환경 자체에 적용되는 것으로 모든 프로젝트에 필요한 dep만 설정

## 모노레포 지원 툴
- yarn, lerna, turborepo, nx, npm, pnpm

##### 참고
- [https://d2.naver.com/helloworld/0923884](https://d2.naver.com/helloworld/0923884)
- [https://engineering.linecorp.com/ko/blog/monorepo-with-turborepo](https://engineering.linecorp.com/ko/blog/monorepo-with-turborepo)
- [https://blog.mathpresso.com/팀워크-향상을-위한-모노레포-monorepo-시스템-구축-3ae1b0112f1b](https://blog.mathpresso.com/팀워크-향상을-위한-모노레포-monorepo-시스템-구축-3ae1b0112f1b)
- [https://medium.com/hcleedev/dev-monorepo-개념-알아보기-33fd3ce2b767](https://medium.com/hcleedev/dev-monorepo-개념-알아보기-33fd3ce2b767)
- [https://levelup.gitconnected.com/moving-from-multiple-repositories-to-a-lerna-js-mono-repo-faa97aeee35b](https://levelup.gitconnected.com/moving-from-multiple-repositories-to-a-lerna-js-mono-repo-faa97aeee35b)
- [https://tech.buzzvil.com/handbook/multirepo-vs-monorepo/](https://tech.buzzvil.com/handbook/multirepo-vs-monorepo/)
- [https://2021.stateofjs.com/en-US/libraries/monorepo-tools](https://2021.stateofjs.com/en-US/libraries/monorepo-tools)
- [https://velog.io/@sms8377/DevOps-MonoRepo린](https://velog.io/@sms8377/DevOps-MonoRepo린)
- [https://medium.com/myrealtrip-product/monorepo로-대규모-react-프로젝트-관리하기-d12b65340306](https://medium.com/myrealtrip-product/monorepo로-대규모-react-프로젝트-관리하기-d12b65340306)
- [https://d2.naver.com/helloworld/7553804](https://d2.naver.com/helloworld/7553804)
- [https://daaa0555.tistory.com/457](https://daaa0555.tistory.com/457)