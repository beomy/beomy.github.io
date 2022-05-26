---
layout: post
title: '[ETC] HTTP 캐시'
featured-img: etc/HTTP_logo.png
category: [tech, etc]
summary: HTTP 캐시는 첫 HTTP 요청 시 HTML, Image, JS, CSS 등의 파일을 다운로드 받아 특정 위치에 복사본을 저장하고 이후 동일한 HTTP 요청시 다시 다운로드하지 않고 내부에 저장한 파일을 사용하여 더 빠르게 서비스하기 위한 기능입니다.
---

이번 포스트에서는 HTTP 요청과 응답에 사용되는 리소스를 최소화 하기 위한 기능 중 하나인 HTTP 캐시에 대해 살펴보도록 하겠습니다.

# 캐시 목적
HTTP 캐시는 첫 HTTP 요청 시 HTML, Image, JS, CSS 등의 파일을 다운로드 받아 특정 위치에 복사본을 저장하고 이후 동일한 HTTP 요청시 다시 다운로드하지 않고 내부에 저장한 파일을 사용합니다. 캐시를 사용하면 서버는 모든 클라이언트를 서비스할 필요가 없어지기 때문에 부하를 줄일 수 있고, 클라이언트는 서버보다 더 가까이 있는 캐시를 사용함으로 성능을 향상 시킬 수 있습니다.

캐시는 갑작스럽게 많은 요청에 대처할 때 특히 중요합니다. 많은 사람이 거의 동시에 웹 문서에 접근할 때, 트래픽이 급증하고 네트워크와 웹 서버에 심각한 장애를 일으킬 수 있습니다.

# 캐시 종류
캐시는 한 명의 사용자에게만 사용하는 캐시와 다수의 사용자 간에 공유되는 캐시로 분류할 수 있습니다. 한 명의 사용자만 사용하는 캐시를 개인 전공 캐시(Private cache), 다수의 사용자 간에 공유되는 캐시를 공용 캐시(Public cache)라고 부릅니다.

## 개인 전용 캐시(Private cache)
개인 전용 캐시는 대표적으로 브라우저 캐시가 있습니다. 브라우저는 자주 사용되는 문서를 개인용 컴퓨터의 디스크나 메모리에 캐시해 놓습니다. 이 캐시는 개인용 컴퓨터를 사용하는 한 명에게만 캐시를 제공하기 때문에 개인 전용 캐시가 됩니다.

## 공용 캐시(Public cache)
공용 캐시는 캐시 프록시 서버 또는 프록시 캐시라고도 불립니다. 프록시 캐시는 로컬 캐시에서 문서를 제공하거나, 서버에 접근하여 문서를 가져와 클라이언트에게 제공합니다. 공용 캐시는 여러 사용자가 접근하기 때문에 프록시 캐시를 사용하면 불필요한 트래픽을 줄일 수 있습니다.

# 캐시의 적중과 부적중
캐시는 성능 향상에 유용하지만 모든 것들을 캐시 할 수는 없습니다. 요청이 도착했을 때 요청에 대응하는 문서가 캐시가 되어 있다면 캐시 적중(Cache hit) 대응하는 값이 캐시 되어 있지 않다면 캐시 부적중(Cache miss)라고 부릅니다.

## 적중률
0에서 1까지의 값이나 퍼센트로 캐시가 얼마나 적중되었는지 적중률로 표현할 수 있습니다. 0%는 모든 요청이 캐시 부적중되었다는 것을 의미하고 반대로 100%는 모든 요청이 캐시 적중되었다는 것을 의미합니다. 어떠한 기준으로 적중률을 표현하는지에 따라 적중률의 의미는 조금씩 다릅니다.

### 문서 적중률
캐시가 요청을 처리하는 비율을 캐시 적중률 또는 문서 적중률이라고 부릅니다. 100개의 요청 중 40개를 캐시로 응답하였다면 문서 적중률을 40%가 됩니다.

