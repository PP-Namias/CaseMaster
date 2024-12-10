import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export function QuickStats3(): React.JSX.Element {
  return (
    <Box sx={{ bgcolor: 'var(--mui-palette-background-level1)', p: 3 }}>
      <Card>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' } }}>
          <Stack
            spacing={1}
            sx={{
              alignItems: 'center',
              borderRight: { xs: 'none', md: '1px solid var(--mui-palette-divider)' },
              borderBottom: { xs: '1px solid var(--mui-palette-divider)', md: 'none' },
              display: 'flex',
              justifyContent: 'center',
              p: 3,
            }}
          >
            <Typography variant="h5">
              {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(
                4250
              )}
            </Typography>
            <Typography color="text.secondary" variant="overline">
              Next payout
            </Typography>
          </Stack>
          <Stack
            spacing={1}
            sx={{
              alignItems: 'center',
              borderRight: { xs: 'none', md: '1px solid var(--mui-palette-divider)' },
              borderBottom: { xs: '1px solid var(--mui-palette-divider)', md: 'none' },
              display: 'flex',
              justifyContent: 'center',
              p: 3,
            }}
          >
            <Typography variant="h5">
              {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(
                12500
              )}
            </Typography>
            <Typography color="text.secondary" variant="overline">
              Total income
            </Typography>
          </Stack>
          <Stack
            spacing={1}
            sx={{
              alignItems: 'center',
              borderRight: { xs: 'none', md: '1px solid var(--mui-palette-divider)' },
              borderBottom: { xs: '1px solid var(--mui-palette-divider)', md: 'none' },
              display: 'flex',
              justifyContent: 'center',
              p: 3,
            }}
          >
            <Typography variant="h5">{new Intl.NumberFormat('en-US').format(230)}</Typography>
            <Typography color="text.secondary" variant="overline">
              Today&apos;s Visitors
            </Typography>
          </Stack>
          <Stack spacing={1} sx={{ alignItems: 'center', display: 'flex', justifyContent: 'center', p: 3 }}>
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
              <Typography component="span" variant="h5">
                {new Intl.NumberFormat('en-US').format(5)}
              </Typography>
              <Chip color="primary" label="Live" size="small" variant="soft" />
            </Stack>
            <Typography color="text.secondary" variant="overline">
              Active now
            </Typography>
          </Stack>
        </Box>
      </Card>
    </Box>
  );
}
