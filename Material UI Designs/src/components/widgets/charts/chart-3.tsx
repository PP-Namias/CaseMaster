'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { NoSsr } from '@/components/core/no-ssr';

const lines = [
  { name: 'Page views', dataKey: 'v1', stroke: 'var(--mui-palette-primary-main)' },
  { name: 'Session duration', dataKey: 'v2', stroke: 'var(--mui-palette-warning-main)' },
] satisfies { name: string; dataKey: string; stroke: string }[];

const data = [
  { name: 'Jan 1', v1: 2550, v2: 35 },
  { name: 'Jan 2', v1: 1840, v2: 41 },
  { name: 'Jan 3', v1: 2254, v2: 62 },
  { name: 'Jan 4', v1: 5780, v2: 42 },
  { name: 'Jan 5', v1: 8049, v2: 13 },
  { name: 'Jan 6', v1: 5241, v2: 18 },
  { name: 'Jan 7', v1: 2770, v2: 29 },
  { name: 'Jan 8', v1: 2051, v2: 37 },
  { name: 'Jan 9', v1: 2864, v2: 36 },
  { name: 'Jan 10', v1: 2385, v2: 51 },
  { name: 'Jan 11', v1: 3912, v2: 32 },
  { name: 'Jan 12', v1: 4923, v2: 35 },
] satisfies { name: string; v1: number; v2: number }[];

export function Chart3(): React.JSX.Element {
  const chartHeight = 350;

  return (
    <Box sx={{ bgcolor: 'var(--mui-palette-background-level1)', p: 3 }}>
      <Card>
        <CardHeader title="Analytics" />
        <CardContent>
          <NoSsr fallback={<Box sx={{ height: `${chartHeight}px` }} />}>
            <ResponsiveContainer height={chartHeight} width="100%">
              <LineChart data={data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                <CartesianGrid strokeDasharray="2 4" vertical={false} />
                <XAxis axisLine={false} dataKey="name" tickLine={false} type="category" />
                <YAxis axisLine={false} domain={[0, 9000]} hide type="number" yAxisId={0} />
                <YAxis axisLine={false} domain={[0, 100]} hide type="number" yAxisId={1} />
                {lines.map(
                  (line, index): React.JSX.Element => (
                    <Line
                      animationDuration={300}
                      dataKey={line.dataKey}
                      dot={<Dot />}
                      key={line.name}
                      name={line.name}
                      stroke={line.stroke}
                      strokeWidth={3}
                      type="natural"
                      yAxisId={index}
                      {...(index === 1 && { strokeDasharray: '3 4' })}
                    />
                  )
                )}
                <Tooltip animationDuration={50} content={<TooltipContent />} cursor={false} />
              </LineChart>
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
  if (active) {
    return null;
  }

  const r = payload?.name === active ? 8 : 4;

  return <circle cx={cx} cy={cy} fill={stroke} r={r} />;
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
                {index === 0 ? new Intl.NumberFormat('en-US').format(entry.value) : `${entry.value} sec`}
              </Typography>
            </Stack>
          )
        )}
      </Stack>
    </Paper>
  );
}
