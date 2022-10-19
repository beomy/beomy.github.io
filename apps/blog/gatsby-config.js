const path = require('path');

const siteMetadata = {
  title: `Beomy`,
  description: `Front-End 개발자 Beomy의 기술 블로그입니다.`,
  author: `beomy`,
  siteUrl: `https://beomy.github.io/`,
};

const plugins = [
  `gatsby-plugin-robots-txt`,
  `gatsby-plugin-sitemap`,
  {
    resolve: `gatsby-plugin-feed`,
    options: {
      query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
      feeds: [
        {
          serialize: ({ query: { site, allMarkdownRemark } }) =>
            allMarkdownRemark.nodes.map((node) => ({
              ...node.frontmatter,
              description: node.excerpt,
              date: node.fields.createdDate,
              url: site.siteMetadata.siteUrl + node.fields.slug,
              guid: site.siteMetadata.siteUrl + node.fields.slug,
              custom_elements: [{ 'content:encoded': node.html }],
            })),
          query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: fields___createdDate }
                ) {
                  nodes {
                    excerpt
                    html
                    fields {
                      slug
                      createdDate
                    }
                    frontmatter {
                      title
                    }
                  }
                }
              }
            `,
          output: '/rss.xml',
          title: 'Beomy RSS Feed',
        },
      ],
    },
  },
  `gatsby-plugin-react-helmet`,
  `gatsby-plugin-image`,
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `images`,
      path: path.join(__dirname, `/src/assets/images`),
    },
  },
  `gatsby-transformer-sharp`,
  {
    resolve: `gatsby-plugin-sharp`,
    options: {
      defaults: {
        formats: [`auto`, `webp`],
        placeholder: `dominantColor`,
        quality: 50,
        breakpoints: [300, 750, 1080, 1366, 1920],
        backgroundColor: `transparent`,
        tracedSVGOptions: {},
        blurredOptions: {},
        jpgOptions: {},
        pngOptions: {},
        webpOptions: {},
        avifOptions: {},
      },
    },
  },
  {
    resolve: `gatsby-plugin-manifest`,
    options: {
      name: `gatsby-starter-default`,
      short_name: `starter`,
      start_url: `/`,
      background_color: `#663399`,
      // This will impact how browsers show your PWA/website
      // https://css-tricks.com/meta-theme-color-and-trickery/
      // theme_color: `#663399`,
      display: `minimal-ui`,
      icon: `src/assets/images/beomy-icon.png`, // This path is relative to the root of the site.
    },
  },
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `posts`,
      path: path.join(__dirname, `/posts`),
    },
  },
  {
    resolve: `gatsby-transformer-remark`,
    options: {
      plugins: [
        {
          resolve: `gatsby-remark-table-of-contents`,
          options: {
            exclude: `Table of Contents`,
            tight: false,
            ordered: false,
            fromHeading: 1,
            toHeading: 6,
            className: `table-of-contents`,
          },
        },
        {
          resolve: `gatsby-remark-autolink-headers`,
          options: {
            isIconAfterHeader: true,
          },
        },
        {
          resolve: `gatsby-remark-prismjs`,
          options: {
            // Class prefix for <pre> tags containing syntax highlighting;
            // defaults to 'language-' (e.g. <pre class="language-js">).
            // If your site loads Prism into the browser at runtime,
            // (e.g. for use with libraries like react-live),
            // you may use this to prevent Prism from re-processing syntax.
            // This is an uncommon use-case though;
            // If you're unsure, it's best to use the default value.
            classPrefix: 'language-',
            // This is used to allow setting a language for inline code
            // (i.e. single backticks) by creating a separator.
            // This separator is a string and will do no white-space
            // stripping.
            // A suggested value for English speakers is the non-ascii
            // character '›'.
            inlineCodeMarker: null,
            // This lets you set up language aliases.  For example,
            // setting this to '{ sh: "bash" }' will let you use
            // the language "sh" which will highlight using the
            // bash highlighter.
            aliases: {},
            // This toggles the display of line numbers globally alongside the code.
            // To use it, add the following line in gatsby-browser.js
            // right after importing the prism color scheme:
            //  require("prismjs/plugins/line-numbers/prism-line-numbers.css")
            // Defaults to false.
            // If you wish to only show line numbers on certain code blocks,
            // leave false and use the {numberLines: true} syntax below
            showLineNumbers: false,
            // If setting this to true, the parser won't handle and highlight inline
            // code used in markdown i.e. single backtick code like `this`.
            noInlineHighlight: false,
            // This adds a new language definition to Prism or extend an already
            // existing language definition. More details on this option can be
            // found under the header "Add new language definition or extend an
            // existing language" below.
            languageExtensions: [
              {
                language: 'superscript',
                extend: 'javascript',
                definition: {
                  superscript_types: /(SuperType)/,
                },
                insertBefore: {
                  function: {
                    superscript_keywords: /(superif|superelse)/,
                  },
                },
              },
            ],
            // Customize the prompt used in shell output
            // Values below are default
            prompt: {
              user: 'root',
              host: 'localhost',
              global: false,
            },
            // By default the HTML entities <>&'" are escaped.
            // Add additional HTML escapes by providing a mapping
            // of HTML entities and their escape value IE: { '}': '&#123;' }
            escapeEntities: {},
          },
        },
        {
          resolve: `gatsby-remark-image-attributes`,
          options: {
            dataAttributes: true,
          },
        },
      ],
    },
  },
  `gatsby-plugin-emotion`,
  `gatsby-plugin-sass`,
  {
    resolve: `gatsby-plugin-disqus`,
    options: {
      shortname: `beomy`,
    },
  },
  {
    resolve: `gatsby-plugin-google-analytics`,
    options: {
      trackingId: `UA-144478158-1`,
      // this option places the tracking script into the head of the DOM
      head: true,
      // other options
    },
  },
  {
    resolve: `gatsby-plugin-google-gtag`,
    options: {
      trackingIds: ['G-MD8G3F353P'],
      pluginConfig: {
        head: true,
      },
    },
  },
  {
    resolve: `gatsby-plugin-compile-es6-packages`,
    options: {
      modules: [`gatsby-link`, `gatsby-script`, `@builder.io/partytown`],
      test: /\.[c|m]?js$/,
    },
  },
  // this (optional) plugin enables Progressive Web App + Offline functionality
  // To learn more, visit: https://gatsby.dev/offline
  // 'gatsby-plugin-offline`,
];

if (process.env.NODE_ENV === `development`) {
  plugins.push({
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `drafts`,
      path: path.join(__dirname, `/drafts`),
    },
  });
}

module.exports = {
  siteMetadata,
  // Since `gatsby-plugin-typescript` is automatically included in Gatsby you
  // don't need to define it here (just if you need to change the options)
  plugins,
};
