---
layout: post
title: '[ETC] HTTP 버전'
featured-img: etc/HTTP_logo.png
category: [tech, etc]
summary: HTTP의 버전은 초기 버전인 HTTP/0.9부터, HTTP/1.0, HTTP/1.1, HTTP/2, 그리고 가장 최근 버전인 HTTP/3까지 5개의 버전이 있습니다. 이번 포스트에서 각 버전별 특징을 살펴보도록 하겠습니다.
---

HTTP의 버전은 초기 버전인 HTTP/0.9부터, HTTP/1.0, HTTP/1.1, HTTP/2, 그리고 가장 최근 버전인 HTTP/3까지 5개의 버전이 있습니다. 이번 포스트에서 각 버전별 특징을 살펴보도록 하겠습니다.

# HTTP/0.9
HTTP 초기 버전에는 버전 번호가 없었습니다. HTTP/0.9는 다음 버전이 등장하면서 구별하기 위해 0.9라고 불리게 됬습니다.

## 구조
HTTP/0.9에서 요청 메시지는 아래 코드와 같이 한 줄로 구성된 간단한 구조입니다.

```http
GET /http.html
```

메서드와 URL로 구성된 단순한 구조입니다. 뿐만아니라 HTTP/0.9의 요청 메서드는 GET 메서드만 존재합니다. 응답 메시지 역시 아래 코드와 같이 매우 간단합니다.

```html
<HTML>
  A very simple HTML page
</HTML>
```

전송된 데이터의 타입을 담는 `Centent-Type`이라는 헤더 정보 조차도 없었기 때문에 HTML 파일만 전송 될 수 있고 다른 유형의 파일은 전송 할 수 없었습니다. 또한 상태 혹은 오류 코드도 없었고, 문제가 발생한 경우 문제에 대한 내용을 담고 있는 HTML 파일이 전송됬습니다.

# HTTP/1.0
HTTP/0.9 버전은 사용하는데 매우 제한적이었기 때문에, HTTP/1.0에서는 브라우저와 서버가 모두 범용적으로 사용할 수 있도록 확장되었습니다.

## 구조
HTTP/1.0에서 요청과 응답 메시지 코드는 아래와 같습니다.

```http
GET /http.html HTTP/1.0
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)
```

```http
HTTP/1.0 200 OK
Date: Fri, 10 Dec 2021 02:15:06 GMT
Server: AmazonS3
Content-Type: text/html

<HTML>
  A page with an image
  <IMG SRC="/myimage.gif">
</HTML>
```

응답에 이미지 태그를 포함하기 때문에 아래 코드와 같은 요청과 응답 코드가 호출됩니다.

```http
GET /myimage.gif HTTP/1.0
User-Agent: NCSA_Mosaic/2.0 (Windows 3.1)
```

```http
HTTP/1.0 200 OK
Date: Fri, 10 Dec 2021 02:15:07 GMT
Server: AmazonS3
Content-Type: text/gif

(image content)
```

## 개선 사항
아래 목록은 HTTP/1.0에서 이뤄진 대표적인 개선 사항 4가지 입니다.

- **요청 메시지의 요청 라인에 HTTP 버전 추가**: `GET /http.html HTTP/1.0`와 같이 요청 라인 마지막에 HTTP 버전 정보가 추가되었습니다.
- **응답 메시지에 상태 라인 추가**: 응답 데이터만 보냈던 HTTP/0.9와 달리 HTTP/1.0에는 `HTTP/1.0 200 OK`와 같이 상태 코드가 포함된 상태 라인이 추가되었습니다.
- **요청, 응답 메시지에 헤더 기능 추가**: 요청, 응답 메시지에 헤더를 추가할 수 있게 되어 `Content-Type: text/html`과 같은 메타데이터를 전송할 수 있게 되었습니다.
- **HTML 파일 이외의 다른 데이터 전송 가능**: 어떤 유형의 데이터를 보냈는지 표시하는 `Content-Type` 헤더 덕분에 HTML 파일 이외의 데이터를 전송할 수 있게 되었습니다.

