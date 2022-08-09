---
layout: post
title: '[ETC] HTTP 캐시'
featured-img: etc/HTTP_logo.png
category: [tech, etc]
summary: HTTP 캐시는 첫 HTTP 요청 시 HTML, Image, JS, CSS 등의 파일을 다운로드 받아 특정 위치에 복사본을 저장하고 이후 동일한 HTTP 요청 시 다시 다운로드하지 않고 내부에 저장한 파일을 사용하여 더 빠르게 서비스하기 위한 기능입니다.
---

이번 포스트에서는 HTTP 요청과 응답에 사용되는 리소스를 최소화 하기 위한 기능 중 하나인 HTTP 캐시에 대해 살펴보도록 하겠습니다.

# 캐시 목적
HTTP 캐시는 첫 HTTP 요청 시 HTML, Image, JS, CSS 등의 파일을 다운로드 받아 특정 위치에 복사본을 저장하고 이후 동일한 HTTP 요청 시 다시 다운로드하지 않고 내부에 저장한 파일을 사용합니다. 캐시를 사용하면 서버는 모든 클라이언트를 서비스할 필요가 없어지기 때문에 부하를 줄일 수 있고, 클라이언트는 서버보다 더 가까이 있는 캐시를 사용함으로 성능을 향상 시킬 수 있습니다.

# 캐시 종류
캐시는 한 명의 사용자에게만 사용하는 캐시와 다수의 사용자 간에 공유되는 캐시로 분류할 수 있습니다. 한 명의 사용자만 사용하는 캐시를 개인 전공 캐시(Private cache), 다수의 사용자 간에 공유되는 캐시를 공용 캐시(Public cache)라고 부릅니다.

## 개인 전용 캐시(Private cache)
개인 전용 캐시는 대표적으로 브라우저 캐시가 있습니다. 브라우저는 자주 사용되는 문서를 개인용 컴퓨터의 디스크나 메모리에 캐시 해 놓습니다. 이 캐시는 개인용 컴퓨터를 사용하는 한 명에게만 캐시를 제공하기 때문에 개인 전용 캐시가 됩니다.

## 공용 캐시(Public cache)
공용 캐시는 캐시 프록시 서버 또는 프록시 캐시라고도 불립니다. 프록시 캐시는 로컬 캐시에서 문서를 제공하거나, 서버에 접근하여 문서를 가져와 클라이언트에게 제공합니다. 공용 캐시는 여러 사용자가 접근하기 때문에 프록시 캐시를 사용하면 불필요한 트래픽을 줄일 수 있습니다.

# 캐시의 적중과 부적중
캐시는 성능 향상에 유용하지만 모든 것들을 캐시 할 수는 없습니다. 요청이 도착했을 때 요청에 대응하는 문서가 캐시가 되어 있다면 캐시 적중(Cache hit) 대응하는 값이 캐시 되어 있지 않다면 캐시 부적중(Cache miss)라고 부릅니다.

# 캐시의 적중률
0에서 1까지의 값이나 퍼센트로 캐시가 얼마나 적중되었는지 적중률로 표현할 수 있습니다. 0%는 모든 요청이 캐시 부적중 되었다는 것을 의미하고 반대로 100%는 모든 요청이 캐시 적중되었다는 것을 의미합니다. 어떠한 기준으로 적중률을 표현하는지에 따라 적중률의 의미는 조금씩 다릅니다.

## 문서 적중률
캐시가 요청을 처리하는 비율을 캐시 적중률 또는 문서 적중률이라고 부릅니다. 100개의 요청 중 40개를 캐시로 응답하였다면 문서 적중률을 40%가 됩니다.

## 바이트 적중률
요청에 대한 응답 문서들이 모두 동일한 크기가 아니기 때문에 문서 적중률이 모든 것을 이야기하지는 못합니다. 예를 들어 가끔 사용되지만 크기가 큰 문서들은 캐시하지 않고 자주 사용되는 크기가 작은 문서들만 캐싱한다면 문서 적중률을 높지만 바이트 적중률을 높지 않을 수 있습니다. 트래픽, 바이트 당 요금을 매기는 서비스(AWS와 같은...)를 사용한다면 문서 적중률보다 바이트 적중률이 높은 게 더 효과적일 수 있습니다.

