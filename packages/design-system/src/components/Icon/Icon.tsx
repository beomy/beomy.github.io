import type { IconProps } from './Icon.types';
import { useState, useMemo } from 'react';
import { useUpdateEffect } from '@beomy/utils';
import * as Icons from '../../icons';
import * as S from './Icon.styles';

const Icon = ({ type, ...props }: IconProps) => {
  const IconComponent = Icons[type];
  const [trigger, setTrigger] = useState<boolean>(false);
  const isActive = useMemo(() => (trigger ? 'true' : 'false'), [trigger]);

  useUpdateEffect(() => setTrigger(true), [type]);

  return <S.Wrapper as={IconComponent} {...props} active={isActive} />;
};

export default Icon;
