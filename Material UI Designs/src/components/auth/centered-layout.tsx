import * as React from 'react';
import Box from '@mui/material/Box';

export interface CenteredLayoutProps {
  children: React.ReactNode;
}

export function CenteredLayout({ children }: CenteredLayoutProps): React.JSX.Element {
  return (
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minHeight: '100vh',
        p: { xs: 2, md: 3 },
      }}
    >
      <Box sx={{ maxWidth: '560px', width: '100%' }}>{children}</Box>
    </Box>
  );
}
