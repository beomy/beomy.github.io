<script lang="ts">
  import GameCard from '@/components/GameCard.svelte'

  const games = [
    {
      link: '#/2048Game',
      image: './images/2048_logo.png',
      text: '2048',
    },
    {
      link: '#/sudoku',
      image: './images/sudoku_logo.png',
      text: '스도쿠',
    },
  ]
</script>

{#each games as game, i (i)}
  <GameCard {game} />
{/each}