## 커넥션 관리
HTTP/1.0에서 기본적으로 커넥션은 단기 커넥션입니다. 단기 커넥션이란 각각의 HTTP 요청의 각각의 커넥션에서 실행 되는 것을 이야기 합니다. 1개의 요청은 커넥션 연결 -> 요청 -> 응답 -> 커넥션 해제가 한 세트로 동작합니다. 2개의 요청을 보내게 되면 커넥션 연결 -> 요청 -> 응답 -> 커넥션 해제 -> 커넥션 연결 -> 요청 -> 응답 -> 커넥션 해제 순서로 동작하게 됩니다. 단기 커넥션은 매 요청마다 커넥션을 연결하고 해제 하는 오버헤드가 발생하게 되는데 이런 오버헤드를 줄이기 위해 HTTP/1.0에서는 커넥션을 재사용 할 수 있는 Keep-Alive 커넥션을 도입하였습니다.

### Keep-Alive 커넥션
아래 그림은 커넥션을 재사용하지 않는 경우와 재사용하는 경우를 비교한 그림입니다.

|단기 커넥션|지속 커넥션(Keep-Alive 커넥션)|
|:--:|:--:|
|![단기 커넥션](/assets/img/posts/etc/http_short_lived_connection.png)|![지속 커넥션(Keep-Alive 커넥션)](/assets/img/posts/etc/http_persistent_connection.png)|

#### `Connection`와 `Keep-Alive` 헤더
`Connection: keep-alive`와 `Keep-Alive` 헤더를 사용하여 Keep-Alive 커넥션을 만들 수 있습니다. 아래 코드는 5개의 요청이 처리될 동안 커넥션을 유지하거나 2분 동안 커넥션을 유지하는 Keep-Alive 커넥션입니다.

```http
Connection: Keep-Alive
Keep-Alive: max=5, timeout=120
```

아래 그림과 같이 클라이언트와 서버 사이에는 프록시 서버, 캐시 서버 등과 같은 중개 서버가 놓일 수 있습니다. HTTP 메시지는 클라이언트에서 중개 서버를 거쳐 목적지까지 전달됩니다.

![HTTP 커넥션](/assets/img/posts/etc/http_connection.png)

현재 맺고 있는 커넥션에만 적용해야 하는 옵션을 지정해야 할 때, `Connection` 헤더를 사용하여 옵션을 전달할 수 있습니다. `Connection` 헤더의 값은 해당 커넥션에만 헤당 되는 헤더(Hop-by-Hop 헤더)명, 커넥션에 대한 비표준 옵션들, close, 이렇게 3종류의 값들이 쉼표(,)로 구분되어 있으며 다른 커넥션에 전달되지 않습니다.

`Keep-Alive` 헤더는 `Keep-Alive: max=5, timeout=120` 쉼표로 구분되는 `max`와 `timeout` 두가지 옵션이 있습니다.

- `max`: 몇 개의 HTTP 요청을 처리할 때까지 커넥션을 유지할 것인지를 나타냅니다.
- `timeout`: 커넥션이 얼마간 유지할 것인지를 나타냅니다.

#### 멍청한 프록시 (Dumb Proxy)
커넥션을 재사용하기 위해 클라이언트에서 `Connection: Keep-Alive` 헤더를 전송하고, 서버가 Keep-Alive를 지원한다면 응답에 `Connection: Keep-Alive` 헤더를 전송하여 클라이언트와 서버는 커넥션을 끊지 않고 유지합니다. 하지만 이 과정에서 클라이언트와 서버 사이에 `Connection` 헤더를 이해하지 못하는 멍청한 프록시가 있을 경우 Keep-Alive 커넥션은 문제가 발생합니다.

아래 그림은 멍청한 프록시 문제가 발생하는 상황을 나타내는 그림입니다.

![멍청한 프록시](/assets/img/posts/etc/dumb_proxy.png)

