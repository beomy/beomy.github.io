---
layout: post
title: '[ETC] Forward Proxy와 Reverse Proxy'
featured-img: etc/forward_proxy_reverse_proxy.png
category: [tech, etc]
---

> ##### TL;DR
> - Forward Proxy
> - Reverse Proxy

프록시는 일을 하면서 종종 듣게 되는 단어이지만 직접 프록시 서버를 세팅할 일이 없어 저에게는 가깝지만 먼 존재였습니다. 최근에 Nginx의 Reverse Proxy를 설정할 일이 있어, 가깝고도 먼 프록시를 조금 더 가깝게 만들기 위해 프록시에 대해 정리해 보았습니다.

## Proxy란
Proxy는 사전적 의미로 대리, 대리인이라는 의미를 가지고 있습니다. 프록시 서버는 사전적 의미 그대로 아래 그림과 같이 대리로 통신을 하는 서버입니다.

![Proxy](/assets/img/posts/etc/proxy.png)

- 브라우저에 웹 사이트 주소를 입력합니다.
- 프록시 서버가 사용자의 요청을 수신 받습니다.
- 프록시 서버는 액세스하려는 웹 서버로 요청을 전달합니다.
- 웹 서버는 응답(웹 사이트 데이터)을 프록시 서버로 되보냅니다.
- 프록시 서버가 사용자에게 응답을 전달합니다.

프록시 서버가 대신 통신을 하게 되면 통신을 요청/응답하는 대상을 감출 수 있어 보안을 강화할 수 있고, 응답 결과를 캐싱하게 되면 더 나은 속도를 제공할 수 있게 됩니다. 프록시의 위치에 따라 Forward Proxy, Reverse Proxy로 구분할 수 있습니다.

## Forward Proxy
Forward Proxy는 프록시, 프록시 서버, 웹 프록시, 정방향 프록시라고도 불립니다.

### 개념
Forward Proxy는 앞쪽에 있는 클라이언트에 대한 Proxy로 아래 그림과 같이 클라이언트 뒤에 위치하는 프록시입니다. 클라이언트의 요청을 받아 인터넷을 통해 서버에서 데이터를 가져와 클라이언트에게 응답해줍니다.

![Forward Proxy](/assets/img/posts/etc/forward_proxy.png)

### 장점
Forward Proxy가 클라이언트 대신 통신을 담당할때 장점들을 살펴보도록 하겠습니다.

#### 보안(클라이언트)
통신을 요청하는 클라이언트가 Forward Proxy 뒤에 숨어 있기 때문에 서버는 어떤 클라이언트와 통신을 주고 받았는지 알 수 없습니다.

#### 캐싱

#### 암호화

## Reverse Proxy
apache, nginx와 같은 웹 서버가 Reverse Proxy입니다.

### 개념
Reverse Proxy는 뒤쪽에 있는 서버에 대한 Proxy로 아래 그림과 같이 서버 앞에 위치하는 프록시 입니다. 인터넷을 통해 전달 받은 요청을 서버에 전달하고, 서버의 응답을 인터넷으로 전달해줍니다.

![Reverse Proxy](/assets/img/posts/etc/reverse_proxy.png)

### 장점
Reverse Proxy가 서버 대신 통신을 담당할 때 오는 장점들을 살펴보도록 하겠습니다.

#### 로드 밸런싱
#### 보안(서버)
#### 캐싱
#### 암호화

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
