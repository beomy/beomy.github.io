import { StaticImage } from 'gatsby-plugin-image';
import { H1 } from '@/atoms';
import * as S from './AboutHeader.styles';

const AboutHeader = () => {
  return (
    <S.Wrapper>
      <S.Icon>
        <StaticImage src="../../assets/images/beomy-icon.png" alt="Beomy" />
      </S.Icon>
      <div>
        <H1>이효범 (Beomy)</H1>
        <div>beomyhlee@gmail.com</div>
        <p>
          프론트엔드 개발자로 활동하고 있습니다. 최신 웹 프레임워크 트랜드에
          관심을 많이 가지고 있습니다. 계속 변화하고 있는 웹 트랜드에 뒤쳐지지
          않고, 배움을 게을리하지 않는 개발자가 되기 위해 웹 개발 관련 기술을
          포스팅하고 있습니다.
        </p>
      </div>
    </S.Wrapper>
  );
};

export default AboutHeader;
