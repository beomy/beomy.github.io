import React from 'react';
import {
  MdAccessTime,
  MdCalendarToday,
  MdOutlineModeComment,
} from 'react-icons/md';
import { format, parse } from 'date-fns';
import { CommentCount } from 'gatsby-plugin-disqus';
import { IPost } from '@/model/post';
import { H4, P } from '@/atoms';
import { IconText, PostBannerImg } from '@/molecules';
import { EDateFormat } from '@/model/dateFormat';
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
  const disqusConfig = {
    url: `https://beomy.github.io${url}`,
    identifier: `https://beomy.github.io${url}`,
    title,
  };

  return (
    <StyledPostCard to={url}>
      <div className="header">
        <div>
          <PostBannerImg img={thumbnail} />
        </div>
      </div>
      <div className="body">
        <H4 m="0 0 10px 0">{title}</H4>
        <P m={0} fontSize={1}>
          {summary}
        </P>
      </div>
      <div className="footer">
        <div>
          <div>
            <IconText Icon={MdCalendarToday} fontSize={0} mr="10px">
              {format(date, EDateFormat.LOCALE_YYYY_MM_DD)}
            </IconText>
            <IconText Icon={MdAccessTime} fontSize={0}>
              {timeToRead}분 소요
            </IconText>
          </div>
          <IconText Icon={MdOutlineModeComment} fontSize={0}>
            <CommentCount config={disqusConfig} placeholder="0" />
            개의 댓글
          </IconText>
        </div>
      </div>
    </StyledPostCard>
  );
}

export default PostCard;
