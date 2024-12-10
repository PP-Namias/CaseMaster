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

const bars = [
  { name: 'This year', dataKey: 'v1', color: 'var(--mui-palette-primary-main)' },
  { name: 'Last year', dataKey: 'v2', color: 'var(--mui-palette-warning-main)' },
] satisfies { name: string; dataKey: string; color: string }[];

const data = [
  { name: 'Jan', v1: 54928, v2: 24923 },
  { name: 'Feb', v1: 49836, v2: 11493 },
  { name: 'Mar', v1: 54921, v2: 45923 },
  { name: 'Apr', v1: 84701, v2: 66023 },
  { name: 'May', v1: 39593, v2: 23012 },
  { name: 'Jun', v1: 14492, v2: 18234 },
  { name: 'Jul', v1: 54392, v2: 23958 },
  { name: 'Aug', v1: 27606, v2: 10644 },
  { name: 'Sep', v1: 45027, v2: 21823 },
  { name: 'Oct', v1: 39592, v2: 37231 },
  { name: 'Nov', v1: 48459, v2: 23105 },
  { name: 'Dec', v1: 20502, v2: 13819 },
] satisfies { name: string; v1: number; v2: number }[];

export function Chart5(): React.JSX.Element {
  const chartHeight = 300;

  return (
    <Box sx={{ bgcolor: 'var(--mui-palette-background-level1)', p: 3 }}>
      <Card>
        <CardHeader title="Sales" />
        <CardContent>
          <Stack spacing={3}>
            <NoSsr fallback={<Box sx={{ height: `${chartHeight}px` }} />}>
              <ResponsiveContainer height={chartHeight}>
                <BarChart data={data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                  <CartesianGrid strokeDasharray="2 4" vertical={false} />
                  <XAxis axisLine={false} dataKey="name" tickLine={false} type="category" />
                  <YAxis axisLine={false} hide type="number" />
                  {bars.map(
                    (bar): React.JSX.Element => (
                      <Bar
                        animationDuration={300}
                        barSize={24}
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
            <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', justifyContent: 'center' }}>
              {bars.map(
                (bar): React.JSX.Element => (
                  <Stack direction="row" key={bar.name} spacing={1} sx={{ alignItems: 'center' }}>
                    <Box sx={{ bgcolor: bar.color, borderRadius: '2px', height: '4px', width: '16px' }} />
                    <Typography variant="body2">{bar.name}</Typography>
                  </Stack>
                )
              )}
            </Stack>
          </Stack>
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
