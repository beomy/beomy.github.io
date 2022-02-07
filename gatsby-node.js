const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const { createFilePath } = require(`gatsby-source-filesystem`);
const path = require(`path`);

function categoryToSlugs(category) {
  if (!category) return [];

  let slug = '';
  return category.reduce((acc, name) => {
    slug += `/${name}`;
    if (!acc.includes(`${slug}/`)) {
      acc.push(`${slug}/`);
    }
    return acc;
  }, []);
}

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      plugins: [new TsconfigPathsPlugin()],
    },
  });
};

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === 'MarkdownRemark') {
    const relativeFilePath = createFilePath({ node, getNode });
    const createdDate = relativeFilePath.match(/\d{4}-\d{2}-\d{2}/);
    const slug = relativeFilePath.replace(`${createdDate}-`, '');
    createNodeField({
      node,
      name: 'createdDate',
      value: createdDate ? new Date(createdDate[0]) : new Date(),
    });
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    });
    createNodeField({
      node,
      name: 'category',
      value: categoryToSlugs(node.frontmatter.category),
    });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(`
    query {
      allMarkdownRemark(sort: { order: ASC, fields: fields___createdDate }) {
        edges {
          next {
            frontmatter {
              title
            }
            fields {
              slug
            }
          }
          previous {
            frontmatter {
              title
            }
            fields {
              slug
            }
          }
          node {
            fields {
              slug
            }
            frontmatter {
              layout
              category
            }
          }
        }
      }
    }
  `);
  const posts = result.data.allMarkdownRemark.edges;

  // 포스트 페이지
  posts.forEach(({ node, next, previous }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(
        `./src/templates/${node.frontmatter.layout ?? 'post'}.tsx`,
      ),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.fields.slug,
        next,
        previous,
      },
    });
  });

  // 카테고리 페이지
  const slugs = posts.reduce((acc, { node }) => {
    const { category } = node.frontmatter;
    return [...new Set([...acc, ...categoryToSlugs(category)])];
  }, []);
  slugs.forEach((slug) => {
    createPage({
      path: slug,
      component: path.resolve(`./src/templates/category.tsx`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug,
      },
    });
  });
};
