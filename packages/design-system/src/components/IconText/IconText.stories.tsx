import type { ComponentStory, ComponentMeta } from '@storybook/react';
import IconText from './IconText';

export default {
  title: 'Components/IconText',
  component: IconText,
} as ComponentMeta<typeof IconText>;

const Template: ComponentStory<typeof IconText> = (args) => (
  <IconText {...args}>IconText</IconText>
);

export const Default = Template.bind({});
Default.args = {
  icon: 'BsSearch',
};
