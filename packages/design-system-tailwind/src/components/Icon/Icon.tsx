'use client';

import type { IconProps } from './Icon.types';
import { useState } from 'react';
import { useUpdateEffect } from '@beomy/utils';
import * as Icons from '../../icons';
import { cn } from '../../lib/cn';

const Icon = ({ type, className, ...props }: IconProps) => {
  const IconComponent = Icons[type];
  const [trigger, setTrigger] = useState<boolean>(false);

  useUpdateEffect(() => setTrigger(true), [type]);

  return (
    <IconComponent
      className={cn(trigger && 'animate-spin-in', className)}
      {...props}
    />
  );
};

export default Icon;