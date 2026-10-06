import type { ForwardRefExoticComponent } from 'react';
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  LineShareButton,
} from 'react-share';
import {
  Icon,
  IconTypes,
  cn,
  iconButtonVariants,
} from '@beomy/design-system-tailwind';

export type ShareButtonProps = {
  target: 'facebook' | 'twitter' | 'linkedin' | 'line';
  url: string;
  size?: IconTypes.IconProps['size'];
};

const shareButtonMap: {
  [key in ShareButtonProps['target']]: ForwardRefExoticComponent<any>;
} = {
  facebook: FacebookShareButton,
  twitter: TwitterShareButton,
  linkedin: LinkedinShareButton,
  line: LineShareButton,
};

const shareIconMap: {
  [key in ShareButtonProps['target']]: IconTypes.IconProps['type'];
} = {
  facebook: 'BsFacebook',
  twitter: 'BsTwitter',
  linkedin: 'BsLinkedin',
  line: 'BsLine',
};

/**
 * hover 시 링크 아이콘으로 바뀌는 공유 버튼.
 *
 * hover 를 React 상태로 들고 아이콘을 교체하면 두 가지 경우에 링크 아이콘이 고정된다.
 * - 빠르게 드나들 때: 아이콘 교체로 <svg> 노드가 갈리는 순간 포인터가 나가면 mouseout 의
 *   대상이 이미 제거된 노드라 React 가 이벤트를 버려 onMouseLeave 가 오지 않는다.
 * - 클릭 후: 공유 팝업으로 갔던 포커스가 닫힐 때 버튼으로 돌아오며 onFocus 가 hover 를 켠다.
 * 그래서 두 아이콘을 모두 렌더해 두고 CSS(group-hover / group-focus-visible)로만 토글한다.
 */
const ShareButton = ({ target, url, size, ...props }: ShareButtonProps) => {
  const ShareButtonComponent = shareButtonMap[target];

  return (
    <ShareButtonComponent
      url={url}
      resetButtonStyle={false}
      className={cn(iconButtonVariants({ border: true }), 'group')}
      {...props}
    >
      <Icon
        type={shareIconMap[target]}
        size={size}
        className="group-hover:hidden group-focus-visible:hidden"
      />
      <Icon
        type="BsLink45Deg"
        size={size}
        className="hidden group-hover:inline group-hover:animate-spin-in group-focus-visible:inline"
      />
    </ShareButtonComponent>
  );
};

export default ShareButton;
