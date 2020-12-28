---
layout: post
title: '[ETC] XSRF와 XSS'
featured-img: browser/cors.png
category: [tech, etc]
summary: XSRF와 XSS에 대해 살펴보도록 하겠습니다.
---

# XSRF(Crose-Site Request Forgery)
사이트 간 요청 위조(XSRF 또는 CSRF라고 함)는 웹사이트 취약점 공격 중 하나입니다. 사용자가 자신의 의지와 무관하게 공격자가 의도한 행위(수정, 삭제, 등록 등)를 특정 웹사이트에 요청하게 하는 공격입니다.

## 취약점
사이트 간 요청 위조는 특정 웹사이트가 사용자의 웹 브라우저를 신뢰하는 상태를 노린 공격입니다. 사용자가 웹사이트에 로그인한 상태에서 사이트간 요청 위조 공격 코드가 삽입된 페이지를 열면, 공격 대상이 되는 웹사이트는 위조된 공격 명령이 믿을 수 있는 사용자로부터 발송된 것으로 판단하게 되어 공격에 노출됩니다.

## 공격 과정
조금 더 구체적인 공격 과정을 아래와 같습니다.

1. 이용자는 웹사이트에 로그인하여 정상적인 쿠키를 발급받는다.
2. 공격자는 링크(예를 들어, `http://www.geocities.com/attacker`와 같은)를 이메일이나 게시판 등의 경로를 통해 이용자에게 전달한다.
3. 위의 링크의 HTML 페이지는 `<img src= "https://travel.service.com/travel_update?.src=Korea&.dst=Hell">` 같은 이미지 태그를 가집니다. 이 링크는 출발지와 도착지를 등록하기 위한 링크인데, 그 중 도착지 정보를 변조한 링크입니다.

### 공격 예제

## 대응방법

# XSS(Cross-Site Scripting)

## 취약점

## 공격 유형

### 비 지속적(Non-persistent) 기법

### 지속적(persistent) 기법

## 공격 과정

## 대응방법

#### 참고
- [https://ko.wikipedia.org/wiki/사이트_간_스크립팅](https://ko.wikipedia.org/wiki/사이트_간_스크립팅)
- [https://ko.wikipedia.org/wiki/사이트_간_요청_위조](https://ko.wikipedia.org/wiki/사이트_간_요청_위조)
- [https://ohgyun.com/543](https://ohgyun.com/543)
