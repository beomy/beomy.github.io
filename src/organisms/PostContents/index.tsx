import React from 'react';
import StyledPostContents from './PostContents.styled';

interface IProp {
  html: string;
}

function PostContents({ html }: IProp) {
  return <StyledPostContents dangerouslySetInnerHTML={{ __html: html }} />;
}

export default PostContents;
