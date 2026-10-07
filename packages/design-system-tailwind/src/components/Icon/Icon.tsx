'use client';

import type { IconProps } from './Icon.types';
import { useState } from 'react';
import * as Icons from '../../icons';
import { cn } from '../../lib/cn';

/**
 * 아이콘. `type` 이 바뀌면(예: 테마 토글 해↔달) spin-in 애니메이션으로 교체를 보여준다.
 *
 * 변경 감지는 "직전 렌더의 type 을 state 로 기억해 두고 렌더 중에 비교" 하는 React 권장 패턴을 쓴다
 * (https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes).
 * effect 로 감지하면 React StrictMode(개발 모드)가 effect 를 두 번 실행할 때 두 번째 실행을
 * 업데이트로 오인해 모든 아이콘이 첫 렌더부터 돌아 버린다. 렌더 중 비교는 type 이 같으면 아무 일도 없다.
 */
const Icon = ({ type, className, ...props }: IconProps) => {
  const IconComponent = Icons[type];
  const [prevType, setPrevType] = useState(type);
  const [trigger, setTrigger] = useState(false);

  if (type !== prevType) {
    // 렌더 중 setState: React 가 이 렌더 결과를 버리고 새 state 로 즉시 다시 렌더한다
    setPrevType(type);
    setTrigger(true);
  }

  return (
    <IconComponent
      className={cn(trigger && 'animate-spin-in', className)}
      {...props}
    />
  );
};

export default Icon;
