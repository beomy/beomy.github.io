import { parse, format } from 'date-fns';
import { IconText } from '@beomy/design-system';
import { DateFormat } from '@/models/dateFormat';
import { H1 } from '@/atoms';
import { PostBannerImg } from '@/molecules';
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
        <IconText icon="BsCalendar" mr="20px">
          {format(date, DateFormat.LOCALE_YYYY_MM_DD)}
        </IconText>
        <IconText icon="BsClock">{timeToRead}분 소요</IconText>
      </div>
      <PostBannerImg img={thumbnail} />
    </S.Wrapper>
  );
};

export default PostHeader;