1. 클라이언트는 프록시에 `Connection: Keep-Alive` 헤더와 함께 메시지를 보내고 커넥션이 유지하기를 요청합니다.
2. 멍청한 프록시는 `Connection` 헤더를 단순 확장 헤더로만 인식하고 다음 서버에 메시지를 그대로 전달합니다. `Connection` 헤더는 Hop-by-Hop 헤더이기 때문에 다음 서버로 전달되면 안됩니다.
3. HTTP 요청이 서버에 도착하면 서버는 `Connection: Keep-Alive` 헤더를 보고 커넥션을 유지하고자 하는 요청으로 인식하고 커넥션을 유자하기 위해 `Connection: Keep-Alive` 헤더를 포함하여 응답합니다. 서버는 `Connection: Keep-Alive` 헤더를 이해하고 프록시와 커넥션을 유지하지만 프록시는 `Connection: Keep-Alive` 헤더를 이해하지 못하고 서버와 커넥션이 끊기길 기다립니다.
4. 멍청한 프록시는 서버로부터 받은 `Connection: Keep-Alive` 헤더를 포함하고 있는 응답 메시지를 클라이언트에 전달합니다. 클라이언트에서는 `Connection: Keep-Alive` 헤더를 보고 커넥션을 유지하는 것으로 판단합니다.
5. 클라이언트는 `Connection: Keep-Alive` 헤더를 포함하고 있는 응답 메시지를 받으면 유지되고 있는 커넥션을 통해 다음 요청을 보내게 됩니다. 하지만 프록시는 같은 커넥션에 다른 요청이 오는 경우를 예상하지 못해 요청은 무시됩니다. 브라우저는 타임아웃 되어 커넥션이 끊길 때까지 요청을 기다릴 수 밖에 없게 됩니다.

멍청한 프록시 문제를 해결하기 위한 아이디어로 `Proxy-Connection` 헤더가 등장했습니다. 부록에서 `Proxy-Connection` 헤더에 대해 좀 더 자세히 이야기 하도록 하겠습니다.

# HTTP/1.1
HTTP/1.1은 HTTP/1.0과 동일한 구조를 가지지만 HTTP/1.0에 비해 많은 성능 개선이 이루어졌습니다.

## 개선 사항
아래 목록은 HTTP/1.1에서 이뤄진 대표적인 개선 사항 6가지 입니다.

- **커넥션 재사용**: HTTP/1.0은 `Connection: keep-alive`와 `Keep-Alive` 헤더를 사용한 Keep-Alive 커넥션을 사용했지만, HTTP/1.1에서는 `Connection` 헤더를 사용하지 않아도 커넥션을 유지하는 지속(Persistent) 커넥션을 지원합니다.
- **파이프라이닝 추가**: HTTP/1.1은 지속 커넥션에 파이프라이닝을 추가하면서 여러 요청을 보낼 때의 성능 개선을 시도했습니다.
- **청크된 응답 지원**: `Transfer-Encoding: chunked` 헤더를 사용하여 하나의 HTTP 메시지를 여러개로 나누어 전송이 가능해 졌습니다.
- **캐시 제어 기능 추가**: `Cache-Control` 헤더를 사용하여 캐시 제어 관련 기능이 추가되었습니다.
- **콘텐츠 협상 도입**: `Accept`, `Accept-Language`, `Accept-Encoding` 등의 헤더를 사용하여 콘텐트(HTTP를 통해 전송되는 데이터)의 언어, 인코딩 방식, 타입 등의 협상 기능이 추가되었습니다.
- **동일한 IP에 다른 도메인 호스트 기능 추가**: HTTP/1.1에서는 `Host` 헤더가 필수 값이 되었습니다. `Host` 헤더를 사용하여 동일 IP 주소에 다른 도메인을 호스팅하는 가상 호스팅이 가능해 졌습니다.

## 커넥션 관리
HTTP/1.1에서는 성능 개선을 위해 커넥션을 병렬, 지속, 파이프라이닝 하면서 성능 개선을 시도하였습니다.

