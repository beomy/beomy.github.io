<script lang="ts">
  export let game
</script>

<a class="game-link" href={game.link}>
  <div class="game-info">
    <div class="image-area">
      <img src={game.image} alt="게임 이미지" />
    </div>
    <div class="text-area">{game.text}</div>
  </div>
</a>

<style lang="scss">
  @import '../assets/sass/variables.scss';

  @media (min-width: $xs) {
    .game-link {
      width: 33.333%;
    }
  }

  @media (min-width: $sm) {
    .game-link {
      width: 33.333%;
    }
  }

  @media (min-width: $md) {
    .game-link {
      width: 33.333%;
    }
  }

  @media (min-width: $lg) {
    .game-link {
      width: 20%;
    }
  }

  @media (min-width: $xl) {
    .game-link {
      width: 20%;
    }
  }
  .game-link {
    display: inline-block;
    margin-bottom: 20px;
    text-decoration: none;
  }
  .game-info {
    margin-right: 20px;
  }
  img {
    width: 100%;
  }
  .text-area {
    text-align: center;
  }
</style>
