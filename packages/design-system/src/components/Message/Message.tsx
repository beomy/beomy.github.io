import type { IconTypes } from '../Icon';
import { useMemo, useCallback } from 'react';
import { useMount } from '@beomy/utils';
import IconButton from '../IconButton';
import { MessageProps } from './Message.types';
import * as S from './Message.styles';

const Message = ({
  id,
  type = 'info',
  delay = 2000,
  text,
  onClose,
  ...props
}: MessageProps) => {
  const icon: IconTypes.IconProps['type'] = useMemo(() => {
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
    <S.Wrapper {...props}>
      <S.IconText icon={icon} type={type}>
        {text}
      </S.IconText>
      <span>
        <IconButton icon="BsXCircle" aria-label="close" onClick={handleClose} />
      </span>
    </S.Wrapper>
  );
};

export default Message;
