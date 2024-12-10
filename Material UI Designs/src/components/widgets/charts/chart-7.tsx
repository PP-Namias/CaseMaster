'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { NoSsr } from '@/components/core/no-ssr';

const bars = [
  { name: 'Email', dataKey: 'v1', color: 'var(--mui-palette-primary-main)' },
  { name: 'Facebook', dataKey: 'v2', color: 'var(--mui-palette-warning-main)' },
  { name: 'Google Ads Search', dataKey: 'v3', color: 'var(--mui-palette-success-main)' },
  { name: 'Instagram', dataKey: 'v4', color: 'var(--mui-palette-error-main)' },
] satisfies { name: string; dataKey: string; color: string }[];

const data = [{ name: 'Sales', v1: 37530, v2: 90590, v3: 13219, v4: 62935 }];

export function Chart7(): React.JSX.Element {
  const chartHeight = 300;

  return (
    <Box sx={{ bgcolor: 'var(--mui-palette-background-level1)', p: 3 }}>
      <Container maxWidth="md">
        <Card>
          <CardHeader title="Incremental sales" />
          <CardContent>
            <Stack spacing={3}>
              <NoSsr fallback={<Box sx={{ height: `${chartHeight}px` }} />}>
                <ResponsiveContainer height={chartHeight}>
                  <BarChart data={data} layout="vertical" margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                    <CartesianGrid horizontal={false} strokeDasharray="2 4" />
                    <XAxis axisLine={false} tickLine={false} type="number" />
                    <YAxis axisLine={false} dataKey="name" hide type="category" />
                    {bars.map(
                      (bar): React.JSX.Element => (
                        <Bar
                          animationDuration={300}
                          barSize={40}
                          dataKey={bar.dataKey}
                          fill={bar.color}
                          key={bar.name}
                          name={bar.name}
                        />
                      )
                    )}
                    <Tooltip animationDuration={50} content={<TooltipContent />} cursor={false} />
                  </BarChart>
                </ResponsiveContainer>
              </NoSsr>
              <Stack direction="row" spacing={3} sx={{ flexWrap: 'wrap' }}>
                {bars.map((bar) => (
                  <Stack
                    direction="row"
                    key={bar.name}
                    spacing={1}
                    sx={{ alignItems: 'center', display: 'flex', p: 1 }}
                  >
                    <Box sx={{ bgcolor: bar.color, borderRadius: '2px', height: '4px', width: '16px' }} />
                    <Typography variant="subtitle2">{bar.name}</Typography>
                  </Stack>
                ))}
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

interface TooltipContentProps {
  active?: boolean;
  payload?: { fill: string; name: string; value: number }[];
  label?: string;
}

function TooltipContent({ active, payload, label }: TooltipContentProps): React.JSX.Element | null {
  if (!active) {
    return null;
  }

  return (
    <Paper sx={{ border: '1px solid var(--mui-palette-divider)', boxShadow: 'var(--mui-shadows-16)', p: 1 }}>
      <Stack spacing={2}>
        <Typography variant="subtitle1">{label}</Typography>
        {payload?.map(
          (entry): React.JSX.Element => (
            <Stack direction="row" key={entry.name} spacing={2} sx={{ alignItems: 'center' }}>
              <Stack direction="row" spacing={1} sx={{ alignItems: 'center', flex: '1 1 auto' }}>
                <Box sx={{ bgcolor: entry.fill, borderRadius: '2px', height: '8px', width: '8px' }} />
                <Typography sx={{ whiteSpace: 'nowrap' }}>{entry.name}</Typography>
              </Stack>
              <Typography color="text.secondary" variant="body2">
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  maximumFractionDigits: 0,
                }).format(entry.value)}
              </Typography>
            </Stack>
          )
        )}
      </Stack>
    </Paper>
  );
}
