import React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';
import { IData } from '@/model/GraphQL';

interface IProp {
  description?: string;
  lang?: string;
  meta?: {
    name?: any;
    property: any;
    content: any;
  }[];
  title?: string;
  path?: string;
  type?: string;
}

function Seo({ description, lang, meta, title, path, type }: IProp) {
  const { site } = useStaticQuery<IData>(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            siteUrl
          }
        }
      }
    `,
  );

  const metaDescription = description || site.siteMetadata.description;
  const defaultTitle = site.siteMetadata?.title;
  const url = `${site.siteMetadata.siteUrl}${path}`;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : null}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          name: `author`,
          content: site.siteMetadata?.author || ``,
        },
        {
          property: 'og:locale',
          content: lang,
        },
        {
          property: 'og:url',
          content: url,
        },
        {
          property: 'og:site_name',
          content: defaultTitle,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: type,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata?.author || ``,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
    />
  );
}

Seo.defaultProps = {
  lang: `ko`,
  meta: [],
  description: ``,
  title: '',
  path: '',
  type: 'website',
};

export default Seo;
