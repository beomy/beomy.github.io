import type { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import Icon from './Icon';

export default {
  title: 'Components/Icon',
  component: Icon,
} as ComponentMeta<typeof Icon>;

const Template: ComponentStory<typeof Icon> = (args) => <Icon {...args} />;

export const Default = Template.bind({});
Default.args = {
  type: 'BsSearch',
};
