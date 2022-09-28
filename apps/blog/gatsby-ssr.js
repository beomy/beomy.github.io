/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

// You can delete this file if you're not using it
import { PageComponent, RootComponent } from './wrap-elements';

export const wrapPageElement = ({ element }) => {
  return <PageComponent>{element}</PageComponent>;
};

export const wrapRootElement = ({ element }) => {
  return <RootComponent>{element}</RootComponent>;
};
