import type { PostContentsProps } from './PostContents.types';
import './PostContents.css';

const PostContents = ({ html }: PostContentsProps) => {
  return (
    <div
      className="post-contents"
      dangerouslySetInnerHTML={{ __html: html ?? '' }}
    />
  );
};

export default PostContents;
