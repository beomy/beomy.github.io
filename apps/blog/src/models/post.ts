export type Post = {
  title: string;
  url: string;
  thumbnail?: string;
  createdDate?: Date | string;
  timeToRead?: number;
  summary?: string;
  category?: string[];
  html?: string;
  tableOfContents?: string;
};
