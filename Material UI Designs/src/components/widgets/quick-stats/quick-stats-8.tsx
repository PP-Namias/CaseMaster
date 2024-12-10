'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ArrowCounterClockwise as ArrowCounterClockwiseIcon } from '@phosphor-icons/react/dist/ssr/ArrowCounterClockwise';
import { Line, LineChart, XAxis, YAxis } from 'recharts';

import { NoSsr } from '@/components/core/no-ssr';

const data = [
  { name: 'Mon', value: 14 },
  { name: 'Tue', value: 43 },
  { name: 'Wed', value: 98 },
  { name: 'Thu', value: 67 },
  { name: 'Fri', value: 125 },
  { name: 'Sat', value: 17 },
  { name: 'Sun', value: 9 },
] satisfies { name: string; value: number }[];

export function QuickStats8(): React.JSX.Element {
  const chartHeight = 60;
  const chartWidth = 180;

  return (
    <Box sx={{ bgcolor: 'var(--mui-palette-background-level1)', p: 3 }}>
      <Box maxWidth="sm" sx={{ mx: 'auto' }}>
        <Card>
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center', p: 3 }}>
            <Avatar
              sx={{ bgcolor: 'var(--mui-palette-primary-main)', color: 'var(--mui-palette-primary-contrastText)' }}
            >
              <ArrowCounterClockwiseIcon fontSize="var(--Icon-fontSize)" />
            </Avatar>
            <Box sx={{ flex: '1 1 auto' }}>
              <Typography color="text.secondary" noWrap variant="body1">
                Conversions
              </Typography>
              <Typography variant="h4">{new Intl.NumberFormat('en-US').format(361)}</Typography>
            </Box>
            <NoSsr fallback={<Box sx={{ height: `${chartHeight}px`, width: `${chartWidth}px` }} />}>
              <LineChart
                data={data}
                height={chartHeight}
                margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                width={chartWidth}
              >
                <XAxis axisLine={false} dataKey="name" hide type="category" />
                <YAxis axisLine={false} hide type="number" />
                <Line
                  animationDuration={300}
                  dataKey="value"
                  dot={false}
                  name="Conversions"
                  stroke="var(--mui-palette-primary-main)"
                  strokeWidth={3}
                  type="linear"
                />
              </LineChart>
            </NoSsr>
          </Stack>
        </Card>
      </Box>
    </Box>
  );
}
