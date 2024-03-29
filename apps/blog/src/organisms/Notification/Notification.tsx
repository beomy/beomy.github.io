import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { Portal, Message, MessageTypes } from '@beomy/design-system';
import { messageState } from '@/stores/notification';
import * as S from './Notification.styles';

const Notification = () => {
  const [message, setMessage] =
    useRecoilState<MessageTypes.MessageProps[]>(messageState);

  const handleCloseMessage = useCallback(
    (id?: string) => {
      setMessage((value) => value.filter((i) => i.id !== id));
    },
    [setMessage],
  );

  if (!message.length) return null;
  return (
    <Portal>
      <S.Wrapper>
        {message.map((item) => (
          <Message
            key={item.id}
            id={item.id}
            text={item.text}
            type={item.type}
            onClose={handleCloseMessage}
          />
        ))}
      </S.Wrapper>
    </Portal>
  );
};

export default Notification;
