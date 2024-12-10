import * as React from 'react';
import Box from '@mui/material/Box';

const icons: Record<string, string> = {
  jpeg: '/assets/icon-jpg.svg',
  jpg: '/assets/icon-jpg.svg',
  mp4: '/assets/icon-mp4.svg',
  pdf: '/assets/icon-pdf.svg',
  png: '/assets/icon-png.svg',
  svg: '/assets/icon-svg.svg',
};

export interface FileIconProps {
  extension?: string;
}

export function FileIcon({ extension }: FileIconProps): React.JSX.Element {
  let icon: string;

  if (!extension) {
    icon = '/assets/icon-other.svg';
  } else {
    icon = icons[extension] ?? '/assets/icon-other.svg';
  }

  return (
    <Box
      sx={{
        alignItems: 'center',
        display: 'inline-flex',
        flex: '0 0 auto',
        justifyContent: 'center',
        width: '48px',
        height: '48px',
      }}
    >
      <Box alt="File" component="img" src={icon} sx={{ height: '100%', width: 'auto' }} />
    </Box>
  );
}
