---
layout: post
title: '[ETC] HTTP/3'
featured-img: browser/cookie.png
category: [tech, etc]
summary: 
---

HTTP/0.9: GET 방식만 사용, 헤더 정보가 없었음
HTTP/1: 지금 형태의 단순한 TCP 방식
HTTP/1.1: 핸드쉐이킹 최소화를 위해 keep-alive 사용
HTTP/2: 헤더 필드 압축
HTTP/3: 핸드쉐이킹 등에 쓰이는 자원을 사용하지 않기 위해 UDP 사용, UDP는 통신만 담당하기 때문에 무결성을 보장하기 위한 코드가 추가된 QUIC를 사용

#### 참고
- [https://evan-moon.github.io/2019/10/08/what-is-http3/](https://evan-moon.github.io/2019/10/08/what-is-http3/)
- [https://ykarma1996.tistory.com/86](https://ykarma1996.tistory.com/86)
- [https://developers.google.com/web/fundamentals/performance/http2?hl=ko](https://developers.google.com/web/fundamentals/performance/http2?hl=ko)