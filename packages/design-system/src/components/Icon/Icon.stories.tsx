import type { ComponentStory, ComponentMeta } from '@storybook/react';
import React, { useState } from 'react';
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

export const IconChangeExample = () => {
  const [toggle, setToggle] = useState<boolean>(false);
  return (
    <>
      <div>
        <button onClick={() => setToggle((value) => !value)}>Toggle</button>
      </div>
      <Icon type={toggle ? 'BsLink45Deg' : 'BsFacebook'} size="24px" />
    </>
  );
};
