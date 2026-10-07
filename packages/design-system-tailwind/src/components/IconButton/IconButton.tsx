import type { IconButtonProps } from './IconButton.types';
import Icon from '../Icon';
import { cn } from '../../lib/cn';
import { iconButtonVariants } from './IconButton.variants';

const IconButton = ({
  icon,
  border,
  size,
  className,
  type = 'button',
  ...props
}: IconButtonProps) => {
  return (
    <button
      type={type}
      className={cn(iconButtonVariants({ border }), className)}
      {...props}
    >
      <Icon type={icon} size={size} />
    </button>
  );
};

export default IconButton;
