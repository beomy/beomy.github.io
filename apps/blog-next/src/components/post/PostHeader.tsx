import { parse, format } from 'date-fns';
import { IconText } from '@beomy/design-system-tailwind';
import { DateFormat } from '@/models/dateFormat';
import PostBannerImg from '@/components/common/PostBannerImg';
import { Post } from '@/models/post';

export type PostHeaderProps = Post;

const PostHeader = ({
  title,
  thumbnail,
  createdDate = new Date(),
  timeToRead,
}: PostHeaderProps) => {
  const date =
    createdDate instanceof Date
      ? createdDate
      : parse(createdDate, DateFormat.DASH_YYYY_MM_DD, new Date());

  return (
    <div className="leading-[1.5] [&>div]:mb-[30px] [&_.post-banner-img]:block [&_.post-banner-img]:h-auto [&_.post-banner-img]:w-full [&_.post-banner-img]:rounded-[8px]">
      <h1 className="m-0 text-7">{title}</h1>
      <div>
        <IconText icon="BsCalendar" className="mr-[20px] text-1 text-caption">
          {format(date, DateFormat.LOCALE_YYYY_MM_DD)}
        </IconText>
        <IconText icon="BsClock" className="text-1 text-caption">
          {timeToRead}분 소요
        </IconText>
      </div>
      {/* 상단 배너는 이 페이지의 LCP 요소: lazy 없이 먼저 받는다.
          썸네일 규격은 2000×1000 으로 고정이라 상수로 영역을 미리 확보한다(CLS 방지) */}
      <PostBannerImg img={thumbnail} priority width={2000} height={1000} />
    </div>
  );
};

export default PostHeader;
