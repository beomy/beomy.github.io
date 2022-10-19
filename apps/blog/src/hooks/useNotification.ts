import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { uniqueId } from 'lodash-es';
import { MessageTypes } from '@beomy/design-system';
import { messageState } from '@/stores/notification';

type UseNotificationType = () => {
  message: {
    info: (text: string) => void;
    success: (text: string) => void;
    warning: (text: string) => void;
    error: (text: string) => void;
  };
};

const useNotification: UseNotificationType = () => {
  const [, setMessage] =
    useRecoilState<MessageTypes.MessageProps[]>(messageState);

  const notification = useCallback(
    (text: string, type: MessageTypes.MessageProps['type'] = 'info') => {
      setMessage((value) => {
        return value.concat({ id: uniqueId(type), type, text });
      });
    },
    [setMessage],
  );
  const info = useCallback(
    (text: string) => notification(text, 'info'),
    [notification],
  );
  const success = useCallback(
    (text: string) => notification(text, 'success'),
    [notification],
  );
  const warning = useCallback(
    (text: string) => notification(text, 'warning'),
    [notification],
  );
  const error = useCallback(
    (text: string) => notification(text, 'error'),
    [notification],
  );

  return {
    message: {
      info,
      success,
      warning,
      error,
    },
  };
};

export default useNotification;
