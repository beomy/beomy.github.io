import type { Metadata } from 'next';

export const siteMetadata = {
  title: 'Beomy',
  description: 'Front-End 개발자 Beomy의 기술 블로그입니다.',
  author: 'beomy',
  siteUrl: 'https://beomy.github.io/',
};

const DEFAULT_IMAGE = '/assets/images/beomy-logo.png';

type BuildMetadataOptions = {
  title: string;
  description?: string;
  path: string;
  type?: 'website' | 'article';
  image?: string;
  publishedTime?: string;
};

export const buildMetadata = ({
  title,
  description,
  path,
  type = 'website',
  image,
  publishedTime,
}: BuildMetadataOptions): Metadata => {
  const metaDescription = description || siteMetadata.description;
  const url = `${siteMetadata.siteUrl.replace(/\/$/, '')}${path}`;
  const metaImage = image || DEFAULT_IMAGE;

  return {
    title,
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
      images: [metaImage],
      ...(type === 'article' && publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: 'summary',
      creator: siteMetadata.author,
      title,
      description: metaDescription,
      images: [metaImage],
    },
  };
};
