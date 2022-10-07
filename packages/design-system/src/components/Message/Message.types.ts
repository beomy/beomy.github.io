export type MessageProps = {
  /** 팝업 고유 ID */
  id?: string;
  /** 메시지 내용 */
  text: string;
  /** 팝업 종류 */
  type?: 'success' | 'info' | 'warning' | 'error';
  /** 팝업 유지 기간 */
  delay?: number;
  /** 팝업 닫힘 이벤트 핸들러 */
  onClose?: (id?: string) => void;
};
