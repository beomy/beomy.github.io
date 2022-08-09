import { FiCalendar, FiClock, FiMessageSquare } from 'react-icons/fi';
import { format, parse } from 'date-fns';
import { CommentCount } from 'gatsby-plugin-disqus';
import { H4, P } from '@/atoms';
import { IconText, PostBannerImg } from '@/molecules';
import { DateFormat } from '@/model/dateFormat';
import type { PostCardProps } from './PostCard.types';
import * as S from './PostCard.styles';

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
    <S.Wrapper to={url}>
      <S.Header>
        <PostBannerImg img={thumbnail} />
      </S.Header>
      <S.Body>
        <H4 m="0 0 10px 0">{title}</H4>
        <P m={0} fontSize={1}>
          {summary}
        </P>
      </S.Body>
      <S.Footer>
        <div>
          <IconText Icon={FiCalendar} iconSize={14} fontSize={0} mr="10px">
            {format(date, DateFormat.LOCALE_YYYY_MM_DD)}
          </IconText>
          <IconText Icon={FiClock} iconSize={14} fontSize={0}>
            {timeToRead}분 소요
          </IconText>
        </div>
        <IconText Icon={FiMessageSquare} iconSize={14} fontSize={0}>
          <CommentCount config={disqusConfig} placeholder="0" />
          개의 댓글
        </IconText>
      </S.Footer>
    </S.Wrapper>
  );
};

export default PostCard;
