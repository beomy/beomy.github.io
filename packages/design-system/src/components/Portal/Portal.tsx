import { createPortal } from 'react-dom';
import { PortalProps } from './Portal.types';

const Portal = ({
  children,
  container,
  disablePortal = false,
}: PortalProps) => {
  if (disablePortal || typeof document === 'undefined') {
    return children;
  }

  return createPortal(
    children,
    container || document.querySelector('#root') || document.body,
  );
};

export default Portal;
