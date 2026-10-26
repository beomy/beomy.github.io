---
layout: post
title: '[ETC] CloudFront + S3 정적 배포의 캐시 전략'
featured-img: etc/aws_logo.png
category: [tech, etc]
summary: CSR, SSG로 만든 정적 사이트를 S3에 올리고 CloudFront로 배포할 때 HTTP 캐시는 브라우저, CloudFront 엣지, S3 세 곳에서 서로 다른 규칙으로 동작합니다. 하나의 Cache-Control 헤더가 세 계층에 어떻게 읽히는지, 배포할 때 무엇을 무효화해야 하고 무효화가 닿지 않는 곳은 어디인지 살펴봅니다.
---

> **TL;DR**
>
> - 정적 배포의 캐시는 브라우저 캐시, CloudFront 엣지 캐시, S3 원본 세 계층입니다. S3는 캐시가 아니라 헤더를 정하는 곳이고, 헤더를 브라우저는 `max-age`로, CloudFront는 `s-maxage`로 나눠 읽습니다.
> - 파일 이름에 해시가 붙는 JS, CSS는 `public, max-age=31536000, immutable`로 1년 동안 캐시하고, 해시가 없는 HTML은 `public, max-age=0, s-maxage=86400`처럼 브라우저는 매번 재검증하고 CloudFront만 캐시하게 합니다.
> - `Cache-Control`은 S3 객체의 메타데이터라서 업로드할 때 붙여야 합니다. 헤더가 없으면 CloudFront는 기본 24시간, 브라우저는 `Last-Modified` 기준 휴리스틱으로 멋대로 캐시합니다.
> - CloudFront 무효화(invalidation)는 엣지 캐시만 비웁니다. 브라우저가 들고 있는 캐시에는 닿지 않기 때문에, 무효화가 필요한 파일은 처음부터 브라우저가 오래 들고 있으면 안 되는 파일(HTML)로 제한해야 합니다.
> - SPA에서 `/settings/profile` 같은 주소로 직접 들어왔을 때 `index.html`을 대신 내려 주는 폴백은, CloudFront 커스텀 에러 응답보다 CloudFront Function으로 요청 URI를 `/index.html`로 바꾸는 쪽이 낫습니다. 모든 라우트가 캐시 항목 하나를 공유해 배포 때 `/index.html`만 무효화하면 됩니다. SSG는 페이지마다 HTML이 있을 뿐 캐시 규칙은 같습니다.

[[ETC] HTTP 캐시](/tech/etc/http-caching) 포스트에서 `Cache-Control`의 디렉티브와 조건부 요청이 어떻게 동작하는지 하나씩 살펴보았습니다. 이번 포스트는 그 내용을 전제로, CSR이나 SSG로 빌드한 정적 파일을 S3에 올리고 CloudFront로 배포할 때 이 헤더들을 실제로 어떻게 조합하는지 이야기합니다. 디렉티브 하나하나의 의미보다, 같은 헤더가 브라우저와 CloudFront에서 서로 다르게 읽히는 지점과 배포할 때 무엇을 비워야 하는지에 초점을 맞추겠습니다.

## 세 계층의 캐시
정적 배포에서 요청은 브라우저 → CloudFront 엣지 → S3 순서로 흘러갑니다. 각 단계에서 캐시가 적중하면 그 뒤로는 요청이 가지 않습니다.

![브라우저 캐시, CloudFront 엣지 캐시, S3 원본의 역할](/assets/img/posts/etc/http_cache_layers.svg)

세 계층은 역할이 다릅니다.

- **브라우저 캐시**는 사용자 한 명의 개인 전용 캐시입니다. `max-age`로 신선도를 판단하고, 신선하지 않으면 `If-None-Match`나 `If-Modified-Since`로 조건부 요청을 보냅니다. S3는 `ETag`와 `Last-Modified`를 둘 다 내려 주므로 두 헤더가 함께 실리는데, 서버는 `If-None-Match`를 우선 평가하고 `If-Modified-Since`는 무시합니다. 서버 쪽에서 강제로 브라우저 캐시를 비울 방법은 없습니다.
- **CloudFront 엣지 캐시**는 여러 사용자가 공유하는 공용 캐시입니다. 전 세계 엣지 로케이션마다 따로 캐시를 가지고, 무효화(invalidation) 요청으로 강제로 비울 수 있습니다.
- **S3**는 캐시가 아니라 원본(origin)입니다. S3가 하는 일은 객체에 저장된 `Cache-Control` 메타데이터를 응답 헤더로 내려 주는 것이고, 그 헤더를 보고 위의 두 캐시가 각자 판단합니다.

결국 우리가 제어할 수 있는 것은 S3 객체에 어떤 `Cache-Control`을 붙이느냐, CloudFront의 TTL(Time To Live, 캐시에 저장된 응답을 신선하다고 보는 초 단위 시간) 범위를 어떻게 두느냐, 그리고 배포 때 무엇을 무효화하느냐 세 가지입니다. TTL이 남아 있는 동안은 원본에 묻지 않고 캐시된 응답을 그대로 쓰고, TTL이 지나면 원본에서 다시 가져오거나 재검증합니다. 하나씩 살펴보겠습니다.

## S3: 헤더를 정하는 곳
S3는 객체를 업로드할 때 함께 지정한 `Cache-Control`, `Content-Type` 같은 값을 객체 메타데이터로 저장했다가, 그 객체를 응답할 때 HTTP 헤더로 그대로 내려 줍니다. 즉 S3의 `Cache-Control`은 서버 설정이 아니라 **파일마다 붙어 있는 속성**입니다.

AWS CLI로 업로드할 때는 `--cache-control` 옵션으로 붙입니다. 파일 종류마다 다른 값을 붙여야 하기 때문에 보통 두 번에 나눠 올립니다.

```bash
# 1. 해시 파일: 1년 캐시 + immutable
aws s3 sync ./out s3://my-bucket \
  --exclude "*" --include "_next/static/*" \
  --cache-control "public, max-age=31536000, immutable"

# 2. HTML 등 나머지: 브라우저는 재검증, CloudFront는 하루 캐시
aws s3 sync ./out s3://my-bucket \
  --exclude "_next/static/*" \
  --cache-control "public, max-age=0, s-maxage=86400"
```

