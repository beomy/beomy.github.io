export type Fields = {
  createdDate: string;
  slug: string;
};

export type Frontmatter = {
  category: string[];
  thumbnail: string;
  layout: string;
  summary: string;
  title: string;
};

export type SiteMetadata = {
  title: string;
  description: string;
  author: string;
  siteUrl: string;
};

export type MarkdownRemark = {
  html?: string;
  tableOfContents?: string;
  timeToRead: number;
  excerpt: string;
  frontmatter: Frontmatter;
  fields: Fields;
};

export type AllMarkdownRemark = {
  edges: {
    node: MarkdownRemark;
  }[];
};

export type Site = {
  siteMetadata: SiteMetadata;
};

export type ImageSharp = {
  gatsbyImageData: any;
};

export type File = {
  childImageSharp: ImageSharp;
};

export type Data = {
  markdownRemark: MarkdownRemark;
  allMarkdownRemark: AllMarkdownRemark;
  site: Site;
  imageSharp: ImageSharp;
  file: File;
};
