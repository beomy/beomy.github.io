import type { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import Message from './Message';

export default {
  title: 'Components/Message',
  component: Message,
} as ComponentMeta<typeof Message>;

const Template: ComponentStory<typeof Message> = (args) => (
  <Message {...args} />
);

export const Default = Template.bind({});
Default.args = {
  text: 'Message',
};

export const LongText = Template.bind({});
LongText.args = {
  text: '길 글자를 입력합니다. 제대로 나올까요? 확인 한번 해 보겠습니다. 길 글자를 입력합니다. 제대로 나올까요? 확인 한번 해 보겠습니다. 길 글자를 입력합니다. 제대로 나올까요? 확인 한번 해 보겠습니다.',
};
