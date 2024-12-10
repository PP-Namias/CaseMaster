import * as React from 'react';
import Box from '@mui/material/Box';

export interface ColumnListProps {
  children: React.ReactNode;
}

export function ColumnList({ children }: ColumnListProps): React.JSX.Element {
  return (
    <Box
      sx={{
        display: 'flex',
        flex: '1 1 auto',
        gap: 4,
        overflowX: 'auto',
        px: 'var(--Content-paddingX)',
        mx: 'calc(-1 * var(--Content-paddingX))',
      }}
    >
      {children}
    </Box>
  );
}
