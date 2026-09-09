import type { FieldSetProps } from './FieldSet.types';
import { cn } from '../../lib/cn';
import { fieldSetVariants } from './FieldSet.variants';

const FieldSet = ({ title, children, className, ...props }: FieldSetProps) => {
  return (
    <fieldset
      className={cn(fieldSetVariants({ hasTitle: !!title }), className)}
      {...props}
    >
      {title && <legend className="px-[5px] text-2 font-bold">{title}</legend>}
      {children}
    </fieldset>
  );
};

export default FieldSet;
