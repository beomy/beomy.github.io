import { FiCalendar, FiClock } from 'react-icons/fi';
import { parse, format } from 'date-fns';
import { DateFormat } from '@/model/dateFormat';
import { H1 } from '@/atoms';
import { IconText, PostBannerImg } from '@/molecules';
import type { PostHeaderProps } from './PostHeader.types';
import * as S from './PostHeader.styles';

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
    <S.Wrapper>
      <H1 m={0} fontSize={6}>
        {title}
      </H1>
      <div>
        <IconText
          Icon={FiCalendar}
          mr="20px"
          color="text2"
          iconSize={16}
          fontSize={1}
        >
          {format(date, DateFormat.LOCALE_YYYY_MM_DD)}
        </IconText>
        <IconText Icon={FiClock} color="text2" iconSize={16} fontSize={1}>
          {timeToRead}분 소요
        </IconText>
      </div>
      <PostBannerImg img={thumbnail} />
    </S.Wrapper>
  );
};

export default PostHeader;
