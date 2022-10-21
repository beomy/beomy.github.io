import type { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import IconButton from './IconButton';

export default {
  title: 'Components/IconButton',
  component: IconButton,
} as ComponentMeta<typeof IconButton>;

const Template: ComponentStory<typeof IconButton> = (args) => (
  <IconButton {...args} />
);

export const Default = Template.bind({});
Default.args = {
  icon: 'BsFacebook',
  size: '24px',
};
