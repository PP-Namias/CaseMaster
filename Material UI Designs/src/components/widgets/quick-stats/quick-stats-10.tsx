import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

export function QuickStats10(): React.JSX.Element {
  return (
    <Box sx={{ bgcolor: 'var(--mui-palette-background-level1)', p: 3 }}>
      <Card>
        <CardHeader title="Today's stats" />
        <CardContent>
          <Grid container spacing={3}>
            <Grid md={4} xs={12}>
              <Stack
                direction="row"
                spacing={2}
                sx={{
                  alignItems: 'center',
                  bgcolor: 'var(--mui-palette-background-level1)',
                  borderRadius: 2.5,
                  px: 3,
                  py: 4,
                }}
              >
                <Box sx={{ flex: '0 0 auto', height: '48px', width: '48px' }}>
                  <Box
                    alt="Chart"
                    component="img"
                    src="/assets/iconly-glass-chart.svg"
                    sx={{ height: 'auto', width: '100%' }}
                  />
                </Box>
                <div>
                  <Typography color="text.secondary" variant="body2">
                    Sales
                  </Typography>
                  <Typography variant="h5">{new Intl.NumberFormat('en-US').format(5402)}</Typography>
                </div>
              </Stack>
            </Grid>
            <Grid md={4} xs={12}>
              <Stack
                direction="row"
                spacing={2}
                sx={{
                  alignItems: 'center',
                  bgcolor: 'var(--mui-palette-background-level1)',
                  borderRadius: 2.5,
                  px: 3,
                  py: 4,
                }}
              >
                <Box sx={{ flex: '0 0 auto', height: '48px', width: '48px' }}>
                  <Box
                    alt="Discount"
                    component="img"
                    src="/assets/iconly-glass-discount.svg"
                    sx={{ height: 'auto', width: '100%' }}
                  />
                </Box>
                <div>
                  <Typography color="text.secondary" variant="body2">
                    Cost
                  </Typography>
                  <Typography variant="h5">
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                      maximumFractionDigits: 0,
                    }).format(15032)}
                  </Typography>
                </div>
              </Stack>
            </Grid>
            <Grid md={4} xs={12}>
              <Stack
                direction="row"
                spacing={2}
                sx={{
                  alignItems: 'center',
                  bgcolor: 'var(--mui-palette-background-level1)',
                  borderRadius: 2.5,
                  px: 3,
                  py: 4,
                }}
              >
                <Box sx={{ flex: '0 0 auto', height: '48px', width: '48px' }}>
                  <Box
                    alt="Tick"
                    component="img"
                    src="/assets/iconly-glass-tick.svg"
                    sx={{ height: 'auto', width: '100%' }}
                  />
                </Box>
                <div>
                  <Typography color="text.secondary" variant="body2">
                    Profit
                  </Typography>
                  <Typography variant="h5">
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                      maximumFractionDigits: 0,
                    }).format(25961)}
                  </Typography>
                </div>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}
