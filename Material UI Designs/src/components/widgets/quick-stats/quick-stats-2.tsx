import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { Coins as CoinsIcon } from '@phosphor-icons/react/dist/ssr/Coins';
import { CurrencyDollar as CurrencyDollarIcon } from '@phosphor-icons/react/dist/ssr/CurrencyDollar';
import { Folder as FolderIcon } from '@phosphor-icons/react/dist/ssr/Folder';

export function QuickStats2(): React.JSX.Element {
  return (
    <Box sx={{ bgcolor: 'var(--mui-palette-background-level1)', p: 3 }}>
      <Grid container spacing={3}>
        <Grid lg={3} md={6} xs={12}>
          <Card>
            <Stack direction="row" spacing={2} sx={{ alignItems: 'center', p: 3 }}>
              <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
                <Typography color="text.secondary" variant="overline">
                  Today&apos;s money
                </Typography>
                <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                  <Typography variant="h5">
                    {' '}
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                      maximumFractionDigits: 0,
                    }).format(4173)}
                  </Typography>
                  <Chip color="success" label="4%" size="small" variant="soft" />
                </Stack>
              </Stack>
              <Avatar
                sx={{
                  '--Avatar-size': '48px',
                  bgcolor: 'var(--mui-palette-primary-main)',
                  color: 'var(--mui-palette-primary-contrastText)',
                }}
              >
                <CurrencyDollarIcon fontSize="var(--Icon-fontSize)" />
              </Avatar>
            </Stack>
          </Card>
        </Grid>
        <Grid lg={3} md={6} xs={12}>
          <Card>
            <Stack direction="row" spacing={2} sx={{ alignItems: 'center', p: 3 }}>
              <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
                <Typography color="text.secondary" variant="overline">
                  New projects
                </Typography>
                <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                  <Typography variant="h5">{new Intl.NumberFormat('en-US').format(12)}</Typography>
                  <Chip color="error" label="-10%" size="small" variant="soft" />
                </Stack>
              </Stack>
              <Avatar
                sx={{
                  bgcolor: 'var(--mui-palette-primary-main)',
                  color: 'var(--mui-palette-primary-contrastText)',
                  height: '48px',
                  width: '48px',
                }}
              >
                <FolderIcon fontSize="var(--Icon-fontSize)" />
              </Avatar>
            </Stack>
          </Card>
        </Grid>
        <Grid lg={3} md={6} xs={12}>
          <Card>
            <Stack spacing={1} sx={{ p: 3 }}>
              <Typography color="text.secondary" variant="overline">
                System Health
              </Typography>
              <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                <Typography variant="h5">
                  {new Intl.NumberFormat('en-US', { style: 'percent', maximumFractionDigits: 2 }).format(74 / 100)}
                </Typography>
                <LinearProgress color="primary" sx={{ flex: '1 1 auto' }} value={74} variant="determinate" />
              </Stack>
            </Stack>
          </Card>
        </Grid>
        <Grid lg={3} md={6} xs={12}>
          <Card
            sx={{
              alignItems: 'center',
              bgcolor: 'var(--mui-palette-primary-main)',
              color: 'var(--mui-palette-primary-contrastText)',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Stack direction="row" spacing={2} sx={{ alignItems: 'center', p: 3 }}>
              <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
                <Typography color="inherit" variant="overline">
                  Roi per customer
                </Typography>
                <Typography color="inherit" variant="h5">
                  {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(25.5)}
                </Typography>
              </Stack>
              <Avatar
                sx={{
                  bgcolor: 'var(--mui-palette-primary-contrastText)',
                  color: 'var(--mui-palette-primary-main)',
                  height: '48px',
                  width: '48px',
                }}
              >
                <CoinsIcon fontSize="var(--Icon-fontSize)" />
              </Avatar>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
