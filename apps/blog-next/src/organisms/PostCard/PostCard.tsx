import Link from 'next/link';
import { format, parse } from 'date-fns';
import { CommentCount } from 'disqus-react';
import { IconText } from '@beomy/design-system-tailwind';
import { H4 } from '@/atoms';
import { PostBannerImg } from '@/molecules';
import { DateFormat } from '@/models/dateFormat';
import type { PostCardProps } from './PostCard.types';

const PostCard = ({
  title,
  summary,
  thumbnail,
  createdDate = new Date(),
  timeToRead,
  url,
}: PostCardProps) => {
  const date =
    createdDate instanceof Date
      ? createdDate
      : parse(createdDate, DateFormat.DASH_YYYY_MM_DD, new Date());
  const disqusConfig = {
    url: `https://beomy.github.io${url}`,
    identifier: `https://beomy.github.io${url}`,
    title,
  };

  return (
    <Link
      href={url ?? '#'}
      className="m-[10px] box-border flex w-[320px] flex-col rounded-[4px] border border-grey-90 bg-grey-100 leading-[1.4] text-title no-underline shadow-[rgb(0_0_0_/_6%)_0_4px_16px_0] max-sm:w-[calc(50%-20px)] max-xs:w-full"
    >
      <div className="relative overflow-hidden bg-white pt-[50%] [&_.post-banner-img]:absolute [&_.post-banner-img]:left-0 [&_.post-banner-img]:top-0 [&_.post-banner-img]:h-full [&_.post-banner-img]:w-full [&_.post-banner-img]:object-cover">
        <PostBannerImg img={thumbnail} />
      </div>
      <div className="grow shrink p-[15px] [&_h4]:text-title [&_p]:m-0 [&_p]:text-1 [&_p]:text-body">
        <H4 className="m-0 mb-[10px]">{title}</H4>
        <p>{summary}</p>
      </div>
      <div className="flex items-center justify-between border-t border-grey-90 px-[15px] py-[10px] text-caption">
        <div>
          <IconText icon="BsCalendar" className="mr-[10px] text-0">
            {format(date, DateFormat.LOCALE_YYYY_MM_DD)}
          </IconText>
          <IconText icon="BsClock" className="text-0">
            {timeToRead}분 소요
          </IconText>
        </div>
        <IconText icon="BsChatLeft" className="text-0">
          <CommentCount shortname="beomy" config={disqusConfig}>
            0
          </CommentCount>
          개의 댓글
        </IconText>
      </div>
    </Link>
  );
};

export default PostCard;