# 캐시 처리 단계
프록시 캐시는 아래와 같은 7단계를 거쳐 캐시를 처리합니다.

- **요청 받기**: 네트워크로부터 도착한 요청 메시지를 읽습니다.
- **파싱**: 요청 메시지를 여러 부분으로 파싱하여 헤더 부분을 조작하기 쉬운 자료 구조에 담습니다.
- **검색**: 로컬 복사본이 있는지 검사하고, 복사본이 없다면 서버에서 문서를 가져온 후 로컬에 저장합니다.
- **신선도 검사**: 캐시 된 문서가 신선한 지 검사하고 신선하지 않다면 변경 사항이 있는지 서버에 물어봅니다.
- **응답 생성**: 새로운 헤더와 캐시 된 본문으로 응답 메시지를 만듭니다. 캐시 된 응답을 서버에서 온 것처럼 보이게 하기 위해서 캐시는 캐시 된 서버 응답 헤더를 토대로 응답 헤더를 생성합니다. 또한 신선도 정보(`Cache-Control`, `Age`, `Expires` 헤더)를 포함시킵니다.
- **발송**: 네트워크를 통해 응답을 클라이언트에 전달합니다.
- **로깅**(선택): 어떤 요청을 캐시 된 값으로 응답하였는지 로그를 남길 수도 있습니다.

# 캐시 신선도
캐시 된 문서는 항상 서버의 문서와 일치하지 않습니다. 서버의 데이터들이 언제든 바뀔 수 있기 때문에 캐시 된 데이터는 서버의 데이터와 일치하도록 관리되어야 합니다. 문서 만료와 서버 재검사 메커니즘으로 캐시 신선도를 유지하게 됩니다.

## 문서 만료
`Cache-Control`과 `Expires` 헤더를 사용하여 우유의 유통기한을 표시하는 것과 동일하게 캐시의 유효기간을 표시할 수 있습니다. 헤더에 기록된 시간보다 오래되었으면 캐시를 새롭게 업데이트 합니다.

### `Cache-Control: max-age` 헤더
문서의 최대 나이를 정의합니다. 문서가 처음 생성된 이후부터 신선하다고 판단하는 시간을 초단위로 지정합니다. `Cache-Control: max-age=484200`와 같이 사용했다면 응답 값이 생성된 후 484200초 동안 신선한 캐시로 판단합니다.

### `Expires` 헤더
절대 유효기간을 지정하는 헤더입니다. `Expires: Wed, 23 Mar 2022 08:00:00 GMT`과 같이 사용했다면 현재 시간이 지정된 시간의 이전이라면 신선한 캐시로 판단합니다. 많은 서버가 시간이 동기화 되어 있지 않거나 부정확한 시계를 가지고 있기 때문에 경과된 시간(`Cache-Control: max-age`)으로 신선도를 판단하는 것이 좋다고 판단하여 `Exprices` 헤더는 Deprecated 되었습니다.

`Cache-Control: max-age`가 정의 되어 있다면 `Expires` 보다 `Cache-Control: max-age`가 더 우선합니다.

## 서버 재검사
캐시 된 문서가 만료되었다고 그 문서가 서버에 현재 존재하는 값과 실제로 다르다는 것을 의미하지 않습니다. 문서가 만료되었다는 것은 시간이 지났으니 문서가 변경되었는지 검사할 시간이 됬다는 것을 의미합니다. 이 검사를 캐시가 서버에게 문서가 변경되었는지 여부를 확인하는 서버 재검사라고 부릅니다.

클라이언트가 서버에게 조건부 GET(Conditional GET) 요청을 보낼 수 있는데, 이 요청은 서버가 가지고 있는 문서와 캐시가 가지고 있는 문서가 다를 때만 응답 본문을 보내달라고 하는 방법입니다. 조건부 GET은 `If-` 접두어로 시작하는 헤더를 추가하여 사용할 수 있습니다.

