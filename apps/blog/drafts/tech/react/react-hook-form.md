---
layout: post
title: '[React] react-hook-form으로 폼 관리하기'
featured-img: react/react-hook-form.png
category: [tech, react]
summary: FrontEnd 개발을 하다보면 사용자 입력을 받고 입력 받은 값을 검증하는데에 많은 시간을 쓰게 됩니다. React Hook Form은 사용자 입력을 받고 검증하는 것을 도와 주는 라이브러리로 사용자에게 입력을 받고 검증하는데 드는 시간을 줄일 뿐만 아니라 더불어 성능까지 두 마리 토끼를 모두 잡을 수 있습니다.
---

React Hook Form은 사용자 입력을 받고 검증하는 것을 도와 주는 라이브러리로 사용자에게 입력을 받고 검증하는데 드는 시간을 줄일 뿐만 아니라 더불어 성능까지 두 마리 토끼를 모두 잡을 수 있습니다. React Hook Form은 React에서 폼을 관리하는 가장 유명한 라이브러리 중 하나입니다.

React Hook Form의 장점 중 하나가 빠른 성능인데 다른 폼 관리 라이브러리와 비교하고 싶다면, [[React] react-hook-form, formik, rc-field-form 폼 관리 어떤걸로 해야 할까](/tech/react/form-libraries/)를 참고 부탁드립니다.