### 병렬(Parallel) 커넥션
병렬 커넥션은 여러개의 요청을 보내야 할 때, 하나의 커넥션을 사용하는 것이 아니라 아래 그림과 같이 동시에 여러개의 커넥션을 만들어 사용하는 방식입니다.

![병렬 커넥션](/assets/img/posts/etc/http_parallel_connection.png)

병렬 커넥션은 여러개의 요청을 동시에 보내기 때문에 요청을 보내고 응답을 받은 후 다음 요청을 보내는 단기, 지속 커넥션 보다 빠를 수 있지만 항상 더 빠른 것은 아닙니다. 각각의 요청은 여전히 커넥션을 맺고, 끊을 때의 오버헤드가 발생하고 대역폭이 좁은 네트워크에서는 여러개의 요청을 보내는 것에 한계가 있기 때문에 성능상의 장점이 거의 없게 됩니다. 만약 100명의 사용자가 100개의 커넥션을 맺고 있다면 서버는 총 10000개의 커넥션을 유지해야 합니다. 서버가 많은 커넥션을 맺고 있다면 성능은 크게 떨어지게 됩니다.

최신 브라우저에서는 6~8개의 병렬 커넥션을 지원하지만, 도메인 샤딩을 통해 그 이상의 커넥션을 맺을 수도 있습니다. 하지만 브라우저에서 지원하는 개수 이상의 커넥션을 맺게 되면 DoS 공격에 취약해지기 때문에 도메인 샤딩은 피하는 것이 좋습니다.

> **도메인 샤딩 (Domain Sharding)**
>
> 도메인 샤딩이란 이미지, JS, CSS 등의 정적 파일을 빠르게 내려 받기 위한 방법으로 `www1.example.com`, `www2.example.com`과 같이 여러개의 서브 도메인을 만들어 각각의 도메인 별로 커넥션을 맺는 방법입니다. 아래 그림은 같이 도메인 샤딩을 사용할 때와 사용하지 않을 때를 비교한 그림입니다.
>
> |도메인 샤딩 미사용|도메인 샤딩 사용|
> |:--:|:--:|
> |![도메인 샤딩 미사용](/assets/img/posts/etc/http_not_use_domain_sharding.png)|![도메인 샤딩 사용](/assets/img/posts/etc/http_use_domain_sharding.png)|

### 지속(Persistent) 커넥션
지속 커넥션은 HTTP/1.0에서 사용하는 Keep-Alive 커넥션과 HTTP/1.1에서 사용하는 지속(Persistent) 커넥션이 있습니다. HTTP/1.1에서는 Keep-Alive 커넥션을 지원하지 않는 대신, 더 개선된 지속 커넥션을 지원합니다. HTTP/1.0의 Keep-Alive 커넥션과 과 달리 HTTP/1.1의 지속 커넥션은 기본적으로 커넥션을 유지합니다. 지속 커넥션은 아래 목록과 같은 특징이 있습니다.

- 클라이언트에서 `Connection: close` 헤더를 포함해 보내면 클라이언트는 그 커넥션으로 추가적인 요청을 보낼 수 없습니다.
- HTTP/1.1 프록시는 클라이언트가 커넥션 관련 기능을 지원하지는 알지 못한다면 지속 커넥션을 맺지 않습니다. 클라이언트가 커넥션 관련 기능을 제공하지 않는다면 지속 커넥션을 맺지 않는 방식으로 멍청한 프록시 문제를 해결했습니다.

### 파이프라인(Pipelined) 커넥션
HTTP/1.1은 지속 커넥션을 통해 요청을 파이프라이닝 할 수 있습니다. 아래 그림은 지속 커넥션과 파이프라이닝 커낵션을 비교한 그림입니다.

