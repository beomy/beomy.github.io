---
layout: post
title: '[React] react-hook-form으로 폼 관리하기'
featured-img: react/react-hook-form.png
category: [tech, react]
summary: React Hook Form은 사용자 입력을 받고 검증하는 것을 도와 주는 라이브러리로, React에서 폼을 관리하는 가장 유명한 라이브러리 중 하나입니다. React Hook Form을 사용하면 사용자에게 입력을 받고 검증하는데 드는 시간을 줄일 뿐만 아니라 더불어 성능까지 두 마리 토끼를 모두 잡을 수 있습니다.
---

> ##### TL;DR
> - React Hook Form은 Uncontrolled 방식의 빠른 성능이 장점인 폼 관리 라이브러리입니다. 물론 Controlled 방식도 지원합니다.
>   - Uncontrolled 방식은 `register` 함수를 사용합니다.
>     - `register` 함수의 두 번째 파라미터를 사용하여 유효성 검증이 가능합니다.
>   - Controlled 방식은 `Controller` 컴포넌트를 사용합니다.
>     - `Controller` 컴포넌트를 사용하여 MUI 등의 UI 라이브러리와 함께 사용이 가능합니다.
>     - `Controller` 컴포넌트의 `rules` 속성을 사용하여 유효성 검증이 가능합니다.
> - `useForm` 훅 하나면 대부분의 폼 관리를 할 수 있습니다. 아래는 중요한 반환 값입니다.
>   - `register`: Uncontrolled 방식으로 사용하기 위해 사용됩니다. 요소의 속성으로 전달되어야 하는 값들을 반환하는 함수입니다.
>   - `control`: Controlled 방식으로 사용하기 위해 사용됩니다. UI 라이브러리와 함께 사용할 자주 사용됩니다.
>   - `handleSubmit`: 유효성 검증을 통과한 사용자 입력 값을 전달받기 위한 함수입니다.
>   - `watch`: 사용자 입력 값의 변화를 감시하기 위한 함수입니다.
>   - `formState`: 폼의 상태를 저장하는 객체로, 대표적으로 `errors` 객체를 통해 에러 정보를 가져올 수 있습니다.
> - `Controller` 컴포넌트를 사용하면 UI 라이브러리와 React Hook Form을 함께 사용할 수 있습니다. 아래는 중요한 속성입니다.
>   - `name`: 요소를 구분하기 위한 값으로 같은 폼으로 묶여 있는 요소끼리 유니크해야 합니다.
>   - `control`: `useForm` 훅의 반환 값인 `control`을 그대로 전달하면 됩니다.
>   - `render`: 화면에 노출될 요소를 반환하는 함수입니다.
> - `@hookform/resolvers` 라이브러리를 사용하면 외부 유효성 검증 라이브러리를 함께 사용할 수 있습니다.

React Hook Form은 사용자 입력을 받고 검증하는 것을 도와주는 라이브러리로, React에서 폼을 관리하는 가장 유명한 라이브러리 중 하나입니다. React Hook Form을 사용하면 사용자에게 입력을 받고 검증하는데 드는 시간을 줄일 뿐만 아니라 더불어 성능까지 두 마리 토끼를 모두 잡을 수 있습니다.

React Hook Form은 Uncontrolled 방식을 사용하는 폼 관리 라이브러리로 빠른 성능이 장점 중 하나입니다. 다른 폼 관리 라이브러리와 비교하고 싶다면, [[React] react-hook-form, formik, rc-field-form 폼 관리 어떤 걸로 해야 할까](/tech/react/form-libraries/)를 참고 부탁드립니다.

