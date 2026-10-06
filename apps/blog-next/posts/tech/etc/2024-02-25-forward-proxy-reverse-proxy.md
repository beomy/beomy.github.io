---
layout: post
title: '[ETC] Forward Proxy와 Reverse Proxy'
featured-img: etc/forward_proxy_reverse_proxy.png
category: [tech, etc]
summary: Proxy는 사전적 의미로 대리, 대리인이라는 의미를 가지고 있습니다. 프록시 서버는 사전적 의미 그대로 아래 그림과 같이 대리로 통신을 하는 서버입니다.
---

> **TL;DR**
>
> - Forward Proxy
>   - 클라이언트 앞에 놓여 클라이언트 대신 통신을 담당함
>   - 클라이언트의 정보를 숨겨 클라이언트를 보호함
>   - 클라이언트가 특정 사이트를 접근할 수 없도록 막을 수 있음
>   - 캐싱을 하여 서버에 요청을 보내지 않고 클라이언트에게 응답할 수 있음
> - Reverse Proxy
>   - 서버 앞에 놓여 서버 대신 통신을 담당함
>   - 서버 정보를 숨겨 서버를 보호함
>   - 서버에 과도한 요청이 전달되지 않도록 로드밸린성 역할을 함
>   - 캐싱을 하여 서버에 요청을 보내지 않고 클라이언트에게 응답할 수 있음
>   - 암호화 복호화를 담당하여 서버 부하를 줄일 수 있음

프록시는 일을 하면서 종종 듣게 되는 단어이지만 직접 프록시 서버를 세팅할 일이 없어 저에게는 가깝지만 먼 존재였습니다. 최근에 Nginx의 Reverse Proxy를 설정할 일이 있어, 가깝고도 먼 프록시를 조금 더 가깝게 만들기 위해 프록시에 대해 정리해 보았습니다.

## Proxy란
Proxy는 사전적 의미로 대리, 대리인이라는 의미를 가지고 있습니다. 프록시 서버는 사전적 의미 그대로 아래 그림과 같이 대리로 통신을 하는 서버입니다.

![Proxy](/assets/img/posts/etc/proxy.png)

아래 순서로 통신이 이루어집니다.

- 브라우저에 웹 사이트 주소를 입력합니다.
- 프록시 서버가 사용자의 요청을 수신받습니다.
- 프록시 서버는 액세스 하려는 웹 서버로 요청을 전달합니다.
- 웹 서버는 응답(웹 사이트 데이터)을 프록시 서버로 보냅니다.
- 프록시 서버가 사용자에게 응답을 전달합니다.

프록시 서버가 대신 통신을 하게 되면 통신을 요청/응답하는 대상을 감출 수 있어 보안을 강화할 수 있고, 응답 결과를 캐싱하게 되면 더 빠른 속도를 제공할 수 있게 됩니다. 프록시의 위치에 따라 Forward Proxy, Reverse Proxy로 구분됩니다.

## Forward Proxy
Forward Proxy는 프록시, 프록시 서버, 웹 프록시, 정방향 프록시, 순방향 프록시라고도 불립니다.

### 개념
Forward Proxy는 앞쪽에 있는 클라이언트에 대한 Proxy로 아래 그림과 같이 클라이언트 뒤에 위치하는 프록시입니다. 클라이언트의 요청을 받아 인터넷을 통해 서버에서 데이터를 가져와 클라이언트에게 응답해 줍니다.

![Forward Proxy](/assets/img/posts/etc/forward_proxy.png)

### 장점
Forward Proxy가 클라이언트 대신 통신을 담당할 때 장점들을 살펴보도록 하겠습니다.

#### 보안(클라이언트)
사내 네트워크에서는 특정 인터넷 사용을 막는 방화벽을 사용하는 경우가 있습니다. Forward Proxy는 방화벽처럼 특정 인터넷을 막는 용도로 사용할 수 있습니다. 예를 들어, 클라이언트가 `https://www.naver.com`에 접속하기 위해 통신을 요청 요청하면 Forward Proxy는 이 요청을 서버에 보내지 않고 클라이언트에 페이지에 접근할 수 없음을 응답하여 클라이언트의 특정 인터넷 요청을 차단할 수 있습니다.

통신을 요청하는 클라이언트가 Forward Proxy 뒤에 숨어 있기 때문에 서버는 어떤 클라이언트와 통신을 주고받았는지 알 수 없습니다. 클라이언트의 IP를 감출 수 있기 때문에 서버는 IP 주소를 역추적해도 Forward Proxy를 찾을 수 있을 뿐 클라이언트는 찾을 수 없습니다.

