import { Anchor, Icon } from '@beomy/design-system-tailwind';
import type { Post } from '@/models/post';

export type PostNavigatorProps = {
  previous: Post | null;
  next: Post | null;
};

const BTN_WRAPPER =
  'h-[70px] grow shrink basis-0 mb-[10px] first-of-type:mr-[5px] last-of-type:ml-[5px] empty:h-0 max-xs:grow-0 max-xs:shrink-0 max-xs:basis-auto max-xs:first-of-type:mr-0 max-xs:last:ml-0';

const PostNavigator = ({ previous, next }: PostNavigatorProps) => {
  return (
    <div className="mt-[20px] flex items-center justify-between leading-[1.4] max-xs:block">
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