### `If-Modified-Since` 헤더: 날짜 재검사
`If-Modified-Since` 헤더는 가장 많이 쓰이는 캐시 재검사 헤더입니다. `If-Modified-Since` 재검사 요청(IMS 요청)은 서버에게 특정 날짜 이후로 변경된 경우에만 응답 본문을 보내달라고 하는 요청입니다.

`If-Modified-Since: Wed, 23 Mar 2022 08:00:00 GMT`와 같이 헤더를 추가하여 IMS 요청을 보낼 수 있는데, `If-Modified-Since` 조건의 참, 거짓에 따라 아래와 같이 응답을 받을 수 있습니다.

- **`If-Modified-Since` 조건이 참**: 문서가 주어진 날짜 이후로 변경되었다면 `If-Modified-Since` 조건이 참이 됩니다. GET 요청은 평범하게 성공되고, 새로운 문서와 새로운 만료 날짜 등이 담긴 헤더들과 함께 응답을 보냅니다.
- **`If-Modified-Since` 조건이 거짓**: 문서가 주어진 날짜 이후로 변경되지 않았다면 `If-Modified-Since` 조건이 거짓이 됩니다. 본문을 포함하지 않는 `304 Not Modified` 응답 메시지를 보냅니다. 응답 헤더는 갱신이 필요한 것들만 보냅니다.

|`If-Modified-Since` 조건이 참|`If-Modified-Since` 조건이 거짓|
|:--:|:--:|
|![If-Modified-Since 참](/assets/img/posts/etc/if_modified_since_true.png)|![If-Modified-Since 거짓](/assets/img/posts/etc/if_modified_since_false.png)|

`If-Modified-Since` 헤더는 서버에서 받은 `Last-Modified` 응답 헤더와 함께 동작합니다. `If-Modified-Since: <캐시 된 마지막 수정일>`과 같이 사용해야 하는데 클라이언트는 `<캐시 된 마지막 수정일>`의 값으로 `Last-Modified` 응답 헤더 값을 사용합니다.

### `If-None-Match` 헤더: 엔터티 태그 재검사
아래 상황 같이 IMS 요청을 사용하기 어려울 때에는,

- 일정 시간 간격으로 백그라운드 프로세스에 의해 다시 문서가 만들어지지만 실제로는 같은 데이터일 경우
- 철자나 주석의 변경같이 캐시들이 변경된 문서를 재검사하기에 사소한 것일 경우

`If-None-Match` 헤더를 사용한 앤티티 태그 재검사를 사용할 수 있습니다. 문서가 변경될 때 문서에 엔터티 태그를 새로운 버전으로 표현하여 새로운 버전으로 변경 되었을 때에만 캐시를 업데이트 하는 방법입니다.

`If-None-Match: "v2.6"`와 같이 헤더를 추가하여 요청을 보낼 수 있는데 `If-Modified-Since`와 동일하게 조건에 따라 동작합니다.

- **`If-None-Match` 조건이 참**: 문서의 엔터티 태그가 변경되었다면 `If-None-Match` 조건이 참이 됩니다. GET 요청은 평범하게 성공되고, 새로운 문서와 새로운 만료 날짜 등이 담긴 헤더들과 함께 응답을 보냅니다.
- **`If-None-Match` 조건이 거짓**: 문서의 엔터티 태그가 변경되지 않았다면 `If-None-Match` 조건이 거짓이 됩니다. 본문을 포함하지 않는 `304 Not Modified` 응답 메시지를 보냅니다. 응답 헤더는 갱신이 필요한 것들만 보냅니다.

|`If-None-Match` 조건이 참|`If-None-Match` 조건이 거짓|
|:--:|:--:|
|![If-None-Match 참](/assets/img/posts/etc/if_none_match_true.png)|![If-None-Match 거짓](/assets/img/posts/etc/if_none_match_false.png)|

`If-None-Match` 헤더는 서버에서 받은 `ETag` 응답 헤더와 함께 동작합니다. `If-None-Match: <캐시 된 버전>[, <캐시 된 버전>]`과 같이 사용해야 하는데 클라이언트는 `<캐시 된 버전>`의 값으로 `ETag` 응답 헤더 값을 사용합니다.

