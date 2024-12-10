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
  { name: 'Trimester 1', dataKey: 'v1', color: 'var(--mui-palette-primary-main)' },
  { name: 'Trimester 2', dataKey: 'v2', color: 'var(--mui-palette-warning-main)' },
  { name: 'Trimester 3', dataKey: 'v3', color: 'var(--mui-palette-success-main)' },
] satisfies { name: string; dataKey: string; color: string }[];

const data = [
  { name: 'Capital One', v1: 12382, v2: 7321, v3: 11492 },
  { name: 'Ally Bank', v1: 24491, v2: 16491, v3: 27592 },
  { name: 'ING', v1: 36192, v2: 47515, v3: 24912 },
  { name: 'Ridgewood', v1: 48921, v2: 58420, v3: 32015 },
  { name: 'BT Transilvania', v1: 60521, v2: 40590, v3: 82234 },
  { name: 'CEC', v1: 72419, v2: 49105, v3: 56391 },
  { name: 'CBC', v1: 24421, v2: 43235, v3: 21612 },
] satisfies { name: string; v1: number; v2: number; v3: number }[];

export function Chart6(): React.JSX.Element {
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
                        stackId="0"
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
