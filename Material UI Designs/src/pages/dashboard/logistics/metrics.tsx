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
import { DeviatedVehicles } from '@/components/dashboard/logistics/deviated-vehicles';
import { LateVehicles } from '@/components/dashboard/logistics/late-vehicles';
import { OnRouteVehicles } from '@/components/dashboard/logistics/on-route-vehicles';
import { VehiclesCondition } from '@/components/dashboard/logistics/vehicles-condition';
import { VehiclesOverview } from '@/components/dashboard/logistics/vehicles-overview';
import { VehiclesTable } from '@/components/dashboard/logistics/vehicles-table';
import { VehiclesWithErrors } from '@/components/dashboard/logistics/vehicles-with-errors';

const metadata = { title: `Metrics | Logistics | Dashboard | ${config.site.name}` } satisfies Metadata;

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
              <Typography variant="h4">Logistics</Typography>
            </Box>
            <div>
              <Button startIcon={<PlusIcon />} variant="contained">
                Add vehicle
              </Button>
            </div>
          </Stack>
          <Grid container spacing={4}>
            <Grid md={3} xs={12}>
              <OnRouteVehicles amount={38} />
            </Grid>
            <Grid md={3} xs={12}>
              <VehiclesWithErrors amount={2} />
            </Grid>
            <Grid md={3} xs={12}>
              <DeviatedVehicles amount={1} />
            </Grid>
            <Grid md={3} xs={12}>
              <LateVehicles amount={2} />
            </Grid>
            <Grid lg={6} xs={12}>
              <VehiclesOverview
                data={[
                  { name: 'Available', value: 38, fill: 'var(--mui-palette-primary-main)' },
                  { name: 'Out of service', value: 50, fill: 'var(--mui-palette-warning-main)' },
                  { name: 'On route', value: 12, fill: 'var(--mui-palette-info-main)' },
                ]}
              />
            </Grid>
            <Grid lg={6} xs={12}>
              <VehiclesCondition bad={12} excellent={181} good={24} />
            </Grid>
            <Grid xs={12}>
              <VehiclesTable
                rows={[
                  {
                    id: 'VEH-004',
                    endingRoute: 'Dordrecht, Netherlands',
                    startingRoute: 'Liden, Netherlands',
                    status: 'success',
                    temperature: 8,
                    temperatureLabel: 'Very Good',
                  },
                  {
                    id: 'VEH-003',
                    endingRoute: 'Paris, France',
                    startingRoute: 'Lion, France',
                    status: 'warning',
                    temperature: 24,
                    temperatureLabel: 'Bad',
                    warning: 'Temperature not optimal',
                  },
                  {
                    id: 'VEH-002',
                    endingRoute: 'Memphis, Tennessee, United States',
                    startingRoute: 'Dallas, Texas, United States',
                    status: 'error',
                    temperature: 8,
                    temperatureLabel: 'Very Good',
                    warning: 'ECU not responding',
                  },
                  {
                    id: 'VEH-001',
                    endingRoute: 'Cleveland, Ohio, United States',
                    startingRoute: 'Cleveland, Ohio, United States',
                    status: 'success',
                    temperature: 12,
                    temperatureLabel: 'Good',
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
