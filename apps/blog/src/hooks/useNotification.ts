import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { uniqueId } from 'lodash-es';
import { MessageTypes } from '@beomy/design-system';
import { messageState } from '@/stores/notificationStore';

const useNotification = () => {
  const [, setMessage] =
    useRecoilState<MessageTypes.MessageProps[]>(messageState);

  const info = useCallback(
    (text: string) => {
      setMessage((value) => {
        return value.concat({ id: uniqueId('info'), type: 'info', text });
      });
    },
    [setMessage],
  );
  const success = useCallback(
    (text: string) => {
      setMessage((value) => {
        return value.concat({ id: uniqueId('success'), type: 'success', text });
      });
    },
    [setMessage],
  );
  const warning = useCallback(
    (text: string) => {
      setMessage((value) => {
        return value.concat({ id: uniqueId('warning'), type: 'warning', text });
      });
    },
    [setMessage],
  );
  const error = useCallback(
    (text: string) => {
      setMessage((value) => {
        return value.concat({ id: uniqueId('error'), type: 'error', text });
      });
    },
    [setMessage],
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
