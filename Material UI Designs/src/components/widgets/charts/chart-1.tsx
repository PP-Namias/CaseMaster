'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { NoSsr } from '@/components/core/no-ssr';

const areas = [
  { name: 'New customers', dataKey: 'v1', fill: 'var(--mui-palette-primary-main)' },
  { name: 'Up & cross selling', dataKey: 'v2', fill: 'var(--mui-palette-warning-main)' },
] satisfies { name: string; dataKey: string; fill: string }[];

const data = [
  { name: 'Jan', v1: 31, v2: 11 },
  { name: 'Feb', v1: 40, v2: 32 },
  { name: 'Mar', v1: 28, v2: 45 },
  { name: 'Apr', v1: 51, v2: 32 },
  { name: 'May', v1: 42, v2: 34 },
  { name: 'Jun', v1: 109, v2: 52 },
  { name: 'Jul', v1: 100, v2: 41 },
  { name: 'Aug', v1: 120, v2: 80 },
  { name: 'Sep', v1: 80, v2: 96 },
  { name: 'Oct', v1: 42, v2: 140 },
  { name: 'Nov', v1: 90, v2: 30 },
  { name: 'Dec', v1: 140, v2: 100 },
] satisfies { name: string; v1: number; v2: number }[];

export function Chart1(): React.JSX.Element {
  const chartHeight = 240;

  return (
    <Box sx={{ bgcolor: 'var(--mui-palette-background-level1)', p: 3 }}>
      <Card>
        <CardHeader title="Sales revenue" />
        <CardContent>
          <Stack spacing={3}>
            <NoSsr fallback={<Box sx={{ height: `${chartHeight}px` }} />}>
              <ResponsiveContainer height={chartHeight} width="100%">
                <AreaChart data={data} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
                  <CartesianGrid strokeDasharray="2 4" vertical={false} />
                  <XAxis axisLine={false} dataKey="name" tickLine={false} type="category" />
                  <YAxis axisLine={false} domain={[0, 30]} tickLine={false} type="number" />
                  {areas.map((area) => (
                    <Area
                      animationDuration={300}
                      dataKey={area.dataKey}
                      dot={<Dot />}
                      fill={area.fill}
                      fillOpacity={1}
                      key={area.name}
                      name={area.name}
                      stroke={area.fill}
                      strokeWidth={3}
                      type="linear"
                    />
                  ))}
                  <Tooltip animationDuration={50} content={<TooltipContent />} cursor={false} />
                </AreaChart>
              </ResponsiveContainer>
            </NoSsr>
            <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', justifyContent: 'center' }}>
              {areas.map(
                (area): React.JSX.Element => (
                  <Stack direction="row" key={area.name} spacing={1} sx={{ alignItems: 'center' }}>
                    <Box sx={{ bgcolor: area.fill, borderRadius: '2px', height: '4px', width: '16px' }} />
                    <Typography variant="body2">{area.name}</Typography>
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

export interface DotProps {
  hover?: boolean;
  active?: string;
  cx?: number;
  cy?: number;
  payload?: { name: string };
  stroke?: string;
}

function Dot({ active, cx, cy, payload, stroke }: DotProps): React.JSX.Element | null {
  if (active && payload?.name === active) {
    return <circle cx={cx} cy={cy} fill={stroke} r={6} />;
  }

  return null;
}

interface TooltipContentProps {
  active?: boolean;
  payload?: { name: string; dataKey: string; value: number; stroke: string }[];
  label?: string;
}

function TooltipContent({ active, payload }: TooltipContentProps): React.JSX.Element | null {
  if (!active) {
    return null;
  }

  return (
    <Paper sx={{ border: '1px solid var(--mui-palette-divider)', boxShadow: 'var(--mui-shadows-16)', p: 1 }}>
      <Stack spacing={2}>
        {payload?.map(
          (entry, index): React.JSX.Element => (
            <Stack direction="row" key={entry.name} spacing={3} sx={{ alignItems: 'center' }}>
              <Stack direction="row" spacing={1} sx={{ alignItems: 'center', flex: '1 1 auto' }}>
                <Box sx={{ bgcolor: entry.stroke, borderRadius: '2px', height: '8px', width: '8px' }} />
                <Typography sx={{ whiteSpace: 'nowrap' }}>{entry.name}</Typography>
              </Stack>
              <Typography color="text.secondary" variant="body2">
                {index === 0
                  ? new Intl.NumberFormat('en-US').format(entry.value)
                  : new Intl.NumberFormat('en-US', {
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
