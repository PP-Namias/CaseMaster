'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ChartPie as ChartPieIcon } from '@phosphor-icons/react/dist/ssr/ChartPie';
import { DotsThree as DotsThreeIcon } from '@phosphor-icons/react/dist/ssr/DotsThree';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { NoSsr } from '@/components/core/no-ssr';

const countries = {
  ca: { name: 'Canada', flag: '/assets/flag-ph.svg' },
  de: { name: 'Germany', flag: '/assets/flag-de.svg' },
  ru: { name: 'Russia', flag: '/assets/flag-ru.svg' },
  uk: { name: 'United Kingdom', flag: '/assets/flag-uk.svg' },
  us: { name: 'United States', flag: '/assets/flag-us.svg' },
} as const;

const bars = [
  { name: 'Sessions', dataKey: 'v1', color: 'var(--mui-palette-primary-main)' },
  { name: 'Bounce rate', dataKey: 'v2', color: 'var(--mui-palette-primary-100)' },
] satisfies { name: string; dataKey: string; color: string }[];

export interface CountrySessionsVsBounceProps {
  data: { name: string; v1: number; v2: number }[];
}

export function CountrySessionsVsBounce({ data }: CountrySessionsVsBounceProps): React.JSX.Element {
  const chartHeight = 300;

  return (
    <Card>
      <CardHeader
        action={
          <IconButton>
            <DotsThreeIcon weight="bold" />
          </IconButton>
        }
        avatar={
          <Avatar>
            <ChartPieIcon fontSize="var(--Icon-fontSize)" />
          </Avatar>
        }
        title="Sessions vs bounce rate by country"
      />
      <CardContent>
        <Stack divider={<Divider />} spacing={3}>
          <NoSsr fallback={<Box sx={{ height: `${chartHeight}px` }} />}>
            <ResponsiveContainer height={chartHeight}>
              <BarChart barGap={10} data={data} layout="vertical" margin={{ top: 0, right: 0, bottom: 0, left: 100 }}>
                <CartesianGrid horizontal={false} strokeDasharray="2 4" syncWithTicks />
                <XAxis axisLine={false} tickLine={false} type="number" />
                <YAxis axisLine={false} dataKey="name" tick={<Tick />} tickLine={false} type="category" />
                {bars.map(
                  (bar): React.JSX.Element => (
                    <Bar
                      animationDuration={300}
                      barSize={12}
                      dataKey={bar.dataKey}
                      fill={bar.color}
                      key={bar.name}
                      name={bar.name}
                      radius={[5, 5, 5, 5]}
                    />
                  )
                )}
                <Tooltip animationDuration={50} content={<TooltipContent />} cursor={false} />
              </BarChart>
            </ResponsiveContainer>
          </NoSsr>
          <Legend />
        </Stack>
      </CardContent>
    </Card>
  );
}

interface TickProps {
  height?: number;
  payload?: { name: string; value: string };
  width?: number;
  x?: number;
  y?: number;
}

function Tick({ height, payload, width, x, y }: TickProps): React.JSX.Element {
  const { name, flag } = countries[payload?.value as keyof typeof countries] ?? { name: 'Unknown', flag: '' };

  return (
    <foreignObject height={width} width={height} x={(x ?? 0) - 150} y={(y ?? 0) - 16}>
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
        <Box sx={{ height: '1rem', width: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Box alt={name} component="img" src={flag} sx={{ height: 'auto', width: '100%' }} />
        </Box>
        <Typography noWrap variant="body2">
          {name}
        </Typography>
      </Stack>
    </foreignObject>
  );
}

function Legend(): React.JSX.Element {
  return (
    <Stack direction="row" spacing={2}>
      {bars.map((bar) => (
        <Stack direction="row" key={bar.name} spacing={1} sx={{ alignItems: 'center' }}>
          <Box sx={{ bgcolor: bar.color, borderRadius: '2px', height: '4px', width: '16px' }} />
          <Typography color="text.secondary" variant="caption">
            {bar.name}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
}

interface TooltipContentProps {
  active?: boolean;
  payload?: { fill: string; name: string; value: number }[];
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
                <Box sx={{ bgcolor: entry.fill, borderRadius: '2px', height: '8px', width: '8px' }} />
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
