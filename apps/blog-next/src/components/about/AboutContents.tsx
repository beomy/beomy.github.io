import { ReactNode } from 'react';

export type AboutContentsProps = {
  title: string;
  children: ReactNode;
};

const AboutContents = ({ title, children }: AboutContentsProps) => {
  return (
    <div className="mb-[60px] leading-[2]">
      <h2>{title}</h2>
      {children}
    </div>
  );
};

export default AboutContents;
