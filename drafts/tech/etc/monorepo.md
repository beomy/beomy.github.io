---
layout: post
title: '[ETC] Monorepo'
featured-img: etc/monorepo.png
category: [tech, etc]
summary:
---

# Turborepo
- 개발사: Vercel
- Vercel과 AWS, Miro, PayPal, Discord, LINE+에서 사용중
- yarn berry (yarn 3.x) 지원: pnp는 미지원

# Nx
- 개발사: google
- cra-to-nx로 cra 프로젝트 생성 가능
- 단일 근원 원칙
- node 16.x 에서 지원 (14.17.0 미지원)
- Lerna에서 마이그레이션 방법

# Lerna
- 지원 중단
- +PNPM 가능?

# Yarn berry(Yarn 3.*) workspace
- PnP(Plug'n'Play): node_modules를 사용하지 않고 `.yarn/cache`에 패키지들이 zip 형태로 저장되고, `.pnp.cjs`에 패키지의 의존성 정보를 저장하여 디스트 I/O 없이 `.pnp.cjs`를 사용하여 패키지가 어떤 라이브러리에 의존성을 가지는지 알 수 있습니다.
- 한 걸음 더 나가아서 `.yarn/cache`에 저장되어 있는 패키지와 `.pnp.cjs`에 저장되어 있는 패키지의 의존성 정보를 Git으로 관리하면 Zero-Install을 사용할 수 있습니다.
  - 패키지와 패키지의 의존성 정보를 Git을 통해 관리하면 패키지를 설치하지 않아고 프로젝트를 실행/빌드 할 수 있게 됩니다. 또한 브랜치를 바꾸더라도 `yarn install`을 통해 패키지를 새로 설치하지 않아도 됩니다.
  - Zero-Install을 사용하면 프로젝트를 빌드하기 위한 패키지 설치가 필요없이 Git Clone 만으로 프로젝트가 바로 빌드 가능한 상태가 되어 CI에서 의존성을 설치하는 시간을 절약할 수 있습니다.

# NPM workspace

# PNPM
- vue3: pnpm
- next: Turborepo + pnpm

#### 참고
- [https://velog.io/@sms8377/DevOps-MonoRepo린](https://velog.io/@sms8377/DevOps-MonoRepo린)
- [https://medium.com/myrealtrip-product/monorepo로-대규모-react-프로젝트-관리하기-d12b65340306](https://medium.com/myrealtrip-product/monorepo로-대규모-react-프로젝트-관리하기-d12b65340306)
- [https://d2.naver.com/helloworld/0923884](https://d2.naver.com/helloworld/0923884)
- [https://d2.naver.com/helloworld/7553804](https://d2.naver.com/helloworld/7553804)
- [https://engineering.linecorp.com/ko/blog/monorepo-with-turborepo/](https://engineering.linecorp.com/ko/blog/monorepo-with-turborepo/)
