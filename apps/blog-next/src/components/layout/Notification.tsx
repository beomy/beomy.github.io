'use client';

import { Portal, Message } from '@beomy/design-system-tailwind';
import { useNotificationStore } from '@/stores/notification';

const Notification = () => {
  const messages = useNotificationStore((state) => state.messages);
  const removeMessage = useNotificationStore((state) => state.removeMessage);

  if (!messages.length) return null;
  return (
    <Portal>
      <div className="fixed right-0 top-[70px] z-[9] box-border flex flex-col items-end px-[10px] max-xs:w-full">
        {messages.map((item) => (
          <Message
            key={item.id}
            id={item.id}
            text={item.text}
            type={item.type}
            onClose={removeMessage}
          />
        ))}
      </div>
    </Portal>
  );
};

export default Notification;
