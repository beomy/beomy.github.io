export type MessageProps = {
  id?: string;
  text: string;
  type?: 'success' | 'info' | 'warning' | 'error';
  delay?: number;
  onClose?: (id?: string) => void;
};