#### 캐싱
클라이언트가 데이터를 요청하면 Forward Proxy는 클라이언트의 요청을 인터넷을 통해 서버에 요청을 전달하고 결과를 응답받습니다. Forward Proxy는 응답받은 결과를 캐싱하고 있다가, 클라이언트가 동일한 데이터를 요청할 때 서버에 다시 데이터를 요청하지 않고 캐싱한 값을 클라이언트에 전달해 줍니다.

## Reverse Proxy
apache, nginx와 같은 웹 서버가 Reverse Proxy입니다. 역방향 프록시라고도 불립니다.

### 개념
Reverse Proxy는 뒤쪽에 있는 서버에 대한 Proxy로 아래 그림과 같이 서버 앞에 위치하는 프록시 입니다. 인터넷을 통해 전달받은 요청을 서버에 전달하고, 서버의 응답을 인터넷으로 전달해 줍니다.

![Reverse Proxy](/assets/img/posts/etc/reverse_proxy.png)

### 장점
Reverse Proxy가 서버 대신 통신을 담당할 때 오는 장점들을 살펴보도록 하겠습니다.

#### 보안(서버)
통신 요청을 받는 서버가 Reverse Proxy 뒤에 숨어 있기 때문에 서버 IP가 인터넷에 노출되지 않습니다. 해커들은 서버에 직접 요청을 할 수 없기 때문에 DDos 공격을 막는데 유용합니다.

#### 캐싱
Forward Proxy와 동일하게 Reverse Proxy는 서버의 응답 결과를 캐싱하고 있다가 인터넷을 통해 동일한 요청이 온 경우 서버에 응답을 요청하지 않고 캐싱해 둔 값으로 응답하여 서버의 부하를 줄이고 클라이언트에게 더 빠르게 결과를 응답할 수 있습니다.

#### 로드 밸런싱
사용자 트래픽이 많은 서비스는 여러 개의 서버를 운용하게 되는데, Reverse Proxy는 인터넷을 통해 받은 요청들을 서버의 상태를 보고 서버가 과부하되지 않도록 로드밸런싱이 가능합니다.

#### 암호화
Reverse Proxy가 SSL(혹은 TSL)와 같은 암호화/복호화를 담당하여 암호화/복호화하는데 드는 서버 부하를 줄여줄 수 있습니다. 서버와의 모든 통신은 Reverse Proxy를 통하기 때문에 클라이언트와 안전한 통신을 할 수 있으며 서버 부하도 줄일 수 있습니다.

## Forward Proxy와 Reverse Proxy 차이점
Forward Proxy와 Reverse Proxy 두 프록시가 모두 대신해서 통신을 하는 역할을 하여 비슷한 기능을 제공하지만 두 프록시는 아래 목록과 같은 차이점을 가지고 있습니다.

- 프록시 서버 위치
  - Forward Proxy: 클라이언트 앞
  - Reverse Proxy는 서버 앞
- 프록시 대상
  - Forward Proxy: 클라이언트를 대신해서 통신
  - Reverse Proxy: 서버를 대신해서 통신
- 숨기는 대상
  - Forward Proxy: 클라이언트 정보를 숨김
  - Reverse Proxy: 서버 정보를 숨김

##### 참고
- [https://velog.io/@jmjmjmz732002/Infra-Reverse-Proxy..-%EA%B3%BC%EC%97%B0-%EB%AC%B4%EC%97%87%EC%9D%BC%EA%B9%8C%EC%9A%94](https://velog.io/@jmjmjmz732002/Infra-Reverse-Proxy..-%EA%B3%BC%EC%97%B0-%EB%AC%B4%EC%97%87%EC%9D%BC%EA%B9%8C%EC%9A%94)
- [https://www.cloudflare.com/ko-kr/learning/cdn/glossary/reverse-proxy/](https://www.cloudflare.com/ko-kr/learning/cdn/glossary/reverse-proxy/)
- [https://losskatsu.github.io/it-infra/reverse-proxy/](https://losskatsu.github.io/it-infra/reverse-proxy/)
- [https://inpa.tistory.com/entry/NETWORK-📡-Reverse-Proxy-Forward-Proxy-정의-차이-정리](https://inpa.tistory.com/entry/NETWORK-📡-Reverse-Proxy-Forward-Proxy-정의-차이-정리)
- [https://okimaru.tistory.com/7](https://okimaru.tistory.com/7)
- [https://surfshark.com/ko/blog/proxy-server](https://surfshark.com/ko/blog/proxy-server)
