import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Check as CheckIcon } from '@phosphor-icons/react/dist/ssr/Check';

export function JobPreview(): React.JSX.Element {
  return (
    <Stack spacing={2}>
      <Avatar
        sx={{
          '--Icon-fontSize': 'var(--icon-fontSize-lg)',
          bgcolor: 'var(--mui-palette-success-main)',
          color: 'var(--mui-palette-success-contrastText)',
        }}
      >
        <CheckIcon fontSize="var(--Icon-fontSize)" />
      </Avatar>
      <div>
        <Typography variant="h6">All done!</Typography>
        <Typography color="text.secondary" variant="body2">
          Here&apos;s a preview of your newly created job
        </Typography>
      </div>
      <Card variant="outlined">
        <Stack
          direction="row"
          sx={{ alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between', px: 2, py: 1.5 }}
        >
          <div>
            <Typography variant="subtitle1">Senior Backend Engineer</Typography>
            <Typography color="text.secondary" variant="caption">
              Remote possible •{' '}
              {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact' }).format(
                150000
              )}{' '}
              -{' '}
              {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact' }).format(
                210000
              )}
            </Typography>
          </div>
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
            <Typography color="text.secondary" variant="caption">
              1 minute ago
            </Typography>
            <Button size="small">Apply</Button>
          </Stack>
        </Stack>
      </Card>
    </Stack>
  );
}
