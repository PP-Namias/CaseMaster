import * as React from 'react';
import type { Components } from '@mui/material/styles';
import { CaretLeft as CaretLeftIcon } from '@phosphor-icons/react/dist/ssr/CaretLeft';
import { CaretRight as CaretRightIcon } from '@phosphor-icons/react/dist/ssr/CaretRight';

import type { Theme } from '../types';

function PreviousButtonIcon(): React.JSX.Element {
  return <CaretLeftIcon fontSize="var(--fontSize-md)" />;
}

function NextButtonIcon(): React.JSX.Element {
  return <CaretRightIcon fontSize="var(--fontSize-md)" />;
}

export const MuiTablePagination = {
  defaultProps: {
    slotProps: {
      actions: { nextButtonIcon: { component: NextButtonIcon }, previousButtonIcon: { component: PreviousButtonIcon } },
      select: { size: 'small', variant: 'outlined' },
    },
  },
  styleOverrides: { input: { marginRight: '16px', padding: 0 } },
} satisfies Components<Theme>['MuiTablePagination'];
