import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export function QuickStats4(): React.JSX.Element {
  return (
    <Box sx={{ bgcolor: 'var(--mui-palette-background-level1)', p: 3 }}>
      <Card>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' } }}>
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
            <Typography color="text.secondary" variant="overline">
              Total Income
            </Typography>
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
              <Typography variant="h6">
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  maximumFractionDigits: 0,
                }).format(54355)}
              </Typography>
              <Chip color="success" label="+25%" size="small" variant="soft" />
            </Stack>
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
            <Typography color="text.secondary" variant="overline">
              Total Expanses
            </Typography>
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
              <Typography variant="h6">
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  maximumFractionDigits: 0,
                }).format(13250)}
              </Typography>
              <Chip color="success" label="+12%" size="small" variant="soft" />
            </Stack>
          </Stack>
          <Stack spacing={1} sx={{ alignItems: 'center', display: 'flex', justifyContent: 'center', p: 3 }}>
            <Typography color="text.secondary" variant="overline">
              Net Profit
            </Typography>
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
              <Typography variant="h6">
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  maximumFractionDigits: 0,
                }).format(41105)}
              </Typography>
              <Chip color="error" label="-20%" size="small" variant="soft" />
            </Stack>
          </Stack>
        </Box>
      </Card>
    </Box>
  );
}
