---
layout: post
title: '[Svelte] Module context'
featured-img: svelte/svelte-log.svg
height-img: 200px
category: [tech, svelte]
summary: Module context를 사용하면 같은 컴포넌트로 생성한 인스턴스 간의 코드를 공유할 수 있습니다.
---

이번 포스트에서는 코드를 공유할 수 있는 모듈 컨텍스트를 이야기하도록 하겠습니다.

# 코드 공유
`<script context="module">`를 사용하면 동일한 컴포넌트로 만들어진 인스턴스 간의 코드를 공유할 수 있습니다.

```html
<!-- App.svelte -->
<script>
  import AudioPlayer from './AudioPlayer.svelte';
</script>

<!-- https://musopen.org/music/9862-the-blue-danube-op-314/ -->
<AudioPlayer
  src="https://sveltejs.github.io/assets/music/strauss.mp3"
  title="The Blue Danube Waltz"
  composer="Johann Strauss"
  performer="European Archive"
/>

<!-- https://musopen.org/music/43775-the-planets-op-32/ -->
<AudioPlayer
  src="https://sveltejs.github.io/assets/music/holst.mp3"
  title="Mars, the Bringer of War"
  composer="Gustav Holst"
  performer="USAF Heritage of America Band"
/>
```

```html
<!-- AudioPlayer.svelte -->
<script context="module">
  let current;
</script>

<script>
  export let src;
  export let title;
  export let composer;
  export let performer;

  let audio;
  let paused = true;

  function stopOthers() {
    if (current && current !== audio) current.pause();
    current = audio;
  }
</script>

<style>
  article { margin: 0 0 1em 0; max-width: 800px }
  h2, p { margin: 0 0 0.3em 0; }
  audio { width: 100%; margin: 0.5em 0 1em 0; }
  .playing { color: #ff3e00; }
</style>

<article class:playing={!paused}>
  <h2>{title}</h2>
  <p><strong>{composer}</strong> / performed by {performer}</p>

  <audio
    bind:this={audio}
    bind:paused
    on:play={stopOthers}
    controls
    {src}
  ></audio>
</article>
```

![모듈 컨텍스트 코드 공유](/assets/img/posts/svelte/module_context_sharing_code.gif)

`AudioPlayer.svelte`의 `<script context="module">` 내에 작성된 코드는 같은 컴포넌트로 생성된 인스턴스 간에 코드를 공유할 수 있습니다. `let current`는 현재 재생되는 오디오를 저장하고 있습니다. `stopOthers` 함수로 현재 실행되고 있는 오디오가 현재 인스턴스에서 실행되는 오디오가 아니라면 일시정지시킵니다.

# 코드 내보내기
`<script context="module">` 내에 `export` 된 코드는 부모 컴포넌트에서 사용 가능합니다.

```html
<!-- App.svelte -->
<script>
  import AudioPlayer, { stopAll } from './AudioPlayer.svelte';
</script>

<button on:click={stopAll}>
  stop all audio
</button>

<!-- https://musopen.org/music/9862-the-blue-danube-op-314/ -->
<AudioPlayer
  src="https://sveltejs.github.io/assets/music/strauss.mp3"
  title="The Blue Danube Waltz"
  composer="Johann Strauss"
  performer="European Archive"
/>

<!-- https://musopen.org/music/43775-the-planets-op-32/ -->
<AudioPlayer
  src="https://sveltejs.github.io/assets/music/holst.mp3"
  title="Mars, the Bringer of War"
  composer="Gustav Holst"
  performer="USAF Heritage of America Band"
/>
```

```html
<script context="module">
  const elements = new Set();

  export function stopAll() {
    elements.forEach(element => {
      element.pause();
    });
  }
</script>

<script>
  import { onMount } from 'svelte';

  export let src;
  export let title;
  export let composer;
  export let performer;

  let audio;
  let paused = true;

  onMount(() => {
    elements.add(audio);
    return () => elements.delete(audio);
  });

  function stopOthers() {
    elements.forEach(element => {
      if (element !== audio) element.pause();
    });
  }
</script>

<style>
  article { margin: 0 0 1em 0; max-width: 800px }
  h2, p { margin: 0 0 0.3em 0; }
  audio { width: 100%; margin: 0.5em 0 1em 0; }
  .playing { color: #ff3e00; }
</style>

<article class:playing={!paused}>
  <h2>{title}</h2>
  <p><strong>{composer}</strong> / performed by {performer}</p>

  <audio
    bind:this={audio}
    bind:paused
    on:play={stopOthers}
    controls
    {src}
  ></audio>
</article>
```

![모듈 컨텍스트 코드 내보내기](/assets/img/posts/svelte/module_context_exports.gif)

`const elements`에는 이제까지 등록된 오디오들이 저장됩니다. `stopAll` 함수는 `<script context="module">` 내에서 `export` 되었기 때문에, 부모 컴포넌트에서 `stopAll`를 `import`하여 사용할 수 있습니다. `stopAll`는 모든 오디오를 일시정지시킵니다.

### 참고
- [https://svelte.dev/tutorial/sharing-code](https://svelte.dev/tutorial/sharing-code)
- [https://svelte.dev/tutorial/module-exports](https://svelte.dev/tutorial/module-exports)