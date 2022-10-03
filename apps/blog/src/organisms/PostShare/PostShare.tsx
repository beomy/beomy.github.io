import { useCallback, useState } from 'react';
import { IconButton } from '@beomy/design-system';
import ShareButton from '@/molecules/ShareButton';
import { useNotification } from '@/hooks';
import * as S from './PostShare.styles';
import { PostShareProps } from './PostShare.types';

export const PostShare = ({ url }: PostShareProps) => {
  const [isHover, setHover] = useState<boolean>(false);
  const { message } = useNotification();

  const handleClickChip = useCallback(async () => {
    await window.navigator.clipboard.writeText(url);
    setHover(false);
    message.info('링크가 복사되었습니다.');
  }, [message, url]);

  return (
    <S.Wrapper title="공유하기">
      <ShareButton target="facebook" url={url} size="24px" />
      <ShareButton target="twitter" url={url} size="24px" />
      <ShareButton target="linkedin" url={url} size="24px" />
      <ShareButton target="line" url={url} size="24px" />
      <IconButton
        icon={isHover ? 'BsLink45Deg' : 'BsPaperclip'}
        size="24px"
        border
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={handleClickChip}
      />
    </S.Wrapper>
  );
};

export default PostShare;
