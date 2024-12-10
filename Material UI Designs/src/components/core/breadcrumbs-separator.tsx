import * as React from 'react';
import Box from '@mui/material/Box';

export function BreadcrumbsSeparator(): React.JSX.Element {
  return <Box sx={{ bgcolor: 'var(--mui-palette-neutral-500)', borderRadius: '50%', height: '4px', width: '4px' }} />;
}
