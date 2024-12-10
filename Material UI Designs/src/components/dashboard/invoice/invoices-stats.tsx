import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { Check as CheckIcon } from '@phosphor-icons/react/dist/ssr/Check';
import { Clock as ClockIcon } from '@phosphor-icons/react/dist/ssr/Clock';
import { Receipt as ReceiptIcon } from '@phosphor-icons/react/dist/ssr/Receipt';

export function InvoicesStats(): React.JSX.Element {
  return (
    <Grid container spacing={4}>
      <Grid md={6} xl={4} xs={12}>
        <Card>
          <CardContent>
            <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
              <Avatar
                sx={{
                  '--Avatar-size': '48px',
                  bgcolor: 'var(--mui-palette-background-paper)',
                  boxShadow: 'var(--mui-shadows-8)',
                  color: 'var(--mui-palette-text-primary)',
                }}
              >
                <ReceiptIcon fontSize="var(--icon-fontSize-lg)" />
              </Avatar>
              <div>
                <Typography color="text.secondary" variant="body2">
                  Total
                </Typography>
                <Typography variant="h6">
                  {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(5300)}
                </Typography>
                <Typography color="text.secondary" variant="body2">
                  from {new Intl.NumberFormat('en-US').format(12)} invoices
                </Typography>
              </div>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
      <Grid md={6} xl={4} xs={12}>
        <Card>
          <CardContent>
            <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
              <Avatar
                sx={{
                  '--Avatar-size': '48px',
                  bgcolor: 'var(--mui-palette-background-paper)',
                  boxShadow: 'var(--mui-shadows-8)',
                  color: 'var(--mui-palette-text-primary)',
                }}
              >
                <CheckIcon fontSize="var(--icon-fontSize-lg)" />
              </Avatar>
              <div>
                <Typography color="text.secondary" variant="body2">
                  Paid
                </Typography>
                <Typography variant="h6">
                  {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(3860.4)}
                </Typography>
                <Typography color="text.secondary" variant="body2">
                  from {new Intl.NumberFormat('en-US').format(3)} invoices
                </Typography>
              </div>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
      <Grid md={6} xl={4} xs={12}>
        <Card>
          <CardContent>
            <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
              <Avatar
                sx={{
                  '--Avatar-size': '48px',
                  bgcolor: 'var(--mui-palette-background-paper)',
                  boxShadow: 'var(--mui-shadows-8)',
                  color: 'var(--mui-palette-text-primary)',
                }}
              >
                <ClockIcon fontSize="var(--icon-fontSize-lg)" />
              </Avatar>
              <div>
                <Typography color="text.secondary" variant="body2">
                  Pending
                </Typography>
                <Typography variant="h6">
                  {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(1439.6)}
                </Typography>
                <Typography color="text.secondary" variant="body2">
                  from {new Intl.NumberFormat('en-US').format(2)} invoices
                </Typography>
              </div>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
