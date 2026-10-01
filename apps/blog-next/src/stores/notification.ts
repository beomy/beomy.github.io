import { create } from 'zustand';
import type { MessageTypes } from '@beomy/design-system-tailwind';

type Message = MessageTypes.MessageProps;

type NotificationStore = {
  messages: Message[];
  addMessage: (message: Message) => void;
  removeMessage: (id?: string) => void;
};

export const useNotificationStore = create<NotificationStore>((set) => ({
  messages: [],
  addMessage: (message) =>
    set((state) => ({ messages: state.messages.concat(message) })),
  removeMessage: (id) =>
    set((state) => ({ messages: state.messages.filter((i) => i.id !== id) })),
}));
