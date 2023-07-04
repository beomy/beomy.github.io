---
layout: post
title: '[React] react-hook-form으로 폼 관리하기'
featured-img: react/react.png
category: [tech, react]
summary: FrontEnd 개발을 하다보면 사용자 입력을 받고 입력 받은 값을 검증하는데에 많은 시간을 쓰게 됩니다. React Hook Form은 사용자 입력을 받고 검증하는 것을 도와 주는 라이브러리로 사용자에게 입력을 받고 검증하는데 드는 시간을 줄일 뿐만 아니라 더불어 성능까지 두 마리 토끼를 모두 잡을 수 있습니다.
---

FrontEnd 개발을 하다보면 사용자 입력을 받고 입력 받은 값을 검증하는데에 많은 시간을 쓰게 됩니다. React Hook Form은 사용자 입력을 받고 검증하는 것을 도와주는 라이브러리로 사용자에게 입력을 받고 검증하는데 드는 시간을 줄일 뿐만 아니라 더불어 성능까지 두 마리 토끼를 모두 잡을 수 있습니다. 이번 포스트에서는 React Hook Form에 대해서 살펴보도록 하겠습니다.

## React Hook Form의 특징
React Hook Form의 공식 문서를 보면 아래와 같이 6가지의 특징을 이야기 하고 있습니다.

- DX: 직관적인 형태를 제공하고, 코드를 조금만 작성하면 되기 때문에 좋은 개발 경험을 제공합니다.
- HTML standard: 기존의 HTML을 활용하여 유효성 검사를 합니다.
- Super Light:
- Performance: uncontrolled 성능, Isolate Re-renders, Subscriptions
- Adoptable
- UX

> Uncontrolled와 Controlled
>
> - https://react.dev/learn/sharing-state-between-components#controlled-and-uncontrolled-components

- uncontrolled: 성능
- 다른 종속성이 필요없는 작고 가벼움

## 퀵스타트

```bash
npm i react-hook-form
# or
pnpm add react-hook-form
# or
yarn add react-hook-form
```

```tsx
// 간단한 예제
```

## 사용자 입력 다루기

### `register`

#### 컴포넌트의 `ref`

### `Controller`

#### Controlled Component

### 에러 핸들링

### 유효성 검증
- @hookform/resolvers

## API Reference

### useForm
~~간단한 예제~~

#### props
- mode
- reValidateMode
- defaultValues
- resolver
- context
- shouldFocusError
- shouldUnregister
- criteriaMode

#### returns
- watch
- getValues
- getFieldState
- setError
- clearErrors
- setValue
- trigger
- formState
- resetField
- reset
- handleSubmit
- unregister
- control
- register
- setFocus

### useController
~~간단한 예제~~

#### props
- name
- control
- defaultValue
- rules
- shouldUnregister

#### returns
- `field.onChange`
- `field.onBlur`
- `field.value`
- `field.name`
- `field.ref`
- `fieldState.invalid`
- `fieldState.isTouched`
- `fieldState.isDirty`
- `fieldState.error`
- `formState`

### useFormContext
- FormProvider

### useWatch
~~간단한 예제~~

#### props
- name
- control
- defaultValue
- disabled
- exact

#### returns

### useFormState

#### props
- control
- name
- disabled
- exact

#### returns
- `formState`

### ErrorMessage

### useFieldArray
- dynamic input

## 부록

### DevTools

##### 참고
- [https://www.react-hook-form.com/](https://www.react-hook-form.com/)
- [https://react.dev/learn/sharing-state-between-components#controlled-and-uncontrolled-components](https://react.dev/learn/sharing-state-between-components#controlled-and-uncontrolled-components)
