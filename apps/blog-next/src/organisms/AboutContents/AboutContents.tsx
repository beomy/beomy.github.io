import { H1 } from '@/atoms';
import type { AboutContentsProps } from './AboutContents.types';

const AboutContents = ({ title, children }: AboutContentsProps) => {
  return (
    <div className="mb-[60px] leading-[2]">
      <H1>{title}</H1>
      {children}
    </div>
  );
};

export default AboutContents;
