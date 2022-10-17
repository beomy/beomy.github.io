const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const { querySelectorAll } = require('svgo/lib/xast');

const template = ({ componentName, jsx, imports }, { tpl }) => {
  return tpl`
    ${imports}
    import styled from '@emotion/styled'

    const BaseComponent = ({
      size = '1em',
      ...props
    }: SVGProps<SVGSVGElement> & {
      size?: string | number
      tabIndex?: number
      focusable?: boolean
    }) => {
      return (${jsx})
    }

    const ${componentName} = styled(BaseComponent)\`
      outline: none;
    \`

    ${componentName}.defaultProps = {
      size: 24,
      tabIndex: -1,
      focusable: false
    }

    export default ${componentName}
  `;
};

const indexTemplate = (filePaths) => {
  const uniqueFilePaths = [...new Set(filePaths)];
  const typeEntries = uniqueFilePaths.sort().map((filePath) => {
    const basename = path
      .basename(filePath, path.extname(filePath))
      .replace(/^[A-Z]/, (letter) => letter.toLowerCase());
    return `'${basename}'`;
  });
  const exportEntries = uniqueFilePaths.sort().map((filePath) => {
    const basename = path.basename(filePath, path.extname(filePath));
    return `export { default as Bm${basename} } from './${basename}'`;
  });
  return `
    type Icons = ${typeEntries.join(' | ')}

    export type { IconBaseProps } from 'react-icons';
    export type { Icons };
    export * from 'react-icons/bs';
    ${exportEntries.join('\n')}
  `;
};

const replaceAttributesBySelector = (root, params) => {
  const selectors = Array.isArray(params.selectors)
    ? params.selectors
    : [params];
  for (const { selector, attributes, value } of selectors) {
    const nodes = querySelectorAll(root, selector);
    for (const node of nodes) {
      if (node.type === 'element') {
        if (Array.isArray(attributes)) {
          for (const name of attributes) {
            node.attributes[name] = value;
          }
        } else {
          node.attributes[attributes] = value;
        }
      }
    }
  }
};

module.exports = {
  template,
  indexTemplate,
  outDir: 'src/icons',
  typescript: true,
  prettierConfig: {
    parser: 'typescript',
  },
  svgProps: {
    height: '{size}',
    width: '{size}',
  },
  svgoConfig: {
    plugins: [
      {
        name: 'replaceAttributesBySelector',
        type: 'visitor',
        params: {
          selectors: [
            {
              selector: `[fill][fill!='none']:not([data-fill-ignore])`,
              attributes: 'fill',
              value: 'currentColor',
            },
            {
              selector: `[stroke][stroke!='none']:not([data-stroke-ignore])`,
              attributes: 'stroke',
              value: 'currentColor',
            },
            {
              selector: '[data-fill-ignore]',
              attributes: 'data-fill-ignore',
              value: '',
            },
            {
              selector: '[data-fill-stroke]',
              attributes: 'data-fill-stroke',
              value: '',
            },
          ],
        },
        fn: replaceAttributesBySelector,
      },
    ],
  },
};