|지속 커넥션(Keep-Alive 커넥션)|파이프라인 커넥션|
|:--:|:--:|
|![지속 커넥션(Keep-Alive 커넥션)](/assets/img/posts/etc/http_persistent_connection.png)|![파이프라인 커넥션](/assets/img/posts/etc/http_pipeline_connection.png)|

파이프라인 커넥션은 아래 목록과 같은 특징이 있습니다.

- 파이프라인 커넥션은 지속 커넥션을 사용하기 때문에 클라이언트는 지속 커넥션인지 확인하기 전까지는 파이프라인 커넥션을 사용하면 안됩니다.
- 여러 개의 요청은 응답이 도착하기 전까지 큐에 쌓이는데, 응답은 요청 순서와 동일하게 와야 합니다.
- Keep-Alive 커넥션과 동일한 프록시 문제를 가지고 있습니다. 클라이언트와 서버 사이에 놓이는 모든 프록시 서버가 파이프라이닝을 지원해야 합니다. 파이프라이닝을 지원하지 않는 프록시 서버가 있다면 파이프라이닝으로 전송되는 요청들은 정상동작하지 않게 됩니다.
- HOLB(Head-Of-Line Blocking) 문제가 있습니다. 최신 브라우저에서는 파이프라인 커넥션을 사용하지 않고 6~8개의 병렬 커넥션을 사용합니다.

> **HTTP의 HOLB (Head-Of-Line Blocking)**
>
> HOLB란 앞 선 작업에 지연이 있어서 뒤에 오는 작업까지도 연이어 지연이 발생하는 문제를 말합니다.
>
> HTTP/1.*에서는 앞 선 요청이 응답되어야 뒤이어 오는 요청들이 응답을 받을 수 있습니다. 앞 선 요청에 대한 응답의 결과가 크거나 느린 경우 뒤이어 오는 응답도 지연되는 HOLB 문제가 발생하게 됩니다. 파이프라인 커넥션에서 속도 개선을 하였지만 응답과 요청이 동일한 순서로 와야 하기 때문에 아래 그림과 같이 여전히 HOLB 문제가 존재합니다.
>
> |HOLB 미발생|HOLB 발생|
> |:--:|:--:|
> |![파이프라인 커넥션](/assets/img/posts/etc/http_pipeline_connection.png)|![Head-Of-Line Blocking](/assets/img/posts/etc/http_holb.png)|

# HTTP/2
HTTP/1.1에서는 요청에 대한 응답을 받은 후에 다시 요청을 보낼 수 있는 형태입니다. 그래서 앞 선 요청의 응답을 늦게 받은 경우 뒤이어 오는 응답도 늦게 처리를 될 수 밖에 없는 지연문제가 있습니다. 병렬 커넥션이나 파이프라인 커넥션을 도입했지만, 병렬 커넥션을 만들 수 있는 개수가 한정되어 있고 파이프라인 커넥션 구현 구현이 어려운 점, 그리고 파이프라인 커넥션에서도 앞 선 요청에 느린 응답을 받는 경우 지연 현상이 있어 근본적으로 해결하지는 못했습니다. 이런 문제를 해결하기 위해 SPDY(스피디)에 기반한 HTTP/2를 만들게 되었습니다. HTTP/2는 헤더를 압축하여 대역폭을 절약했고 하나의 커넥션에 여러 요청을 동시에 보낼 수 있게 해 지연 문제를 해결하였습니다.

HTTP/2는 아래 그림과 같이 바이너리 프레이밍 계층을 도입하였습니다. 이 계층은 이전의 HTTP/1.1 서버나 클라이언트(브라우저)와 호환되지 않기 때문에 HTTP/1.2와 같이 마이너 버전을 올리지 않고, HTTP/2로 메이저 버전이 올라갔습니다.

![파이프라인 커넥션](/assets/img/posts/etc/http_binary_framing_layer.svg)

위의 그림의 바이너리 프레임 계층에서는 바이너리 해석이나 프레임 조립을 하게 되면데 이 작업들은 서버(혹은 클라이언트)에서 해주기 때문에 TCP 소켓을 사용한 웹 서버나 클라이언트를 만드는 개발자가 아닌 어플리케이션 개발자 입장에서 HTTP/1.*과 HTTP/2는 차이점이 없습니다.

