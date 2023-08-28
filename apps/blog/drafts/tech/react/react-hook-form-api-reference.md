---
layout: post
title: '[React] react-hook-form API 레퍼런스'
featured-img: react/react-hook-form.png
category: [tech, react]
summary: 사용하고 있는 외부 라이브러리 API를 자세히 알면 그 라이브러리에서 제공하는 다양한 기능들을 인지하고 사용할 수 있기 때문에 라이브러리를 더 멋있게 사용할 수 있습니다. 이번 포스트에서는 React Hook Form을 좀 더 멋있게 사용하기 위해 React Hook Form에서 제공하는 API들을 살펴보도록 하겠습니다.
---

사용하고 있는 외부 라이브러리 API를 자세히 알면 그 라이브러리에서 제공하는 다양한 기능들을 인지하고 사용할 수 있기 때문에 라이브러리를 더 멋있게 사용할 수 있습니다. 이번 포스트에서는 React Hook Form을 좀 더 멋있게 사용하기 위해 React Hook Form에서 제공하는 API들을 살펴보도록 하겠습니다.

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

- `mode: 'onChange' | 'onBlur' | 'onSubmit' | 'onTouched' | 'all' = 'onSubmit'`
  - 제출(submit)되기 전의 검증이 실행되는 이벤트를 정의합니다.
- `reValidateMode: onChange | onBlur | onSubmit = 'onChange'`
  - 제출(submit)된 후의 검증이 실행되는 이벤트를 정의합니다.
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
  - `undefined`로 기본 값을 정의하는 것은 피해야 합니다.
  - `reset` 함수로 초기화 할 경우, `defaultValues`에 설정한 값으로 초기화 됩니다.
  - `defaultValues`에 설정된 값은 제출(submit)에 포함됩니다.
  - `Moment`, `Luxon`과 같은 커스텀 프로토타입 메소드가 포함된 객체를 정의하는 것은 피해야 합니다.
- `values: Record<string, any>`
  - `defaultValues`와 유사한 목적으로 사용되지만 `defaultValues`와 다르게 `values`는 반응형으로 동작하여 `values` 값이 변경 되면 폼에 반영됩니다. 아래 예제에서 확인할 수 있습니다.
  - `defaultValues`와 `values`가 모두 적용되어 있다면, `values` 값이 폼에 적용됩니다.
