import type { ForwardRefExoticComponent } from 'react';
import { useMemo, useState } from 'react';
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  LineShareButton,
} from 'react-share';
import { Icon, IconTypes, iconButtonVariants } from '@beomy/design-system-tailwind';
import { ShareButtonProps } from './ShareButton.types';

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

const ShareButton = ({ target, url, size, ...props }: ShareButtonProps) => {
  const [isHover, setHover] = useState<boolean>(false);
  const ShareButtonComponent = useMemo(() => shareButtonMap[target], [target]);
  const iconType = useMemo(() => shareIconMap[target], [target]);

  return (
    <ShareButtonComponent
      url={url}
      resetButtonStyle={false}
      className={iconButtonVariants({ border: true })}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      {...props}
    >
      <Icon type={isHover ? 'BsLink45Deg' : iconType} size={size} />
    </ShareButtonComponent>
  );
};

export default ShareButton;