캐시가 여러 개의 사본을 가지고 있는 경우 서버에 알리기 위해 아래와 같이 하나의 `If-Modified-Since` 헤더에 여러 개의 엔터티 태그를 포함할 수 있습니다.

```http
If-None-Match: "v2.6"
If-None-Match: "v2.4", "v2.5", "v2.6"
If-None-Match: "foobar", "BEOMY1203", "http catch"
```

# 캐시 제어(`Cache-Control`)
`Cache-Control` 헤더를 사용하여 브라우저 같은 개인 전용 캐시와 프록시, CDN 과 같은 공용 캐시의 캐시 제어 설정을 할 수 있습니다. `Cache-Control` 헤더는 아래 표와 같은 디렉티브를 사용할 수 있습니다.

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

`Cache-Control`의 디렉티브는 `Cache-Control: private, max-age=600`처럼 여러 개를 사용할 수 있습니다.

## 응답에서 사용되는 디렉티브
응답 메시지에서 사용할 수 있는 `Cache-Control` 디렉티브를 살펴보겠습니다.

### `max-age`
`max-age` 디렉티브는 아래와 같은 형태로 사용됩니다.

```http
Cache-Control: max-age=604800
```

위의 코드의 경우 응답 메시지가 생성된 후 604800초 동안 신선한 캐시로 판단합니다. 브라우저는 한번 받아온 문서의 유효기간이 지나기 전이라면, 서버에 요청을 보내지 않고 디스크 또는 메모리에 캐시 된 사본을 가져와 사용합니다.

`max-age`는 클라이언트가 응답을 받은 후 경과되는 시간이 아닌, 서버에서 응답이 생성된 후 경과되는 시간을 가지고 있기 때문에 네트워크 경로의 캐시가 100초 동안 응답을 저장하고 있었다면 아래와 같이 응답을 받게 되고,

```http
Cache-Control: max-age=604800
Age: 100
```

클라이언트는 604800에서 100을 뺀 604700초 동안 신선한 캐시로 판단하게 됩니다.

> **`Age` 헤더와 `Date` 헤더**
>
> `Age` 헤더는 데이터가 프록시 캐시 내에 머무는 초 단위의 시간을 가집니다. `Age: 100`이라면 서버에게 받은 데이터를 프록시 캐시가 100초 동안 가지고 있는 상태를 이야기 합니다. `Age` 헤더 외에도 `Date` 헤더와 현재 시간의 차이로 데이터가 프록시 캐시 내에서 머무는 시간을 계산할 수 있습니다.
>
> 클라이언트에서 `Date`와 `Age` 헤더로 캐시가 언제 만들어졌는지 확인할 수 있습니다.

### `s-maxage`
`s-maxage` 디렉티브는 아래 코드와 같이 `max-age` 디렉티브와 동일한 역할, 동일한 형태로 사용됩니다.

```http
Cache-Control: s-maxage=604800
```

차이점은 `s-maxage` 디렉티브는 프록시 캐시와 같은 공용 캐시에서만 동작하고, `max-age` 디렉티브가 존재하는 경우 `s-maxage` 디렉티브는 무시됩니다.

### `no-cache`
`no-cache` 디렉티브는 아래와 같은 형태로 사용됩니다.

```http
Cache-Control: no-cache
```

`no-cache`라는 이름 때문에 헷갈릴 수 있지만, `no-cache`는 응답 값을 캐시로 저장하지만, 서버와 재검사 후 클라이언트로 응답 값을 제공합니다. 문자 그대로 캐시를 저장하지 않기 위해서는 `no-store` 디렉티브를 사용해야 합니다. `Cache-Control: no-cache`는 `Cache-Control: max-age=0`과 동일한 동작을 합니다.

### `must-revalidate`
`must-revalidate` 디렉티브는 아래와 같이 일반적으로 `max-age` 디렉티브와 함께 사용됩니다.

```http
Cache-Control: max-age=604800, must-revalidate
```