### 바이트 적중률
요청에 대한 응답 문서들이 모두 값은 크기가 아니기 때문에 문서 적중률이 모든 것을 이야기하지는 못합니다. 예를 들어 가끔 사용되지만 크기가 큰 문서들은 캐시하지 않고 자주 사용되는 크기가 작은 문서들만 캐싱한다면 문서 적중률을 높지만 바이트 적중률을 높지 않을 수 있습니다. AWS와 같이 트래픽, 바이트 당 요금을 매기는 서비스를 사용한다면 문서 적중률보다 바이트 적중률이 높은게 더 효과적일 수 있습니다.

# 캐시 처리 단계
프록시 캐시는 아래와 같은 7단계를 거쳐 캐시를 처리합니다.

- **요청 받기**: 네트워크로부터 도착한 요청 메시지를 읽습니다.
- **파싱**: 요청 메시지를 여러 부분으로 파싱하여 헤더 부분을 조작하기 쉬운 자료 구조에 담습니다.
- **검색**: 로컬 복사본이 있는지 검사하고, 복사본이 없다면 서버에서 문서를 가져온 후 로컬에 저장합니다.
- **신선도 검사**: 캐시된 문서가 신선한지 검사하고 신선하지 않다면 변경 사항이 있는지 서버에 물어봅니다.
- **응답 생성**: 새로운 헤더와 캐시된 본문으로 응답 메시지를 만듭니다. 캐시된 응답을 서버에서 온 것처럼 보이게 하기 위해서 캐시는 캐시된 서버 응답 헤더를 토대로 응답 헤더를 생성합니다. 또한 신선도 정보(`Cache-Control`, `Age`, `Expires` 헤더)를 포함시킵니다.
- **발송**: 네트워크를 통해 응답을 클라이언트에 전달합니다.
- **로깅**(선택): 어떤 요청을 캐시된 값으로 응답하였는지 로그를 남길 수도 있습니다.

# 캐시 신선도
캐시된 문서는 항상 서버의 문서와 일치하지 않습니다. 서버의 데이터들이 언제든 바뀔 수 있기 때문에 캐시 된 데이터는 서버의 데이터와 일치하도록 관리되어야 합니다. 문서 만료와 서버 재검사 메커니즘으로 캐시 신선도를 유지하게 됩니다.

## 문서 만료
`Cache-Control`과 `Expires` 헤더를 사용하여 우유의 유통기한을 표시하는 것과 동일하게 캐시의 유효기간을 표시할 수 있습니다. 헤더에 기록된 시간보다 오래되었으면 캐시를 새롭게 업데이트 합니다.

### `Cache-Control: max-age` 헤더
문서의 최대 나이를 정의합니다. 문서가 처음 생성된 이후부터 신성하다고 판단하는 시간이 초단위로 지정합니다. `Cache-Control: max-age=484200`와 같이 사용했다면 응답 값을 받은 후 484200초 동안 신선한 캐시로 판단합니다.

### `Expires` 헤더
절대 유효기간을 지정하는 헤더입니다. `Expires: Wed, 23 Mar 2022 08:00:00 GMT`과 같이 사용했다면 현재 시간이 지정된 시간의 이전라면 신선한 캐시로 판단합니다. 많은 서버가 시간이 동기화 되어 있지 않거나 부정확한 시계를 가지고 있기 때문에 경과된 시간(`Cache-Control: max-age`)로 신선도를 판단하는 것이 좋다고 판단하여 `Exprices` 헤더는 Deprecated 되었습니다.

`Cache-Control: max-age`가 정의 되어 있다면 `Expires` 보다 `Cache-Control: max-age`가 더 우선합니다.

## 서버 재검사
캐시된 문서가 만료되었다고 그 문서가 서버에 현재 존재하는 값과 실제로 다르다는 것을 의미하지 않습니다. 시간이 지났으니 문서가 변경되었는지 검사할 시간이 됬다는 것을 의미합니다. 이 검사를 캐시가 서버에게 문서가 변경되었는지 여부를 확인하는 서버 재검사라고 부릅니다. 문서의 신선도를 매 요청마다 검증할 필요없이 문서가 만료되었을 때 한 번만 서버와 재검사하면 되기 때문에 신선한 캐시를 제공하면서 서버 트래픽을 줄일 수 있게 됩니다.