## React Hook Form 특징
[NPM 문서](https://www.npmjs.com/package/react-hook-form)와 [공식 문서](https://www.react-hook-form.com/)는 비슷한 내용으로 React Hook Form의 특징을 이야기하고 있지만, 공식 문서와 NPM 문서를 함께 보면 React Hook Form을 이해하는데 도움이 될 것 같아 함께 살펴보도록 하겠습니다.

### NPM 문서에서 이야기하는 특징
NPM 문서에서는 아래와 같이 5가지 특징을 이야기합니다.

- **Built with performance, UX and DX in mind**: 성능, UX, DX를 고려하여 만들어졌습니다.
- **Embraces native HTML form validation**: 기존의 HTML을 사용하여 유효성 검사합니다.
- **Out of the box integration with UI libraries**: UI 라이브러리와 통합이 가능합니다.
- **Small size and no dependencies**: 크기가 작고 종속성이 없습니다.
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
- UI 라이브러리와 함께 사용할 수 있는 라이브러리입니다.
- Yup, Zod 등의 외부 유효성 검사 라이브러리와 함께 사용가능하며 일관된 유효성 검사를 제공합니다.

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
<iframe src="https://codesandbox.io/embed/react-hook-form-quick-start-tpcc4q?fontsize=14&hidenavigation=1&theme=dark"
style="width:100%; height:500px; border:0; border-radius: 10px; overflow:hidden;"
title="React Hook Form - Quick Start"
allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>
</div>

## 사용자 입력 처리하기
React Hook Form에서 사용자의 입력 값을 처리하는 Uncontrolled와 Controlled, 2가지 방법을 살펴보도록 하겠습니다.

### Uncontrolled의 경우: `register` 함수
React Hook Form은 Uncontrolled 방식을 사용하는데, `register` 함수는 Uncontrolled 방식으로 React Hook Form을 사용하기 위한 기본적인 방식입니다. `register` 함수의 형태는 아래와 같습니다.

```ts
register: (name: string, RegisterOptions?) => ({ onChange, onBlur, name, ref });

type RegisterOptions = Partial<{
  required: boolean | string | { value: boolean; message: string; }; // 필수값 여부 체크합니다.
  min: number | string | { value: number | string; message: string }; // 입력 값의 최솟값 체크합니다.
  max: number | string | { value: number | string; message: string }; // 입력 값의 최댓값 체크합니다.
  maxLength: number | string | { value: number | string; message: string }; // 입력 값의 최대 길이 체크합니다.
  minLength: number | string | { value: number | string; message: string }; // 입력 값의 최소 길이 체크합니다.
  pattern: RegExp | { value: RegExp; message: string }; // 정규식을 사용한 입력 값 체크합니다.
  validate: Validate | Record<string, Validate>; // 커스텀 유효성 체크를 만들 때 사용됩니다.
  valueAsNumber: boolean // Number로 형변환 합니다.
  valueAsDate: boolean // Date로 형변환 합니다.
  setValueAs: (value: any) => any // value를 가공합니다.
  disabled: boolean // true로 설정 시, value가 undefined 되며 요소가 disabled 됩니다.
  onChange: (event: any) => void // change 이벤트 발생 시 실행되는 콜백입니다.
  onBlur: (event: any) => void // blur 이벤트 발생 시 실행되는 콜백입니다.
  value: unknown // 요소가 가지고 있는 값입니다.
  shouldUnregister: boolean // true로 지정할 경우 요소가 언마운트 되면 입력값이 제거됩니다.
  deps: string | string[] // 나열된 요소가 함께 유효성 검증이 실행됩니다.
}>;

type Validate<TFieldValue, TFormValues> = (value: TFieldValue, formValues: TFormValues) => ValidateResult | Promise<ValidateResult>;
type ValidateResult = Message | Message[] | boolean | undefined;
```

`register` 함수의 두 번째 파라미터 옵션인 `RegisterOptions`을 사용하면 유효성 검증을 할 수 있습니다. `register` 함수는 아래와 같이 사용할 수 있습니다.

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

#### Uncontrolled 컴포넌트에서 `register`
개발을 하다 보면 HTML의 `<input />` 등을 매핑하는 커스텀 컴포넌트를 만든 후 커스텀 컴포넌트에 React Hook Form을 사용해야 할 때가 종종 있습니다. 이런 상황을 대처하는 2가지 방법을 살펴보도록 하겠습니다.

##### `register`를 props로 전달
커스텀 컴포넌트에서 `register` 함수를 사용하기 위해 `register` 함수와 `register` 함수에서 필요한 값을 props로 전달하는 방법입니다.

<div>
<iframe src="https://codesandbox.io/embed/react-hook-form-register-props-g4f4wq?fontsize=14&hidenavigation=1&theme=dark"
style="width:100%; height:500px; border:0; border-radius: 10px; overflow:hidden;"
title="React Hook Form - register props"
allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>
</div>

##### `forwardRef` 사용
`forwardRef`를 사용해서 커스텀 컴포넌트에서 사용하는 HTML의 `<input />`의 `ref`를 부모 컴포넌트로 전달하여 `register` 함수를 사용할 수 있게 하는 방법입니다. `register`를 props로 전달하는 것보다 props를 간결하게 관리할 수 있습니다.

<div>
<iframe src="https://codesandbox.io/embed/react-hook-form-forwardref-7vhv62?fontsize=14&hidenavigation=1&theme=dark"
style="width:100%; height:500px; border:0; border-radius: 10px; overflow:hidden;"
title="React Hook Form - forwardRef"
allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>
</div>

### Controlled의 경우: `Controller` 컴포넌트
React Hook Form은 기본적으로 Uncontrolled 방식으로 동작하기 때문에 `register` 함수를 사용해야 하지만, 개발을 하다 보면 항상 Uncontrolled 방식으로 개발할 순 없습니다. `Controller` 컴포넌트를 사용하면 Contrelled 방식에도 React Hook Form을 사용할 수 있습니다.

Controlled 방식의 Input 컴포넌트를 만들었다면, 아래 코드와 같이 React Hook Form을 사용할 수 있습니다.

<div>
<iframe src="https://codesandbox.io/embed/react-hook-form-controlled-5cslkl?fontsize=14&hidenavigation=1&theme=dark"
style="width:100%; height:500px; border:0; border-radius: 10px; overflow:hidden;"
title="React Hook Form - Controlled"
allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>
</div>

`Controller` 컴포넌트를 사용할 때, `name`, `control`, `render` 3개의 props는 필수로 전달해야 합니다. 3개의 필수 props은 아래와 같은 값을 전달하면 됩니다.

- `name`: 요소를 구분하기 위한 값으로 같은 폼으로 묶여 있는 요소끼리 유니크해야 합니다.
- `control`: `useForm` 훅의 반환 값을 그대로 전달하면 됩니다.
- `render`: 화면에 노출될 요소를 반환하는 함수입니다.

#### UI 라이브러리의 경우
MUI와 같은 많은 UI 라이브러리의 컴포넌트는 Controlled 방식으로 동작합니다. 아래 코드와 같이 UI 라이브러리 컴포넌트와 React Hook Form을 함께 사용할 수 있습니다.

<div>
<iframe src="https://codesandbox.io/embed/react-hook-form-ui-library-f4glc3?fontsize=14&hidenavigation=1&theme=dark"
style="width:100%; height:500px; border:0; border-radius: 10px; overflow:hidden;"
title="React Hook Form - UI Library"
allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>
</div>

## 유효성 검증
폼 관리 라이브러리는 사용자 입력 값을 받는 것 못지않게 유효성 검증 또한 중요합니다. React Hook Form에서는 아래와 같이 사용자 입력을 검증할 수 있습니다.

### `register` 함수의 경우
`register` 함수의 두 번째 파라미터인 `RegisterOptions`을 사용하면 유효성 검증을 할 수 있습니다. 자세한 옵션 정보는 [RegisterOptions 타입](/tech/react/react-hook-form/#uncontrolled의-경우-register-함수)을 참고 바랍니다. `register` 함수와 함께 유효성 검증은 아래 코드와 같이 사용할 수 있습니다.

<div>
<iframe src="https://codesandbox.io/embed/react-hook-form-register-validation-jz2kyn?fontsize=14&hidenavigation=1&theme=dark"
style="width:100%; height:500px; border:0; border-radius: 10px; overflow:hidden;"
title="React Hook Form - register validation"
allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>
</div>

첫 번째 `<input />`은 필수이면서 최대 길이가 20자여야 합니다. 두 번째 `<input />`은 알파벳만 입력해야 합니다. 세 번째 `<input />`은 18 ~ 99 사이의 숫자를 입력해야 합니다.

### `Controller` 컴포넌트의 경우
`Controller` 컴포넌트와 함께 유효성 검증을 사용하려면 `register` 함수의 두 번째 파라미터에 전달했던 값과 동일한 값을 `Controller` 컴포넌트의 `rules` prop에 전달하면 됩니다. 아래 코드와 같이 `Controller` 컴포넌트에서 유효성 검증을 사용할 수 있습니다.

<div>
<iframe src="https://codesandbox.io/embed/react-hook-form-controller-validation-8qm4cc?fontsize=14&hidenavigation=1&theme=dark"
style="width:100%; height:500px; border:0; border-radius: 10px; overflow:hidden;"
title="React Hook Form - Controller validation"
allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>
</div>

`register` 함수 예제와 동일하게, 첫 번째 `<input />`은 필수이면서 최대 길이가 20자여야 합니다. 두 번째 `<input />`은 알파벳만 입력해야 합니다. 세 번째 `<input />`은 18 ~ 99 사이의 숫자를 입력해야 합니다.

### 외부 유효성 검증 라이브러리와 함께
React Hook Form에서 제공하는 `@hookform/resolvers` 라이브러리를 사용하면 외부 유효성 검증 라이브러리와 함께 React Hook Form을 사용할 수 있습니다. `@hookform/resolvers`을 아래 코드와 같이 설치해야 합니다.

```bash
npm install @hookform/resolver
# or
pnpm add @hookform/resolver
# or
yarn add @hookform/resolver
```

`@hookform/resolvers`은 [Yup](https://github.com/react-hook-form/resolvers#yup), [Zod](https://github.com/react-hook-form/resolvers#zod), [Superstruct](https://github.com/react-hook-form/resolvers#superstruct), [Joi](https://github.com/react-hook-form/resolvers#joi), [Class Validator](https://github.com/react-hook-form/resolvers#class-validator), [io-ts](https://github.com/react-hook-form/resolvers#io-ts), [Nope](https://github.com/react-hook-form/resolvers#nope), [computed-types](https://github.com/react-hook-form/resolvers#computed-types), [typanion](https://github.com/react-hook-form/resolvers#typanion), [Ajv](https://github.com/react-hook-form/resolvers#ajv), [TypeBox](https://github.com/react-hook-form/resolvers#typebox), [ArkType](https://github.com/react-hook-form/resolvers#arktype)의 유효성 검증 라이브러리를 제공합니다. 아래 코드와 같이 `@hookform/resolvers`와 `useForm` 훅의 `resolver` 필드를 사용하여 외부 유효성 검증 라이브러리를 사용할 수 있습니다.

<div>
<iframe src="https://codesandbox.io/embed/react-hook-form-resolvers-fvv224?fontsize=14&hidenavigation=1&theme=dark"
style="width:100%; height:500px; border:0; border-radius: 10px; overflow:hidden;"
title="React Hook Form - resolvers"
allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>
</div>

위의 코드는 yup을 사용하여 유효성 검증을 한 예제입니다. `register` 함수 예제와 동일하게, 첫 번째 `<input />`은 필수이면서 최대 길이가 20자여야 합니다. 두 번째 `<input />`은 알파벳만 입력해야 합니다. 세 번째 `<input />`은 18 ~ 99 사이의 숫자를 입력해야 합니다.

## 에러 메시지
유효성 검증이 있다면 빼놓을 수 없는 부분은 유효성 검증에서 잡아낸 에러를 화면에 노출하는 것입니다. `register` 함수를 사용할 때, `Controller` 컴포넌트를 사용할 때 에러 메시지를 노출하는 방법을 살펴보도록 하겠습니다.

### `register` 함수의 경우
`register` 함수를 사용한 경우 `useForm` 훅의 `formState.errors` 필드를 사용하면 아래 코드와 같이 에러 메시지를 화면에 노출할 수 있습니다.

<div>
<iframe src="https://codesandbox.io/embed/react-hook-form-register-error-message-3x7pjx?fontsize=14&hidenavigation=1&theme=dark"
style="width:100%; height:500px; border:0; border-radius: 10px; overflow:hidden;"
title="React Hook Form - register error message"
allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>
</div>

`register` 함수의 두 번째 파라미터 중 `maxLength` 와 같은 유효성 검증 필드는 유효성 체크를 위한 `value` 필드와 메시지 출력을 위한 `message` 필드를 포함한 객체(`{ value: string | number | boolean | RegExp, message: string }`)를 전달하면 메시지 출력이 가능합니다. `required` 체크만 `string` 타입을 전달하면 전달한 문자열이 에러 메시지로 노출됩니다. 유효성 검증을 위한 자세한 옵션 정보는 [RegisterOptions 타입](/tech/react/react-hook-form/#uncontrolled의-경우-register-함수)을 참고 바랍니다.

### `Controller` 컴포넌트의 경우
`Controller` 컴포넌트를 사용한 경우 `render` 함수의 `fieldState.error` 필드를 사용하면 아래 코드와 같이 에러 메시지를 화면에 노출할 수 있습니다. `register` 함수의 두 번째 파라미터에 전달했던 값과 동일한 값을 `Controller` 컴포넌트의 `rules` prop에 전달하면 됩니다.

<div>
<iframe src="https://codesandbox.io/embed/react-hook-form-controller-error-message-kqyx5t?fontsize=14&hidenavigation=1&theme=dark"
style="width:100%; height:500px; border:0; border-radius: 10px; overflow:hidden;"
title="React Hook Form - Controller error message"
allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>
</div>

`formState.errors`에는 React Hook Form을 사용한 모든 요소의 에러 값이 담겨오지만, `Controller` 컴포넌트의 `render` 함수의 `fieldState.error`에는 `Controller` 컴포넌트의 `name` 속성에 정의한 하나의 요소의 에러 값만 담겨오게 됩니다.

### 외부 유효성 검증 라이브러리와 함께
`@hookform/resolvers` 라이브러리를 사용하면 외부 유효성 검증 라이브러리와 함께 React Hook Form을 사용할 수 있는데, 이때 에러 메시지를 설정하는 방법은 사용한느 유효성 검증 라이브러리의 스펙을 동일하게 따라가면 됩니다. 아래 코드는 `Yup`을 사용하여 유효성 검증한 에러 메시지를 노출하는 예제입니다.

<div>
<iframe src="https://codesandbox.io/embed/react-hook-form-resolvers-error-message-5ljymh?fontsize=14&hidenavigation=1&theme=dark"
style="width:100%; height:500px; border:0; border-radius: 10px; overflow:hidden;"
title="React Hook Form - resolvers error message"
allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>
</div>

## 종속성 있는 유효성 검증
많은 폼 요소를 다루다 보면 종종 서로 종속성이 있는 유효성 검증이 필요할 때가 있습니다. 예를 들어 비밀번호 입력 태그와 비밀번호 확인 태그 2개가 있고, 비밀번호 확인 태그는 비밀번호 입력 태그가 변경될 경우 유효성 검증을 다시 해야 하는 상황이 있습니다. 이렇게 종속성이 있는 유효성 검증을 `register` 함수와 `Controller` 컴포넌트에서 처리하는 방법을 살펴보도록 하겠습니다.

### `register` 함수의 경우
`register` 함수의 두 번째 파라미터인 `RegisterOptions`의 `deps` 옵션을 사용하면 아래 코드와 같이 종속성 있는 유효성 검증을 할 수 있습니다.

<div>
<iframe src="https://codesandbox.io/embed/react-hook-form-register-deps-wqfs7w?fontsize=14&hidenavigation=1&theme=dark"
style="width:100%; height:500px; border:0; border-radius: 10px; overflow:hidden;"
title="React Hook Form - register deps"
allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>
</div>

`watch`를 사용하면 값이 업데이트된 것을 감시할 수 있는데, `watch`는 종속성 있는 유효성 검증 등 여러 상황에서 유용하게 사용됩니다.

### `Controller` 컴포넌트의 경우
`Controller` 컴포넌트의 `rules` prop에는 `RegisterOptions`가 동일하게 사용되기 때문에 아래 코드와 같이 `rules` 속성에 `RegisterOptions`의 `deps`를 사용하면 종속성 있는 유효성 검증을 할 수 있습니다.

<div>
<iframe src="https://codesandbox.io/embed/react-hook-form-controller-deps-cy8szq?fontsize=14&hidenavigation=1&theme=dark"
style="width:100%; height:500px; border:0; border-radius: 10px; overflow:hidden;"
title="React Hook Form - Controller deps"
allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>
</div>

## 부록

### `FormProvider` 컴포넌트
`useForm`의 반환 값을 자식 컴포넌트에게 전달해 줘야 할 때가 종종 있습니다. 컴포넌트의 트리 구조가 간단하다면 간단하게 속성으로 전달이 가능하지만, 컴포넌트 트리 구조가 복잡해져서 자식의 자식 컴포넌트로, 그리고 여러 컴포넌트로 반환 값을 전달해야 한다면 이 작업은 번거로운 일이 됩니다. React Hook Form은 이런 props 전달의 번거로움을 줄이기 위해서 `FormProvider` 컴포넌트와 `useFormContext`를 사용하는 Context를 제공합니다. 아래 코드와 같이 사용할 수 있습니다.

<div>
<iframe src="https://codesandbox.io/embed/react-hook-form-formprovider-6l5prw?fontsize=14&hidenavigation=1&theme=dark"
style="width:100%; height:500px; border:0; border-radius: 10px; overflow:hidden;"
title="React Hook Form - FormProvider"
allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>
</div>

### `ErrorMessage` 컴포넌트
React Hook Form은 에러 메시지를 좀 더 간편하게 표시할 수 있도록 `ErrorMessage` 컴포넌트를 제공합니다. `ErrorMessage` 컴포넌트를 사용하려면 아래 코드와 같이 `@hookform/error-message`을 설치해야 합니다.

```bash
npm install @hookform/error-message
# or
pnpm add @hookform/error-message
# or
yarn add @hookform/error-message
```

`ErrorMessage` 컴포넌트는 아래와 같은 속성들이 있습니다.

- `name: string`: 요소의 이름값입니다.
- `errors: object`: `register` 함수의 `formState.errors`나 `Controller` 컴포넌트의 `render` 함수의 `formState.errors` 객체가 와야 합니다. `FormProvider`을 사용한다면 생략 가능합니다.
- `message: string | React.ReactElement`: 에러 메시지가 설정되어 있지 않을 때 노출 되는 기본 에러 메시지입니다.
- `as: React.ElementType | string`: 어떤 요소로 랜더링 할지 선택하는 값입니다. `as="span"`, `as={<Text />}`와 같이 컴포넌트나 HTML 태그 모두 가능합니다.
- `render: ({ message: string | React.ReactElement, messages?: Object}) => any`: 에러 메시지를 랜더링 하기 위한 랜더링 함수입니다. `render` 함수를 사용하여 에러 메시지를 좀 더 유연하게 커스텀할 수 있습니다.
- `messages`의 경우 `useForm` 훅의 `criteriaMode` 옵션을 `all`로 설정할 경우 사용할 수 있습니다.

`ErrorMessage` 컴포넌트는 아래 코드와 같이 사용할 수 있습니다.

<div>
<iframe src="https://codesandbox.io/embed/react-hook-form-errormessage-rmf93k?fontsize=14&hidenavigation=1&theme=dark"
style="width:100%; height:500px; border:0; border-radius: 10px; overflow:hidden;"
title="React Hook Form - ErrorMessage"
allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>
</div>

### DevTools
React Hook Form을 사용하다 보면, 어떠한 값들이 폼으로 관리되고 있는지 파악하기 어려운 불편한 점이 있는데, 이점을 보완하기 위해 React Hook Form은 DevTools를 제공합니다. DevTools를 사용하기 위해 아래 코드와 같이 `@hookform/devtools`를 설치해 줍니다.

```bash
npm install @hookform/devtools
# or
pnpm add @hookform/devtools
# or
yarn add @hookform/devtools
```

아래 코드와 같이 DevTools를 사용할 수 있습니다.

<div>
<iframe src="https://codesandbox.io/embed/react-hook-form-devtools-cv5vw3?fontsize=14&hidenavigation=1&theme=dark"
style="width:100%; height:500px; border:0; border-radius: 10px; overflow:hidden;"
title="React Hook Form - DevTools"
allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>
</div>

##### 참고
- [https://www.react-hook-form.com/](https://www.react-hook-form.com/)
- [https://www.npmjs.com/package/react-hook-form](https://www.npmjs.com/package/react-hook-form)
- [https://react-hook-form-website-git-jeromedeleon-patch-1.bluebill1049.vercel.app/](https://react-hook-form-website-git-jeromedeleon-patch-1.bluebill1049.vercel.app/)
- [https://www.npmjs.com/package/react-hook-form](https://www.npmjs.com/package/react-hook-form)
- [https://velog.io/@centraldogma99/react-hook-form에서-deps를-사용할때는-조심하세요](https://velog.io/@centraldogma99/react-hook-form에서-deps를-사용할때는-조심하세요)
