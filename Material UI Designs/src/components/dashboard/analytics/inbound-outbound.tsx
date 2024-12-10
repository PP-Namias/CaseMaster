'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ArrowsDownUp as ArrowsDownUpIcon } from '@phosphor-icons/react/dist/ssr/ArrowsDownUp';
import { DotsThree as DotsThreeIcon } from '@phosphor-icons/react/dist/ssr/DotsThree';
import { TrendDown as TrendDownIcon } from '@phosphor-icons/react/dist/ssr/TrendDown';
import { TrendUp as TrendUpIcon } from '@phosphor-icons/react/dist/ssr/TrendUp';
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

import { NoSsr } from '@/components/core/no-ssr';

export interface InboundOutboundProps {
  inbound: { color: string; data: number[]; diff: number; trend: 'up' | 'down'; value: number };
  outbound: { color: string; data: number[]; diff: number; trend: 'up' | 'down'; value: number };
}

export function InboundOutbound({ inbound, outbound }: InboundOutboundProps): React.JSX.Element {
  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader
        action={
          <IconButton>
            <DotsThreeIcon weight="bold" />
          </IconButton>
        }
        avatar={
          <Avatar>
            <ArrowsDownUpIcon fontSize="var(--Icon-fontSize)" />
          </Avatar>
        }
        title="Average"
      />
      <CardContent>
        <Stack spacing={3}>
          <Segment name="Inbound" {...inbound} />
          <Segment name="Outbound" {...outbound} />
        </Stack>
      </CardContent>
    </Card>
  );
}

interface SegmentProps {
  color: string;
  data: number[];
  diff: number;
  name: string;
  trend: 'up' | 'down';
  value: number;
}

function Segment({ color, data: dataRaw, diff, name, trend, value }: SegmentProps): React.JSX.Element {
  const chartHeight = 120;

  const data = dataRaw.map((item, index) => ({ name: index, value: item }));

  const sortedData = [...dataRaw].sort((a, b) => a - b);
  const min = sortedData[0] ?? 0;
  const max = sortedData[sortedData.length - 1] ?? 0;

  return (
    <Stack
      direction="row"
      spacing={3}
      sx={{
        bgcolor: 'var(--mui-palette-background-level1)',
        borderRadius: '12px',
        justifyContent: 'space-between',
        p: '8px 16px',
      }}
    >
      <Stack spacing={1} sx={{ width: '200px' }}>
        <Typography color="text.secondary" variant="body2">
          {name}
        </Typography>
        <Typography variant="h3">{value}</Typography>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <Box
            sx={{
              alignItems: 'center',
              color: trend === 'up' ? 'var(--mui-palette-success-main)' : 'var(--mui-palette-error-main)',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            {trend === 'up' ? (
              <TrendUpIcon fontSize="var(--icon-fontSize-md)" />
            ) : (
              <TrendDownIcon fontSize="var(--icon-fontSize-md)" />
            )}
          </Box>
          <Typography color={trend === 'up' ? 'success.main' : 'error.main'} variant="subtitle2">
            {new Intl.NumberFormat('en-US', { style: 'percent', maximumFractionDigits: 2 }).format(diff / 100)}
          </Typography>
        </Stack>
      </Stack>
      <NoSsr fallback={<Box sx={{ height: `${chartHeight}px` }} />}>
        <ResponsiveContainer height={chartHeight} width="100%">
          <AreaChart data={data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id={`area-${name}`} x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor={color} stopOpacity={0.3} />
                <stop offset="75%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis axisLine={false} dataKey="name" hide type="category" />
            <YAxis axisLine={false} domain={[min - 200, max + 50]} hide type="number" />
            <Area
              animationDuration={300}
              dataKey="value"
              fill={`url(#area-${name})`}
              fillOpacity={1}
              name={name}
              stroke={color}
              strokeWidth={2}
              type="monotone"
            />
          </AreaChart>
        </ResponsiveContainer>
      </NoSsr>
    </Stack>
  );
}
