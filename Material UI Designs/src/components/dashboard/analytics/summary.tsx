import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { TrendDown as TrendDownIcon } from '@phosphor-icons/react/dist/ssr/TrendDown';
import { TrendUp as TrendUpIcon } from '@phosphor-icons/react/dist/ssr/TrendUp';

export function Summary(): React.JSX.Element {
  return (
    <Card>
      <Box
        sx={{
          display: 'grid',
          gap: 2,
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
          p: 3,
        }}
      >
        <Stack
          spacing={1}
          sx={{
            borderRight: { xs: 'none', md: '1px solid var(--mui-palette-divider)' },
            borderBottom: { xs: '1px solid var(--mui-palette-divider)', md: 'none' },
            pb: { xs: 2, md: 0 },
          }}
        >
          <Typography color="text.secondary">Sessions</Typography>
          <Typography variant="h3">{new Intl.NumberFormat('en-US').format(16500)}</Typography>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <TrendUpIcon color="var(--mui-palette-success-main)" fontSize="var(--icon-fontSize-md)" />
            <Typography color="text.secondary" variant="body2">
              <Typography color="success.main" component="span" variant="subtitle2">
                {new Intl.NumberFormat('en-US', { style: 'percent', maximumFractionDigits: 2 }).format(15 / 100)}
              </Typography>{' '}
              increase vs last month
            </Typography>
          </Stack>
        </Stack>
        <Stack
          spacing={1}
          sx={{
            borderRight: { xs: 'none', lg: '1px solid var(--mui-palette-divider)' },
            borderBottom: { xs: '1px solid var(--mui-palette-divider)', md: 'none' },
            pb: { xs: 2, md: 0 },
          }}
        >
          <Typography color="text.secondary">New users</Typography>
          <Typography variant="h3">{new Intl.NumberFormat('en-US').format(2160)}</Typography>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <TrendUpIcon color="var(--mui-palette-success-main)" fontSize="var(--icon-fontSize-md)" />
            <Typography color="text.secondary" variant="body2">
              <Typography color="success.main" component="span" variant="subtitle2">
                {new Intl.NumberFormat('en-US', { style: 'percent', maximumFractionDigits: 2 }).format(10 / 100)}
              </Typography>{' '}
              increase vs last month
            </Typography>
          </Stack>
        </Stack>
        <Stack
          spacing={1}
          sx={{
            borderRight: { xs: 'none', md: '1px solid var(--mui-palette-divider)' },
            borderBottom: { xs: '1px solid var(--mui-palette-divider)', md: 'none' },
            pb: { xs: 2, md: 0 },
          }}
        >
          <Typography color="text.secondary">Bounce rate</Typography>
          <Typography variant="h3">
            {new Intl.NumberFormat('en-US', { style: 'percent', maximumFractionDigits: 2 }).format(56.4 / 100)}
          </Typography>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <TrendDownIcon color="var(--mui-palette-error-main)" fontSize="var(--icon-fontSize-md)" />
            <Typography color="text.secondary" variant="body2">
              <Typography color="error.main" component="span" variant="subtitle2">
                {new Intl.NumberFormat('en-US', { style: 'percent', maximumFractionDigits: 2 }).format(25 / 100)}
              </Typography>{' '}
              decrease vs last month
            </Typography>
          </Stack>
        </Stack>
        <Stack spacing={1}>
          <Typography color="text.secondary">Avg. engagement time</Typography>
          <Typography variant="h3">3m 02s</Typography>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <TrendDownIcon color="var(--mui-palette-error-main)" fontSize="var(--icon-fontSize-md)" />
            <Typography color="text.secondary" variant="body2">
              <Typography color="error.main" component="span" variant="subtitle2">
                {new Intl.NumberFormat('en-US', { style: 'percent', maximumFractionDigits: 2 }).format(15 / 100)}
              </Typography>{' '}
              decrease vs last month
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </Card>
  );
}
