import { backdropClasses } from '@mui/material/Backdrop';
import type { Components } from '@mui/material/styles';

import type { Theme } from '../types';

export const MuiBackdrop = {
  styleOverrides: {
    root: { [`&:not(.${backdropClasses.invisible})`]: { backgroundColor: 'var(--mui-palette-Backdrop-bg)' } },
  },
} satisfies Components<Theme>['MuiBackdrop'];
