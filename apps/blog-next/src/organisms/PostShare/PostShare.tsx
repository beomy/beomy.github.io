import { useCallback, useState } from 'react';
import { FieldSet, IconButton } from '@beomy/design-system-tailwind';
import ShareButton from '@/molecules/ShareButton';
import { useNotification } from '@/hooks';
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
    <FieldSet title="공유하기">
      <div className="flex w-full justify-between">
        <ShareButton
          target="facebook"
          url={url}
          size="24px"
          aria-label="facebook"
        />
        <ShareButton
          target="twitter"
          url={url}
          size="24px"
          aria-label="twitter"
        />
        <ShareButton
          target="linkedin"
          url={url}
          size="24px"
          aria-label="linkedin"
        />
        <ShareButton target="line" url={url} size="24px" aria-label="line" />
        <IconButton
          icon={isHover ? 'BsLink45Deg' : 'BsPaperclip'}
          size="24px"
          border
          aria-label="link"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onFocus={() => setHover(true)}
          onBlur={() => setHover(false)}
          onClick={handleClickChip}
        />
      </div>
    </FieldSet>
  );
};

export default PostShare;
