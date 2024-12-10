'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DotsThree as DotsThreeIcon } from '@phosphor-icons/react/dist/ssr/DotsThree';
import { Cell, Pie, PieChart, Tooltip } from 'recharts';

import { NoSsr } from '@/components/core/no-ssr';

const data = [
  { name: 'Subscriptions', value: 56, color: 'var(--mui-palette-primary-main)' },
  { name: 'Affiliate', value: 24, color: 'var(--mui-palette-warning-main)' },
  { name: 'Sales', value: 20, color: 'var(--mui-palette-info-main)' },
] satisfies { name: string; value: number; color: string }[];

export function QuickStats1(): React.JSX.Element {
  const chartSize = 240;
  const chartTickness = 40;

  return (
    <Box sx={{ bgcolor: 'var(--mui-palette-background-level1)', p: 3 }}>
      <Card>
        <CardHeader
          action={
            <IconButton>
              <DotsThreeIcon weight="bold" />
            </IconButton>
          }
          title="Earnings source"
        />
        <Divider />
        <Box sx={{ display: 'flex', justifyContent: 'center', px: 3, py: 6 }}>
          <NoSsr fallback={<Box sx={{ height: chartSize, width: chartSize }} />}>
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
              <Tooltip animationDuration={50} content={<TooltipContent />} />
            </PieChart>
          </NoSsr>
        </Box>
        <Divider />
        <Stack direction="row" divider={<Divider flexItem orientation="vertical" />}>
          {data.map((entry) => (
            <Box
              key={entry.name}
              sx={{
                display: 'flex',
                flex: '1 1 auto',
                flexDirection: 'column',
                justifyContent: 'center',
                px: 2,
                py: 3,
                textAlign: 'center',
              }}
            >
              <Typography variant="h4">
                {new Intl.NumberFormat('en-US', { style: 'percent', maximumFractionDigits: 2 }).format(
                  entry.value / 100
                )}
              </Typography>
              <Typography color="text.secondary" variant="overline">
                {entry.name}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Card>
    </Box>
  );
}

interface TooltipContentProps {
  active?: boolean;
  payload?: { name: string; dataKey: string; payload: { fill: string }; value: number }[];
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
                <Box sx={{ bgcolor: entry.payload.fill, borderRadius: '2px', height: '8px', width: '8px' }} />
                <Typography sx={{ whiteSpace: 'nowrap' }}>{entry.name}</Typography>
              </Stack>
              <Typography color="text.secondary" variant="body2">
                {new Intl.NumberFormat('en-US', { style: 'percent', maximumFractionDigits: 2 }).format(
                  entry.value / 100
                )}
              </Typography>
            </Stack>
          )
        )}
      </Stack>
    </Paper>
  );
}
