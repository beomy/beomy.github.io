export type SeoProps = {
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
  image?: string;
};
