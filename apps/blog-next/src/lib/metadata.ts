import type { Metadata } from 'next';

export const siteMetadata = {
  title: 'Beomy',
  description: 'Front-End 개발자 Beomy의 기술 블로그입니다.',
  author: 'beomy',
  siteUrl: 'https://beomy.github.io/',
};

const DEFAULT_IMAGE = '/assets/img/brand/beomy-logo.png';

type BuildMetadataOptions = {
  title: string;
  description?: string;
  path: string;
  type?: 'website' | 'article';
  image?: string;
  publishedTime?: string;
  /** true 면 `%s | Beomy` 템플릿을 적용하지 않고 title 을 그대로 사용(홈 등) */
  absoluteTitle?: boolean;
};

export const buildMetadata = ({
  title,
  description,
  path,
  type = 'website',
  image,
  publishedTime,
  absoluteTitle = false,
}: BuildMetadataOptions): Metadata => {
  const metaDescription = description || siteMetadata.description;
  const url = `${siteMetadata.siteUrl.replace(/\/$/, '')}${path}`;
  const metaImage = image || DEFAULT_IMAGE;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description: metaDescription,
    authors: [{ name: siteMetadata.author }],
    alternates: {
      canonical: url,
    },
    openGraph: {
      locale: 'ko',
      url,
      siteName: siteMetadata.title,
      title,
      description: metaDescription,
      type,
      images: [{ url: metaImage, alt: title }],
      ...(type === 'article' && publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      creator: siteMetadata.author,
      title,
      description: metaDescription,
      images: [{ url: metaImage, alt: title }],
    },
  };
};
