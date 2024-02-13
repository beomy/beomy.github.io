---
layout: post
title: '[ETC] Forward Proxy와 Reverse Proxy'
featured-img: javascript/js.png
category: [tech, etc]
---

> ##### TL;DR
> - Forward Proxy
> - Reverse Proxy

Proxy(프록시)는 일을 하면서 종종 듣게 되는 단어였습니다. 직접 프록시 서버를 세팅할 일이 없어 저에게는 가깝지만 먼 존재였습니다. 최근에 Nginx의 Reverse Proxy를 설정할 일이 있어, 가깝고도 먼 프록시를 조금 더 가깝게 만들기 위해 프록시에 대해 정리해 보았습니다.

## Proxy란
Proxy는 사전적 의미로 대리, 대리인이라는 의미를 가지고 있습니다. 프록시 서버는 사전적 의미 그대로 아래 그림과 같이 대리로 통신을 하는 서버입니다.

~~그림~~

- 브라우저에 웹 사이트 주소를 입력합니다.
- 프록시 서버가 사용자의 요청을 수신 받습니다.
- 프록시 서버는 액세스하려는 웹 서버로 요청을 전달합니다.
- 웹 서버는 응답(웹 사이트 데이터)을 프록시 서버로 되보냅니다.
- 프록시 서버가 사용자에게 응답을 전달합니다.

- Proxy 유무에 따른 그림 비교하며 Proxy의 간략한 역할 설명
- 위치에 따라, 어느 방향으로 데이터를 제공하느냐에 따라 Forward/Reverse 구분

## Forward Proxy
- 프록시, 프록시 서버, 웹 프록시, 정방향 프록시라고도 함

### 개념

### 장점
- 보안(클라이언트)
- 캐싱
- 암호화

## Reverse Proxy
- apache, nginx, tomcat

### 개념

### 장점
- 로드 밸런싱
- 보안(서버)
- 캐싱
- 암호화

## Forward Proxy와 Reverse Proxy 차이점

## 부록

### Nginx의 Reverse Proxy

#### `resolve`

##### 참고
- [https://velog.io/@jmjmjmz732002/Infra-Reverse-Proxy..-%EA%B3%BC%EC%97%B0-%EB%AC%B4%EC%97%87%EC%9D%BC%EA%B9%8C%EC%9A%94](https://velog.io/@jmjmjmz732002/Infra-Reverse-Proxy..-%EA%B3%BC%EC%97%B0-%EB%AC%B4%EC%97%87%EC%9D%BC%EA%B9%8C%EC%9A%94)
- [https://www.cloudflare.com/ko-kr/learning/cdn/glossary/reverse-proxy/](https://www.cloudflare.com/ko-kr/learning/cdn/glossary/reverse-proxy/)
- [https://losskatsu.github.io/it-infra/reverse-proxy/](https://losskatsu.github.io/it-infra/reverse-proxy/)
- [https://inpa.tistory.com/entry/NETWORK-📡-Reverse-Proxy-Forward-Proxy-정의-차이-정리](https://inpa.tistory.com/entry/NETWORK-📡-Reverse-Proxy-Forward-Proxy-정의-차이-정리)
- [https://okimaru.tistory.com/7](https://okimaru.tistory.com/7)
- [https://surfshark.com/ko/blog/proxy-server](https://surfshark.com/ko/blog/proxy-server)
