import { useState } from 'react';
import { useUpdateEffect } from '@beomy/utils';
import type { IconProps } from './Icon.types';
import * as Icons from '../../icons';
import { spinInStyles } from './Icon.styles';

const Icon = ({ type, ...props }: IconProps) => {
  const IconComponent = Icons[type];
  const [trigger, setTrigger] = useState<boolean>(false);

  useUpdateEffect(() => {
    setTrigger(true);
  }, [type]);

  return <IconComponent {...props} css={trigger ? spinInStyles : null} />;
};

export default Icon;