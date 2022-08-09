<script lang="ts">
  import { onDestroy, createEventDispatcher } from 'svelte'
  import { spandTime, timeString, mode } from '@/stores/timer'

  const dispatch = createEventDispatcher()
  let timerId

  $: if ($mode === 'play') {
    play()
  } else {
    pause()
  }

  onDestroy(() => {
    pause()
  })

  function play() {
    timerId = setInterval(() => {
      $spandTime++
    }, 1000)
  }

  function pause() {
    if (timerId) {
      clearInterval(timerId)
    }
  }

  function onClickIcon() {
    if ($mode === 'play') {
      $mode = 'pause'
      dispatch('onPause')
    } else {
      $mode = 'play'
      dispatch('onPlay')
    }
  }
</script>

<span class="text">{$timeString}</span>
<div class="icon" on:click={onClickIcon}>
  {#if $mode === 'play'}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="27"
      x="60"
      viewBox="0 0 26 27"
      id="icon-pause"
      ><g fill="none" fill-rule="evenodd" transform="translate(.5 1)"
        ><circle cx="12.5" cy="12.5" r="12.5" stroke="#94A3B7" /><path
          fill="#94A3B7"
          d="M9.5 7h2v11h-2V7zm4 0h2v11h-2V7z"
        /></g
      ></svg
    >
  {:else}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="27"
      height="27"
      x="86"
      viewBox="0 0 27 27"
      id="icon-play"
      ><g fill="none" fill-rule="evenodd" transform="translate(1 1)"
        ><circle cx="12.5" cy="12.5" r="12.5" stroke="#94A3B7" /><path
          fill="#94A3B7"
          d="M16.301 13.324l-5.234 3.599a1 1 0 0 1-1.567-.824V8.901a1 1 0 0 1 1.567-.824l5.234 3.599a1 1 0 0 1 0 1.648z"
        /></g
      ></svg
    >
  {/if}
</div>

<style lang="scss">
  .text {
    vertical-align: middle;
    font-weight: 600;
    color: #94a3b7;
  }
  .icon {
    display: inline-block;
    vertical-align: middle;
    cursor: pointer;
  }
</style>
