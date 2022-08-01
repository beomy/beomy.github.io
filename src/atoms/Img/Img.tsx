import type { ImgProps } from './Img.types';
import * as S from './Img.styles';

const Img = ({ src, alt = '', ...props }: ImgProps) => {
  return <S.Wrapper src={src} alt={alt} {...props} />;
};

export default Img;
