export enum EDateFormat {
  /* Date */
  YYYY_MM = 'yyyy.MM',
  YYYY_MM_DD = 'yyyy.MM.dd',
  YYYY_MM_DD_HH_MM = 'yyyy.MM.dd HH:mm',
  YYYY_MM_DD_WEEK = 'yyyy.MM.dd (E)',
  YYYY_MM_DD_WEEK_HH_MM = 'yyyy.MM.dd (E) HH:mm',
  YYYY_MM_DD_WEEK_HH_MM_SS = 'yyyy.MM.dd (E) HH:mm:ss',
  YYYY = 'yyyy',
  MM = 'MM',
  MM_DD = 'MM.dd',
  DD = 'dd',
  WEEK = 'E',

  /* Locale */
  LOCALE_YYYY_MM_DD = 'yyyy년 MM월 dd일',

  /* Date Dash */
  DASH_YYYY_MM = 'yyyy-MM',
  DASH_YYYY_MM_DD = 'yyyy-MM-dd',
  DASH_YYYY_MM_DD_HH_MM_SS = 'yyyy-MM-dd HH:mm:ss',

  /* Date Slash */
  SLASH_MM_DD_WEEK = 'MM/dd (E)',

  /* Time */
  HH_MM = 'HH:mm',
  HH_MM_SS = 'HH:mm:ss',
}
