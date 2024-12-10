'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Cell, Pie, PieChart } from 'recharts';

import { NoSsr } from '@/components/core/no-ssr';

export function Chart11(): React.JSX.Element {
  const chartSize = 220;
  const chartTickness = 20;

  const value = 83;
  const limit = 70;

  const data = [
    { name: 'System Health', value, color: 'var(--mui-palette-primary-main)' },
    { name: 'Empty', value: 100 - value, color: 'var(--mui-palette-neutral-100)' },
  ] satisfies { name: string; value: number; color: string }[];

  return (
    <Box sx={{ bgcolor: 'var(--mui-palette-background-level1)', p: 3 }}>
      <Container maxWidth="sm">
        <Card>
          <CardContent sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
            <Stack spacing={3}>
              <Box sx={{ position: 'relative' }}>
                <NoSsr fallback={<Box sx={{ height: `${chartSize}px`, width: `${chartSize}px` }} />}>
                  <PieChart height={chartSize} margin={{ top: 0, right: 0, bottom: 0, left: 0 }} width={chartSize}>
                    <Pie
                      animationDuration={300}
                      cx={chartSize / 2}
                      cy={chartSize / 2}
                      data={data}
                      dataKey="value"
                      endAngle={-270}
                      innerRadius={chartSize / 2 - chartTickness}
                      nameKey="name"
                      outerRadius={chartSize / 2}
                      startAngle={90}
                      strokeWidth={0}
                    >
                      {data.map(
                        (entry): React.JSX.Element => (
                          <Cell fill={entry.color} key={entry.name} />
                        )
                      )}
                    </Pie>
                  </PieChart>
                </NoSsr>
                <Box
                  sx={{
                    alignItems: 'center',
                    bottom: 0,
                    display: 'flex',
                    justifyContent: 'center',
                    left: 0,
                    position: 'absolute',
                    right: 0,
                    top: 0,
                  }}
                >
                  <Stack spacing={1} sx={{ textAlign: 'center' }}>
                    <Typography variant="h6">System health</Typography>
                    <Typography color="text.secondary" variant="body2">
                      {new Intl.NumberFormat('en-US', { style: 'percent', maximumFractionDigits: 2 }).format(
                        value / 100
                      )}
                    </Typography>
                  </Stack>
                </Box>
              </Box>
              <Typography color="text.secondary" component="p" sx={{ textAlign: 'center' }} variant="caption">
                This shouldn&apos;t be bellow{' '}
                {new Intl.NumberFormat('en-US', { style: 'percent', maximumFractionDigits: 2 }).format(limit / 100)}
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
