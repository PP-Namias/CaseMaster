'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Wallet as WalletIcon } from '@phosphor-icons/react/dist/ssr/Wallet';
import { Cell, Pie, PieChart, Tooltip } from 'recharts';

import { NoSsr } from '@/components/core/no-ssr';

export interface CostBreakdownProps {
  data: { name: string; value: number; color: string }[];
}

export function CostBreakdown({ data }: CostBreakdownProps): React.JSX.Element {
  const chartSize = 200;
  const chartTickness = 30;

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar>
            <WalletIcon fontSize="var(--Icon-fontSize)" />
          </Avatar>
        }
        subheader="Based on selected period"
        title="Cost breakdown"
      />
      <CardContent>
        <Stack spacing={3}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <NoSsr fallback={<Box sx={{ height: `${chartSize}px`, width: `${chartSize}px` }} />}>
              <PieChart height={chartSize} margin={{ top: 0, right: 0, bottom: 0, left: 0 }} width={chartSize}>
                <Pie
                  animationDuration={300}
                  cx={chartSize / 2}
                  cy={chartSize / 2}
                  data={data}
                  dataKey="value"
                  innerRadius={chartSize / 2 - chartTickness}
                  nameKey="name"
                  outerRadius={chartSize / 2}
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
          <Legend payload={data} />
        </Stack>
      </CardContent>
    </Card>
  );
}

interface LegendProps {
  payload?: { name: string; value: number; color: string }[];
}

function Legend({ payload }: LegendProps): React.JSX.Element {
  return (
    <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: '1fr 1fr' }}>
      {payload?.map(
        (entry, index): React.JSX.Element => (
          <Box
            key={entry.name}
            sx={{ alignItems: index % 2 === 0 ? 'flex-start' : 'flex-end', display: 'flex', flexDirection: 'column' }}
          >
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
              <Box sx={{ bgcolor: entry.color, borderRadius: '2px', height: '4px', width: '16px' }} />
              <Typography variant="body2">{entry.name}</Typography>
            </Stack>
            <Typography variant="h5">
              {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(
                entry.value
              )}
            </Typography>
          </Box>
        )
      )}
    </Box>
  );
}

interface TooltipContentProps {
  active?: boolean;
  payload?: { name: string; payload: { fill: string }; value: number }[];
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
