import type { IconProps } from '../Icon/Icon.types';
import type { MessageProps } from './Message.types';
import { useMemo, useCallback } from 'react';
import { useMount } from '@beomy/utils';
import IconText from '../IconText';
import IconButton from '../IconButton';
import { cn } from '../../lib/cn';
import { messageIconTextVariants } from './Message.variants';

const Message = ({
  id,
  type = 'info',
  delay = 2000,
  text,
  onClose,
  className,
  ...props
}: MessageProps) => {
  const icon: IconProps['type'] = useMemo(() => {
    if (type === 'success') {
      return 'BsCheckCircleFill';
    } else if (type === 'warning') {
      return 'BsExclamationCircleFill';
    } else if (type === 'error') {
      return 'BsXCircleFill';
    } else {
      return 'BsFillInfoCircleFill';
    }
  }, [type]);

  const handleClose = useCallback(() => {
    onClose?.(id);
  }, [id, onClose]);

  useMount(() => {
    const timeoutId = setTimeout(() => onClose?.(id), delay);
    return () => clearTimeout(timeoutId);
  });

  return (
    <div
      className={cn(
        'my-[10px] box-border inline-flex w-[400px] max-[767px]:w-full',
        'justify-between rounded-[10px] border border-grey-70 bg-grey-100 p-[10px]',
        'shadow-[0_4px_16px_0_color-mix(in_srgb,var(--grey-0)_20%,transparent)]',
        className,
      )}
      {...props}
    >
      <IconText icon={icon} className={messageIconTextVariants({ type })}>
        {text}
      </IconText>
      <span>
        <IconButton icon="BsXCircle" aria-label="close" onClick={handleClose} />
      </span>
    </div>
  );
};

export default Message;
