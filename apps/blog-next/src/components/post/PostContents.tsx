import './PostContents.css';

export type PostContentsProps = {
  html?: string;
};

const PostContents = ({ html }: PostContentsProps) => {
  return (
    <div
      className="post-contents"
      dangerouslySetInnerHTML={{ __html: html ?? '' }}
    />
  );
};

export default PostContents;
