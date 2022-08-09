import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';
import { getSrc } from 'gatsby-plugin-image';
import type { Data } from '@/model/graphQL';
import type { SeoProps } from './Seo.types';

const Seo = ({
  description,
  lang = 'ko',
  meta = [],
  title,
  path,
  type = 'website',
  image,
}: SeoProps) => {
  const { site, file } = useStaticQuery<Data>(
    graphql`
      query {
        file(relativePath: { eq: "beomy-logo.png" }) {
          childImageSharp {
            gatsbyImageData
          }
        }
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
  const defaultTitle = site.siteMetadata.title;
  const url = `${site.siteMetadata.siteUrl}${path}`;
  const metaImage = image || getSrc(file.childImageSharp.gatsbyImageData);

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${defaultTitle}`}
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
          property: `og:image`,
          content: metaImage,
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
      ].concat(meta ?? [])}
    />
  );
};

export default Seo;
