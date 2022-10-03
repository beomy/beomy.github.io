import type { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import FieldSet from './FieldSet';

export default {
  title: 'Components/FieldSet',
  component: FieldSet,
} as ComponentMeta<typeof FieldSet>;

const Template: ComponentStory<typeof FieldSet> = (args) => (
  <FieldSet {...args}>FieldSet</FieldSet>
);

export const Default = Template.bind({});

export const Title = Template.bind({});
Title.args = {
  title: 'Table Of Contents',
};