보통 프록시 캐시는 응답 값을 캐시로 저장하고 캐시가 신선 하다면 재사용하고 오래 되었다면 재검사하게 됩니다. 캐시와 서버의 연결이 끊어졌을 경우와 같이 캐시는 성능을 개선하기 위해 신선하지 않은 데이터를 클라이언트에 제공할 수 있는데, 캐시가 신선하지 않은 데이터 전달을 막기 위해 서버는 `Cache-Control: must-revalidate` 응답 헤더를 사용할 수 있습니다. `must-revalidate` 디렉티브를 사용하면 캐시가 신선하지 않다면 재검사하고 만약 서버와 연결이 끊어져 값을 전달할 수 없다면 `504 Gateway Timeout`을 발생시킵니다.

### `proxy-revalidate`
`proxy-revalidate` 디렉티브는 `must-revalidate` 디렉티브와 동일한 역할, 동일한 형태로 사용됩니다.

```http
Cache-Control: max-age=604800, proxy-revalidate
```

차이점은 `proxy-revalidate` 디렉티브는 프록시 캐시와 같은 공용 캐시에서만 동작하는 디렉티브입니다.

### `no-store`
`no-store` 디렉티브는 아래와 같은 형태로 사용됩니다.

```http
Cache-Control: no-store
```

`no-store` 디렉티브를 사용하면 개인 전용 캐시, 공용 캐시 모두 응답 값을 저장하지 않습니다.

### `private`
`private` 디렉티브는 아래와 같은 형태로 사용됩니다.

```http
Cache-Control: private
```

`private` 디렉티브는 응답 값을 브라우저 캐시와 같은 개인 전용 캐시에만 저장될 수 있게 합니다.

### `public`
`public` 디렉티브는 아래와 같은 형태로 사용됩니다.

```http
Cache-Control: public
```

`public` 디렉티브는 응답 값을 프록시 캐시와 같은 공용 캐시에 저장될 수 있게 합니다.

인증이 필요한 경우 브라우저는 `Authorization` 헤더와 함께 요청을 보냅니다. 인증을 통해 권한이 있는 사용자만 접근을 할 수 있게 제한하기 때문에 `Authorization` 헤더가 포함된 요청에 대한 응답은 일반적으로 캐시에 저장되지 않아야 합니다. 하지만 `public` 디렉티브를 사용하면 `Authorization` 헤더를 포함한 요청에 대한 응답 값도 캐시 하게 됩니다.

`s-maxage` 디렉티브와 `must-revalidate` 디렉티브도 `public` 디렉티브와 동일하게 `Authorization` 헤더를 포함한 요청에 대한 응답 값도 캐시 하기 때문에, `s-maxage` 디렉티브와 `must-revalidate` 디렉티브를 사용한다면 `public` 디렉티브를 함께 사용하지 않아도 됩니다.

### `must-understand`
`must-understand` 디렉티브는 fallback 동작을 위해 보통 아래 코드와 같이 `no-store` 디렉티브와 함께 사용됩니다.

```http
Cache-Control: must-understand, no-store
```

