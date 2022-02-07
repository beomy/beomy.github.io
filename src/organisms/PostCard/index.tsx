import React from 'react';
import { MdAccessTime, MdCalendarToday } from 'react-icons/md';
import { format, parse } from 'date-fns';
import { IPost } from '@/model/Post';
import { H4, P } from '@/atoms';
import { IconText, PostBannerImg } from '@/molecules';
import { EDateFormat } from '@/model/DateFormat';
import StyledPostCard from './PostCard.styled';

type IProp = IPost;

function PostCard({
  title,
  summary,
  thumbnail,
  createdDate,
  timeToRead,
  url,
}: IProp) {
  const date =
    createdDate instanceof Date
      ? createdDate
      : parse(createdDate, EDateFormat.DASH_YYYY_MM_DD, new Date());

  return (
    <StyledPostCard to={url}>
      <div className="header">
        <PostBannerImg img={thumbnail} />
      </div>
      <div className="body">
        <H4 m="0 0 10px 0">{title}</H4>
        <P m={0} fontSize={1}>
          {summary}
        </P>
      </div>
      <div className="footer">
        <P m={0} p="10px 15px" color="gray" fontSize={0} fontWeight="thin">
          <IconText Icon={MdCalendarToday} mr="20px">
            {format(date, EDateFormat.LOCALE_YYYY_MM_DD)}
          </IconText>
          <IconText Icon={MdAccessTime}>{timeToRead}분 소요</IconText>
        </P>
      </div>
    </StyledPostCard>
  );
}

export default PostCard;
