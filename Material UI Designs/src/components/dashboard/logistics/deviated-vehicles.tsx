import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { WarningCircle as WarningCircleIcon } from '@phosphor-icons/react/dist/ssr/WarningCircle';

export interface DeviatedVehiclesProps {
  amount: number;
}

export function DeviatedVehicles({ amount }: DeviatedVehiclesProps): React.JSX.Element {
  return (
    <Card>
      <Stack spacing={1} sx={{ p: 3 }}>
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
          <Avatar
            sx={{
              bgcolor: 'var(--mui-palette-background-paper)',
              boxShadow: 'var(--mui-shadows-8)',
              color: 'var(--mui-palette-text-primary)',
            }}
          >
            <WarningCircleIcon fontSize="var(--icon-fontSize-lg)" />
          </Avatar>
          <Typography variant="h5">{amount}</Typography>
        </Stack>
        <Typography color="text.secondary" variant="body2">
          Vehicles deviated from route
        </Typography>
      </Stack>
    </Card>
  );
}