## 구조
HTTP/2는 이전의 HTTP 표준을 대체하는 것이 아니라 확장하는 프로토콜입니다. HTTP 메서드, 상태 코드, URI 및 헤더 필드 같은 핵심 개념은 변경되지 않습니다.

### 용어
HTTP/2.0을 이해하기 위해서 먼저 HTTP/2.0에서 사용하는 용어를 정리해 보겠습니다. 아래 그림을 보면 스트림, 메시지, 프레임의 개념을 좀 더 쉽게 이해할 수 있습니다.

![스트림, 메시지, 프레임](/assets/img/posts/etc/streams_messages_frames01.svg)

- 프레임: HTTP/1.*에서는 텍스트 형태의 HTTP 메시지가 전송되지만 HTTP/2.0에서는 HTTP 메시지가 HEADERS와 DATA 프레임에 담겨 바이너리 형태로 전송됩니다.
- 스트림: 스트림은 하나의 연결 위에서 개별 HTTP 요청/응답 쌍을 구성하는 일련의 프레임 모음입니다. 클라이언트는 요청을 할 때 새 스트림을 개시합니다. 그러면 서버는 동일한 스트림 위에서 응답합니다.
- 메시지: HTTP/1.*에서와 마찬가지로 메시지는 HTTP 요청이나 응답을 이야기 합니다. 응답/요청 메시지는 아래 그림과 같이 프레임으로 전송됩니다.
  ![메시지와 프레임](/assets/img/posts/etc/message_frame.png)

> **프레임 종류**
>
> 프레임에는 아래 목록과 같이 10가지 종류가 있습니다.
>
> - DATA: 특정 스트림의 핵심 내용을 전송한다.
> - HEADERS: HTTP 헤더를 포함하며, 선택적으로 우선순위를 포함할 수 있다.
> - PRIORITY: 스트림 우선순위와 의존성을 표시 또는 변경한다.
> - RST_STREAM: 엔드포인트가 스트림을 닫도록 허용한다(보통, 오류가 발생한 경우)
> - SETTINGS: 연결 매개변수를 주고 받는다.
> - PUSH_PROMISE: 서버가 무언가를 보내려 한다는 사실을 클라이언트에 알려준다.
> - PING: 연결을 시험하고 RTT를 측정한다.
> - GOAWAY: 상대방이 새로운 스트림 수신했음을 엔드포인트에 알려준다.
> - WINDOW_UPDATE: 엔드포인트가 얼마나 많은 바이트를 수신할 수 있는지 주고받는다(흐름 제어에 사용).
> - CONTINUATION: HEADER 블록을 확장하는데 사용한다.

### HTTP 헤더
HTTP/1.*에서는 메시지를 요청/상태 라인과 헤더로 나뉩니다. HTTP/2.0은 이런 구분을 없애고 가상 헤더(Pseudo-Header)를 사용하여 모두 헤더로 만들었습니다.

#### 요청 가상 헤더 (Request Pseudo-Header Fields)
HTTP/1.1에서 아래와 같은 요청은

```http
GET / HTTP/1.1
Host: beomy.github.io
Accept-Encoding: compress, gzip
```

HTTP/2.0에서 아래와 같은 요청의 형태를 가지게 됩니다.

```http
:scheme: https
:method: GET
:path: /
:authority: beomy.github.io
accept-encoding: compress, gzip
```

요청 메시지의 요청 라인은 `:scheme`, `:method`, `:path`, `:authority` 헤더로 나누어집니다.

#### 응답 가상 헤더 (Response Pseudo-Header Fields)
HTTP/1.1에서 아래와 같은 응답은

```http
HTTP/1.1 200 OK
Content-type: text/plain
```

HTTP/2.0에서 아래와 같은 응답의 형태를 가지게 됩니다.