[RFC-2616의 6.1.1 섹션](https://www.rfc-editor.org/rfc/rfc2616#section-6.1.1)을 살펴보면, HTTP의 상태 코드(2xx, 4xx, 5xx 등..)은 커스텀이 가능합니다. `must-understand` 디렉티브는 상태 코드를 캐시가 이해할 수 있다면 캐시로 저장합니다. 하지만 상태 코드가 커스텀 되어 캐시가 커스텀 된 상태 코드를 이해하지 못한다면 캐시로 저장하지 않습니다.

위의 코드와 같이 `must-understand` 디렉티브와 `no-store` 디렉티브가 함께 작성되었다면, 캐시가 `must-understand`를 지원하지 않을 경우, `no-store` 형태로 캐시가 동작하고, `must-understand`를 지원할 경우, 캐시가 상태 코드를 이해할 수 있다면 캐시로 저장하고 이해하지 못하면 캐시로 저장하지 않습니다.

### `no-transform`
`no-transform` 디렉티브는 아래와 같은 형태로 사용됩니다.

```http
Cache-Control: no-transform
```

일부 프록시 캐시는 전송량을 줄이기 위해서 이미지를 변환할 수 있습니다. `no-transform`는 응답 내용을 변환하지 않도록 하는 디렉티브입니다.

### `immutable`
`immutable` 디렉티브는 아래와 같은 형태로 사용됩니다.

```http
Cache-Control: max-age=604800, immutable
```

웹 브라우저는 `max-age` 디렉티브가 설정되어 있어도 페이지를 새로고침 할 때 조건부 요청(`If-None-match` 헤더 나 `If-Modified-Since` 헤더를 포함한 요청)을 보내 캐시 검증을 진행합니다. `immutable` 디렉티브는 `max-age`가 있으면 페이지를 새로고침 하더라도 `max-age` 조건에 맞다면 파일이 변하지 않았을 것이라 확신하고 조건부 요청을 보내지 않습니다.

변경되지 않은 정적 리소스의 경우 브라우저가 새로고침 되었더라도 정적 리소스는 수정되지 않기 때문에 조건부 요청은 불필요합니다. 이런 경우 사용할 수 있는 디렉티브가 `immutable`입니다. 만약 정적 리소스가 수정이 될 경우, 아래 코드와 같이 버전이나 해시 값을 URL에 포함하여 최신 버전으로 리소스를 업데이트 할 수 있게 합니다.

```html
<script src="https://beomy.github.io/static-resource.0.0.0.js"></script>
```

이러한 형태를 캐시 무효화 패턴(Cache-busting pattern)이라고 합니다.

### `stale-while-revalidate`
`stale-while-revalidate` 디렉티브는 캐시의 유효성을 확인하는 동안에 오래된 응답(stale response) 값을 재사용할 수 있게 하는 디렉티브입니다. 아래와 같은 형태로 사용됩니다.

```http
Cache-Control: max-age=604800, stale-while-revalidate=86400
```

위의 코드는 7일(604800초) 동안 캐시가 신선한 상태입니다. 7일 후에는 캐시가 신선하지 않아 재검사를 해야 하는데, 하루(86400초) 동안에는 요청이 오면 오래된 캐시를 재사용하여 응답하고 동시에 재검사를 진행하여 캐시를 업데이트 합니다.

예를 들어 클라이언트의 요청에 응답으로 원 서버가 `Cache-Control: max-age=1, stale-while-revalidate=59`와 같이 캐시에게 응답을 보낼 경우 캐시는 아래와 같이 동작합니다.

- HTTP 요청이 1초 내에 반복적으로 발생할 경우: 별도의 검증 없이 그대로 캐시 된 값을 응답합니다.
- HTTP 요청이 1 ~ 60초 사이에 반복적으로 발생할 경우: 캐시 된 값은 오래되었지만 캐시 된 값을 응답합니다. 동시에 재검사를 통해 캐시를 새로운 값으로 업데이트 합니다.
- HTTP 요청이 60초 이후로 발생할 경우: 원 서버로 요청을 보냅니다.


### `stale-if-error`
`stale-if-error` 디렉티브는 원본 서버가 에러(500, 502, 503, 504 에러) 응답을 보냈을 때 오래된 응답 값을 재사용할 수 있게 하는 디렉티브 입니다. 아래와 같은 형태로 사용됩니다.

```http
Cache-Control: max-age=604800, stale-if-error=86400
```

위의 코드는 7일(604800초) 동안 캐시가 신선한 상태입니다. 7일 후에는 캐시가 신선하지 않지만 서버가 에러를 응답한다면 하루(86400초) 동안 오래된 캐시를 재사용합니다. 하루가 지나면 원본 서버가 에러 응답을 보내면 클라이언트는 있는 그대로 에러 응답을 받게 됩니다.

## 요청에서 사용되는 디렉티브
요청 메시지에서 사용할 수 있는 `Cache-Control` 디렉티브를 살펴보겠습니다.

### `no-cache`
`no-cache` 디렉티브는 아래와 같은 형태로 사용됩니다.

```http
Cache-Control: no-cache
```

요청 메시지에서 사용되는 `no-cache` 디렉티브는 신선한 캐시가 있더라도 최신 응답을 받기 위해 사용됩니다. 브라우저는 일반적으로 강력 새로 고침을 할 경우 `no-cache` 디렉티브를 사용한 요청을 서버에 보내게 됩니다.

### `no-store`
`no-store` 디렉티브는 아래와 같은 형태로 사용됩니다.

```http
Cache-Control: no-store
```

`no-store` 디렉티브를 요청 메시지에서 사용하면 캐시가 해당 요청 및 응답을 저장하지 않게 됩니다.

### `max-age`
`max-age` 디렉티브는 아래와 같은 형태로 사용됩니다.

```http
Cache-Control: max-age=3600
```

요청 메시지에서 사용되는 `max-age` 디렉티브는 N(0 이상의 정수)초 내에 원본 서버에서 생성된 응답을 받기 위해 사용됩니다.

### `max-stale`
`max-stale` 디렉티브는 아래와 같은 형태로 사용됩니다.

```http
Cache-Control: max-stale=3600
```

`max-stale` 디렉티브는 N초 이내에 오래된 캐시를 받을 수 있게 하는 디렉티브입니다. `max-stale`에 초를 지정하지 않으면 모든 오래된 캐시를 재사용할 수 있습니다.

### `min-fresh`
`min-fresh` 디렉티브는 아래와 같은 형태로 사용됩니다.

```http
Cache-Control: min-fresh=600
```

`min-fresh` 디렉티브는 N초 동안 신선한 상태로 유지 될 수 있는 캐시를 받을 수 있게 하는 디렉티브입니다.

예를 들어 클라이언트의 `Cache-Control: min-fresh=600`가 포함된 요청에 응답으로 원 서버가 `Cache-Control: max-age=3600`와 같이 캐시에 응답을 보낼 경우 51분 후 부터는 캐시 된 값을 클라이언트로 전달하지 못하게 됩니다.

### `no-transform`
`no-transform` 디렉티브는 아래와 같은 형태로 사용됩니다.

```http
Cache-Control: no-transform
```

요청에서 사용되는 것과 동일한 기능을 가집니다.

### `only-if-cached`
`only-if-cached` 디렉티브는 아래와 같은 형태로 사용됩니다.

```http
Cache-Control: only-if-cached
```

`only-if-cached` 디렉티브는 이미 캐시 된 값만 받기 위해 사용됩니다. 요청에 일치되는 캐시 된 값이 있다면 캐시 된 값을 재사용하고 캐시 된 값이 없다면 `504 Gateway Timeout`으로 응답합니다.

#### 참고
- [https://developer.mozilla.org/ko/docs/Web/HTTP/Caching](https://developer.mozilla.org/ko/docs/Web/HTTP/Caching)
- [https://pjh3749.tistory.com/264](https://pjh3749.tistory.com/264)
- [https://toss.tech/article/smart-web-service-cache](https://toss.tech/article/smart-web-service-cache)
- [https://hahahoho5915.tistory.com/33](https://hahahoho5915.tistory.com/33)
- [https://withbundo.blogspot.com/2017/07/http-13-http-iii-if-match-if-modified.html](https://withbundo.blogspot.com/2017/07/http-13-http-iii-if-match-if-modified.html)
- [https://web.dev/i18n/ko/http-cache/](https://web.dev/i18n/ko/http-cache/)
- [https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control)
- [https://developer.mozilla.org/ko/docs/Web/HTTP/Headers/Age](https://developer.mozilla.org/ko/docs/Web/HTTP/Headers/Age)
- [https://www.rfc-editor.org/rfc/rfc2616#section-6.1.1](https://www.rfc-editor.org/rfc/rfc2616#section-6.1.1)
- [https://tech.ssut.me/cache-optimization-using-cache-control-immutable/](https://tech.ssut.me/cache-optimization-using-cache-control-immutable/)
- [https://www.rfc-editor.org/rfc/rfc7234#section-5.2.1](https://www.rfc-editor.org/rfc/rfc7234#section-5.2.1)
