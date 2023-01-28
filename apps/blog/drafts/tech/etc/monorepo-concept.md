---
layout: post
title: '[ETC] Monorepo - 개념'
featured-img: etc/monorepo.png
category: [tech, etc]
summary: 하나의 저장소(Repository)에서 여러개의 프로젝트를 관리하는 방식을 모노레포라고 합니다. 이번 포스트에서는 모노레포가 무엇인지 모노레포가 등장하기까지 어떻게 프로젝트 구성이 발전되어 왔는지 살펴보도록 하겠습니다.
---

하나의 저장소(Repository)에서 여러개의 프로젝트를 관리하는 방식을 모노레포라고 합니다. 이번 포스트에서는 모노레포가 무엇인지 모노레포가 등장하기까지 어떻게 프로젝트 구성이 발전되어 왔는지 살펴보도록 하겠습니다.

## 프로젝트 구성 발전 과정
아래 그림을 보면 프로젝트를 구성하는 방법의 발전을 한눈에 확인 할 수 있습니다.

![프로젝트 구성 발전 과정](/assets/img/posts/etc/mono-repo.png)

프로젝트 구성하는 방법은 모든 기능들을 담고 있는 모놀리식 애플리케이션에서, 기능들을 분리하여 각각의 저장소에서 관리하는 멀티레포, 하나의 저장소에서 여러개의 프로젝트를 관리하는 모노레포 형태로 발전해 갔습니다. 프로젝트를 구성하는 방법인 모놀리식 애플리케이션, 멀티레포, 모노레포를 하나씩 살펴보도록 하겠습니다.

### 모놀리식 애플리케이션 (Monolithic application)
모놀리식 애플리케이션은 모듈화 없이 모든 구성 요소가 한 프로젝트 안에 통합된 소프트웨어 애플리케이션을 이야기합니다. DB 커넥션을 맺고, 데이터를 요청하며, 화면을 그리는 로직이 한 프로젝트 안에 구현된 초기 웹 서비스를 모놀리식 애플리션으로 볼 수 있습니다.

#### 장점
- 소수의 개발자가 빠르게 개발할 수 있음
- 작은 서비스의 경우 빠르게 개발 할 수 있음

#### 단점
- 관심사 분리가 어려워져, 설계, 리팩토링이 어려움
- 매번 거대한 프로젝트를 배포해야 함
- 일부분의 에러가 전체 서비스에 영향을 줄 수 있음

### 멀티레포 (Multirepo)
멀티레포는 폴리레포(Polyrepo)라고도 불립니다. 모놀리식 애플리케이션을 모듈화하여 별도의 저장소에서 관리하는 구조입니다. 이렇게 분리된 프로젝트는 서로 독립적이기 때문에 개발, 테스트, 빌드 배포 등이 각각 존재하게 됩니다. 현재 보편적으로 사용되는 방법으로 하나의 서비스는 하나의 저장소에서 관리하는 형태입니다.

#### 장점
- 다른 프로젝트와 의존성을 가고 있지 않아 독립적으로 빠르게 개발이 가능
- 모듈화하여 관심사 분리가 쉬움
- 강한 오너쉽

#### 단점
- 각 프로젝트의 코드 컨벤션 통일이 어려움
- 코드 재사용이 어려워 중복 코드가 만들어질 가능성이 높음
- 관리 포인트 증가

### 모노레포 (Monorepo)
- 독립된 여러 프로젝트를 하나의 저장소

#### 장점
- 코드 재사용이 용이함
- 쉬운 의존성 관리: NPM에 배포할 필요 없음

#### 단점
- CI 속도 저하 가능성이 있음

## 모노레포 지원 툴
- yarn, lerna, turborepo, nx, npm, pnpm

##### 참고
- [https://d2.naver.com/helloworld/0923884](https://d2.naver.com/helloworld/0923884)
- [https://engineering.linecorp.com/ko/blog/monorepo-with-turborepo](https://engineering.linecorp.com/ko/blog/monorepo-with-turborepo)
- [https://blog.mathpresso.com/팀워크-향상을-위한-모노레포-monorepo-시스템-구축-3ae1b0112f1b](https://blog.mathpresso.com/팀워크-향상을-위한-모노레포-monorepo-시스템-구축-3ae1b0112f1b)
- [https://medium.com/hcleedev/dev-monorepo-개념-알아보기-33fd3ce2b767](https://medium.com/hcleedev/dev-monorepo-개념-알아보기-33fd3ce2b767)
- [https://levelup.gitconnected.com/moving-from-multiple-repositories-to-a-lerna-js-mono-repo-faa97aeee35b](https://levelup.gitconnected.com/moving-from-multiple-repositories-to-a-lerna-js-mono-repo-faa97aeee35b)
- [https://tech.buzzvil.com/handbook/multirepo-vs-monorepo/](https://tech.buzzvil.com/handbook/multirepo-vs-monorepo/)
- [https://daaa0555.tistory.com/457](https://daaa0555.tistory.com/457)