클라이언트가 서버에게 조건부 GET 요청을 보낼 수 있는데, 이 요청은 서버가 가지고 있는 문서와 캐시가 가지고 있는 문서가 다를 때만 응답 본문을 보내달라고 하는 방법입니다. 조건부 GET은 `If-` 접두어로 시작하는 헤더를 추가하여 사용할 수 있습니다.

### `If-Modified-Since` 헤더: 날짜 재검사
`If-Modified-Since` 헤더는 가장 많이 쓰이는 캐시 재검사 헤더입니다. `If-Modified-Since` 재검사 요청(IMS 요청)은 서버에게 특정 날짜 이후로 변경된 경우에만 응답 본문을 보내달라고 하는 요청입니다.

`If-Modified-Since: Wed, 23 Mar 2022 08:00:00 GMT`와 같이 헤더를 추가하여 IMS 요청을 보낼 수 있는데, `If-Modified-Since` 조건의 참, 거짓에 따라 아래와 같이 응답을 받을 수 있습니다.

- **`If-Modified-Since` 조건이 참**: 문서가 주어진 날짜 이후로 변경되었다면 `If-Modified-Since` 조건이 참이 됩니다. GET 요청은 평범하게 성공되고, 새로운 문서와 새로운 만료 날짜 등이 담긴 헤더들과 함께 응답을 보냅니다.
- **`If-Modified-Since` 조건이 거짓**: 문서가 주어진 날짜 이후로 변경되지 않았다면 `If-Modified-Since` 조건이 거짓이 됩니다. 본문을 포함하지 않는 `304 Not Modified` 응답 메시지를 보냅니다. 응답 헤더는 포함하지만 갱신이 필요한 것들만 보냅니다.

|`If-Modified-Since` 조건이 참|`If-Modified-Since` 조건이 거짓|
|:--:|:--:|
|![If-Modified-Since 참](/assets/img/posts/etc/if_modified_since_true.png)|![If-Modified-Since 거짓](/assets/img/posts/etc/if_modified_since_false.png)|

`If-Modified-Since` 헤더는 서버에서 받은 `Last-Modified` 응답 헤더와 함께 동작합니다. `If-Modified-Since: <캐시된 마지막 수정일>`과 같이 사용해야 하는데 클라이언트는 `<캐시된 마지막 수정일>`의 값으로 `Last-Modified` 응답 헤더 값을 사용합니다.

### `If-None-Match` 헤더: 엔터티 태그 재검사
아래 상황 같이 IMS 요청을 사용하기 어려울 때에는,

- 일정 시간 간격으로 백그라운스 프로세스에 의해 다시 문서가 만들어지지만 실제로는 같은 데이터일 경우
- 철자나 주석의 변경같이 캐시들이 변경된 문서를 재검사하기에 사소한 것일 경우

`If-None-Match` 헤더를 사용한 앤티티 태그 재검사를 사용할 수 있습니다. 문서가 변경될 때 문서에 엔터티 태그를 새로운 버전으로 표현하여 새로운 버전으로 변경 되었을 때에만 캐시를 업데이트 하는 방법입니다.

`If-None-Match: "v2.6"`와 같이 헤더를 추가하여 요청을 보낼 수 있는데 `If-Modified-Since`와 동일하게 조건에 따라 동작합니다.

- **`If-None-Match` 조건이 참**: 문서의 엔터티 태그가 변경되었다면 `If-None-Match` 조건이 참이 됩니다. GET 요청은 평범하게 성공되고, 새로운 문서와 새로운 만료 날짜 등이 담긴 헤더들과 함께 응답을 보냅니다.
- **`If-None-Match` 조건이 거짓**: 문서의 엔터티 태그가 변경되지 않았다면 `If-None-Match` 조건이 거짓이 됩니다. 본문을 포함하지 않는 `304 Not Modified` 응답 메시지를 보냅니다. 응답 헤더는 포함하지만 갱신이 필요한 것들만 보냅니다.

