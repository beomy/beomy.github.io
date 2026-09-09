import { atom } from 'jotai';
import { MessageTypes } from '@beomy/design-system-tailwind';

export const messageState = atom<MessageTypes.MessageProps[]>([]);
