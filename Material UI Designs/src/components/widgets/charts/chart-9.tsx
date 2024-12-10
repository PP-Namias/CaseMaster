'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Cell, Pie, PieChart, Tooltip } from 'recharts';

import { NoSsr } from '@/components/core/no-ssr';

const data = [
  { name: 'Strategy', value: 14859, color: 'var(--mui-palette-primary-main)' },
  { name: 'Outsourcing', value: 35690, color: 'var(--mui-palette-info-main)' },
  { name: 'Marketing', value: 45120, color: 'var(--mui-palette-warning-main)' },
] satisfies { name: string; value: number; color: string }[];

export function Chart9(): React.JSX.Element {
  const chartSize = 240;

  return (
    <Box sx={{ bgcolor: 'var(--mui-palette-background-level1)', p: 3 }}>
      <Container maxWidth="md">
        <Card>
          <CardHeader title="Cost breakdown" />
          <CardContent>
            <Stack spacing={3}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <NoSsr fallback={<Box sx={{ height: chartSize, width: chartSize }} />}>
                  <PieChart height={chartSize} margin={{ top: 0, right: 0, bottom: 0, left: 0 }} width={chartSize}>
                    <Pie
                      animationDuration={300}
                      cx={chartSize / 2}
                      cy={chartSize / 2}
                      data={data}
                      dataKey="value"
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
              <List disablePadding>
                {data.map((entry) => (
                  <ListItem disableGutters key={entry.name}>
                    <Stack direction="row" spacing={1} sx={{ alignItems: 'center', flex: '1 1 auto' }}>
                      <Box sx={{ bgcolor: entry.color, borderRadius: '2px', height: '4px', width: '16px' }} />
                      <Typography typography="subtitle1">{entry.name}</Typography>
                    </Stack>
                    <Typography color="text.secondary">
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        maximumFractionDigits: 0,
                      }).format(entry.value)}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </Stack>
          </CardContent>
        </Card>
      </Container>
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