|`If-None-Match` 조건이 참|`If-None-Match` 조건이 거짓|
|:--:|:--:|
|![If-None-Match 참](/assets/img/posts/etc/if_none_match_true.png)|![If-None-Match 거짓](/assets/img/posts/etc/if_none_match_false.png)|

`If-None-Match` 헤더는 서버에서 받은 `ETag` 응답 헤더와 함께 동작합니다. `If-None-Match: <캐시된 버전>[, <캐시된 버전>]`과 같이 사용해야 하는데 클라이언트는 `<캐시된 버전>`의 값으로 `ETag` 응답 헤더 값을 사용합니다.

캐시가 여러개의 사본을 가지고 있는 경우 서버에 알리기 위해 아래와 같이 하나의 `If-Modified-Since` 헤더에 여러 개의 엔터티 태그를 포함할 수 있습니다.

```http
If-None-Match: "v2.6"
If-None-Match: "v2.4", "v2.5", "v2.6"
If-None-Match: "foobar", "BEOMY1203", "http catch"
```

# 캐시 제어

|디렉티브 이름|요청 메시지에서 사용가능 여부|응답 메시지에서 사용가능 여부|
|:--:|:--:|:--:|
|`max-age`|O|O|
|`max-stale`|O|X|
|`min-fresh`|O|X|
|`s-maxage`|X|O|
|`no-cache`|O|O|
|`no-store`|O|O|
|`no-transform`|O|O|
|`only-if-cached`|O|X|
|`must-revalidate`|X|O|
|`proxy-revalidate`|X|O|
|`must-understand`|X|O|
|`private`|X|O|
|`public`|X|O|
|`immutable`|X|O|
|`stale-while-revalidate`|X|O|
|`stale-if-error`|O|O|

여러개를 사용할 수 있다.
`Cache-Control: private, max-age=600`

## 캐시 능력

## `no-store`
캐시로 저장하지 않는다

## `no-cache`
`Cache-Control: max-age=0`과 동일한 동작을 합니다. 캐시로 저장되지만, 서버와 재검사 후에 클라이언트로 응답 값을 제공된다.

## `private`
브라우저는 문서를 캐시할 수 있지만 중간 프록시 캐시는 캐시할 수 없습니다.

## `public`
모든 캐시가 저장할 수 있습니다.

## `max-age`
`Cache-Control: max-age=3600`와 같이 초 단위의 값을 사용합니다. 설정 된 시간이 동안만 캐시가 신선한 것으로 간주됩니다.

브라우저는 한번 받아온 문서의 유효기간이 지나기 전이라면, 서버에 요청을 보내지 않고 디스크 또는 메모리에 캐시된 사본을 가져와 사용합니다.

## `must-revalidate`
캐시는 성능을 개선하기 위해 신선하지 않은 객체를 제공할 수 있도록 설정될 수 있는데, 캐시가 만료 정보를 엄격하게 따리길 원한다면 원 서버는 `Cache-Control: must-revalidate` 응답 헤더를 사용할 수 있습니다.

# 부록
- `Date`, `Age` 헤더: 클라이언트에서 캐시의 신선도를 구별할 수 있는 방법

#### 참고
- [https://developer.mozilla.org/ko/docs/Web/HTTP/Caching](https://developer.mozilla.org/ko/docs/Web/HTTP/Caching)
- [https://pjh3749.tistory.com/264](https://pjh3749.tistory.com/264)
- [https://toss.tech/article/smart-web-service-cache](https://toss.tech/article/smart-web-service-cache)
- [https://hahahoho5915.tistory.com/33](https://hahahoho5915.tistory.com/33)
- [https://withbundo.blogspot.com/2017/07/http-13-http-iii-if-match-if-modified.html](https://withbundo.blogspot.com/2017/07/http-13-http-iii-if-match-if-modified.html)
- [https://web.dev/i18n/ko/http-cache/](https://web.dev/i18n/ko/http-cache/)
- [https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control)
