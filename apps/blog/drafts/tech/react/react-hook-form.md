---
layout: post
title: '[React] react-hook-form으로 폼 관리하기'
featured-img: react/react.png
category: [tech, react]
summary: FrontEnd 개발을 하다보면 사용자 입력을 받고 입력 받은 값을 검증하는데에 많은 시간을 쓰게 됩니다. React Hook Form은 사용자 입력을 받고 검증하는 것을 도와 주는 라이브러리로 React Hook Form을 사용하면 사용자에게 입력을 받고 검증하는데 드는 비용을 줄일 뿐만 아니라 더불어 성능까지 챙겨 갈 수 있습니다.
---

FrontEnd 개발을 하다보면 사용자 입력을 받고 입력 받은 값을 검증하는데에 많은 시간을 쓰게 됩니다. React Hook Form은 사용자 입력을 받고 검증하는 것을 도와 주는 라이브러리로 React Hook Form을 사용하면 사용자에게 입력을 받고 검증하는데 드는 비용을 줄일 뿐만 아니라 더불어 성능까지 챙겨 갈 수 있습니다. 이번 포스트에서는 React Hook Form에 대해서 살펴보도록 하겠습니다.

## React Hook Form의 콘셉트
- DX: Less code
- HTML standard
- Super Light
- Performance: uncontrolled 성능, Isolate Re-renders, Subscriptions
- Adoptable
- UX

- uncontrolled: 성능
- 다른 종속성이 필요없는 작고 가벼움

> Uncontrolled와 Controlled
>
> - https://react.dev/learn/sharing-state-between-components#controlled-and-uncontrolled-components

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
