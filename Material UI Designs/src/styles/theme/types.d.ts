import type { CssVarsTheme } from '@mui/material/styles';
import type { Theme as BaseTheme } from '@mui/material/styles/createTheme';

export type Theme = Omit<BaseTheme, 'palette'> & CssVarsTheme;

export type PrimaryColor = 'chateauGreen' | 'neonBlue' | 'royalBlue' | 'tomatoOrange';

export type Direction = 'ltr' | 'rtl';

export type ColorScheme = 'dark' | 'light';
