import React from 'react';
import { MdAccessTime, MdCalendarToday } from 'react-icons/md';
import { parse, format } from 'date-fns';
import { EDateFormat } from '@/model/dateFormat';
import { IPost } from '@/model/post';
import { H1 } from '@/atoms';
import { IconText, PostBannerImg } from '@/molecules';
import StyledPostHeader from './PostHeader.styled';

function PostHeader({ title, thumbnail, createdDate, timeToRead }: IPost) {
  const date =
    createdDate instanceof Date
      ? createdDate
      : parse(createdDate, EDateFormat.DASH_YYYY_MM_DD, new Date());

  return (
    <StyledPostHeader>
      <H1 m={0} fontSize={6}>
        {title}
      </H1>
      <div>
        <IconText Icon={MdCalendarToday} mr="20px" color="text2" fontSize={1}>
          {format(date, EDateFormat.LOCALE_YYYY_MM_DD)}
        </IconText>
        <IconText Icon={MdAccessTime} color="text2" fontSize={1}>
          {timeToRead}분 소요
        </IconText>
      </div>
      <PostBannerImg img={thumbnail} />
    </StyledPostHeader>
  );
}

export default PostHeader;
