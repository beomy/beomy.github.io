/*
 * 사용하는 아이콘만 명시적으로 re-export 한다.
 *
 * `export * from 'react-icons/bs'` 는 Icon 컴포넌트가 `Icons[type]` 으로 동적 조회하는 구조와
 * 맞물려 Bootstrap 아이콘 1,600 여 개(약 1MB)가 통째로 클라이언트 번들에 실린다.
 * 새 아이콘이 필요하면 여기에 한 줄 추가한다. IconProps['type'] 이 이 목록에서 유도되므로
 * 등록되지 않은 이름은 타입 에러로 바로 드러난다.
 */
type Icons = 'kakaotalk';

export type { IconBaseProps } from 'react-icons';
export type { Icons };

export {
  BsCalendar,
  BsChatLeft,
  BsCheckCircleFill,
  BsChevronLeft,
  BsChevronRight,
  BsClock,
  BsExclamationCircleFill,
  BsFacebook,
  BsFillInfoCircleFill,
  BsGithub,
  BsLine,
  BsLink45Deg,
  BsLinkedin,
  BsList,
  BsMoonFill,
  BsPaperclip,
  BsSearch,
  BsSunFill,
  BsTwitter,
  BsXCircle,
  BsXCircleFill,
  BsXLg,
} from 'react-icons/bs';

export { default as BmKakaotalk } from './Kakaotalk';