이때 두 가지를 주의해야 합니다.

1. **`s3 sync`는 내용이 같은 파일을 건너뜁니다.**\
   `sync`는 크기와 수정 시각을 비교해 바뀐 파일만 올리기 때문에, 이미 올라가 있는 파일의 `--cache-control`만 바꾸고 싶어도 적용되지 않습니다. 기존 객체의 메타데이터를 바꾸려면 `s3 cp`에 `--metadata-directive REPLACE`를 붙여 객체를 자기 자신으로 복사해야 합니다.
   ```bash
   aws s3 cp s3://my-bucket/index.html s3://my-bucket/index.html \
     --metadata-directive REPLACE \
     --cache-control "public, max-age=0, s-maxage=86400" \
     --content-type "text/html"
   ```
   `REPLACE`는 모든 메타데이터를 교체하기 때문에 `Content-Type`도 함께 다시 지정해야 합니다.
2. **헤더를 붙이지 않으면 아무것도 캐시되지 않는 게 아니라, 멋대로 캐시됩니다.**\
   S3는 `Cache-Control`이 없어도 `ETag`와 `Last-Modified`는 항상 내려 줍니다. `Cache-Control`도 `Expires`도 없는 응답을 받으면 CloudFront는 캐시 정책의 [기본 TTL](#ttl-결정-순서)(관리형 정책 `CachingOptimized`는 24시간)만큼 캐시하고, 브라우저는 [휴리스틱 캐싱](https://developer.mozilla.org/ko/docs/Web/HTTP/Guides/Caching#heuristic_caching)으로 `Date`와 `Last-Modified`의 차이 중 10% 정도를 신선하다고 간주합니다. 한 달 전에 올린 HTML을 아무 헤더 없이 배포했다면, 브라우저는 그 HTML을 3일 동안 서버에 물어보지도 않고 쓸 수 있습니다.

> **휴리스틱 캐싱(heuristic caching)이란?**
>
> 휴리스틱(heuristic)은 정확한 답을 계산할 수 없을 때 경험에 기반한 어림 규칙으로 판단하는 것을 말합니다. HTTP 캐시에서 휴리스틱 캐싱은 서버가 `Cache-Control`도 `Expires`도 보내지 않아 캐시 수명을 알 수 없을 때, 브라우저가 "오래전에 수정된 파일은 앞으로도 한동안 안 바뀔 것"이라고 가정하고 수명을 스스로 추정하는 동작입니다.
>
> 추정의 근거는 `Last-Modified` 헤더입니다. RFC 9111이 제안하고 Chrome, Firefox가 따르는 계산은 다음과 같습니다.
>
> ```
> 신선한 기간 = (Date - Last-Modified) × 0.1
> ```
>
> 30일 전에 수정된 파일이면 3일, 1년 전에 수정된 파일이면 약 36일 동안 서버에 묻지 않고 캐시를 씁니다. 수정 시각이 오래될수록 더 오래 캐시되기 때문에, 자주 바뀌지 않던 파일을 어느 날 고쳤을 때 가장 오래 반영이 안 됩니다. S3는 `Last-Modified`를 항상 내려 주기 때문에, `Cache-Control`을 붙이지 않은 파일은 캐시되지 않는 것이 아니라 브라우저가 스스로 추정한 기간만큼 캐시됩니다.

### S3가 만들어 주는 ETag
S3는 업로드한 객체의 MD5 해시를 `ETag`로 내려 줍니다(멀티파트 업로드나 KMS 암호화를 쓰면 MD5가 아닌 값이 됩니다). 빌드 결과가 바이트 단위로 같으면 `ETag`도 같기 때문에, 내용이 바뀌지 않은 HTML을 다시 배포해도 브라우저의 조건부 요청에는 304로 응답됩니다. 뒤에서 보겠지만 HTML을 `max-age=0`으로 두면 이 조건부 요청이 매 페이지 진입마다 발생합니다. 내용이 같을 때 304로 끝나면 헤더만 오가지만, 200이 오면 HTML 전체를 매번 다시 받으므로 체감 속도가 달라집니다.

> **MD5란?**
>
> MD5는 해시 함수입니다. 어떤 길이의 데이터를 넣어도 항상 16진수 32자리인 고정 길이 값을 돌려줍니다.
>
> ```bash
> echo -n "hello" | md5
> 5d41402abc4b2a76b9719d911017c592
> ```
>
> 입력이 같으면 출력도 같고, 입력이 한 바이트만 달라도 출력이 완전히 달라집니다. 그래서 파일 두 개를 처음부터 끝까지 비교하지 않고 32자리 값만 비교해서 "내용이 같은가"를 판단할 수 있습니다. S3가 객체의 MD5를 `ETag`로 쓰는 것도, 빌드 도구가 `main.3f2a1b.js`처럼 파일명에 내용 해시를 붙이는 것도 같은 원리입니다. 내용 해시(content hash)는 파일 내용으로 계산한 해시값이라, 내용이 바뀌면 파일 이름도 함께 바뀌고 내용이 같으면 다시 빌드해도 같은 이름이 나옵니다.

## CloudFront: 헤더를 다시 읽는 곳
CloudFront는 S3가 내려 준 `Cache-Control`을 두 가지 용도로 씁니다. 하나는 자기 엣지 캐시에 얼마나 보관할지 정하는 것이고, 다른 하나는 그 헤더를 그대로 브라우저에 전달하는 것입니다. 이 중 엣지 캐시의 보관 시간을 정하는 방식이 브라우저와 다릅니다.

### TTL 결정 순서
CloudFront가 객체를 엣지에 얼마나 보관할지는 캐시 정책(cache policy)의 최소·기본·최대 TTL과 원본 응답 헤더를 조합해 결정합니다.

> **캐시 정책과 `CachingOptimized`**
>
> 캐시 정책은 CloudFront 배포의 동작(cache behavior)마다 붙이는 설정 묶음입니다. TTL 범위를 얼마로 둘지, 캐시 키에 쿼리 문자열·헤더·쿠키를 넣을지, 압축을 켤지를 한곳에 모아 둡니다. 직접 만들 수도 있고, AWS가 흔한 용도별로 미리 만들어 둔 관리형 정책(managed cache policy)을 고를 수도 있습니다.
>
> `CachingOptimized`는 관리형 정책 중 정적 파일 배포용 기본값으로, 콘솔에서 S3 원본으로 배포를 만들면 기본으로 선택됩니다.
>
> | 항목 | 값 |
> | --- | --- |
> | 최소 TTL | 1초 |
> | 기본 TTL | 86400초 (24시간) |
> | 최대 TTL | 31536000초 (1년) |
> | 캐시 키 | URL 경로만 (쿼리 문자열·쿠키·헤더 미포함) |
> | 압축 | Gzip, Brotli 켬 |
>
> 최소 1초, 최대 1년이라 원본의 `Cache-Control`을 거의 그대로 따르고, 헤더가 없을 때만 24시간 기본값이 적용됩니다. 이 포스트에서 "헤더가 없으면 CloudFront는 24시간 캐시한다"고 하는 숫자가 여기서 나옵니다. 함께 자주 쓰는 관리형 정책으로는 모든 TTL이 0이라 캐시하지 않는 `CachingDisabled`(API 경로용)와, 압축만 끈 `CachingOptimizedForUncompressedObjects`(이미지처럼 이미 압축된 파일용)가 있습니다.

1. 원본 응답에 `Cache-Control: s-maxage`가 있으면 그 값을 씁니다. 공용 캐시 전용 디렉티브라 `max-age`보다 우선합니다.
2. 없으면 `Cache-Control: max-age`를 씁니다.
3. 둘 다 없으면 `Expires`를 씁니다.
4. 셋 다 없으면 캐시 정책의 **기본 TTL**을 씁니다.
5. 1~3에서 얻은 값은 **최소 TTL**과 **최대 TTL** 사이로 잘립니다. `max-age=31536000`을 보내도 최대 TTL이 하루면 하루만 캐시합니다.

여기서 `s-maxage`가 중요합니다. 브라우저는 `s-maxage`를 무시하고 `max-age`만 보고, CloudFront는 `s-maxage`가 있으면 `max-age`를 무시합니다. 그래서 헤더로 두 계층에 다른 TTL을 줄 수 있습니다.

```http
Cache-Control: public, max-age=0, s-maxage=86400
```

브라우저는 `max-age=0`으로 읽어 매번 재검증하고, CloudFront는 `s-maxage=86400`으로 읽어 하루 동안 엣지에서 바로 응답합니다. HTML처럼 "사용자는 항상 최신을 봐야 하지만 S3까지 매번 가고 싶지는 않은" 파일에 딱 맞는 조합입니다.

### `no-cache`, `no-store`, `private`과 최소 TTL
원본이 `Cache-Control: no-cache`, `no-store`, `private` 중 하나를 보내면 CloudFront는 캐시 정책의 최소 TTL이 0일 때만 이를 존중해서 캐시하지 않거나 매번 재검증합니다. 최소 TTL이 0보다 크면 이 디렉티브를 무시하고 최소 TTL만큼 캐시합니다. 최소 TTL을 올려 둔 정책에서는 `no-store`를 보내도 캐시되는 것을 보고 당황할 수 있습니다.

HTML에 `no-cache`를 붙이는 것은 생각보다 손해입니다. 브라우저가 매번 재검증하는 것은 의도한 대로지만, CloudFront도 캐시하지 않고 매 요청마다 S3에 다녀오기 때문입니다. 같은 효과를 내면서 CloudFront 캐시를 살리려면 `max-age=0, s-maxage=86400` 조합을 쓰는 것이 낫습니다. 브라우저에서는 `no-cache`와 거의 같게 동작하고, CloudFront는 하루 동안 엣지에서 응답합니다.

### 캐시 키
CloudFront는 요청을 캐시 키로 바꿔 엣지 캐시를 찾습니다. 기본 캐시 키는 호스트와 **URL 경로**이고, 쿼리 문자열, 쿠키, 헤더는 캐시 정책에서 포함하도록 설정한 것만 키에 들어갑니다. 정적 배포에서는 다음 두 가지를 주의해야 합니다.

- `/`와 `/index.html`은 서로 다른 캐시 키입니다. 기본 루트 객체(default root object)로 `index.html`을 지정해 두면 `/` 요청에 `index.html`이 응답되지만, 엣지에는 `/`라는 키로 따로 저장됩니다. 무효화할 때 `/index.html`만 비우면 `/`는 그대로 남습니다.
- 쿼리 문자열을 캐시 키에서 빼면 `/app.js?v=2`와 `/app.js?v=3`은 같은 캐시 항목입니다. 쿼리로 버전을 구분하는 캐시 무효화 패턴을 쓴다면 캐시 정책에서 쿼리 문자열을 키에 포함해야 합니다. 파일 이름에 해시를 넣는 방식이라면 이 문제가 없습니다.

### 압축과 ETag
S3에는 압축하지 않은 원본 파일만 올려 두고, 캐시 정책에서 Gzip과 Brotli 압축을 켜면 CloudFront가 S3에서 받은 파일을 엣지에서 압축해 브라우저에 내려 줍니다. 압축 파일을 따로 만들어 올릴 필요가 없습니다.

브라우저는 요청에 `Accept-Encoding: gzip, br`처럼 자기가 풀 수 있는 압축 방식을 알립니다. 브라우저마다 지원하는 방식이 다르므로 CloudFront는 Brotli 버전, Gzip 버전, 비압축 버전을 따로 캐시해야 하고, 그래서 `Accept-Encoding` 값이 캐시 키에 들어갑니다. 다만 브라우저가 보내는 값이 `gzip, deflate, br`, `br;q=1.0, gzip;q=0.8`처럼 제각각이라, CloudFront는 이를 `br,gzip`, `br`, `gzip`, 미지원 네 가지로 정규화해 캐시 항목이 불필요하게 늘지 않게 합니다.

압축을 켜면 `ETag`가 바뀌어 보입니다. S3가 주는 `ETag`는 원본 바이트의 MD5라 강한 ETag인데, CloudFront가 압축하면 브라우저가 받는 바이트는 원본과 달라지므로 더 이상 "바이트 단위로 같다"고 이야기할 수 없습니다. 그래서 CloudFront는 `W/`를 붙여 약한 ETag로 바꿔 내려 줍니다. 값 자체는 그대로라 `If-None-Match` 재검증은 정상적으로 304가 나옵니다.

> **강한 ETag와 약한 ETag**
>
> `ETag`는 응답 본문의 버전을 나타내는 식별자이고, 두 종류가 있습니다.
>
> - **강한 ETag** `"abc"` 형태입니다. 같은 `ETag`면 두 응답이 바이트 단위로 완전히 같다는 뜻입니다. 전체 비교뿐 아니라, 끊긴 다운로드를 이어받거나 동영상 중간부터 재생할 때처럼 파일의 일부 바이트 구간만 요청하는 `Range` 요청에서도 쓸 수 있습니다.
> - **약한 ETag** `W/"abc"` 형태입니다. 바이트는 다를 수 있지만 의미상 같은 응답이라는 뜻입니다. 압축 방식이 다르거나, 본문 안의 공백·광고·타임스탬프만 다른 경우처럼 "사용자에게는 같은 내용"일 때 씁니다.
>
> `If-None-Match` 재검증은 두 종류 모두 쓸 수 있고, 값이 같으면 304로 응답합니다. 차이가 나는 곳은 `Range` 요청입니다. 앞부분을 받은 뒤 파일이 바뀌면 조각을 이어 붙여도 깨진 파일이 되므로, 이어받기에는 바이트 단위로 같다는 보장이 있는 강한 ETag만 인정됩니다.

## 브라우저: 무효화가 닿지 않는 곳
CloudFront 캐시는 무효화로 비울 수 있지만, 브라우저 캐시는 서버 쪽에서 비울 방법이 없습니다. 그래서 정적 배포의 캐시 전략은 "배포 후 브라우저 캐시를 어떻게 비울까"가 아니라 "브라우저가 오래 들고 있어도 되는 파일만 오래 캐시하게 하자"는 방향으로 짜게 됩니다.

![무효화 이후 CloudFront 와 브라우저의 상태](/assets/img/posts/etc/http_cache_invalidation_timeline.svg)

예를 들어 HTML에 `max-age=3600`을 붙여 배포했다고 하겠습니다. 배포 직후 CloudFront를 무효화해도, 배포 전 1시간 안에 그 HTML을 받은 사용자의 브라우저는 남은 시간 동안 서버에 묻지 않고 들고 있던 이전 HTML을 그대로 씁니다. 이전 HTML은 이전 해시의 JS를 가리키므로, 무효화로 엣지 캐시가 비워진 데다 S3에서도 그 JS를 지웠다면 받아 올 곳이 없어 화면이 깨집니다. HTML에 `max-age=0`을 붙였다면 브라우저는 페이지에 들어갈 때마다 CloudFront에 재검증을 보내고, 무효화가 끝난 뒤라면 새 HTML을 받습니다.

브라우저 캐시는 비울 수 없으니, **브라우저가 오래 들고 있어도 되는 파일과 그렇지 않은 파일을 URL로 구분하여 배포**해야 합니다.

- URL에 내용 해시가 들어 있는 파일(`main.3f2a1b.js`, `_next/static/chunks/...`)은 내용이 바뀌면 URL도 바뀝니다. 같은 URL의 내용이 바뀔 일이 없으니 브라우저가 1년을 들고 있어도 됩니다. 그래서 `max-age=31536000, immutable`을 붙입니다.
- URL이 고정된 파일(`index.html`, `about/index.html`, `favicon.ico`, `robots.txt`)은 같은 URL로 내용이 바뀝니다. 브라우저가 들고 있으면 안 되거나 짧게만 들고 있어야 합니다. HTML처럼 항상 최신이어야 하는 파일은 `max-age=0, s-maxage=86400`으로 브라우저는 매번 재검증하게 하고, `favicon.ico`처럼 조금 늦게 반영돼도 괜찮은 파일은 `max-age=86400` 정도로 짧게 둡니다.

### 새로고침과 `immutable`
사용자가 새로고침을 누르면 브라우저는 `max-age`가 남아 있어도 HTML 요청에 `Cache-Control: max-age=0`을 붙여 재검증합니다. 과거에는 그 HTML이 불러오는 JS, CSS, 이미지까지 전부 재검증해서 새로고침 한 번에 수백 개의 조건부 요청이 나갔고, 이를 막기 위해 `immutable`이 생겼습니다. 지금 Chrome은 새로고침 때 `max-age`가 남은 JS, CSS는 재검증하지 않도록 바뀌어서 `immutable`이 없어도 비슷하게 동작하지만, Firefox와 Safari는 `immutable`을 보고 판단합니다. 해시 파일에는 습관처럼 붙여 두는 것이 좋습니다. 강력 새로고침(Shift + 새로고침)은 `immutable`과 무관하게 모두 다시 받습니다.

### 뒤로 가기와 bfcache
사용자가 A 페이지에서 링크를 눌러 B로 이동하면, 브라우저는 그 순간 A 페이지를 통째로 메모리에 보관해 둡니다. 그리고 B에서 뒤로 가기를 눌러 A로 돌아오면 보관해 둔 A를 떠나기 직전 상태 그대로 다시 보여 줍니다. 이것을 bfcache(back/forward cache)라고 합니다. HTTP 캐시가 HTML, JS, 이미지를 파일 단위로 보관한다면, bfcache는 DOM과 JS 상태, 스크롤 위치까지 포함한 페이지 전체의 스냅샷을 보관합니다. 복원할 때 네트워크 요청이 전혀 나가지 않기 때문에 `max-age=0`이든 `no-cache`든 영향을 주지 못합니다. 배포 직후 뒤로 가기로 돌아온 사용자가 이전 화면을 보는 것은 HTTP 캐시 설정으로는 막을 수 없습니다. `no-store`를 붙이면 그 페이지는 원칙적으로 bfcache 대상에서 빠지지만(최근 Chrome은 일부 조건에서 `no-store` 페이지도 bfcache에 넣습니다), 그만큼 뒤로 가기가 느려지므로 HTML에는 권하지 않습니다.

## CloudFront 무효화
무효화는 엣지 캐시에서 지정한 경로의 객체를 지우는 요청입니다. 지운 뒤 다음 요청이 오면 S3에서 새로 가져옵니다.

```bash
aws cloudfront create-invalidation \
  --distribution-id E1234567890ABC \
  --paths "/index.html" "/" "/about/*"
```

알아 둘 규칙은 다음과 같습니다.

- 경로는 캐시 키 기준입니다. 앞에서 본 대로 `/`와 `/index.html`은 따로 지워야 합니다. 와일드카드 `*`는 경로 끝에만 쓸 수 있고 `/*`는 전체를 비웁니다.
- 쿼리 문자열을 캐시 키에 포함했다면 `/app.js`만 무효화해도 `/app.js?v=2`는 남습니다. `/app.js*`로 지웁니다.
- 매달 1,000개 경로까지 무료이고 그 이상은 경로당 과금됩니다. `/*` 하나도 경로 1개로 셉니다. 파일 100개를 나열하는 것보다 `/*` 한 번이 저렴합니다.
- 요청은 보통 수십 초에서 몇 분 안에 전 세계 엣지에 반영됩니다. 배포 파이프라인에서 완료를 기다리려면 `aws cloudfront wait invalidation-completed`를 씁니다.
- 동시에 진행 중일 수 있는 무효화 수에 한도가 있습니다. 배포마다 수천 개 경로를 나열하기보다 `/*`나 디렉터리 와일드카드로 묶습니다.

무효화는 CloudFront만 비우고 브라우저에는 닿지 않습니다. 따라서 **무효화로 갱신해야 하는 파일은 애초에 브라우저가 오래 들고 있지 않는 파일**(HTML)이어야 합니다. 해시 파일은 URL이 바뀌므로 무효화가 필요하지 않지만, `/*`에 휩쓸려 함께 지워져도 다음 요청 때 S3에서 같은 내용을 한 번 더 가져올 뿐이라 문제가 되지 않습니다. HTML 경로만 골라 나열하는 것보다 `/*` 한 번이 관리하기 쉽고 비용도 적습니다. 정리하면 "해시 파일은 `immutable`, 나머지는 `max-age=0, s-maxage=...`로 올리고 배포 때 `/*` 무효화"라는 전략이 됩니다.

AWS 문서는 무효화보다 파일 이름에 버전을 넣는 방식을 권합니다. 무효화는 비용과 전파 시간이 들고, 전파가 끝나기 전까지 엣지마다 다른 버전이 섞일 수 있기 때문입니다. HTML처럼 URL을 바꿀 수 없는 파일에만 무효화를 쓰고, 나머지는 URL을 바꾸는 것이 기본입니다. 이때 URL을 바꾸는 방법은 쿼리 문자열에 버전을 붙이는 것보다 파일 이름에 내용 해시를 넣는 것이 좋습니다.

> **쿼리 문자열 버전과 파일 이름 해시**
>
> URL을 바꿔 캐시를 우회하는 방법은 두 가지입니다.
>
> - **쿼리 문자열 버전** `app.js?v=2`, `app.js?t=1718000000`처럼 파일 이름은 그대로 두고 쿼리에 버전이나 타임스탬프를 붙입니다.
> - **파일 이름 해시** `app.3f2a1b.js`처럼 파일 내용의 해시를 이름에 넣습니다. 빌드 도구가 자동으로 붙여 줍니다.
>
> 브라우저는 쿼리 문자열까지 포함한 URL 전체를 캐시 키로 쓰기 때문에, 두 방법 모두 브라우저 캐시에는 효과가 있습니다. `app.js?v=1`을 1년 캐시하고 있어도 `app.js?v=2`는 처음 보는 URL이라 새로 요청합니다.
>
> 문제는 CloudFront입니다. 기본 캐시 정책은 쿼리 문자열을 캐시 키에서 빼기 때문에, 엣지에서는 `app.js?v=1`과 `app.js?v=2`가 모두 `app.js`라는 하나의 항목입니다. 브라우저가 `?v=2`로 새로 요청해도 엣지는 `?v=1` 때 저장한 이전 파일을 그대로 돌려주고 S3에는 가지 않습니다. 쿼리에 타임스탬프를 붙였는데도 배포가 반영되지 않는다면 이 문제일 수 있습니다. 쿼리 문자열을 캐시 키에 넣는 정책으로 바꾸면 해결되지만, 그러면 `?utm_source=...` 같은 무관한 쿼리마다 캐시 항목이 쪼개져 엣지 적중률이 떨어집니다.
>
> 타임스탬프는 또 다른 문제가 있습니다. 값이 빌드 시각이나 요청 시각이라 파일 내용과 무관하기 때문에, 내용이 바뀌지 않은 파일까지 모든 사용자가 다시 받습니다. 요청할 때마다 현재 시각을 넣는 방식이면 캐시가 아예 동작하지 않습니다. 파일 이름 해시는 내용이 바뀐 파일만 URL이 바뀌므로 이런 낭비가 없고, CloudFront 설정을 건드릴 필요도 없습니다.

## CSR(SPA)에서의 구성
CSR 앱은 HTML이 `index.html` 하나이고 나머지는 모두 해시 파일입니다. 캐시 규칙은 단순한데, 라우팅 폴백 때문에 CloudFront 쪽에 한 가지 결정이 필요합니다.

사용자가 주소창에 `/settings/profile`을 입력해 들어오면 CloudFront는 S3에 그 경로의 객체를 요청하지만, S3에는 `index.html`과 해시 파일뿐이라 그런 객체가 없습니다. S3 REST 엔드포인트를 OAC로 연결했다면 403이, 퍼블릭 버킷이면 404가 돌아옵니다. 이 에러 대신 `index.html`을 내려 주어야 클라이언트 라우터가 `/settings/profile`에 맞는 화면을 그릴 수 있습니다. 에러 대신 `index.html`을 내려 주는 방법은 두 가지입니다.

> **없는 파일에 403이 오는 이유**
>
> S3를 CloudFront 원본으로 연결하는 방식은 두 가지입니다.
>
> - **REST 엔드포인트 + OAC** S3 버킷에는 접근 주소가 두 개 있습니다. S3 API 주소인 REST 엔드포인트(`my-bucket.s3.ap-northeast-2.amazonaws.com`)와, 정적 웹 사이트 호스팅을 켜면 생기는 웹 사이트 엔드포인트(`my-bucket.s3-website.ap-northeast-2.amazonaws.com`)입니다. REST 엔드포인트 + OAC 구성은 REST 엔드포인트를 CloudFront 원본으로 지정하고, 버킷은 비공개로 둔 채 OAC로 CloudFront만 읽을 수 있게 합니다. 현재 권장되는 구성입니다.
> - **퍼블릭 버킷** 버킷 정책에서 모든 사용자에게 `s3:GetObject`를 허용해, 인증 없이 누구나 S3 주소로 직접 파일을 읽을 수 있게 열어 둔 버킷입니다. 이 상태로 CloudFront에 연결하면 CloudFront도 익명 요청으로 파일을 읽어 갑니다. 웹 사이트 엔드포인트는 OAC를 지원하지 않으므로, 웹 사이트 엔드포인트를 원본으로 쓰려면 버킷을 이렇게 퍼블릭으로 열어야 합니다.
>
> 없는 객체를 요청했을 때 퍼블릭 버킷은 404를 돌려주지만, OAC 구성은 403을 돌려줍니다. S3는 요청자에게 `s3:ListBucket` 권한이 없으면 없는 객체와 권한 없는 객체를 구분하지 않고 403으로 응답하는데, OAC 버킷 정책은 `s3:GetObject`만 허용하기 때문입니다. 그래서 커스텀 에러 응답은 404만 등록하면 OAC 구성에서 동작하지 않고, 403도 함께 등록해야 합니다.

> **OAC(Origin Access Control)란?**
>
> S3 버킷을 비공개로 둔 채 CloudFront만 읽을 수 있게 해 주는 CloudFront 기능입니다. 버킷을 그냥 공개하면 누구나 S3 주소로 직접 접근할 수 있어 CloudFront의 캐시와 보안 설정을 우회하게 되고, 비공개로 두면 CloudFront도 읽지 못합니다. OAC는 이 둘 사이를 메웁니다.
>
> 동작은 두 축으로 이뤄집니다. 버킷 정책에 "특정 CloudFront 배포에서 오는 요청만 `s3:GetObject`를 허용한다"고 적어 두고, CloudFront는 S3에 요청할 때마다 서명을 붙여 자기가 그 배포임을 증명합니다. 서명이 없는 요청, 즉 사용자가 S3 주소로 직접 접근하는 요청은 거부됩니다. 콘솔에서 OAC를 만들면 버킷 정책 문구도 함께 만들어 주므로 복사해 붙이면 됩니다.
>
> 예전에는 같은 목적으로 OAI(Origin Access Identity)를 썼습니다. OAC는 2022년에 나온 후속 기능으로 SSE-KMS로 암호화된 버킷과 모든 리전을 지원하며, AWS는 새 배포에 OAC를 권장합니다.

> **`s3:GetObject`와 `s3:ListBucket`**
>
> 둘 다 S3의 IAM 권한 이름입니다. 버킷 정책이나 IAM 정책에 "누가 어떤 동작을 할 수 있는가"를 적을 때 동작을 `s3:동작이름` 형태로 씁니다.
>
> | 권한 | 허용하는 동작 | 대상 |
> | --- | --- | --- |
> | `s3:GetObject` | 객체 하나를 읽기 (다운로드) | 객체 (`arn:aws:s3:::my-bucket/*`) |
> | `s3:ListBucket` | 버킷 안에 어떤 객체가 있는지 목록 조회 | 버킷 (`arn:aws:s3:::my-bucket`) |
>
> `s3:GetObject`가 이름을 아는 파일 하나를 꺼내 볼 권한이라면, `s3:ListBucket`은 어떤 파일들이 들어 있는지 훑어볼 권한입니다. 없는 파일에 404를 돌려주는 것은 "그런 이름의 파일은 없다"는 정보를 주는 셈이고, 이름을 하나씩 찍어 보면 뭐가 있고 없는지 알아낼 수 있으므로 S3는 이를 목록 조회와 같은 급으로 봅니다. 그래서 `s3:ListBucket`이 있을 때만 404를 주고, 없으면 403을 줍니다. OAC 버킷 정책에 `s3:ListBucket`을 추가하면 없는 파일에 404가 오게 할 수도 있습니다.

### 커스텀 에러 응답
CloudFront 배포 설정에서 403과 404를 `/index.html`, 응답 코드 200으로 바꾸는 방식입니다. 설정이 간단하지만 캐시 관점에서는 두 가지가 걸립니다.

- 이 응답은 "에러를 바꿔 치기한 것"이라 캐시 키가 `/settings/profile` 같은 원래 경로마다 따로 생깁니다. `index.html`을 배포했을 때 `/index.html`만 무효화하면 `/settings/profile`로 캐시된 이전 `index.html`은 남습니다. `/*`로 비워야 합니다.
- 에러 응답은 캐시 정책의 TTL이 아니라 에러 캐싱 최소 TTL(기본 10초)을 따릅니다. 일반 페이지와 캐시 수명이 달라지고, S3에 존재하지 않는 모든 경로가 10초마다 S3에 다녀옵니다.

### CloudFront Function으로 URI 재작성
뷰어 요청(viewer request) 단계의 CloudFront Function에서 확장자가 없는 경로를 `/index.html`로 바꾸는 방식입니다.

```js
function handler(event) {
  var request = event.request
  var uri = request.uri

  // 확장자가 없으면 SPA 라우트로 보고 index.html 로 보낸다
  if (!uri.includes('.')) {
    request.uri = '/index.html'
  }
  return request
}
```

CloudFront는 뷰어 요청 함수가 실행된 **뒤에** 캐시 키를 계산합니다. 그래서 `/settings/profile`도 `/about`도 모두 `/index.html`이라는 하나의 캐시 항목을 보고, 에러 응답이 아니라 정상 응답이라 S3 객체의 `Cache-Control`이 그대로 적용됩니다. 배포 때 `/index.html` 하나만 무효화하면 되고(루트 `/`도 `.`이 없어 `/index.html`로 바뀌므로 같은 항목에 합쳐집니다), 존재하지 않는 경로의 요청이 S3까지 가는 일도 없습니다. 설정에 조금 더 손이 가지만 캐시 동작을 예측하기 쉬워지므로, 커스텀 에러 응답보다 이 방식을 권합니다.

#### 정리하면

| 파일 | `Cache-Control` | 배포 시 |
| --- | --- | --- |
| `index.html` | `public, max-age=0, s-maxage=86400` | 무효화 |
| `assets/*.[hash].js`, `*.css` | `public, max-age=31536000, immutable` | 무효화 불필요 |
| `favicon.ico`, `robots.txt`, `manifest.json` | `public, max-age=86400` 정도 | 바뀌었을 때만 무효화, 하루는 이전 값 허용 |
| 해시 없는 이미지 | 바꾸지 않을 거면 길게, 바꿀 거면 파일명에 버전 | URL 변경으로 대응 |

`favicon.ico` 같은 파일에 `s-maxage`가 없는 것은 브라우저와 CloudFront에 같은 TTL을 줘도 되기 때문입니다. `s-maxage`는 HTML처럼 두 계층에 다른 TTL이 필요할 때만 씁니다. `s-maxage`가 없으면 CloudFront도 `max-age`를 읽으므로, `max-age=86400` 하나로 브라우저와 엣지 모두 하루 캐시가 됩니다.

## SSG에서의 구성
Next.js의 `output: 'export'`, Gatsby, Astro처럼 빌드 때 페이지마다 HTML을 만드는 SSG는 HTML이 여러 개라는 점만 다르고 규칙은 CSR과 같습니다. 이 블로그도 Next.js 정적 빌드 결과를 배포하고 있어서 `out/` 아래 구조를 예로 들겠습니다.

```
out/
  index.html
  about/index.html             ← trailingSlash: true 인 경우
  tech/etc/http-caching/index.html
  _next/static/chunks/*.js     ← 내용 해시
  _next/static/css/*.css       ← 내용 해시
  assets/img/...               ← 해시 없음
```

- `_next/static/` 아래는 Next.js가 내용 해시로 이름을 짓기 때문에 `immutable`입니다. Next.js를 서버로 직접 띄울 때도 이 경로에 같은 헤더를 붙이니 S3에서도 똑같이 맞추는 것입니다.
- HTML은 페이지 수만큼 있고 모두 URL이 고정이므로 `max-age=0, s-maxage=86400`으로 올리고 배포 때 `/*`로 무효화합니다. 페이지 하나만 고쳤더라도 공통 레이아웃이나 메뉴 데이터가 모든 HTML에 들어가므로 전체를 비우는 것이 안전합니다.
- `assets/img/` 같은 해시 없는 파일은 바꿀 일이 드물면 길게 두고, 바꿀 때는 파일 이름을 바꾸는 쪽이 낫습니다. 이미지는 보통 크기가 커서 재검증 비용보다 긴 캐시의 이득이 큽니다.

### 디렉터리 인덱스
S3 REST 엔드포인트는 `/about/` 요청에 `about/index.html`을 찾아 주지 않습니다. 기본 루트 객체는 `/`에만 적용됩니다. 그래서 SSG 배포에는 위의 SPA 폴백과 비슷한 CloudFront Function이 필요합니다.

```js
function handler(event) {
  var request = event.request
  var uri = request.uri

  if (uri.endsWith('/')) {
    request.uri += 'index.html'
  } else if (!uri.includes('.')) {
    request.uri += '/index.html'
  }
  return request
}
```

이 경우도 캐시 키는 재작성된 `/about/index.html`이 되므로, 무효화 경로를 생각할 때 원래 URL이 아니라 실제 객체 경로를 기준으로 하면 됩니다.

> **디렉터리 인덱스를 S3의 정적 웹 사이트 호스팅에 맡기지 않는 이유**
>
> 디렉터리 인덱스를 처리하는 방법은 두 가지입니다.
>
> | 방법 | `index.html`을 찾아 주는 주체 | 버킷 | CloudFront와 S3 사이 |
> | --- | --- | --- | --- |
> | 웹 사이트 엔드포인트 | S3의 정적 웹 사이트 호스팅 기능 | 퍼블릭으로 열어야 함 | HTTP |
> | REST 엔드포인트 + OAC | CloudFront Function | 비공개 | HTTPS |
>
> S3의 정적 웹 사이트 호스팅 기능도 디렉터리 인덱스를 처리해 주지만, 웹 사이트 엔드포인트는 OAC를 지원하지 않아 버킷을 퍼블릭으로 열어야 하고, HTTP만 지원해 CloudFront와 S3 사이가 암호화되지 않습니다. 그래서 최근에는 REST 엔드포인트 + OAC로 버킷을 비공개로 두고, S3가 해 주지 않는 `/about/` → `/about/index.html` 변환을 CloudFront Function이 대신하는 구성이 일반적입니다.

## 배포 순서
캐시 규칙을 잘 잡아도 배포 순서가 틀리면 잠깐 깨지는 구간이 생깁니다. 두 가지만 지키면 됩니다.

1. **해시 파일을 먼저, HTML을 나중에 올립니다.**\
   HTML을 먼저 올리면, 새 HTML은 이미 배포됐는데 그 HTML이 가리키는 새 JS는 아직 S3에 없는 구간이 생깁니다. 이 구간에 접속한 사용자는 JS를 받지 못해 빈 화면을 보게 됩니다. 해시 파일을 먼저 올리면 이전 HTML은 이전 JS를, 새 HTML은 새 JS를 가리키므로 어느 시점에 접속해도 깨지지 않습니다. 앞에서 `s3 sync`를 두 번으로 나눈 것도 이 순서를 지키기 위해서입니다.
2. **이전 해시 파일을 바로 지우지 않습니다.**\
   `aws s3 sync --delete`로 이전 빌드의 JS를 즉시 지우면, 배포 직전에 HTML을 받은 사용자가 그 HTML이 가리키는 이전 JS를 요청했을 때 S3에 없는 파일이라 실패합니다(OAC 구성이면 403, 퍼블릭 버킷이면 404). 특히 SPA에서 라우트 전환으로 지연 로드되는 청크는 몇 시간 뒤에 요청될 수 있습니다. 이전 빌드의 해시 파일은 며칠 뒤에 지우거나 S3 수명 주기 규칙으로 정리합니다.

전체 흐름은 다음과 같습니다.

```bash
# 1. 해시 파일 업로드 (immutable)
aws s3 sync ./out s3://my-bucket --exclude "*" --include "_next/static/*" \
  --cache-control "public, max-age=31536000, immutable"

# 2. 나머지 업로드 (브라우저 재검증, CloudFront 캐시)
aws s3 sync ./out s3://my-bucket --exclude "_next/static/*" \
  --cache-control "public, max-age=0, s-maxage=86400"

# 3. CloudFront 엣지 비우기
INVALIDATION_ID=$(aws cloudfront create-invalidation \
  --distribution-id E1234567890ABC --paths "/*" \
  --query 'Invalidation.Id' --output text)
aws cloudfront wait invalidation-completed \
  --distribution-id E1234567890ABC --id "$INVALIDATION_ID"
```

## 캐시 동작 확인하기
설정한 대로 동작하는지는 응답 헤더와 개발자 도구로 확인할 수 있습니다. 브라우저 캐시와 CloudFront 캐시를 따로 봐야 합니다.

### 브라우저 캐시
Network 탭의 Size 열에 `(memory cache)`, `(disk cache)`로 브라우저 캐시 적중이 표시되고, Status 열의 304는 조건부 요청이 재검증을 통과한 것입니다. "Disable cache"를 켜 두면 브라우저 캐시를 완전히 우회하므로, 캐시 동작을 확인할 때는 꺼야 합니다.

### CloudFront 캐시
응답 헤더의 `X-Cache`로 엣지에서 적중했는지 알 수 있습니다.

| 값 | 의미 |
| --- | --- |
| `Hit from cloudfront` | 엣지 캐시로 응답 |
| `Miss from cloudfront` | 엣지에 없어 S3에서 가져옴 |
| `RefreshHit from cloudfront` | 엣지 캐시가 만료되어 S3에 재검증했더니 바뀌지 않아 그대로 사용 |
| `Error from cloudfront` | 원본 오류 응답 |

`Age` 헤더는 지금 내려받는 복사본이 S3에서 받아져 엣지 캐시에 저장된 뒤 몇 초나 지났는지를 알려 줍니다. 브라우저는 이 값을 보고 남은 수명을 계산합니다. 예를 들어 `max-age=86400`(하루)인 파일이 엣지에 6시간 머물다 내려왔다면 `Age: 21600`이 함께 오고, 브라우저는 "이미 6시간 지났으니 앞으로 18시간만 신선하다"고 판단합니다. 엣지 캐시에 오래 머문 복사본을 받을수록 브라우저가 재검증 없이 쓸 수 있는 시간은 그만큼 줄어듭니다.

## 전략이 깨지는 경우
위 구성이 기본이지만, 다음과 같은 경우에는 조정이 필요합니다.

- **`s-maxage`를 길게 두고 무효화를 잊은 경우**\
   배포 때마다 무효화하니 HTML의 `s-maxage`를 1년으로 길게 두어도 될 것 같지만, 무효화가 실패하거나 어떤 배포에서 무효화를 빠뜨리면 이전 HTML이 1년 동안 엣지에 남습니다. `s-maxage`는 무효화 없이도 그 시간이 지나면 저절로 갱신되는 안전장치이므로, 이전 HTML이 그만큼 더 보여도 괜찮은 수준인 하루 정도로 두는 것이 안전합니다.
- **CloudFront 응답 헤더 정책으로 덮어쓰는 경우**\
   S3 메타데이터 대신 CloudFront의 응답 헤더 정책(response headers policy)에서 `Cache-Control`을 지정할 수도 있습니다. 경로 패턴별로 캐시 동작(cache behavior)을 나누면 업로드 스크립트에 의존하지 않아 좋지만, 이 헤더는 **브라우저로 가는 응답에만** 붙고 CloudFront 자신의 TTL 계산에는 쓰이지 않습니다. CloudFront의 TTL은 여전히 S3의 헤더(또는 기본 TTL)를 따르므로 두 설정이 어긋나지 않게 맞춰야 합니다.
- **같은 URL로 내용을 바꾸는 이미지**\
   `/og.png`를 같은 이름으로 교체하는 경우입니다. 브라우저 캐시를 비울 수 없으니 `max-age`만큼은 이전 이미지가 보입니다. 교체가 잦다면 파일 이름에 버전을 넣고, 아니면 `max-age`를 짧게 두되 `stale-while-revalidate`를 붙여, 만료된 뒤에도 이전 이미지를 먼저 보여 주고 재검증은 뒤에서 하게 합니다.
- **API 응답**\
   CloudFront 배포 하나에 원본을 여러 개 등록하고 `/api/*`는 백엔드 서버로, 나머지는 S3로 보내도록 동작을 나누면 프론트엔드와 API를 같은 도메인으로 서비스할 수 있습니다. 다만 이렇게 하면 API 요청도 CloudFront를 거쳐 백엔드로 가기 때문에, API 응답이 엣지에 캐시되지 않도록 따로 설정해야 합니다. 정적 파일용 `CachingOptimized`를 그대로 두면 사용자 A가 호출한 `/api/me`의 응답이 엣지에 남아 사용자 B에게 그대로 돌아갈 수 있습니다. `/api/*` 동작에는 `CachingDisabled` 정책을 붙이고, 백엔드도 응답에 `Cache-Control: no-store`를 보내는 것이 안전합니다.

##### 참고
- [https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Expiration.html](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Expiration.html)
- [https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-the-cache-key.html](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-the-cache-key.html)
- [https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Invalidation.html](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Invalidation.html)
- [https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/ServingCompressedFiles.html](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/ServingCompressedFiles.html)
- [https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/HTTPStatusCodes.html](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/HTTPStatusCodes.html)
- [https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/cloudfront-functions.html](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/cloudfront-functions.html)
- [https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingMetadata.html](https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingMetadata.html)
- [https://developer.mozilla.org/ko/docs/Web/HTTP/Guides/Caching](https://developer.mozilla.org/ko/docs/Web/HTTP/Guides/Caching)
- [https://web.dev/articles/http-cache](https://web.dev/articles/http-cache)
- [https://web.dev/articles/bfcache](https://web.dev/articles/bfcache)
- [https://nextjs.org/docs/app/guides/static-exports](https://nextjs.org/docs/app/guides/static-exports)
- [https://nextjs.org/docs/app/api-reference/config/next-config-js/headers#cache-control](https://nextjs.org/docs/app/api-reference/config/next-config-js/headers#cache-control)
