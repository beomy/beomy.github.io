import React from 'react';
import type { IconProps } from './Icon.types';
import * as Icons from '../../icons';

const Icon = ({ type, ...props }: IconProps) => {
  const IconComponent = Icons[type];
  return <IconComponent {...props} />;
};

export default Icon;
