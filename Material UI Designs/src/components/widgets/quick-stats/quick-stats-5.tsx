'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

import { NoSsr } from '@/components/core/no-ssr';

export function QuickStats5(): React.JSX.Element {
  return (
    <Box sx={{ bgcolor: 'var(--mui-palette-background-level1)', p: 3 }}>
      <Card>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' } }}>
          <Summary
            color="var(--mui-palette-primary-main)"
            compare={1214}
            data={[
              { name: '1 AM', value: 23 },
              { name: '2 AM', value: 11 },
              { name: '3 AM', value: 22 },
              { name: '4 AM', value: 27 },
              { name: '5 AM', value: 13 },
              { name: '6 AM', value: 22 },
              { name: '7 AM', value: 37 },
              { name: '8 AM', value: 21 },
              { name: '9 AM', value: 44 },
              { name: '10 AM', value: 22 },
            ]}
            title="Sales"
            total={1529}
          />
          <Summary
            color="var(--mui-palette-warning-main)"
            compare={683}
            data={[
              { name: '1 AM', value: 24 },
              { name: '2 AM', value: 19 },
              { name: '3 AM', value: 30 },
              { name: '4 AM', value: 17 },
              { name: '5 AM', value: 33 },
              { name: '6 AM', value: 19 },
              { name: '7 AM', value: 7 },
              { name: '8 AM', value: 22 },
              { name: '9 AM', value: 19 },
              { name: '10 AM', value: 4 },
            ]}
            title="Profit"
            total={997}
          />
        </Box>
      </Card>
    </Box>
  );
}

export interface SummaryProps {
  color: string;
  compare: number;
  data: { name: string; value: number }[];
  title: string;
  total: number;
}

function Summary({ color, compare, data, title, total }: SummaryProps): React.JSX.Element {
  const chartHeight = 100;

  return (
    <Stack direction="row" spacing={2} sx={{ alignItems: 'center', p: 3 }}>
      <div>
        <Typography color="text.secondary" variant="overline">
          {title}
        </Typography>
        <Typography variant="h5">
          {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(
            total
          )}
        </Typography>
        <Typography color="text.secondary" sx={{ whiteSpace: 'nowrap' }} variant="caption">
          vs. {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(compare)} last day
        </Typography>
      </div>
      <NoSsr fallback={<Box sx={{ height: `${chartHeight}px` }} />}>
        <ResponsiveContainer height={chartHeight}>
          <LineChart data={data} height={chartHeight} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
            <XAxis axisLine={false} dataKey="name" hide type="category" />
            <YAxis axisLine={false} hide type="number" />
            <Line
              animationDuration={300}
              dataKey="value"
              dot={false}
              name={title}
              stroke={color}
              strokeWidth={3}
              type="natural"
            />
          </LineChart>
        </ResponsiveContainer>
      </NoSsr>
    </Stack>
  );
}
