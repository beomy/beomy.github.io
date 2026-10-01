'use client';

import { useCallback } from 'react';
import { useAtom } from 'jotai';
import { Portal, Message } from '@beomy/design-system-tailwind';
import { messageState } from '@/stores/notification';

const Notification = () => {
  const [message, setMessage] = useAtom(messageState);

  const handleCloseMessage = useCallback(
    (id?: string) => {
      setMessage((value) => value.filter((i) => i.id !== id));
    },
    [setMessage],
  );

  if (!message.length) return null;
  return (
    <Portal>
      <div className="fixed right-0 top-[70px] z-[9] box-border flex flex-col items-end px-[10px] max-xs:w-full">
        {message.map((item) => (
          <Message
            key={item.id}
            id={item.id}
            text={item.text}
            type={item.type}
            onClose={handleCloseMessage}
          />
        ))}
      </div>
    </Portal>
  );
};

export default Notification;
