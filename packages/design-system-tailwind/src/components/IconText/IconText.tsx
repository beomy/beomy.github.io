import type { IconTextProps } from './IconText.types';
import Icon from '../Icon';
import { cn } from '../../lib/cn';

const IconText = ({ icon, children, className, ...props }: IconTextProps) => {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-[5px] align-middle',
        className,
      )}
      {...props}
    >
      <Icon type={icon} />
      <span>{children}</span>
    </span>
  );
};

export default IconText;
