import { Anchor, Icon } from '@beomy/design-system-tailwind';
import type { Post } from '@/models/post';

export type PostNavigatorProps = {
  previous: Post | null;
  next: Post | null;
};

// 버튼 사이 간격은 margin 이 아니라 부모의 gap 으로 준다. 버튼에 하단 margin 이 있으면 네비게이터 높이가 버튼보다 커져
// 사이드바(sticky 범위 = 본문 높이) 바닥과 버튼 바닥이 어긋난다. 이전/다음 중 하나가 없으면 빈 래퍼가 남는데,
// 데스크톱에선 남은 버튼이 반 폭을 유지하도록 그대로 두고(h-0 이라 세로엔 영향 없음), 모바일(세로 쌓임)에선 gap 이
// 빈 래퍼 앞뒤로 생기지 않게 숨긴다.
const BTN_WRAPPER =
  'h-[70px] grow shrink basis-0 empty:h-0 max-xs:grow-0 max-xs:shrink-0 max-xs:basis-auto max-xs:empty:hidden';

const PostNavigator = ({ previous, next }: PostNavigatorProps) => {
  return (
    <div className="mt-[20px] flex items-center justify-between gap-[10px] leading-[1.4] max-xs:flex-col max-xs:items-stretch">
      <div className={BTN_WRAPPER}>
        {previous && (
          <Anchor
            to={previous.url}
            border
            className="flex h-[70px] items-center leading-[1.4]"
          >
            <div className="h-[35px] w-[35px]">
              <Icon type="BsChevronLeft" size="100%" />
            </div>
            <div className="ml-[20px] mr-auto [&_small]:text-0">
              <small>이전 포스트</small>
              <div>{previous.title}</div>
            </div>
          </Anchor>
        )}
      </div>
      <div className={BTN_WRAPPER}>
        {next && (
          <Anchor
            to={next.url}
            border
            className="flex h-[70px] items-center text-right leading-[1.4]"
          >
            <div className="ml-auto mr-[20px] [&_small]:text-0">
              <small>다음 포스트</small>
              <div>{next.title}</div>
            </div>
            <div className="h-[35px] w-[35px]">
              <Icon type="BsChevronRight" size="100%" />
            </div>
          </Anchor>
        )}
      </div>
    </div>
  );
};

export default PostNavigator;