- `resetOptions: KeepStateOptions`
  - `defaultValues`나 `values`가 업데이트 될 때 내부적으로 `reset` API가 호출되는데, 이 때 호출되는 `reset` API의 옵션을 설정해 주는 필드입니다. 자세한 내용은 [reset API](~~)를 참고 바랍니다.
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
  - 외부 유효성 검증 라이브러리를 사용하기 위해 사용되는 필드이지만([유효성 검증 - 외부 유효성 검증 라이브러리와 함께](/tech/react/react-hook-form/#외부-유효성-검증-라이브러리와-함께) 참고), 유효성 검증 로직을 직접 작성할 수도 있습니다. 직접 작성한 `resolver`는 아래 예제에서 살펴보도록 하겠습니다.
- `context: object`
  - `context` 필드를 사용하면 `resolver` 함수의 두번째 파라미터로 전달되거나, `@hookform/resolvers/yup`을 사용한다면 Yup의 context 객체에 주입됩니다.
- `shouldFocusError: boolean = true`
  - `true`가 기본 값으로 `ture`로 설정한 경우, 유효성 검사에 실패한 첫번째 요소가 포커스 됩니다.
  - 이 옵션을 사용하기 위해서는 `register` 함수의 반환 값인 `ref`(`Controller` 컴포넌트의 경우 `render` 함수의 `field.ref` 파라미터)가 요소의 `ref`에 전달 되어야 합니다.
- `shouldUnregister: boolean = false`
  - `false`가 기본으로 요소가 언마운트 되어도 입력 값이 유지됩니다. `true`로 지정할 경우 요소가 언마운트 되면 입력값이 제거됩니다.
- `shouldUseNativeValidation: boolean = false`
  - `false`가 기본 값으로 `true`로 설정한 경우 [브라우저 네이티브 검증](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation)이 동작하게 됩니다.
- `criteriaMode: 'firstError' | 'all'`
  - `firstError`가 기본 값으로 첫번째 유효성 에러만 `formState.errors` 객체에 담김니다.
  - `all`로 설정한 경우 모든 유효성 에러가 `formState.errors.types` 객체에 담김니다.
- `delayError: number`
  - 입력된 ms초 만큼 사용자에게 에러 표시를 지연시킵니다.
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

`useForm`의 반환 값들은 대부분 함수인데, 밑에서 `useForm`의 반환 값들을 하나씩 살펴보도록 하겠습니다.

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
  - `watch((data, { name, type }) => void)`와 같은 형태로 사용한 경우 모든 요소의 값을 구독하며, 값이 업데이트 되면 콜백이 실행됩니다. 구독 해제를 위한 함수를 포함한 객체(`{ unsubscribe: () => void }`)를 반환합니다.
- `defaultValue: Object | unknown`
  - `watch` 함수는 두번째 파라미터로 `defaultValue`를 전달할 수 있는데, `defaultValues`로 감시하는 요소의 값이 정의되어 있지 않을 경우 `defaultValue` 값을 반환합니다. `defaultValue` 마저도 정의되어 있지 않다면 초기값으로 `undfined`를 반환합니다. `defaultValues`와 `defaultValue`가 모두 정의되어 있다면 `defaultValue` 값을 반환합니다.
  - `watch('inputName')`와 같이 `name`에 문자열을 사용한 경우 `watch('inputName', 'one')`와 같이 `defaultValue`를 전달 할 수 있습니다.
  - `watch(['first', 'second'])`와 같이 `name`에 배열 형태를 사용한 경우 `watch(['first', 'second'], { first: 'one', second: 'two' })`와 같이 `defaultValue`를 전달 할 수 있습니다.

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
`getValues`는 폼의 값을 가져오기 위해 사용되는 함수입니다. `watch` 함수와 유사한 기능을 제공하지만 차이점은 `getValues`는 입력을 감시하지 않기 때문에 입력 값이 변경되어도 반환 값이 업데이트 되지 않습니다. 형태는 아래 코드와 같습니다.

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
`getFieldState`는 `react-hook-form@7.25.0`에서 추가된 함수로 각각의 폼 요소의 상태를 반환하는 함수입니다. 형태는 아래 코드와 같습니다.

```ts
getFieldState: (name: string, formState?: Object) => ({isDirty, isTouched, invalid, error})
```

`getFieldState`의 반환 값이 반응형으로 동작하지 않는다면 두번째 파라미터에 `useForm`의 반환값인 `formState`를 넘겨주면 반환 값이 반응형으로 동작하게 됩니다. `getFieldState` 함수는 아래 코드와 같이 사용할 수 있습니다.

<div>
  <iframe src="https://codesandbox.io/embed/react-hook-form-getfieldstate-2qjmxf?fontsize=14&hidenavigation=1&theme=dark"
  style="width:100%; height:500px; border:0; border-radius: 10px; overflow:hidden;"
  title="React Hook Form - getFieldState"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  ></iframe>
</div>

### `setError`
`setError` 함수는 수동으로 에러를 설정할 때 사용되는 함수 입니다. 형태는 아래 코드와 같습니다.

```ts
setError:(name: string, error: FieldError, { shouldFocus?: boolean }) => void
```

#### props
- `name: string`
  - 에러를 발생시킬 특정 요소의 이름을 지정합니다.
- `error: { type: string, message?: string, types: MultipleFieldErrors }`
  - 에러 정보를 담는 객체입니다.
  - `type`에는 에러 타입, `message`는 에러 문구, `types`에는 여러개의 에러를 설정해야 할 경우 `{ [key: string]: string | string[] | boolean | undefined }` 형태로 여러개의 에러 정보를 담을 수 있습니다.
- `config: 	{ shouldFocus?: boolean }`
  - `shouldFocus`를 `true`로 설정할 경우 에러가 발생한 요소에 `ref`가 지정되어 있다면, 에러가 발생한 요소에 포커스 됩니다.

아래 코드와 같이 `setError` 함수를 사용할 수 있습니다.

<div>
  <iframe src="https://codesandbox.io/embed/react-hook-form-v7-seterror-forked-5zfxy4?fontsize=14&hidenavigation=1&theme=dark"
  style="width:100%; height:500px; border:0; border-radius: 10px; overflow:hidden;"
  title="React Hook Form - setError"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  ></iframe>
</div>

### `clearErrors`
`clearErrors` 함수는 수동으로 에러를 초기화 하는 함수입니다. 형태는 아래 코드와 같습니다.

```ts
clearErrors: (name?: string | string[]) => void
```

#### props
- `name?: string | string[]`
  - 에러를 초기화할 요소의 이름을 지정합니다.
  - `clearErrors()`와 같이 첫번째 파라미터에 아무값도 전달하지 않는다면 모든 에러가 초기화 됩니다.
  - `clearErrors('yourDetails.firstName')`와 같이 첫번째 파라미터에 문자열을 넘기면 문자열 이름을 가진 요소의 에러가 초기화 됩니다.
  - `clearErrors(['yourDetails.firstName', 'yourDetails.lastName'])`와 같이 첫번째 파라미터에 문자열 배열을 넘기면 문자열 배열에 있는 요소의 에러가 초기화 됩니다.

아래 코드와 같이 `clearErrors` 함수를 사용할 수 있습니다.

<div>
  <iframe src="https://codesandbox.io/embed/react-hook-form-v7-clearerrors-forked-fpsl34?fontsize=14&hidenavigation=1&theme=dark"
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
- `name: string`
  - 값을 업데이트할 요소의 이름을 지정합니다.
- `value: unknown`
  - 요소의 업데이트할 값을 지정합니다.
- `config?: { shouldValidate: boolean; shouldDirty: boolean; shouldTouch: boolean; }`
  - `setValue` 함수를 실행 후에, 폼 상태를 업데이트 하기 위한 플래그 설정을 지정합니다.
  - `config.shouldValidate`를 `true`로 설정하면, `setValue` 함수로 값이 업데이트 된 후 유효성 검사를 진행합니다.
    - `setValue` 함수로 변경된 요소만 유효성 검사를 진행하고, `deps`로 정의된 종속성이 있는 요소의 유효성 검사는 하지 않습니다.
  - `config.shouldDirty`를 `true`로 설정하면, `setValue` 함수로 값이 업데이트 된 후 `defaultValues`에서 설정 한 값과 비교하여 변경 되었다면 `formState.isDirty` 플래그는 `true`가 됩니다.
  - `config.shouldTouch`를 `true`로 설정하면, `setValue` 함수로 값이 업데이트 된 후 요소가 touch 된 것으로 판단하고 `formState.touchedFields.{name}` 플래그는 `ture`가 됩니다.

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
- `name?: string | string[]`
  - 유효성 검사를 할 요소의 이름을 지정합니다.
  - `trigger()`와 같이 파라미터를 전달하지 않는다면 모든 필드의 유효성 검사를 합니다.
  - `trigger('details.firstName')`와 같이 파라미터에 문자열을 전달하면 문자열에 해당하는 이름을 가진 필드의 유효성 검사를 합니다.
  - `trigger(['details.lastName'])`와 같이 파라미터에 문자열 배열을 전달하면 배열 안에 있는 문자열의 이름을 가진 필드의 유효성 검사를 합니다.
- `config?: { shouldFocus: boolean }`
  - `shouldFocus`를 `true`로 설정할 경우 유효성을 통과하지 못한 요소에 포커스를 주게 됩니다.

#### returns
- `Promise<boolean>`
  - 유효성 결과를 비동기 데이터(`Promise<boolean>` 형태)로 반환합니다.
  - `const result = await trigger()`에서 `result`의 값이 `true`이면 유효성을 통과 한 상태이고, `false`이면 유효성을 통과하지 못한 상태입니다.

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
- `isDirty: boolean`
  - 사용자가 폼을 수정하여 `getValues() !== defaultValues`라면 `true`로 설정됩니다.
- `isLoading: boolean`
  - 아래 코드와 같이 비동기로 `defaultValues`를 설정 중이라면 `true`로 설정됩니다.
- `isSubmitted: boolean`
  - 폼이 submit 된 적이 있다면 `true`로 설정됩니다. `reset` 함수를 호출하면 다시 `false`로 설정됩니다.
- `isSubmitSuccessful: boolean`
  - 유효성 에러 없이 정상적으로 submit이 호출되었다면, `true`로 설정됩니다.
- `isSubmitting: boolean`
  - 폼이 submit 중인 경우 `true`로 설정됩니다.
- `isValidating: boolean`
  - 폼이 유효성 검사 중인 경우 `true`로 설정됩니다.
- `isValid: boolean`
  - 유효성 검사를 통과하지 못한 경우 `true`로 설정됩니다.
- `submitCount: number`
  - submit이 호출된 횟수를 저장합니다. 유효성 검사가 통과하지 못했더라도 submit이 호출되면 1씩 증가합니다.
- `defaultValues: object`
  - `useForm` 훅의 `defaultValues`로 전달된 값이나 `reset` 함수로 업데이트 된 `defaultValues` 값을 저장합니다.
- `dirtyFields: object`
  - 사용자가 수정하여 값이 변경된 요소의 이름을 저장합니다.
  - `defaultValues`와 비교하여 변경되었는지 판단하기 때문에 `useForm` 훅을 사용할 때 `defaultValues`를 정의해 줘야 합니다.
- `touchedFields: object`
  - 사용자 액션이 있었던 요소의 이름을 저장합니다.
- `errors: object`
  - 유효성 검증이 실패한 요소의 에러 정보를 저장합니다.

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
`reset` 함수는 폼의 상태나 값을 초기화 할 때 사용하는 함수 입니다. 특정 상태는 유지할 수 있도록 옵션을 제공합니다. 형태는 아래 코드와 같습니다.

```ts
reset: <T>(values?: T | ResetAction<T>, options?: Record<string, boolean>) => void
```

#### props
- `values?: object`
  - 폼의 값을 재설정하기 위한 파라미터입니다. `values` 파라미터를 전달하지 않아도 되는 옵셔널한 값이지만 전달하게 되면, `defaultValues` 전체를 전달하는 것이 좋습니다.
- `options?: Record<string, boolean>`
  - 폼의 상태를 유지할 수 있도록 제공하는 옵션들입니다.
  - `options.keepErrors: boolean`는 에러를 유지하도록 하는 플래그입니다.
  - `options.keepDirty: boolean`는 `formState.isDirty` 값을 유지하도록 하는 플래그입니다.
  - `options.keepDirtyValues: boolean`는 `formState.dirtyFields` 값을 유지하도록 하는 플래그입니다.
  - `options.keepValues: boolean`는 폼의 값을 변경하지 않고 유지하도록 하는 플래그입니다.
  - `options.keepDefaultValues: boolean`는 `formState.defaultValues` 값을 유지하도록 하는 플래그입니다. `reset` 함수의 첫번째 파라미터를 전달하여 실행하면 `defaultValues`가 변경되지만, `true`로 설정할 경우에는 변경되지 않습니다.
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
`reset` 함수는 폼 전체를 초기화할 때 사용하는 함수라면, `resetField` 함수는 특정 필드를 초기화 할 때 사용하는 함수입니다. 형태는 아래 코드와 같습니다.

```ts
resetField: (name: string, options?: Record<string, boolean | any>) => void
```

#### props
- `name: string`
  - 값을 재설정하기 위한 필드의 이름입니다.
- `options?: Record<string, boolean | any>`
  - `reset` 함수와 동일하게 상태를 유지할 수 있도록 옵션을 제공합니다.
  - `options.keepError: boolean`는 에러를 유지하도록 하는 플래그입니다.
  - `options.keepDirty: boolean`는 `isDirty`와 `dirtyFields`를 유지하도록 하는 플래그입니다.
  - `options.keepTouched: boolean`는 필드의 `isTouched` 값을 유지하도록 하는 플래그입니다.
  - `options.defaultValue: boolean`
    - 해당 값을 전달하지 않는다면 `defaultValues`의 값으로 초기화 됩니다.
    - 해당 값을 전달하면 전달 된 값으로 초기화 되고, `defaultValues` 값이 변경됩니다. `undefined` 값은 지원하지 않습니다.

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
`handleSubmit` 함수는 유효성 검사가 통과되면 폼 데이터를 받을 수 있는 콜백 함수를 제공하는 함수입니다. 첫번째 파라미터는 유효성을 통과한 폼 데이터를 받을 수 있는 콜백 함수이고 두번째 파라미터는 유효성을 통과하지 못할 경우 유효성 에러를 받을 수 있는 콜백함수입니다. 형태는 아래 코드와 같습니다.

```ts
((data: Object, e?: Event) => Promise<void>, (errors: Object, e?: Event) => void) => Promise<void>
```

#### props
- `(data: Object, e?: Event) => Promise<void>`
  - 유효성 검사가 통과된 폼 데이터를 파라미터로 전달하는 콜백함수 입니다.
  - `data: Object` 유효성 검사를 통과한 폼 데이터입니다.
  - `e?: Event` 이벤트 객체입니다.
- `(errors: Object, e?: Event) => void`
  -

### `unregister`

### `control`

### `register`

### `setFocus`

## useController

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

## Controller

## useFormContext
- FormProvider

## useWatch
~~간단한 예제~~

#### props
- name
- control
- defaultValue
- disabled
- exact

#### returns

## useFormState

#### props
- control
- name
- disabled
- exact

#### returns
- `formState`

## ErrorMessage

## useFieldArray
- dynamic input

##### 참고
- [https://www.react-hook-form.com/](https://www.react-hook-form.com/)
