import type { AnchorProps } from './Anchor.types';
import Link from 'next/link';
import { cn } from '../../lib/cn';
import { anchorVariants } from './Anchor.variants';

const Anchor = ({
  children,
  border,
  to,
  // Next 환경에서는 사용되지 않는 호환용 prop.
  partiallyActive: _partiallyActive,
  className,
  ...props
}: AnchorProps) => {
  const classes = cn(anchorVariants({ border }), className);

  if (to) {
    return (
      <Link href={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a className={classes} {...props}>
      {children}
    </a>
  );
};

export default Anchor;
