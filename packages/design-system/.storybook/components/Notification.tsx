import type { Dispatch, SetStateAction } from 'react';
import React, { useCallback } from 'react';
import { Message, MessageTypes } from '../../src';
import styled from '@emotion/styled';

type NotificationProps = {
  message: MessageTypes.MessageProps[];
  setMessage: Dispatch<SetStateAction<MessageTypes.MessageProps[]>>;
};

const StyledWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: end;
  padding: 10px;
  box-sizing: border-box;
`;

const Notification = ({ message, setMessage }: NotificationProps) => {
  console.log(message);

  const handleCloseMessage = useCallback(
    (id: string) => {
      setMessage((value) => value.filter((i) => i.id !== id));
    },
    [setMessage],
  );

  return (
    <StyledWrapper>
      {message.map((item) => (
        <Message
          key={item.id}
          id={item.id}
          text={item.text}
          type={item.type}
          onClose={handleCloseMessage}
        />
      ))}
    </StyledWrapper>
  );
};

export default Notification;
