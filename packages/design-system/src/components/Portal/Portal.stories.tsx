import type { ComponentMeta } from '@storybook/react';
import React, { useCallback, useState } from 'react';
import styled from '@emotion/styled';
import { uniqueId } from 'lodash-es';
import Portal from './Portal';
import Message, { MessageTypes } from '../Message';

export default {
  title: 'Components/Portal',
  component: Portal,
} as ComponentMeta<typeof Portal>;

const StyledWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: end;
  padding: 10px;
  box-sizing: border-box;
  ${({ theme }) => theme.sizes.mediaQueries.xs} {
    width: 100%;
  }
`;

export const MessageExample = () => {
  const [message, setMessage] = useState<MessageTypes.MessageProps[]>([]);

  const handleCloseMessage = useCallback(
    (id?: string) => {
      setMessage((value) => value.filter((i) => i.id !== id));
    },
    [setMessage],
  );

  const info = useCallback(
    (text: string) => {
      setMessage((value) => {
        return value.concat({ id: uniqueId('info'), type: 'info', text });
      });
    },
    [setMessage],
  );

  return (
    <div>
      <button onClick={() => info('Message Popup')}>Add Message</button>
      <Portal>
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
      </Portal>
    </div>
  );
};