```http
:status:200
content-type: text/plain
```

응답 메시지의 상태 라인은 `:status` 헤더를 사용하여 표현됩니다.

## 개선 사항
HTTP/2.0은 HTTP/1.1의 성능 개선을 위해 아래 목록과 같은 기능을 추가했습니다.

- 헤더 필드 압축
- 서버 푸시
- 다중화(멀티플렉싱)

## 커넥션 관리

### 멀티플렉싱
HTTP/2.0는 프레임 형식 덕분에 요청과 응답을 서로 뒤섞는 다중화가 가능합니다. 다중화는 HTTP의 HOLB

HTTP/2는 바이너리 프레이밍 계층을 사용해 요청과 응답의 멀티플렉싱을 지원합니다. HTTP 메시지를 바이너리 형태의 프레임으로 나누고 이를 전송 후 받은 쪽에서 다시 조립합니다.

HTTP/1.1의 파이프라이닝은 HTTP/2.0의 멀티플랙싱으로 대채되었습니다.

# HTTP/3
핸드쉐이킹 등에 쓰이는 자원을 사용하지 않기 위해 UDP 사용, UDP는 통신만 담당하기 때문에 무결성을 보장하기 위한 코드가 추가된 QUIC를 사용

# 부록

## `Proxy-Connection` 헤더
이런 멍청한 프록시 문제를 해결하기 위한 아이디어로 `Proxy-Connection` 헤더가 등장하였습니다.

## Dos, DDos

## HOLB (Head-Of-Line Blocking)

### HTTP에서 HOLB

### TCP에서 HOLB

## TCP
TCP는 데이터를 전송하는 가장 빠른 방법이라기 보다는 가장 신뢰성 있는 방법입니다.

혼잡 윈도우(congestion window)는 수신자가 확인(ACK)하기 전까지 송신자가 전송할 수 있는 TCP 패킷의 수를 의미합니다.

> 패킷이란?
>
> TCP는 패킷 단위로 전송되는데 패킷에는 패킷의 길이, 전송 방법(출발지와 목적지), TCP 통인에 필요한 여러 항목을 담고 있습니다.

TCP는 현재 연결에 알맞는 혼잡 윈도우의 크기를 결정하기 위해 느린 시작(Slow Start)을 하게 됩니다. 느린 시작의 목적은 새로운 연결이 네트워크의 상태를 감지해 이미 혼잡한 네트워크를 악화시키지 않게 하는 것입니다.

> 느린 시작이란?
>
> 송신자는 ACK를 수신할 때마다 패킷 수를 늘려서 전송할 수 있습니다. 새로운 연결에서 첫 번째 ACK를 수신한 다음, 수신자는 두 개의 패킷을 전송할 수 있습니다. 이 두개의 패킷이 확인되면 네 개의 패킷을 전송 할 수 있습니다. 이렇게 전송되는 패킷 수가 증가하다가 프로토콜에서 정의된 상한선에 도달하면 이 연결은 혼잡 회피 단계에 들어가는에 혼잡 회피 단계에서 전송하는 패킷의 수를 조절하게 됩니다.

### 연결 과정
3-Way Handshaking

### 종료 과정
4-Way Handshaking

## UDP

## 웹 브라우저의 HTTP 버전별 지원 현황
HTTP/2.0과 HTTP/3.0은 비교적 최근에 발표된 프로토콜이기 때문에 브라우저에서 지원하는지 확인 후 사용하는 것이 좋습니다.

### HTTP/2.0 지원 브라우저
|브라우저명|최소 버전|비고|
|:--:|:--:|:--:|
|크롬|41||
|파이어폭스|36||
|엣지|12||
|사파리|9|OSX 10.11 이후|
|인터넷 익스플로러|11|윈도우 10만 해당|
|오페라|28||
|사파리 - iOS|9.2||
|안드로이드 브라우저|51||
|크롬 - 안드로이드|51||

