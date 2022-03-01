import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import cn from 'classnames';
import { IPost } from '@/model/post';
import { Link } from '@/atoms';
import StyledPostNavigator from './PostNavigator.styled';

interface IProp {
  previous: IPost;
  next: IPost;
}

function PostNavigator({ previous, next }: IProp) {
  return (
    <StyledPostNavigator>
      <div className={cn({ empty: !previous })}>
        {previous && (
          <Link to={previous.url} className="previous">
            <div className="icon">
              <FiChevronLeft size="auto" />
            </div>
            <div className="contents">
              <div>이전 포스트</div>
              <div>{previous.title}</div>
            </div>
          </Link>
        )}
      </div>
      <div className={cn({ empty: !next })}>
        {next && (
          <Link to={next.url} className="next">
            <div className="contents">
              <div>다음 포스트</div>
              <div>{next.title}</div>
            </div>
            <div className="icon">
              <FiChevronRight size="auto" />
            </div>
          </Link>
        )}
      </div>
    </StyledPostNavigator>
  );
}

export default PostNavigator;
