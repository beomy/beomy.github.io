'use client';

import { useCallback } from 'react';
import { uniqueId } from 'lodash-es';
import { MessageTypes } from '@beomy/design-system-tailwind';
import { useNotificationStore } from '@/stores/notification';

type UseNotificationType = () => {
  message: {
    info: (text: string) => void;
    success: (text: string) => void;
    warning: (text: string) => void;
    error: (text: string) => void;
  };
};

const useNotification: UseNotificationType = () => {
  const addMessage = useNotificationStore((state) => state.addMessage);

  const notification = useCallback(
    (text: string, type: MessageTypes.MessageProps['type'] = 'info') => {
      addMessage({ id: uniqueId(type), type, text });
    },
    [addMessage],
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