## React Hook Form 특징
[NPM 문서](https://www.npmjs.com/package/react-hook-form)와 [공식 문서](https://www.react-hook-form.com/)는 동일한 내용으로 React Hook Form의 특징을 이야기하고 있지만, 공식 문서와 NPM 문서를 함께 보면 React Hook Form을 이해하는데 도움이 될 것 같아 함께 살펴보도록 하겠습니다.

### NPM 문서에서 이야기하는 특징
NPM 문서에서는 아래와 같이 5가지 특징을 이야기합니다.

- **Built with performance, UX and DX in mind**: 성능, UX, DX를 고려하여 만들어졌습니다.
- **Embraces native HTML form validation**: 기존의 HTML을 사용하여 유효성 검사합니다.
- **Out of the box integration with UI libraries**: UI 라이브러리와 통합이 가능합니다.
- **Small size and no dependencies**: 작은 크기와 종속성이 필요 없습니다.
- **Support Yup, Zod, AJV, Superstruct, Joi and others**: Yup, Zod, AJV, Superstruct, Joi 등을 지원합니다.

### 공식 문서에서 이야기하는 특징
공식 문서에서는 아래와 같이 6가지 특징을 이야기합니다.

- **DX**: 직관적이고 완전한 형태의 API를 제공하여 개발자에게 좋은 개발 경험을 제공합니다.
- **HTML standard**: 기존의 HTML을 사용하며, 유효성 검사를 위한 API를 통해 유효성 검사를 진행합니다.
- **Super Light**: 패키지 크기가 작은 종속성이 없는 라이브러리입니다.
- **Performance**: 리렌더링 횟수와 검증 계산을 최소화하였으며 빠른 마운팅 속도를 제공합니다.
- **Adoptable**: 다른 UI 라이브러리를 함께 사용하기 쉽습니다.
- **UX**: 일관된 유효성 검사를 제공합니다.

### 특징을 요약해 보면
NPM 문서와 공식 문서에서 이야기하는 중요한 특징은 아래 3가지로 요약해 볼 수 있습니다.

- 기존의 HTML을 사용하는 크기가 작고 빠른 라이브러리입니다.
- UI 라이브러리와 함께 사용하기 쉬워 채택하기 쉬운 라이브러리입니다.
- Yup, Zod 등의 유효성 검사 라이브러리와 함께 사용가능하며 일관된 유효성 검사를 제공합니다.

## 퀵스타트
React Hook Form을 사용하기 위해서 아래 코드와 같이 패키지를 설치해 줍니다.

```bash
npm i react-hook-form
# or
pnpm add react-hook-form
# or
yarn add react-hook-form
```

React Hook Form이 설치가 되면 아래 코드와 같이 사용이 가능합니다.

<div>
<iframe src="https://codesandbox.io/embed/lingering-wave-tpcc4q?fontsize=14&hidenavigation=1&theme=dark"
style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
title="lingering-wave-tpcc4q"
allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>
</div>

## 사용자 입력 처리하기
React Hook Form에서 사용자의 입력 값을 처리하는 2가지 방법을 살펴보도록 하겠습니다.

### Uncontrolled의 경우
React Hook Form은 Uncontrolled 방식을 사용하는데, `register` 함수는 Uncontrolled 방식으로 React Hook Form을 사용하기 위한 기본적인 방식입니다. `register` 함수의 형태는 아래와 같습니다.

```ts
register: (name: string, RegisterOptions?) => ({ onChange, onBlur, name, ref });

type RegisterOptions = Partial<{
  required: Message | ValidationRule<boolean>;
  min: ValidationRule<number | string>;
  max: ValidationRule<number | string>;
  maxLength: ValidationRule<number | string>;
  minLength: ValidationRule<number | string>;
  pattern: ValidationRule<RegExp>;
  validate: Validate | Record<string, Validate>;
}>;

type Message = string;
type ValidationRule<TValidationValue> = TValidationValue | ValidationValueMessage<TValidationValue>;
type ValidationValueMessage<TValidationValue> = {
  value: TValidationValue;
  message: Message;
};
type Validate<TFieldValue, TFormValues> = (value: TFieldValue, formValues: TFormValues) => ValidateResult | Promise<ValidateResult>;
type ValidateResult = Message | Message[] | boolean | undefined;
```

`register` 함수는 아래와 같이 사용할 수 있습니다.

```tsx
import { useForm } from 'react-hook-form';

export default function App() {
  const { register } = useForm();
  return <input {...register('firstName')} />;
}
// or
export default function App() {
  const { register } = useForm();
  const { onChange, onBlur, name, ref } = register('firstName');
  return (
    <input
      onChange={onChange}
      onBlur={onBlur}
      name={name}
      ref={ref}
    />
  )
}
```

#### 커스텀 컴포넌트 대처하기
개발을 하다보면 HTML의 `<input />` 등을 매핑하는 커스텀 컴포넌트를 만든 후 커스텀 컴포넌트에 React Hook Form을 사용해야 할 때가 종종 있습니다. 이런 상황를 대처하는 2가지 방법을 살펴보도록 하겠습니다.

##### `register`를 props로 전달
커스텀 컴포넌트에서 `register` 함수를 사용하기 위해 `register` 함수와 `register` 함수에서 필요한 값을 props로 전달하는 방법입니다.

~~codesendbox~~

##### `forwardRef` 사용
`forwardRef`를 사용해서 커스텀 컴포넌트에서 사용하는 HTML의 `<input />`의 `ref`를 부모 컴포넌트로 전달하여 `register` 함수를 사용할 수 있게 하는 방법입니다. props로 `register`를 전달하는 것보다 props 관리가 편해, 추천하는 방법입니다.

~~codesendbox~~

### Controlled의 경우
- `Controller`

#### UI 라이브러리 대처하기

#### Controlled 컴포넌트 대처하기

## 유효성 검증

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
- [https://www.npmjs.com/package/react-hook-form](https://www.npmjs.com/package/react-hook-form)
- [https://react-hook-form-website-git-jeromedeleon-patch-1.bluebill1049.vercel.app/](https://react-hook-form-website-git-jeromedeleon-patch-1.bluebill1049.vercel.app/)
- [https://formik.org/](https://formik.org/)
- [https://redux-form.com/8.3.0/](https://redux-form.com/8.3.0/)
- [https://react.dev/learn/sharing-state-between-components#controlled-and-uncontrolled-components](https://react.dev/learn/sharing-state-between-components#controlled-and-uncontrolled-components)
- [https://www.npmjs.com/package/react-hook-form](https://www.npmjs.com/package/react-hook-form)
- [https://www.npmjs.com/package/formik](https://www.npmjs.com/package/formik)
- [https://www.npmjs.com/package/rc-field-form](https://www.npmjs.com/package/rc-field-form)

---

FrontEnd 개발을 하다보면 사용자 입력을 받고 입력 받은 값을 검증하는데에 많은 시간을 쓰게 됩니다. React Hook Form은 사용자 입력을 받고 검증하는 것을 도와주는 라이브러리로 사용자에게 입력을 받고 검증하는데 드는 시간을 줄일 뿐만 아니라 더불어 성능까지 두 마리 토끼를 모두 잡을 수 있습니다. 이번 포스트에서는 React Hook Form에 대해서 살펴보도록 하겠습니다.

## React Hook Form 특징
React Hook Form의 공식 문서를 보면 아래와 같이 6가지의 장점을 이야기 하고 있습니다.

- Built with performance, UX and DX in mind
- Embraces native HTML form validation
- Out of the box integration with UI libraries
- Small size and no dependencies
- Support Yup, Zod, AJV, Superstruct, Joi and others

## DX: 코드 비교
- DX: 직관적이고 완전한 형태의 API를 제공하여 개발자에게 좋은 개발 경험을 제공합니다.

## HTML standard: 기존 HTML 사용
- HTML standard: 기존의 HTML을 사용하며, 유효성 검사를 위한 API를 통해 유효성 검사를 진행합니다.
- 웹 접근성에 용이함

## Super Light: 크기 비교
- Super Light: 패키지 크기가 작은 종속성이 없는 라이브러리입니다.
- https://bundlephobia.com/package/react-hook-form@7.45.1
- https://bundlephobia.com/package/formik@2.4.2
- https://bundlephobia.com/package/rc-field-form@1.34.1

## Performance: 성능 비교
- Performance: 리렌더링 횟수와 검증 계산을 최소화하였으며 빠른 마운팅 속도를 제공합니다.

> Uncontrolled와 Controlled
>
> - https://react.dev/learn/sharing-state-between-components#controlled-and-uncontrolled-components

### 리렌더링 횟수 비교
- uncontrolled: 성능
- Isolate Re-renders, Subscriptions

### 마운팅 속도 비교

## Adoptable: ???
- 다른 UI 라이브러리를 함께 사용하기 용이함

## UX: 일관된 유효성 검사
- 퍼포먼스 뿐만 아니라 일관된 UI 제공은 중요
- yup 등등 사용

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
- [https://www.npmjs.com/package/react-hook-form](https://www.npmjs.com/package/react-hook-form)
- [https://react-hook-form-website-git-jeromedeleon-patch-1.bluebill1049.vercel.app/](https://react-hook-form-website-git-jeromedeleon-patch-1.bluebill1049.vercel.app/)
- [https://formik.org/](https://formik.org/)
- [https://redux-form.com/8.3.0/](https://redux-form.com/8.3.0/)
- [https://react.dev/learn/sharing-state-between-components#controlled-and-uncontrolled-components](https://react.dev/learn/sharing-state-between-components#controlled-and-uncontrolled-components)
- [https://www.npmjs.com/package/react-hook-form](https://www.npmjs.com/package/react-hook-form)
- [https://www.npmjs.com/package/formik](https://www.npmjs.com/package/formik)
- [https://www.npmjs.com/package/rc-field-form](https://www.npmjs.com/package/rc-field-form)
