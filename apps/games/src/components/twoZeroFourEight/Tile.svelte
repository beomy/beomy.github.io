<script lang="ts">
  import type { Tile } from '@/model'
  import { appear } from '@/transition'

  export let tile: Tile
</script>

<div
  class="tile tile-{tile.number} position-{tile.point.x}-{tile.point.y}"
  class:merged={tile.isMerged}
  class:delete={tile.isDelete}
>
  <div in:appear={{ delay: 100, duration: 200 }} class="tile-inner">
    {tile.number}
  </div>
</div>

<style lang="scss">
  @import '../../assets/sass/variables.scss';
  @import '../../assets/sass/variables_2048.scss';

  @keyframes pop {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }

  @for $i from 1 to 5 {
    @for $j from 1 to 5 {
      .position-#{$i}-#{$j} {
        transform: translate(#{($i - 1) * $move}, #{($j - 1) * $move});
      }
    }
  }

  .tile {
    position: absolute;
    transition: 100ms ease-in-out;
    transition-property: transform;
    width: ceil($cell);
    height: ceil($cell);
    line-height: ceil($cell);
  }

  .delete {
    z-index: -1;
  }
  .merged {
    .tile-inner {
      animation: pop 200ms ease 100ms;
    }
  }

  .tile-inner {
    background: #edc22e;
    color: #f9f6f2;
    line-height: ceil($cell);
    border-radius: 3px;
    text-align: center;
    font-weight: bold;
    z-index: 10;
    font-size: 25px;
  }

  .tile-2 .tile-inner {
    background: #eee4da;
    color: #776e65;
    font-size: $xlFont;
  }
  .tile-4 .tile-inner {
    background: #ede0c8;
    color: #776e65;
    font-size: $xlFont;
  }
  .tile-8 .tile-inner {
    background: #f2b179;
    color: #f9f6f2;
    font-size: $xlFont;
  }
  .tile-16 .tile-inner {
    background: #f59563;
    color: #f9f6f2;
    font-size: $xlFont;
  }
  .tile-32 .tile-inner {
    background: #f67c5f;
    color: #f9f6f2;
    font-size: $xlFont;
  }
  .tile-64 .tile-inner {
    background: #f65e3b;
    color: #f9f6f2;
    font-size: $xlFont;
  }
  .tile-128 .tile-inner {
    background: #edcf72;
    color: #f9f6f2;
    font-size: $lgFont;
  }
  .tile-256 .tile-inner {
    background: #edcc61;
    color: #f9f6f2;
    font-size: $lgFont;
  }
  .tile-512 .tile-inner {
    background: #edc850;
    color: #f9f6f2;
    font-size: $lgFont;
  }
  .tile-1024 .tile-inner {
    background: #edc53f;
    color: #f9f6f2;
    font-size: $mdFont;
  }
  .tile-2048 .tile-inner,
  .tile-4096 .tile-inner,
  .tile-8192 .tile-inner {
    font-size: $mdFont;
  }

  @media (max-width: $sm) {
    .tile {
      width: $smCell;
      height: $smCell;
      line-height: $smCell;
    }
    .tile-inner {
      line-height: $smCell;
      font-size: $smFont;
    }
    .tile-inner {
      font-size: $xsFont;
    }
    .tile-2 .tile-inner,
    .tile-4 .tile-inner,
    .tile-8 .tile-inner,
    .tile-16 .tile-inner,
    .tile-32 .tile-inner,
    .tile-64 .tile-inner {
      font-size: $mdFont;
    }
    .tile-128 .tile-inner,
    .tile-256 .tile-inner,
    .tile-512 .tile-inner {
      font-size: $smFont;
    }
    .tile-1024 .tile-inner,
    .tile-2048 .tile-inner,
    .tile-4096 .tile-inner,
    .tile-8192 .tile-inner {
      font-size: $xsFont;
    }
    @for $i from 1 to 5 {
      @for $j from 1 to 5 {
        .position-#{$i}-#{$j} {
          transform: translate(#{($i - 1) * $smMove}, #{($j - 1) * $smMove});
        }
      }
    }
  }
</style>
