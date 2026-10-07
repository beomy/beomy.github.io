'use client';

import { useCallback } from 'react';
import {
  FieldSet,
  Icon,
  cn,
  iconButtonVariants,
} from '@beomy/design-system-tailwind';
import ShareButton from './ShareButton';
import { useNotification } from '@/hooks';

export type PostShareProps = {
  url: string;
};

export const PostShare = ({ url }: PostShareProps) => {
  const { message } = useNotification();

  const handleClickChip = useCallback(async () => {
    await window.navigator.clipboard.writeText(url);
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
        {/* ShareButton 과 같은 이유로 hover 아이콘 전환은 CSS 로만 처리한다 */}
        <button
          type="button"
          className={cn(iconButtonVariants({ border: true }), 'group')}
          aria-label="link"
          onClick={handleClickChip}
        >
          <Icon
            type="BsPaperclip"
            size="24px"
            className="group-hover:hidden group-focus-visible:hidden"
          />
          <Icon
            type="BsLink45Deg"
            size="24px"
            className="hidden group-hover:inline group-hover:animate-spin-in group-focus-visible:inline"
          />
        </button>
      </div>
    </FieldSet>
  );
};

export default PostShare;
