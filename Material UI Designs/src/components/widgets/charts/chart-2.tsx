'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DotsThree as DotsThreeIcon } from '@phosphor-icons/react/dist/ssr/DotsThree';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { NoSsr } from '@/components/core/no-ssr';

const data = [
  { name: 'Jan', value: 10 },
  { name: 'Feb', value: 5 },
  { name: 'Mar', value: 11 },
  { name: 'Apr', value: 20 },
  { name: 'May', value: 13 },
  { name: 'Jun', value: 28 },
  { name: 'Jul', value: 18 },
  { name: 'Aug', value: 4 },
  { name: 'Sep', value: 13 },
  { name: 'Oct', value: 12 },
  { name: 'Nov', value: 13 },
  { name: 'Dec', value: 5 },
  { name: 'Jan', value: 10 },
] satisfies { name: string; value: number }[];

export function Chart2(): React.JSX.Element {
  const chartHeight = 240;
  const color = 'var(--mui-palette-primary-main)';

  return (
    <Box sx={{ bgcolor: 'var(--mui-palette-background-level1)', p: 3 }}>
      <Card>
        <CardHeader
          action={
            <IconButton>
              <DotsThreeIcon weight="bold" />
            </IconButton>
          }
          title="Performance over time"
        />
        <CardContent>
          <NoSsr fallback={<Box sx={{ height: `${chartHeight}px` }} />}>
            <ResponsiveContainer height={chartHeight} width="100%">
              <AreaChart data={data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id="area-performance" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0" stopColor={color} stopOpacity={0.3} />
                    <stop offset="100%" stopColor={color} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="2 4" vertical={false} />
                <XAxis axisLine={false} dataKey="name" tickLine={false} type="category" />
                <YAxis axisLine={false} domain={[0, 30]} tickLine={false} type="number" />
                <Area
                  animationDuration={300}
                  dataKey="value"
                  dot={<Dot />}
                  fill="url(#area-performance)"
                  fillOpacity={1}
                  name="Performance"
                  stroke={color}
                  strokeWidth={3}
                  type="natural"
                />
                <Tooltip animationDuration={50} content={<TooltipContent />} cursor={false} />
              </AreaChart>
            </ResponsiveContainer>
          </NoSsr>
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
          (entry): React.JSX.Element => (
            <Stack direction="row" key={entry.name} spacing={3} sx={{ alignItems: 'center' }}>
              <Stack direction="row" spacing={1} sx={{ alignItems: 'center', flex: '1 1 auto' }}>
                <Box sx={{ bgcolor: entry.stroke, borderRadius: '2px', height: '8px', width: '8px' }} />
                <Typography sx={{ whiteSpace: 'nowrap' }}>{entry.name}</Typography>
              </Stack>
              <Typography color="text.secondary" variant="body2">
                {new Intl.NumberFormat('en-US').format(entry.value)}
              </Typography>
            </Stack>
          )
        )}
      </Stack>
    </Paper>
  );
}
