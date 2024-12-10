import type { ColorScheme, Direction, PrimaryColor } from '@/styles/theme/types';

export type Layout = 'horizontal' | 'vertical';

export type NavColor = 'blend_in' | 'discrete' | 'evident';

export interface Settings {
  primaryColor: PrimaryColor;
  colorScheme: ColorScheme;
  direction?: Direction;
  layout?: Layout;
  navColor?: NavColor;
}
