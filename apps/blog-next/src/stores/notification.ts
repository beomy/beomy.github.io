import { atom } from 'jotai';
import { MessageTypes } from '@beomy/design-system';

export const messageState = atom<MessageTypes.MessageProps[]>([]);
