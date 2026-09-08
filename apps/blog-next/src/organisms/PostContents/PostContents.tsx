import type { PostContentsProps } from './PostContents.types';
import * as S from './PostContents.styles';

const PostContents = ({ html }: PostContentsProps) => {
  return <S.Wrapper dangerouslySetInnerHTML={{ __html: html ?? '' }} />;
};

export default PostContents;
