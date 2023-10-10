---
layout: post
title: '[React] react-hook-form API 레퍼런스'
featured-img: react/react-hook-form.png
category: [tech, react]
summary: 사용하고 있는 외부 라이브러리 API를 자세히 알면 그 라이브러리에서 제공하는 다양한 기능들을 인지하고 사용할 수 있기 때문에 라이브러리를 더 멋있게 사용할 수 있습니다. 이번 포스트에서는 React Hook Form을 좀 더 멋있게 사용하기 위해 React Hook Form에서 제공하는 API들을 살펴보도록 하겠습니다.
---

사용하고 있는 외부 라이브러리 API를 자세히 알면 그 라이브러리에서 제공하는 다양한 기능을 사용할 수 있기 때문에 라이브러리를 더 멋있게 사용할 수 있습니다. 이번 포스트에서는 React Hook Form을 좀 더 멋있게 사용하기 위해 React Hook Form에서 제공하는 API를 살펴보도록 하겠습니다.

## `useForm`
`useForm`은 React Hook Form을 사용할 때 항상 사용해야 하는 가장 기본적인 훅입니다. `useForm`의 형태는 아래 코드와 같습니다.

```ts
export declare function useForm<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues extends FieldValues | undefined = undefined
>(props?: UseFormProps<TFieldValues, TContext>):
  UseFormReturn<TFieldValues, TContext, TTransformedValues>;

export type FieldValues = Record<string, any>;
```

#### props
```ts
type UseFormProps<TFieldValues extends FieldValues = FieldValues, TContext = any> = Partial<{
  mode: Mode;
  reValidateMode: Exclude<Mode, 'onTouched' | 'all'>;
  defaultValues: DefaultValues<TFieldValues> | AsyncDefaultValues<TFieldValues>;
  values: TFieldValues;
  resetOptions: Parameters<UseFormReset<TFieldValues>>[1];
  resolver: Resolver<TFieldValues, TContext>;
  context: TContext;
  shouldFocusError: boolean;
  shouldUnregister: boolean;
  shouldUseNativeValidation: boolean;
  progressive: boolean;
  criteriaMode: CriteriaMode;
  delayError: number;
}>;
```

- `mode: 'onChange' | 'onBlur' | 'onSubmit' | 'onTouched' | 'all' = 'onSubmit'`: 제출(submit)되기 전의 검증이 실행되는 이벤트를 정의합니다.
- `reValidateMode: onChange | onBlur | onSubmit = 'onChange'`: 제출(submit)된 후의 검증이 실행되는 이벤트를 정의합니다.
- `defaultValues: Record<string, any> | (payload?: unknown) => Promise<Record<string, any>>`
  - 폼의 기본 값을 할당할 때 사용되는 필드입니다. 동기, 비동기 정의 모두 가능합니다.
    ```ts
    // set default value sync
    useForm({
      defaultValues: {
        firstName: '',
        lastName: ''
      }
    })

    // set default value async
    useForm({
      defaultValues: async () => fetch('/api-endpoint');
    })
    ```
  - 기본 값을 `undefined`로 정의하는 것은 피해야 합니다.
  - `reset` 함수로 초기화할 경우, `defaultValues`에 설정한 값으로 초기화됩니다.
  - `defaultValues`에 설정된 값은 제출(submit)에 포함됩니다.
  - `Moment`, `Luxon`과 같은 커스텀 프로토타입 메서드가 포함된 객체를 정의하는 것은 피해야 합니다.
- `values: Record<string, any>`
  - `defaultValues`와 유사한 목적으로 사용되지만 `defaultValues`와 다르게 `values`는 반응형으로 동작하여 `values` 값이 변경되면 폼에 반영됩니다. 아래 예제에서 확인할 수 있습니다.
  - `defaultValues`와 `values`가 모두 적용되어 있다면, `values` 값이 폼에 적용됩니다.
