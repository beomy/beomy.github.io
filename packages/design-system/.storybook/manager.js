// eslint-disable-next-line import/no-extraneous-dependencies
import { create } from '@storybook/theming';
// eslint-disable-next-line import/no-extraneous-dependencies
import { addons } from '@storybook/addons';

const theme = create({
  base: 'light',
  brandTitle: 'Beomy Design System',
});

addons.setConfig({
  theme,
});
