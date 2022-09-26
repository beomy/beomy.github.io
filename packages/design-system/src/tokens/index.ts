import light from './light';
import dark from './dark';

export type Theme = typeof light & typeof dark;
export { light, dark };
