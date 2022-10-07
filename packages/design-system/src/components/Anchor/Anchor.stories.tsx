import type { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import styled from '@emotion/styled';
import Icon from '../Icon';
import Anchor from './Anchor';

export default {
  title: 'Components/Anchor',
  component: Anchor,
} as ComponentMeta<typeof Anchor>;

const Template: ComponentStory<typeof Anchor> = (args) => (
  <Anchor {...args}>Anchor</Anchor>
);

export const Default = Template.bind({});

export const ATag = Template.bind({});
ATag.args = {
  href: 'https://www.naver.com',
};

export const GatsbyLink = Template.bind({});
GatsbyLink.args = {
  to: 'https://www.naver.com',
};

const S = {
  Anchor: styled(Anchor)`
    display: flex;
    align-items: center;
    height: 70px;
    line-height: 1.4;
  `,
  Icon: styled.div`
    width: 35px;
    height: 35px;
  `,
  Contents: styled.div`
    margin-left: 15px;
    margin-right: auto;
    small {
      font-size: ${({ theme }) => theme.fontSizes[0]};
    }
  `,
};

export const BorderExample = () => (
  <S.Anchor to="https://www.naver.com" border>
    <S.Icon>
      <Icon type="BsChevronLeft" size="100%" />
    </S.Icon>
    <S.Contents>
      <small>이전 포스트</small>
      <div>CORS 란</div>
    </S.Contents>
  </S.Anchor>
);
