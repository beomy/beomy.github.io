import type { ForwardRefExoticComponent } from 'react';
import { useMemo, useState } from 'react';
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  LineShareButton,
} from 'react-share';
import { Icon, IconTypes } from '@beomy/design-system';
import { ShareButtonProps } from './ShareButton.types';
import * as S from '@/molecules/ShareButton/ShareButton.styles';

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

const ShareButton = ({ target, url, size }: ShareButtonProps) => {
  const [isHover, setHover] = useState<boolean>(false);
  const targetShareButton = useMemo(() => shareButtonMap[target], [target]);
  const iconType = useMemo(() => shareIconMap[target], [target]);

  return (
    <S.Wrapper
      as={targetShareButton}
      url={url}
      border
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
    >
      <Icon type={isHover ? 'BsLink45Deg' : iconType} size={size} />
    </S.Wrapper>
  );
};

export default ShareButton;
