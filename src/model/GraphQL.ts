export interface IFields {
  createdDate: string;
  slug: string;
}

export interface IFrontmatter {
  category: string[];
  thumbnail: string;
  layout: string;
  summary: string;
  title: string;
}

export interface ISiteMetadata {
  title: string;
  description: string;
  author: string;
  siteUrl: string;
}

export interface IMarkdownRemark {
  html?: string;
  tableOfContents?: string;
  timeToRead: number;
  excerpt: string;
  frontmatter: IFrontmatter;
  fields: IFields;
}

export interface IAllMarkdownRemark {
  edges: {
    node: IMarkdownRemark;
  }[];
}

export interface ISite {
  siteMetadata: ISiteMetadata;
}

export interface IData {
  markdownRemark: IMarkdownRemark;
  allMarkdownRemark: IAllMarkdownRemark;
  site: ISite;
}
