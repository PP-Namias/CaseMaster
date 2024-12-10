'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';
import { Cell, Pie, PieChart } from 'recharts';

import { NoSsr } from '@/components/core/no-ssr';

export function QuickStats6(): React.JSX.Element {
  return (
    <Box sx={{ bgcolor: 'var(--mui-palette-background-level1)', p: 3 }}>
      <Grid container spacing={3}>
        <Grid md={6} xs={12}>
          <Summary color="var(--mui-palette-primary-main)" title="Weekly earnings" total="0.299 BTC" value={75} />
        </Grid>
        <Grid md={6} xs={12}>
          <Summary
            color="var(--mui-palette-warning-main)"
            title="Private wallet"
            total={new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              maximumFractionDigits: 0,
            }).format(52451)}
            value={32}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export interface SummaryProps {
  color: string;
  title: string;
  total: string;
  value: number;
}

function Summary({ color, title, total, value }: SummaryProps): React.JSX.Element {
  const chartSize = 100;
  const chartTickness = 10;

  const data = [
    { name: title, value, color },
    { name: 'Empty', value: 100 - value, color: 'var(--mui-palette-neutral-100)' },
  ] satisfies { name: string; value: number; color: string }[];

  return (
    <Card>
      <CardContent>
        <Stack direction="row" spacing={3} sx={{ alignItems: 'center' }}>
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
          <Box sx={{ flex: '1 1 auto' }}>
            <Stack spacing={1}>
              <Typography variant="h4">{total}</Typography>
              <Typography variant="subtitle2">{title}</Typography>
            </Stack>
          </Box>
        </Stack>
      </CardContent>
      <Divider />
      <CardActions>
        <Button color="secondary" endIcon={<ArrowRightIcon />}>
          See all activity
        </Button>
      </CardActions>
    </Card>
  );
}
