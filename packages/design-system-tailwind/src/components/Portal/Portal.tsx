import type { PortalProps } from './Portal.types';
import { createPortal } from 'react-dom';

const Portal = ({
  children,
  container,
  disablePortal = false,
}: PortalProps) => {
  if (disablePortal || typeof document === 'undefined') {
    return children;
  }

  const target = container ?? document.querySelector('#root') ?? document.body;

  return createPortal(children, target);
};

export default Portal;