### HTTP/3.0 지원 브라우저
|브라우저명|최소 버전|
|:--:|:--:|
|크롬|87|
|파이어폭스|88|
|엣지|87|
|사파리|현재(15.4)까지 미지원|
|인터넷 익스플로러|미지원|
|오페라|74|
|사파리 - iOS|현재(15.4)까지 미지원|
|안드로이드 브라우저|98|
|크롬 - 안드로이드|98|

#### 참고
- [https://evan-moon.github.io/2019/10/08/what-is-http3/](https://evan-moon.github.io/2019/10/08/what-is-http3/)
- [https://ykarma1996.tistory.com/86](https://ykarma1996.tistory.com/86)
- [https://developer.mozilla.org/ko/docs/Web/HTTP/Basics_of_HTTP/Evolution_of_HTTP](https://developer.mozilla.org/ko/docs/Web/HTTP/Basics_of_HTTP/Evolution_of_HTTP)
- [https://velog.io/@seeker1207/HTTP-0.9에서-HTTP-3.0까지](https://velog.io/@seeker1207/HTTP-0.9에서-HTTP-3.0까지)
- [https://www.w3.org/Protocols/HTTP/1.0/spec.html](https://www.w3.org/Protocols/HTTP/1.0/spec.html)
- [https://it-mesung.tistory.com/146](https://it-mesung.tistory.com/146)
- [https://withbundo.blogspot.com/2021/02/http-http-10-http-11.html](https://withbundo.blogspot.com/2021/02/http-http-10-http-11.html)
- [https://bbubbush.tistory.com/21](https://bbubbush.tistory.com/21)
- [https://javaplant.tistory.com/24](https://javaplant.tistory.com/24)
- [https://hirlawldo.tistory.com/106](https://hirlawldo.tistory.com/106)
- [https://developer.mozilla.org/en-US/docs/Web/HTTP/Connection_management_in_HTTP_1.x](https://developer.mozilla.org/en-US/docs/Web/HTTP/Connection_management_in_HTTP_1.x)
- [https://ssungkang.tistory.com/entry/네트워크-HTTP-11-VS-HTTP-20](https://ssungkang.tistory.com/entry/네트워크-HTTP-11-VS-HTTP-20)
- [https://goodgid.github.io/HTTP-Keep-Alive/](https://goodgid.github.io/HTTP-Keep-Alive/)
- [https://goyunji.tistory.com/8](https://goyunji.tistory.com/8)
- [https://gahui-developer123.tistory.com/106](https://gahui-developer123.tistory.com/106)
- [https://developer.mozilla.org/ko/docs/Web/HTTP/Headers/Connection](https://developer.mozilla.org/ko/docs/Web/HTTP/Headers/Connection)
- [https://www.popit.kr/나만-모르고-있던-http2/](https://www.popit.kr/나만-모르고-있던-http2/)
- [https://medium.com/@jperasmus11/domain-sharding-on-the-modern-web-dc97df4f6a90](https://medium.com/@jperasmus11/domain-sharding-on-the-modern-web-dc97df4f6a90)
- [https://kamranahmed.info/blog/2016/08/13/http-in-depth/](https://kamranahmed.info/blog/2016/08/13/http-in-depth/)
- [https://letitkang.tistory.com/79](https://letitkang.tistory.com/79)
- [https://kscodebase.tistory.com/297](https://kscodebase.tistory.com/297)
- [https://www.oreilly.com/library/view/http-the-definitive/1565925092/ch04s05.html](https://www.oreilly.com/library/view/http-the-definitive/1565925092/ch04s05.html)
- [https://developers.google.com/web/fundamentals/performance/http2?hl=ko](https://developers.google.com/web/fundamentals/performance/http2?hl=ko)
- [https://http2.github.io/faq/](https://http2.github.io/faq/)
- [https://seokbeomkim.github.io/posts/http1-http2/](https://seokbeomkim.github.io/posts/http1-http2/)
- [https://httpwg.org/specs/rfc7540.html](https://httpwg.org/specs/rfc7540.html)
