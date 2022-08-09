<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { remaindHintCount } from '@/stores/navHint'
  import { noteFlag } from '@/stores/navNote'

  export let list: string[] = ['undo', 'new']

  const dispatch = createEventDispatcher()

  function undo(): void {
    dispatch('undo')
  }

  function newGame(): void {
    dispatch('newGame')
  }

  function remove(): void {
    dispatch('remove')
  }

  function note(): void {
    dispatch('note')
  }

  function hint(): void {
    if ($remaindHintCount > 0) {
      dispatch('hint')
    }
  }
</script>

<div class="navigation-buttons">
  {#if list.includes('undo')}
    <div class="action-item undo" on:click={undo}>
      <svg
        class="icon-game-control"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 27 27"
        ><path
          fill="currentColor"
          fill-rule="evenodd"
          d="M13.021 0C9.207 0 5.589 1.715 3.125 4.609V.521a.521.521 0 0 0-1.042 0v5.208c0 .288.234.521.521.521h5.208a.522.522 0 1 0 0-1.042H3.977c2.267-2.619 5.566-4.166 9.044-4.166C19.625 1.042 25 6.416 25 13.021 25 19.626 19.625 25 13.021 25 6.416 25 1.042 19.626 1.042 13.021a.521.521 0 0 0-1.042 0c0 7.18 5.84 13.021 13.021 13.021 7.18 0 13.021-5.841 13.021-13.021C26.042 5.841 20.201 0 13.021 0"
        /></svg
      >
      <div class="text">실행 취소</div>
    </div>
  {/if}
  {#if list.includes('remove')}
    <div class="action-item remove" on:click={remove}>
      <svg
        class="icon-game-control"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 30"
        ><path
          fill="currentColor"
          fill-rule="evenodd"
          d="M13.861 28.126l7.01-7.017.004-.003.002-.002 9.58-9.59a2.584 2.584 0 0 0 .763-1.842c0-.695-.271-1.35-.763-1.843L23.373.739c-.986-.986-2.7-.984-3.682 0l-9.58 9.59-.004.002-.002.003-9.344 9.35A2.592 2.592 0 0 0 0 21.529c0 .695.27 1.35.761 1.842l5.64 5.645a.528.528 0 0 0 .369.153h24.48v-1.042H13.861zm6.566-26.65c.591-.587 1.621-.59 2.209 0l7.084 7.09c.295.295.458.688.458 1.106 0 .418-.163.81-.458 1.105L20.506 20l-9.292-9.302 9.213-9.222zM6.986 28.126l-5.488-5.492a1.557 1.557 0 0 1-.457-1.105c0-.418.163-.81.457-1.106l8.979-8.986 9.291 9.302-7.381 7.387H6.986z"
        /></svg
      >
      <div class="text">지우기</div>
    </div>
  {/if}
  {#if list.includes('note')}
    <div class="action-item note" class:active={$noteFlag} on:click={note}>
      <svg
        class="icon-game-control"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 30 30"
        ><path
          fill="currentColor"
          fill-rule="evenodd"
          d="M3.73 28.124l6.329-2.11c.006-.003.009-.007.014-.01a.514.514 0 0 0 .191-.117L28.403 7.732a2.593 2.593 0 0 0 .763-1.843c0-.697-.271-1.35-.763-1.843L25.099.74c-.981-.986-2.697-.988-3.682 0L3.277 18.895a.497.497 0 0 0-.118.19c-.001.004-.006.007-.008.013L.026 28.48c-.005.015.002.03-.002.043-.01.041-.024.08-.024.122 0 .028.01.052.016.08a.512.512 0 0 0 .504.442h28.646V28.13L3.73 28.124zM18.75 4.882l5.512 5.518L9.895 24.781l-5.514-5.519L18.75 4.882zm3.403-3.405c.591-.593 1.62-.59 2.21 0l3.304 3.307a1.562 1.562 0 0 1 0 2.211L25 9.663l-5.514-5.518 2.667-2.668zM3.874 20.228L8.93 25.29l-7.586 2.531 2.53-7.593z"
        /></svg
      >
      <div class="text">노트</div>
    </div>
  {/if}
  {#if list.includes('hint')}
    <div class="action-item hint" on:click={hint}>
      <svg
        class="icon-game-control"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 25 33"
        ><path
          fill="currentColor"
          fill-rule="evenodd"
          d="M17.075 29.179L7.7 31.262a.522.522 0 0 0 .112 1.03.57.57 0 0 0 .114-.013l9.375-2.083a.52.52 0 1 0-.226-1.017M12.5 0C5.607 0 0 5.607 0 12.5a12.49 12.49 0 0 0 7.608 11.505.52.52 0 1 0 .408-.958A11.447 11.447 0 0 1 1.042 12.5c0-6.318 5.14-11.458 11.458-11.458 6.318 0 11.459 5.14 11.459 11.458 0 4.603-2.738 8.743-6.976 10.547a.522.522 0 0 0-.316.479v2.619L7.7 28.137a.522.522 0 0 0 .112 1.03.57.57 0 0 0 .114-.013l9.375-2.083a.522.522 0 0 0 .408-.509v-2.697A12.486 12.486 0 0 0 25 12.5C25 5.607 19.393 0 12.5 0"
        /></svg
      >
      <div class="sub-text">{$remaindHintCount}</div>
      <div class="text">힌트</div>
    </div>
  {/if}
  {#if list.includes('new')}
    <div class="action-item new-game" on:click={newGame}>
      <div class="text">새로운 게임</div>
    </div>
  {/if}
</div>

<style lang="scss">
  .navigation-buttons {
    display: flex;
    .action-item {
      position: relative;
      width: 100%;
      height: 100%;
      cursor: pointer;
      text-align: center;
      svg {
        width: 35px;
        height: 35px;
      }
      .text {
        margin-top: 5px;
        font-size: 14px;
      }
      .sub-text {
        position: absolute;
        top: 0;
        left: 55%;
        width: 15px;
        height: 15px;
        line-height: 15px;
        border-radius: 10px;
        background-color: #fb3d3f;
        color: #fff;
        font-size: 12px;
      }
    }
    .new-game {
      width: 100%;
      height: initial;
      background: #8f7a66;
      border-radius: 3px;
      text-decoration: none;
      color: #f9f6f2;
      text-align: center;
      font-weight: bolder;
      margin: 0;
      cursor: pointer;
      .text {
        display: inline-block;
        vertical-align: middle;
        margin-top: 0;
        word-break: keep-all;
      }
      &:before {
        content: '';
        display: inline-block;
        height: 100%;
        vertical-align: middle;
      }
    }
    .note {
      &:after {
        content: 'OFF';
        display: inline-block;
        position: absolute;
        top: -1px;
        padding: 1px 4px;
        font-size: 12px;
        color: #fff;
        border-radius: 5px;
        background-color: #94a3b7;
        transition: all 0.2s ease-in-out;
      }
      &.active {
        &:after {
          content: 'ON';
          background-color: #4a90e2;
        }
      }
    }
  }
</style>
