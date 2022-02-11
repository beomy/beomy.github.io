---
layout: post
title: '[ETC] gzip이란?'
featured-img: javascript/js.png
category: [tech, etc]
---

1. Browser: 이봐 Server야, index.html 파일좀 찾아줄 수 있니? 이번엔 압축된 버전으로 받고 싶어.
2. Server: 음.. 파일 좀 찾아보고….. 예! 압축시킬 수 있는 환경이야! 신난다! 압축해서 줄게
3. Server: index.html 찾았어! response code 200 보낼게 (200 OK), gzip으로 압축해서 보낼게
4. Browser: 좋았어! 10kb밖에 안해! unzip으로 사용자에게 보여줘야 겠다. 굿!
->gzip 인코딩과 디코딩 방식을 이용하면, 보다 빠른 송수신이 가능하게 되는 이점이 있습니다.
주의할점 : 두 Client & Server 모두 gzip 인코딩&디코딩을 할 수 있는 환경이어야 합니다.

`Transfer-Encoding`, `Accept-Encoding`

- [https://velog.io/@ss-won/FE-번역-Gzip-압축으로-사이트-최적화하는-방법](https://velog.io/@ss-won/FE-번역-Gzip-압축으로-사이트-최적화하는-방법)
