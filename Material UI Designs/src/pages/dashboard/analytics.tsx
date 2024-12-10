import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { Helmet } from 'react-helmet-async';

import type { Metadata } from '@/types/metadata';
import { config } from '@/config';
import { ChannelSessionsVsBounce } from '@/components/dashboard/analytics/channel-sessions-vs-bounce-rate';
import { CountrySessionsVsBounce } from '@/components/dashboard/analytics/country-sessions-vs-bounce-rate';
import { Devices } from '@/components/dashboard/analytics/devices';
import { InboundOutbound } from '@/components/dashboard/analytics/inbound-outbound';
import { Insight } from '@/components/dashboard/analytics/insight';
import { Summary } from '@/components/dashboard/analytics/summary';

const metadata = { title: `Analytics | Dashboard | ${config.site.name}` } satisfies Metadata;

export function Page(): React.JSX.Element {
  return (
    <React.Fragment>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <Box
        sx={{
          maxWidth: 'var(--Content-maxWidth)',
          m: 'var(--Content-margin)',
          p: 'var(--Content-padding)',
          width: 'var(--Content-width)',
        }}
      >
        <Stack spacing={4}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ alignItems: 'flex-start' }}>
            <Box sx={{ flex: '1 1 auto' }}>
              <Typography variant="h4">Analytics</Typography>
            </Box>
            <div>
              <Button startIcon={<PlusIcon />} variant="contained">
                Add metrics
              </Button>
            </div>
          </Stack>
          <Grid container spacing={4}>
            <Grid xs={12}>
              <Summary />
            </Grid>
            <Grid lg={6} xs={12}>
              <CountrySessionsVsBounce
                data={[
                  { name: 'us', v1: 600, v2: 560 },
                  { name: 'uk', v1: 540, v2: 500 },
                  { name: 'ru', v1: 490, v2: 450 },
                  { name: 'ca', v1: 440, v2: 380 },
                  { name: 'de', v1: 320, v2: 280 },
                ]}
              />
            </Grid>
            <Grid lg={6} xs={12}>
              <ChannelSessionsVsBounce
                data={[
                  { name: 'Organic', v1: 600, v2: 560 },
                  { name: 'Direct', v1: 540, v2: 500 },
                  { name: 'Paid Ads', v1: 490, v2: 450 },
                  { name: 'Social', v1: 440, v2: 380 },
                  { name: 'Email', v1: 320, v2: 280 },
                ]}
              />
            </Grid>
            <Grid lg={4} xs={12}>
              <Devices
                data={[
                  { name: 'Desktop', value: 68.2, color: 'var(--mui-palette-primary-main)' },
                  { name: 'Mobile', value: 22.8, color: 'var(--mui-palette-success-main)' },
                  { name: 'Tablet', value: 10, color: 'var(--mui-palette-warning-main)' },
                ]}
              />
            </Grid>
            <Grid lg={4} xs={12}>
              <InboundOutbound
                inbound={{
                  color: 'var(--mui-palette-error-main)',
                  data: [
                    720, 705, 707, 691, 692, 640, 634, 630, 647, 640, 661, 670, 652, 638, 631, 620, 624, 636, 632, 631,
                    616, 601, 602, 580, 572, 571, 562, 540,
                  ],
                  diff: 25,
                  trend: 'down',
                  value: 560,
                }}
                outbound={{
                  color: 'var(--mui-palette-success-main)',
                  data: [
                    1836, 1872, 1911, 1912, 1920, 1942, 1941, 1956, 1971, 1972, 1976, 1964, 1960, 1971, 1978, 1992,
                    2009, 2001, 1980, 1987, 1970, 1973, 1979, 2028, 2029, 2034, 2035, 2040,
                  ],
                  diff: 10,
                  trend: 'up',
                  value: 2040,
                }}
              />
            </Grid>
            <Grid lg={4} xs={12}>
              <Insight
                insights={[
                  {
                    id: 'INSIGHT-1',
                    title: '+15%',
                    description: 'forecasted increase in your traffic by the end of the current month',
                  },
                  {
                    id: 'INSIGHT-2',
                    title: '2.5%',
                    description: 'forecasted increase in your conversion rate by the end of the current month',
                  },
                  {
                    id: 'INSIGHT-3',
                    title: '3.5%',
                    description: 'forecasted increase in your revenue by the end of the current month',
                  },
                ]}
              />
            </Grid>
          </Grid>
        </Stack>
      </Box>
    </React.Fragment>
  );
}
