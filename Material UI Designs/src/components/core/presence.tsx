import * as React from 'react';
import Box from '@mui/material/Box';

type Size = 'small' | 'medium' | 'large';

type Status = 'online' | 'offline' | 'away' | 'busy';

const sizes = { small: 8, medium: 16, large: 24 };

export interface PresenceProps {
  size?: Size;
  status?: Status;
}

export function Presence({ size = 'medium', status = 'offline' }: PresenceProps): React.JSX.Element {
  const colors = {
    offline: 'var(--mui-palette-neutral-100)',
    away: 'var(--mui-palette-warning-main)',
    busy: 'var(--mui-palette-error-main)',
    online: 'var(--mui-palette-success-main)',
  } as Record<Status, string>;

  const color = colors[status];

  return (
    <Box
      sx={{
        bgcolor: color,
        borderRadius: '50%',
        display: 'inline-block',
        flex: '0 0 auto',
        height: sizes[size],
        width: sizes[size],
      }}
    />
  );
}
