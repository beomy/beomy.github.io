import { atom } from 'recoil';
import { MessageTypes } from '@beomy/design-system';

export const messageState = atom<MessageTypes.MessageProps[]>({
  key: 'messageState',
  default: [],
});