- `resetOptions: KeepStateOptions`: `defaultValues`나 `values`가 업데이트될 때 내부적으로 `reset` API가 호출되는데, 이때 호출되는 `reset` API의 옵션을 설정해 주는 필드입니다. 자세한 내용은 [reset API](/tech/react/react-hook-form-api-reference/#reset)를 참고 바랍니다.
- `resolver: Resolver`
  - `resolver`는 아래 코드와 같은 형태를 가집니다.
    ```ts
    export type Resolver<
      TFieldValues extends FieldValues = FieldValues,
      TContext = any
    > = (
      values: TFieldValues,
      context: TContext | undefined,
      options: ResolverOptions<TFieldValues>
    ) => Promise<ResolverResult<TFieldValues>> | ResolverResult<TFieldValues>;

    export type ResolverResult<
      TFieldValues extends FieldValues = FieldValues
    > = ResolverSuccess<TFieldValues> | ResolverError<TFieldValues>;

    export type ResolverSuccess<TFieldValues extends FieldValues = FieldValues> = {
      values: TFieldValues;
      errors: {};
    };

    export type ResolverError<TFieldValues extends FieldValues = FieldValues> = {
      values: {};
      errors: FieldErrors<TFieldValues>;
    };
    ```
  - 외부 유효성 검증 라이브러리를 사용하기 위해 사용되는 필드이지만([유효성 검증 - 외부 유효성 검증 라이브러리와 함께](/tech/react/react-hook-form/#외부-유효성-검증-라이브러리와-함께) 참고), 유효성 검증 로직을 직접 작성할 수도 있습니다.
- `context: object`: `context` 필드를 사용하면 `resolver` 함수의 두 번째 파라미터로 전달되거나, `@hookform/resolvers/yup`을 사용한다면 Yup의 context 객체에 주입됩니다.
- `shouldFocusError: boolean = true`
  - `true`가 기본 값으로 `ture`로 설정한 경우, 유효성 검사에 실패한 첫 번째 요소가 포커스 됩니다.
  - 이 옵션을 사용하기 위해서는 `register` 함수의 반환 값인 `ref`(`Controller` 컴포넌트의 경우 `render` 함수의 `field.ref` 파라미터)가 요소의 `ref`에 전달되어야 합니다.
- `shouldUnregister: boolean = false`: `false`가 기본으로 요소가 언마운트 되어도 입력 값이 유지됩니다. `true`로 지정할 경우 요소가 언마운트 되면 입력값이 제거됩니다.
- `shouldUseNativeValidation: boolean = false`: `false`가 기본 값으로 `true`로 설정한 경우 [브라우저 네이티브 검증](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation)이 동작하게 됩니다.
- `criteriaMode: 'firstError' | 'all'`
  - `firstError`가 기본 값으로 한 요소에 여러 유효성 에러가 발생한 경우 첫 번째 유효성 에러만 `formState.errors` 객체에 담깁니다.
  - `all`로 설정한 경우 모든 유효성 에러가 `formState.errors.types` 객체에 담깁니다.
- `delayError: number`
  - 입력된 ms초만큼 사용자에게 에러 표시를 지연시킵니다.
  - 유효성 검사가 통과될 경우에는 즉각 적용됩니다.

아래 코드와 같이 `useForm` 훅을 사용할 수 있습니다.

<div>
  <iframe src="https://codesandbox.io/embed/react-hook-form-useform-cggp2g?fontsize=14&hidenavigation=1&theme=dark"
  style="width:100%; height:500px; border:0; border-radius: 10px; overflow:hidden;"
  title="React Hook Form - useForm"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  ></iframe>
</div>

아래 예제는 `resolver`와 `context`를 사용한 예제입니다.

<div>
  <iframe src="https://codesandbox.io/embed/react-hook-form-context-crs6cz?fontsize=14&hidenavigation=1&theme=dark"
  style="width:100%; height:500px; border:0; border-radius: 10px; overflow:hidden;"
  title="React Hook Form - context"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  ></iframe>
</div>

#### returns
```ts
type UseFormReturn<TFieldValues extends FieldValues = FieldValues, TContext = any, TTransformedValues extends FieldValues | undefined = undefined> = {
  watch: UseFormWatch<TFieldValues>;
  getValues: UseFormGetValues<TFieldValues>;
  getFieldState: UseFormGetFieldState<TFieldValues>;
  setError: UseFormSetError<TFieldValues>;
  clearErrors: UseFormClearErrors<TFieldValues>;
  setValue: UseFormSetValue<TFieldValues>;
  trigger: UseFormTrigger<TFieldValues>;
  formState: FormState<TFieldValues>;
  resetField: UseFormResetField<TFieldValues>;
  reset: UseFormReset<TFieldValues>;
  handleSubmit: UseFormHandleSubmit<TFieldValues, TTransformedValues>;
  unregister: UseFormUnregister<TFieldValues>;
  control: Control<TFieldValues, TContext>;
  register: UseFormRegister<TFieldValues>;
  setFocus: UseFormSetFocus<TFieldValues>;
};
```

`useForm`은 중요한 값들을 반환하는데 아래에서 `useForm`의 반환 값들을 하나씩 살펴보도록 하겠습니다.

### `watch`
`watch` 함수는 특정 요소를 감시하여 그 요소의 값을 반환합니다. 해당 요소의 값을 가져와서 사용해야 할 때 유용하게 사용되는 함수입니다. 형태는 아래 코드와 같습니다.

```ts
watch: (
  names?: string | string[] | (data, options) => void,
  defaultValue?: Object | unknown
) => unknown
```

#### props
- `name?: string | string[] | (data, options) => void`
  - `watch('inputName')`와 같은 형태로 사용한 경우 특정 필드의 값(`unknown`)을 반환합니다.
  - `watch(['inputName'])`와 같은 형태로 사용한 경우 배열 안에 필드의 값들을 배열 형태(`unknown[]`)로 반환합니다.
  - `watch()`와 같은 형태로 사용한 경우 모든 요소의 값을 객체 형태(`{[key: string]: unknown}`)로 반환합니다.
  - `watch((data, { name, type }) => void)`와 같은 형태로 사용한 경우 모든 요소의 값을 구독하며, 값이 업데이트되면 콜백이 실행됩니다. 구독 해제를 위한 함수를 포함한 객체(`{ unsubscribe: () => void }`)를 반환합니다.
- `defaultValue: Object | unknown`
  - `watch` 함수는 두 번째 파라미터로 `defaultValue`를 전달할 수 있는데, `defaultValues`에 감시하는 요소의 값이 정의되어 있지 않을 경우 `defaultValue` 값을 반환합니다. `defaultValue` 마저도 정의되어 있지 않다면 `undfined`를 반환합니다. `defaultValues`와 `defaultValue`가 모두 정의되어 있다면 `defaultValue` 값을 반환합니다.
  - `watch('inputName')`와 같이 `name`에 문자열을 사용한 경우 `watch('inputName', 'one')`와 같이 `defaultValue`를 전달할 수 있습니다.
  - `watch(['first', 'second'])`와 같이 `name`에 배열 형태를 사용한 경우 `watch(['first', 'second'], { first: 'one', second: 'two' })`와 같이 `defaultValue`를 전달할 수 있습니다.

`watch` 함수는 아래 코드와 같이 사용할 수 있습니다.

<div>
  <iframe src="https://codesandbox.io/embed/react-hook-form-watch-ftp6ry?fontsize=14&hidenavigation=1&theme=dark"
  style="width:100%; height:500px; border:0; border-radius: 10px; overflow:hidden;"
  title="React Hook Form - watch"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  ></iframe>
</div>

### `getValues`
`getValues`는 폼의 값을 가져오기 위해 사용되는 함수입니다. `watch` 함수와 유사한 기능을 제공하지만 차이점은 `getValues`는 입력을 감시하지 않기 때문에 입력 값이 변경되어도 값이 업데이트되지 않습니다. 형태는 아래 코드와 같습니다.

```ts
getValues: (payload?: string | string[]) => Object
```

`getValues` 함수는 아래 코드와 같이 사용할 수 있습니다.

<div>
  <iframe src="https://codesandbox.io/embed/react-hook-form-getvalues-2s33zj?fontsize=14&hidenavigation=1&theme=dark"
  style="width:100%; height:500px; border:0; border-radius: 10px; overflow:hidden;"
  title="React Hook Form - getValues"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  ></iframe>
</div>

### `getFieldState`
`getFieldState` 함수는 각각의 폼 요소의 상태를 반환하는 함수입니다. 형태는 아래 코드와 같습니다.

```ts
getFieldState: (name: string, formState?: Object) => ({isDirty, isTouched, invalid, error})
```

`getFieldState`의 반환 값이 반응형으로 동작하길 원한면 두 번째 파라미터에 `useForm`의 반환값인 `formState`를 넘겨주면 됩니다. `getFieldState` 함수는 아래 코드와 같이 사용할 수 있습니다.

<div>
  <iframe src="https://codesandbox.io/embed/react-hook-form-getfieldstate-2qjmxf?fontsize=14&hidenavigation=1&theme=dark"
  style="width:100%; height:500px; border:0; border-radius: 10px; overflow:hidden;"
  title="React Hook Form - getFieldState"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  ></iframe>
</div>

### `setError`
`setError` 함수는 수동으로 에러를 설정할 때 사용되는 함수입니다. 형태는 아래 코드와 같습니다.

```ts
setError:(name: string, error: FieldError, { shouldFocus?: boolean }) => void
```

#### props
- `name: string`: 에러를 발생시킬 특정 요소의 이름을 지정합니다.
- `error: { type: string, message?: string, types: MultipleFieldErrors }`: 에러 정보를 담는 객체입니다.
  - `type`에는 에러 타입, `message`는 에러 문구, `types`에는 여러 개의 에러를 설정해야 할 경우 `{ [key: string]: string | string[] | boolean | undefined }` 형태로 여러 개의 에러 정보를 담을 수 있습니다.
- `config: 	{ shouldFocus?: boolean }`: `shouldFocus`를 `true`로 설정할 경우 에러가 발생한 요소에 `ref`가 지정되어 있다면, 에러가 발생한 요소에 포커스 됩니다.

아래 코드와 같이 `setError` 함수를 사용할 수 있습니다.

<div>
  <iframe src="https://codesandbox.io/embed/react-hook-form-seterror-k8jc28?fontsize=14&hidenavigation=1&theme=dark"
  style="width:100%; height:500px; border:0; border-radius: 10px; overflow:hidden;"
  title="React Hook Form - setError"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  ></iframe>
</div>

### `clearErrors`
`clearErrors` 함수는 수동으로 에러를 초기화하는 함수입니다. 형태는 아래 코드와 같습니다.

```ts
clearErrors: (name?: string | string[]) => void
```

#### props
- `name?: string | string[]`: 에러를 초기화할 요소의 이름을 지정합니다.
  - `clearErrors()`와 같이 첫 번째 파라미터에 아무 값도 전달하지 않는다면 모든 에러가 초기화됩니다.
  - `clearErrors('yourDetails.firstName')`와 같이 첫 번째 파라미터에 문자열을 넘기면 문자열 이름을 가진 요소의 에러가 초기화됩니다.
  - `clearErrors(['yourDetails.firstName', 'yourDetails.lastName'])`와 같이 첫 번째 파라미터에 문자열 배열을 넘기면 문자열 배열에 있는 요소의 에러가 초기화됩니다.

아래 코드와 같이 `clearErrors` 함수를 사용할 수 있습니다.

<div>
  <iframe src="https://codesandbox.io/embed/react-hook-form-clearerrors-63qt55?fontsize=14&hidenavigation=1&theme=dark"
  style="width:100%; height:500px; border:0; border-radius: 10px; overflow:hidden;"
  title="React Hook Form - clearErrors"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  ></iframe>
</div>

### `setValue`
`setValue` 함수는 특정 요소의 값을 동적으로 할당하기 위해 사용되는 함수입니다. 형태는 아래 코드와 같습니다.

```ts
setValue: (name: string, value: unknown, config?: Object) => void
```

#### props
- `name: string`: 값을 업데이트할 요소의 이름을 지정합니다.
- `value: unknown`: 요소의 업데이트할 값을 지정합니다.
- `config?: { shouldValidate: boolean; shouldDirty: boolean; shouldTouch: boolean; }`
  - `setValue` 함수를 실행 후에, 폼 상태를 업데이트하기 위한 플래그 설정을 지정합니다.
  - `config.shouldValidate`를 `true`로 설정하면, `setValue` 함수로 값이 업데이트된 후 유효성 검사를 진행합니다.
    - `setValue` 함수로 변경된 요소만 유효성 검사를 진행하고, `deps`로 정의된 종속성이 있는 요소의 유효성 검사는 하지 않습니다.
  - `config.shouldDirty`를 `true`로 설정하면, `setValue` 함수로 값이 업데이트된 후 `defaultValues`에서 설정 한 값과 비교하여 변경되었다면 `formState.isDirty` 플래그는 `true`가 됩니다.
  - `config.shouldTouch`를 `true`로 설정하면, `setValue` 함수로 값이 업데이트된 후 요소가 touch 된 것으로 판단하고 `formState.touchedFields.{name}` 플래그는 `ture`가 됩니다.

아래 코드와 같이 `setValue` 함수를 사용할 수 있습니다.

<div>
  <iframe src="https://codesandbox.io/embed/react-hook-form-getfieldstate-forked-k5qvv3?fontsize=14&hidenavigation=1&theme=dark"
  style="width:100%; height:500px; border:0; border-radius: 10px; overflow:hidden;"
  title="React Hook Form - setValue"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  ></iframe>
</div>

### `trigger`
`trigger` 함수는 수동으로 유효성 검사를 하기 위해 사용되는 함수입니다. 종속성 있는 유효성을 검사해야 할 때 유용하게 사용됩니다. 형태는 아래 코드와 같습니다.

```ts
trigger: (name?: string | string[], config?: { shouldFocus: boolean }) => Promise<boolean>
```

#### props
- `name?: string | string[]`: 유효성 검사를 할 요소의 이름을 지정합니다.
  - `trigger()`와 같이 파라미터를 전달하지 않는다면 모든 필드의 유효성 검사를 합니다.
  - `trigger('details.firstName')`와 같이 파라미터에 문자열을 전달하면 문자열에 해당하는 이름을 가진 필드의 유효성 검사를 합니다.
  - `trigger(['details.lastName'])`와 같이 파라미터에 문자열 배열을 전달하면 배열 안에 있는 문자열의 이름을 가진 필드의 유효성 검사를 합니다.
- `config?: { shouldFocus: boolean }`
  - `shouldFocus`를 `true`로 설정할 경우 유효성을 통과하지 못한 요소에 포커스를 주게 됩니다.

#### returns
- `Promise<boolean>`
  - 유효성 결과를 비동기 데이터(`Promise<boolean>` 형태)로 반환합니다.
  - `const result = await trigger()`에서 `result`의 값이 `true`이면 유효성을 통과한 상태이고, `false`이면 유효성을 통과하지 못한 상태입니다.

아래 코드와 같이 `trigger` 함수를 사용할 수 있습니다.

<div>
  <iframe src="https://codesandbox.io/embed/react-hook-form-trigger-rmsxgt?fontsize=14&hidenavigation=1&theme=dark"
  style="width:100%; height:500px; border:0; border-radius: 10px; overflow:hidden;"
  title="React Hook Form - trigger"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  ></iframe>
</div>

### `formState`
`formState`는 폼 전체 상태 정보를 담고 있는 객체입니다. 폼의 상태를 알고 싶을 때 유용하게 사용할 수 있는 값입니다. 형태는 아래 코드와 같습니다.

```ts
type FormState<TFieldValues extends FieldValues> = {
  isDirty: boolean;
  isLoading: boolean;
  isSubmitted: boolean;
  isSubmitSuccessful: boolean;
  isSubmitting: boolean;
  isValidating: boolean;
  isValid: boolean;
  submitCount: number;
  defaultValues?: undefined | Readonly<DeepPartial<TFieldValues>>;
  dirtyFields: Partial<Readonly<FieldNamesMarkedBoolean<TFieldValues>>>;
  touchedFields: Partial<Readonly<FieldNamesMarkedBoolean<TFieldValues>>>;
  errors: FieldErrors<TFieldValues>;
};
```

#### fields
- `isDirty: boolean`: 사용자가 폼을 수정하여 `getValues() !== defaultValues`라면 `true`로 설정됩니다.
- `isLoading: boolean`: 아래 코드와 같이 비동기로 `defaultValues`를 설정 중이라면 `true`로 설정됩니다.
- `isSubmitted: boolean`: 폼이 submit 된 적이 있다면 `true`로 설정됩니다. `reset` 함수를 호출하면 다시 `false`로 설정됩니다.
- `isSubmitSuccessful: boolean`: 유효성 에러 없이 정상적으로 submit이 호출되었다면, `true`로 설정됩니다.
- `isSubmitting: boolean`: 폼이 submit 중인 경우 `true`로 설정됩니다.
- `isValidating: boolean`: 폼이 유효성 검사 중인 경우 `true`로 설정됩니다.
- `isValid: boolean`: 유효성 검사를 통과하지 못한 경우 `true`로 설정됩니다.
- `submitCount: number`: submit이 호출된 횟수를 저장합니다. 유효성 검사가 통과하지 못했더라도 submit이 호출되면 1씩 증가합니다.
- `defaultValues: object`: `useForm` 훅의 `defaultValues`로 전달된 값이나 `reset` 함수로 업데이트된 `defaultValues` 값을 저장합니다.
- `dirtyFields: object`: 사용자가 수정하여 값이 변경된 요소의 이름을 저장합니다.
  - `defaultValues`와 비교하여 변경되었는지 판단하기 때문에 `useForm` 훅을 사용할 때 `defaultValues`를 정의해 줘야 합니다.
- `touchedFields: object`: 사용자 액션이 있었던 요소의 이름을 저장합니다.
- `errors: object`: 유효성 검증이 실패한 요소의 에러 정보를 저장합니다.

`formState`의 사용 방법은 아래 코드를 참고 바랍니다.

<div>
  <iframe src="https://codesandbox.io/embed/react-hook-form-formstate-pcmjjp?fontsize=14&hidenavigation=1&theme=dark"
  style="width:100%; height:500px; border:0; border-radius: 10px; overflow:hidden;"
  title="React Hook Form - formState"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  ></iframe>
</div>

### `reset`
`reset` 함수는 폼의 상태나 값을 초기화할 때 사용하는 함수입니다. 특정 상태는 유지할 수 있도록 옵션을 제공합니다. 형태는 아래 코드와 같습니다.

```ts
reset: <T>(values?: T | ResetAction<T>, options?: Record<string, boolean>) => void
```

#### props
- `values?: object`: 폼의 값을 재설정하기 위한 파라미터입니다. `values` 파라미터를 전달하지 않아도 되는 옵셔널 한 값이지만 전달하게 되면, `defaultValues` 전체를 전달하는 것이 좋습니다.
- `options?: Record<string, boolean>`: 폼의 상태를 유지할 수 있도록 제공하는 옵션들입니다.
  - `options.keepErrors: boolean`는 에러를 유지하도록 하는 플래그입니다.
  - `options.keepDirty: boolean`는 `formState.isDirty` 값을 유지하도록 하는 플래그입니다.
  - `options.keepDirtyValues: boolean`는 `formState.dirtyFields` 값을 유지하도록 하는 플래그입니다.
  - `options.keepValues: boolean`는 폼의 값을 변경하지 않고 유지하도록 하는 플래그입니다.
  - `options.keepDefaultValues: boolean`는 `formState.defaultValues` 값을 유지하도록 하는 플래그입니다. `reset` 함수의 첫 번째 파라미터를 전달하여 실행하면 `defaultValues`가 변경되지만, `true`로 설정할 경우에는 변경되지 않습니다.
  - `options.keepIsSubmitted: boolean`는 `formState.isSubmitted` 값을 유지하도록 하는 플래그입니다.
  - `options.keepTouched: boolean`는 필드의 `isTouched` 값을 유지하도록 하는 플래그입니다.
  - `options.keepSubmitCount: boolean`는 `formState.submitCount` 값을 유지하도록 하는 플래그입니다.

`reset` 함수의 예제 코드는 아래 코드를 참고 바랍니다.

<div>
  <iframe src="https://codesandbox.io/embed/react-hook-form-formstate-forked-r8xtyk?fontsize=14&hidenavigation=1&theme=dark"
  style="width:100%; height:500px; border:0; border-radius: 10px; overflow:hidden;"
  title="React Hook Form - reset"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  ></iframe>
</div>

### `resetField`
`reset` 함수는 폼 전체를 초기화할 때 사용하는 함수라면, `resetField` 함수는 특정 필드를 초기화할 때 사용하는 함수입니다. 형태는 아래 코드와 같습니다.

```ts
resetField: (name: string, options?: Record<string, boolean | any>) => void
```

#### props
- `name: string`: 값을 재설정하기 위한 필드의 이름입니다.
- `options?: Record<string, boolean | any>`: `reset` 함수와 동일하게 상태를 유지할 수 있도록 옵션을 제공합니다.
  - `options.keepError: boolean`는 에러를 유지하도록 하는 플래그입니다.
  - `options.keepDirty: boolean`는 `isDirty`와 `dirtyFields`를 유지하도록 하는 플래그입니다.
  - `options.keepTouched: boolean`는 필드의 `isTouched` 값을 유지하도록 하는 플래그입니다.
  - `options.defaultValue: unknown`
    - 해당 값을 전달하지 않는다면 `defaultValues`의 값으로 초기화됩니다.
    - 해당 값을 전달하면 전달된 값으로 초기화되고, `defaultValues` 값이 변경됩니다. `undefined` 값은 지원하지 않습니다.

`resetField` 함수의 예제 코드는 아래 코드를 참고 바랍니다.

<div>
  <iframe src="https://codesandbox.io/embed/react-hook-form-resetfield-8hstfg?fontsize=14&hidenavigation=1&theme=dark"
  style="width:100%; height:500px; border:0; border-radius: 10px; overflow:hidden;"
  title="React Hook Form - resetField"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  ></iframe>
</div>

### `handleSubmit`
`handleSubmit` 함수는 유효성 검사가 통과되면 폼 데이터를 받을 수 있는 콜백 함수를 제공하는 함수입니다. 첫 번째 파라미터는 유효성을 통과한 폼 데이터를 받을 수 있는 콜백 함수이고 두 번째 파라미터는 유효성을 통과하지 못할 경우 유효성 에러를 받을 수 있는 콜백함수입니다. 형태는 아래 코드와 같습니다.

```ts
handleSubmit: (
  (data: Object, e?: Event) => Promise<void>,
  (errors: Object, e?: Event) => void
) => Promise<void>
```

#### props
- `(data: Object, e?: Event) => Promise<void>`: 유효성 검사가 통과된 폼 데이터를 파라미터로 전달하는 콜백함수입니다.
  - `data: Object` 유효성 검사를 통과한 폼 데이터입니다.
  - `e?: Event` 이벤트 객체입니다.
- `(errors: Object, e?: Event) => void`: 유효성 검사가 실패했을 때 에러 데이터를 전달하는 콜백함수입니다.
  - `errors: Object` 유효성 검사 실패 시 실패 정보가 에러 데이터입니다.
  - `e?: Event` 이벤트 객체입니다.

`handleSubmit` 함수의 예제 코드는 아래 코드를 참고 바랍니다.

<div>
  <iframe src="https://codesandbox.io/embed/react-hook-form-handlesubmit-w4wmft?fontsize=14&hidenavigation=1&theme=dark"
  style="width:100%; height:500px; border:0; border-radius: 10px; overflow:hidden;"
  title="React Hook Form - handleSubmit"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  ></iframe>
</div>

### `unregister`
`unregister` 함수는 폼 관리를 위해 `register` 함수로 등록한 것을 취소할 수 있게 만드는 함수입니다. 첫 번째 파라미터는 등록 취소할 필드명이고 두 번째 파라미터는 등록 휘소한 후에 상태를 유지하기 위한 옵션입니다. 형태는 아래 코드와 같습니다.

```ts
unregister: (name: string | string[], options?: Record<string, boolean>) => void
```

#### props
- `name: string | string[]`
  - unregister 할 요소의 이름입니다.
- `options?: Record<string, boolean>`
  - 상태를 유지할 수 있도록 옵션을 제공합니다.
  - `options.keepDirty: boolean`는 `isDirty`와 `dirtyFields`를 유지하도록 하는 플래그입니다.
  - `options.keepTouched: boolean`는 필드의 `isTouched` 값을 유지하도록 하는 플래그입니다.
  - `options.keepIsValid: boolean`는 `isValid` 값을 유지하도록 하는 플래그입니다.
  - `options.keepTouched: boolean`는 필드의 `isTouched` 값을 유지하도록 하는 플래그입니다.
  - `options.keepValue: boolean`는 폼의 값을 변경하지 않고 유지하도록 하는 플래그입니다.
  - `options.keepDefaultValue: boolean`는 `defaultValues` 값을 유지하도록 하는 플래그입니다.

`unregister` 함수의 첫 번째 파라미터에 전달된 필드들이 화면에서 제거되면 `handleSubmit` 함수의 콜백 함수 파라미터에 포함되지 않습니다. `unregister` 함수의 예제 코드는 아래 코드를 참고 바랍니다.

<div>
  <iframe src="https://codesandbox.io/embed/react-hook-form-unregister-5yj35v?fontsize=14&hidenavigation=1&theme=dark"
  style="width:100%; height:500px; border:0; border-radius: 10px; overflow:hidden;"
  title="React Hook Form - unregister"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  ></iframe>
</div>

### `control`
`control` 객체는 Controlled 방식의 `Controller` 컴포넌트나 `useController` 훅을 사용할 때 함께 사용되는 값입니다. 아래 코드와 같이 사용할 수 있습니다.

```tsx
import { useForm, Controller } from "react-hook-form";

function App() {
  const { control } = useForm();

  return (
    <Controller
      render={({ field }) => <input {...field} />}
      name="firstName"
      control={control}
      defaultValue=""
    />
  );
}
```

### `register`
`register` 함수는 Uncontrolled 함식으로 폼을 관리할 때 사용되는 함수입니다. 아래 코드와 같은 형태를 가지고 있습니다.

```ts
register: (name: string, options?: RegisterOptions) => ({ onChange, onBlur, name, ref });

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

#### props
- `name: string`
  - 설정한 값에 따라 폼 데이터에 구조를 결정됩니다.
  - `register('firstName')`: `{firstName: 'value'}`이 폼의 결과 값이 됩니다.
  - `register('name.firstName')`: `{name: { firstName: 'value' }}`이 폼의 결과 값이 됩니다.
  - `register('name.firstName.0')`: `{name: { firstName: [ 'value' ] }}`이 폼의 결과 값이 됩니다.
- `options?: RegisterOptions`
  - 폼 요소의 유효성 조건 등 폼 요소를 관리하기 위해 사용되는 옵션입니다. 옵션 별 타입 정보와 옵션 정보는 위의 코드를 참고 바랍니다.

#### returns
`register` 함수의 반환 값은 보통 객체 구조 분해(`...`)를 사용하여 폼 요소의 속성으로 전달됩니다.

- `onChange`: 요소의 `onChange`입니다.
- `onBlur`: 요소의 `onBlur`입니다.
- `name`: 요소의 `name` 속성입니다.
- `ref`: 요소의 `ref`에 할당할 경우, 유효성 검사에 실패할 경우 요소가 포커스 됩니다.

### `setFocus`
`setFocus` 함수를 실행하면 첫 번째 파라미터로 설정한 요소가 포커스 됩니다. 아래 코드와 같은 형태를 가지고 있습니다.

```ts
setFocus:(name: string, options?: SetFocusOptions) => void
```

#### props
- `name: string`
  - 포커스 할 특정 요소의 이름을 지정합니다.
- `options?: SetFocusOptions`
  - `options.shouldSelect: boolean`: `true`로 설정할 경우 문자열이 selection 된 상태로 포커스 됩니다.

아래 코드와 같이 사용할 수 있습니다.

<div>
  <iframe src="https://codesandbox.io/embed/react-hook-form-setfocus-sc7pxq?fontsize=14&hidenavigation=1&theme=dark"
  style="width:100%; height:500px; border:0; border-radius: 10px; overflow:hidden;"
  title="React Hook Form - setFocus"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  ></iframe>
</div>

## `Controller`
React Hook Form은 기본적으로 Uncontrolled 방식을 사용하지만 `Controller` 컴포넌트를 사용하는 Controlled 방식을 사용하여 [Ant Design](https://ant.design/)이나 [Mui](https://mui.com/) 등의 UI 라이브러리와 함께 사용할 수 있습니다.

#### props
`Controller` 컴포넌트의 속성은 아래와 같습니다.

- `name: FieldValues`: `register` 함수의 첫 번째 파라미터와 동일한 역할을 합니다. 요소를 구별할 수 있는 유니크한 값을 지정해야 합니다.
- `control: Control`: `useForm` 함수의 반환 값인 `control`을 그대로 전달해야 합니다. `FormProvider`를 사용했을 경우 생략 가능합니다.
- `render: Function`: 화면에 그려질 컴포넌트를 반환하는 함수입니다.
- `defaultValue: unknown`: 요소의 기본값을 정의합니다. 해당 필드에 값이 정의되거나, `useForm`의 `defaultValues`에 값이 정의되어야 합니다. `undefined`는 사용할 수 없기 때문에 `null` 혹은 `''`를 사용하여 정의되지 않을 값을 대신해야 합니다.
- `rules: RegisterOptions`: `register` 함수의 `RegisterOptions` 옵션과 동일한 값을 설정할 수 있습니다.
- `shouldUnregister: boolean`: `true`로 지정할 경우 요소가 언마운트 되면 입력값이 제거됩니다.

#### `render` 함수의 props
`render` 함수의 반환 값이 화면에 그려지게 되는데, `render` 함수의 파라미터는 아래와 같습니다.

- `field`: 요소의 속성으로 전달되어야 하는 값들을 담고 있는 객체입니다.
  - `field.onChange: (value: any) => void`: 요소의 값이 변경될 경우 호출되어야 하는 함수입니다. `undefined`가 `value`로 전달되면 안 됩니다.
  - `field.onBlur: () => void`: 요소의 blur 이벤트가 발생할 경우 호출되어야 하는 함수입니다.
  - `field.value: unknown`: 요소의 값을 저장하고 있는 변수입니다.
  - `field.name: string`: 요소의 name 속성에 지정되어야 할 값입니다.
  - `field.ref: React.Ref`: 요소의 `Ref`에 지정되어야 할 값입니다. 해당 값을 지정하면 유효성 검사에 실패될 때 포커스됩니다.
- `fieldState`: 요소의 상태를 저장하고 있는 객체입니다.
  - `fieldState.invalid: boolean`: 요소가 유효성 검사를 통과한 경우 `true`입니다.
  - `fieldState.isTouched: boolean`: 요소에 Touch 이벤트가 발생했을 경우 `true`입니다.
  - `fieldState.isDirty: boolean`: 요소에 지정된 기본값에서 변경이 있을 경우 `true`입니다.
  - `fieldState.error: object`: 요소가 유효성 검사를 통과하지 못했을 때 유효성 에러 정보를 담고 있는 객체입니다.
- `formState`: `useForm`의 `formState` 반환 값과 동일한 값을 가집니다. [formState](/tech/react/react-hook-form-api-reference/#formstate)를 참고 바랍니다.

`Controller` 컴포넌트의 사용 방법은 아래 코드와 같습니다.

<div>
  <iframe src="https://codesandbox.io/embed/react-hook-form-controller-xrm6p3?fontsize=14&hidenavigation=1&theme=dark"
  style="width:100%; height:500px; border:0; border-radius: 10px; overflow:hidden;"
  title="React Hook Form - Controller"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  ></iframe>
</div>

## `useController`
`useController` 훅은 `Controller` 컴포넌트를 훅 형태로 사용할 수 있도록 기능을 제공하는 훅입니다. `useController` 훅의 파라미터로 [`Controller` 컴포넌트의 props](/tech/react/react-hook-form-api-reference/#props-12)와 동일한 값을 사용하면 되고, `useController` 훅의 반환 값은 [`render` 함수의 props](/tech/react/react-hook-form-api-reference/#render-함수의-props)와 동일합니다.

`useController` 컴포넌트의 사용방법은 아래 코드와 같습니다.

<div>
  <iframe src="https://codesandbox.io/embed/react-hook-form-usecontroller-jv4rm7?fontsize=14&hidenavigation=1&theme=dark"
  style="width:100%; height:500px; border:0; border-radius: 10px; overflow:hidden;"
  title="React Hook Form - useController"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  ></iframe>
</div>

## `FormProvider`와 `useFormContext`
`useForm` 훅의 반환 값을 하위 컴포넌트로 전달해야 할 때 컴포넌트의 트리 구조가 복잡해지면 Prop Drilling 문제가 발생할 수 있습니다. 이런 Prop Drilling 문제를 해결하기 위해 하위 컴포넌트로 콘텍스트를 전달할 수 있는 `FormProvider` 컴포넌트와 `useFormContext` 훅을 제공합니다. 아래 코드와 같이 `FormProvider` 컴포넌트와 `useFormContext` 훅을 사용할 수 있습니다.

<div>
  <iframe src="https://codesandbox.io/embed/react-hook-form-formprovider-useformcontext-p6cf2p?fontsize=14&hidenavigation=1&theme=dark"
  style="width:100%; height:500px; border:0; border-radius: 10px; overflow:hidden;"
  title="React Hook Form - FormProvider &amp; useFormContext"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  ></iframe>
</div>

## `useWatch`
`useWatch` 훅은 `useForm` 훅의 반환 값인 `watch` 함수와 동일한 기능을 합니다. 아래 코드와 같은 형태를 가집니다.

```ts
useWatch: ({ control?: Control, name?: string, defaultValue?: unknown, disabled?: boolean }) => object
```

#### props
- `name: string | string[] | undefined`: 구독할 대상의 이름을 지정합니다.
  - `string` 형태일 경우 특정 요소를 구독합니다. `useWatch`의 반환 값은 `unknown` 형태가 됩니다.
  - `string[]` 형태일 경우 배열 안의 요소들을 구독합니다. `useWatch`의 반환 값은 `unknown[]` 형태가 됩니다.
  - `undefined`으로 `name`을 정의하지 않을 경우 모든 요소를 구독합니다. `useWatch`의 반환 값은 `{[key:string]: unknown}` 형태가 됩니다.
- `control: Control`: `useForm` 함수의 반환 값인 `control`을 그대로 전달해야 합니다. `FormProvider`를 사용했을 경우 생략 가능합니다.
- `defaultValue: unknown`: `useWatch`이 반환할 초기 값입니다.
- `disabled: boolean = false`: 구독을 비활성화하는 옵션입니다.
- `exact: boolean = false`: 요소의 이름과 정확히 일치할 때 구독을 하는 옵션입니다.

`useWatch`의 사용 방법은 아래 코드와 같습니다.

<div>
  <iframe src="https://codesandbox.io/embed/react-hook-form-usewatch-9vp6p3?fontsize=14&hidenavigation=1&theme=dark"
  style="width:100%; height:500px; border:0; border-radius: 10px; overflow:hidden;"
  title="React Hook Form - useWatch"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  ></iframe>
</div>

`watch` 함수는 `useForm` 훅의 반환 값으로 루트에서 `watch` 함수를 사용하면 루트에서 리렌더링이 발생하지만 `useWatch` 훅은 하위 컴포넌트에서 사용하여 특정 하위 컴포넌트만 리렌더링이 발생하게 됩니다.

## `useFormState`
`useFormState` 훅은 `useForm` 훅의 반환 값인 `formState`와 동일한 값을 반환합니다. 아래 코드와 같은 형태를 가집니다.

```ts
useFormState: ({ control: Control }) => FormState
```

#### props
- `name: string | string[] | undefined`: 상태 정보를 가져올 대상의 이름을 지정합니다.
  - `string` 형태일 경우 특정 요소의 상태를 가져옵니다.
  - `string[]` 형태일 경우 배열 안의 요소들의 상태를 가져옵니다.
  - `undefined`으로 `name`을 정의하지 않을 경우 모든 요소를 구독합니다.
- `control: Control`: `useForm` 함수의 반환 값인 `control`을 그대로 전달해야 합니다. `FormProvider`를 사용했을 경우 생략 가능합니다.
- `disabled: boolean = false`: 구독을 비활성화하는 옵션입니다.
- `exact: boolean = false`: 요소의 이름과 정확히 일치할 때 구독을 하는 옵션입니다.

반환 값은 [FormState](/tech/react/react-hook-form-api-reference/#formstate)와 동일한 형태를 가집니다. 아래 코드와 같이 `useFormState` 훅을 사용할 수 있습니다.

<div>
  <iframe src="https://codesandbox.io/embed/react-hook-form-useformstate-md88vr?fontsize=14&hidenavigation=1&theme=dark"
  style="width:100%; height:500px; border:0; border-radius: 10px; overflow:hidden;"
  title="React Hook Form - useFormState"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  ></iframe>
</div>

## `useFieldArray`
`useFieldArray` 훅은 동적으로 폼 배열에 추가하거나 삭제해야 할 때 사용하는 훅입니다. `useFieldArray` 훅의 형태는 아래 코드와 같습니다.

```ts
useFieldArray: UseFieldArrayProps

export type UseFieldArrayProps<
  TKeyName extends string = 'id',
  TControl extends Control = Control
> = {
  name: string;
  keyName?: TKeyName;
  control?: TControl;
  rules?: Pick<
    RegisterOptions<TFieldValues>,
    'maxLength' | 'minLength' | 'validate' | 'required'
  >;
};
```

#### props
- `name: string`: 동적 폼 배열 요소의 이름입니다.
- `control: Control`: `useForm` 함수의 반환 값인 `control`을 그대로 전달해야 합니다. `FormProvider`를 사용했을 경우 생략 가능합니다.
- `shouldUnregister: boolean`
  - `false`가 기본으로 요소가 언마운트 되어도 입력 값이 유지됩니다.
  - `true`로 지정할 경우 요소가 언마운트 되면 입력값이 제거됩니다.
- `keyName: string = "id"`: key prop으로 사용할 필드의 이름입니다. 다음 메이저 버전에서 제거 예정입니다.
- `rules: object`: `RegisterOptions` 타입의 `maxLength`, `minLength`, `required`를 제공합니다.
  - `maxLength`: 최대 길이에 대한 유효성을 설정합니다.
  - `minLength`: 최소 길이에 대한 유효성을 설정합니다.
  - `validate`: `validate`을 사용하면 커스텀한 유효성 검증 로직을 생성할 수 있습니다.
  - `required`: 필수 값에 대한 유효성을 설정합니다.

#### returns
- `fields: (object & { id: string })[]`: `useForm`의 `defaultValues` 중 `useFieldArray`의 `name`에 명시한 필드를 반환합니다. 이 반환 값에는 key prop에 사용할 `keyName`에 명시된 이름으로 유니크한 값이 포함됩니다.
- `append: (obj: object | object[], focusOptions: { shouldFocus?: boolean; focusIndex?: number; focusName?: string; }) => void`: 폼 배열 끝에 요소를 추가하는 함수입니다.
  - `obj: object | object[]`: `object` 형태일 경우 폼 배열 끝에 요소를 추가합니다. `object[]` 형태일 경우 폼 배열 끝에 요소들을 추가합니다.
  - `focusOptions`: 추가된 요소에 포커스를 주기 위한 옵션입니다.
    - `focusOptions.shouldFocus?: boolean`: 포커스 할지 결정하는 값입니다.
    - `focusOptions.focusIndex?: number`: 포커스 할 요소의 위치를 지정합니다.
    - `focusOptions.focusName?: string`: 포커스 할 요소의 이름을 지정합니다.
- `prepend: (obj: object | object[], focusOptions) => void`: 폼 배열 앞에 요소를 추가하는 함수입니다.
  - `obj: object | object[]`: `object` 형태일 경우 폼 배열 앞에 요소를 추가합니다. `object[]` 형태일 경우 폼 배열 앞에 요소들을 추가합니다.
  - `focusOptions`: 추가된 요소에 포커스를 주기 위한 옵션입니다.
    - `focusOptions.shouldFocus?: boolean`: 포커스 할지 결정하는 값입니다.
    - `focusOptions.focusIndex?: number`: 포커스 할 요소의 위치를 지정합니다.
    - `focusOptions.focusName?: string`: 포커스 할 요소의 이름을 지정합니다.
- `insert: (index: number, value: object | object[], focusOptions) => void`: 특정 위치에 요소를 추가하는 함수입니다.
  - `index: number`: 추가될 위치를 지정합니다.
  - `value: object | object[]`: `value`가 지정된 위치에 추가됩니다.
  - `focusOptions`: 추가된 요소에 포커스를 주기 위한 옵션입니다.
    - `focusOptions.shouldFocus?: boolean`: 포커스 할지 결정하는 값입니다.
    - `focusOptions.focusIndex?: number`: 포커스 할 요소의 위치를 지정합니다.
    - `focusOptions.focusName?: string`: 포커스 할 요소의 이름을 지정합니다.
- `swap: (from: number, to: number) => void`: `from`과 `to`의 위치가 서로 바뀝니다.
- `move: (from: number, to: number) => void`: `from` 위치에 있는 요소가 `to`로 이동합니다.
- `update: (index: number, obj: object) => void`: `index` 위치에 있는 요소가 `obj`로 업데이트 됩니다.
- `replace: (obj: object[]) => void`: 폼 배열 전체가 `obj`로 교체됩니다.
- `remove: (index?: number | number[]) => void`: `index` 위치에 있는 요소들이 제거됩니다.

아래 코드와 같이 `useFieldArray` 훅을 사용할 수 있습니다.

<div>
  <iframe src="https://codesandbox.io/embed/react-hook-form-usefieldarray-6kgzv5?fontsize=14&hidenavigation=1&theme=dark"
  style="width:100%; height:500px; border:0; border-radius: 10px; overflow:hidden;"
  title="React Hook Form - useFieldArray"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  ></iframe>
</div>

## 부록

### `ErrorMessage`
`ErrorMessage` 컴포넌트는 에러 메시지를 좀 더 간편하게 사용할 수 있도록 돕는 컴포넌트입니다. 아래 코드와 같이 패키지를 설치한 후 사용할 수 있습니다.

```bash
npm install @hookform/error-message
# or
pnpm add @hookform/error-message
# or
yarn add @hookform/error-message
```

`ErrorMessage` 컴포넌트는 아래 코드와 같은 props를 전달할 수 있습니다.

#### props
- `name: string`: 어떤 필드의 에러 메시지를 표시할지 지정합니다.
- `errors: object`: `useForm` 훅의 반환 값인 `formState.errors`를 그대로 전달해야 합니다. `FormProvider`를 사용했을 경우 생략 가능합니다.
- `message: string | React.ReactElement`: 유효성 검증 실패 메시지가 없을 경우 `message`에 정의된 값이 화면에 노출됩니다.
- `as: React.ElementType | string`: 어떠한 태그, 컴포넌트로 에러메시지를 표시할지 지정합니다. `as="span"`, `as={<Text />}` 와 같이 사용할 수 있습니다.
- `render: ({ message: string | React.ReactElement, messages?: Object}) => any`: 에러 메시지를 커스텀할 수 있도록 제공하는 prop 함수입니다.

아래 코드와 같이 `ErrorMessage` 컴포넌트를 사용할 수 있습니다.

<div>
  <iframe src="https://codesandbox.io/embed/react-hook-form-usefieldarray-forked-ncmpdj?fontsize=14&hidenavigation=1&theme=dark"
  style="width:100%; height:500px; border:0; border-radius: 10px; overflow:hidden;"
  title="React Hook Form - ErrorMessage"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  ></iframe>
</div>

##### 참고
- [https://www.react-hook-form.com/](https://www.react-hook-form.com/)
