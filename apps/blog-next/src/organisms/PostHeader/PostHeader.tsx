import { parse, format } from 'date-fns';
import { IconText } from '@beomy/design-system-tailwind';
import { DateFormat } from '@/models/dateFormat';
import { H1 } from '@/atoms';
import { PostBannerImg } from '@/molecules';
import type { PostHeaderProps } from './PostHeader.types';

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
      <H1 className="m-0 text-7">{title}</H1>
      <div>
        <IconText icon="BsCalendar" className="mr-[20px] text-1 text-caption">
          {format(date, DateFormat.LOCALE_YYYY_MM_DD)}
        </IconText>
        <IconText icon="BsClock" className="text-1 text-caption">
          {timeToRead}분 소요
        </IconText>
      </div>
      <PostBannerImg img={thumbnail} />
    </div>
  );
};

export default PostHeader;
