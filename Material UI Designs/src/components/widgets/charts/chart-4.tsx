'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { NoSsr } from '@/components/core/no-ssr';

const data = [
  { name: 'Mon', value: 3420 },
  { name: 'Tue', value: 4063 },
  { name: 'Wed', value: 2765 },
  { name: 'Thu', value: 5540 },
  { name: 'Fri', value: 4549 },
  { name: 'Sat', value: 2811 },
  { name: 'Sun', value: 7430 },
] satisfies { name: string; value: number }[];

export function Chart4(): React.JSX.Element {
  const chartHeight = 300;

  return (
    <Box sx={{ bgcolor: 'var(--mui-palette-background-level1)', p: 3 }}>
      <Card>
        <CardHeader title="Sales" />
        <CardContent>
          <NoSsr fallback={<Box sx={{ height: `${chartHeight}px` }} />}>
            <ResponsiveContainer height={chartHeight}>
              <BarChart data={data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                <CartesianGrid strokeDasharray="2 4" vertical={false} />
                <XAxis axisLine={false} dataKey="name" tickLine={false} type="category" />
                <YAxis axisLine={false} hide type="number" />
                <Bar
                  animationDuration={300}
                  barSize={24}
                  dataKey="value"
                  fill="var(--mui-palette-primary-main)"
                  name="Sales"
                />
                <Tooltip animationDuration={50} content={<TooltipContent />} cursor={false} />
              </BarChart>
            </ResponsiveContainer>
          </NoSsr>
        </CardContent>
      </Card>
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
