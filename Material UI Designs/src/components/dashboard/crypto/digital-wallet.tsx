'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DotsThree as DotsThreeIcon } from '@phosphor-icons/react/dist/ssr/DotsThree';
import { TrendDown as TrendDownIcon } from '@phosphor-icons/react/dist/ssr/TrendDown';
import { TrendUp as TrendUpIcon } from '@phosphor-icons/react/dist/ssr/TrendUp';
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

import { NoSsr } from '@/components/core/no-ssr';

export type CurrencyCode = 'BTC' | 'ETH' | 'BNB';

const currencyIcons: Record<CurrencyCode, string> = {
  BTC: '/assets/logo-btc.svg',
  ETH: '/assets/logo-eth.svg',
  BNB: '/assets/logo-bnb.svg',
};

export interface DigitalWalletProps {
  amount: number;
  color: string;
  currency: CurrencyCode;
  data: number[];
  diff: number;
  trend: 'up' | 'down';
  value: number;
}

export function DigitalWallet({
  amount,
  color,
  data: dataRaw,
  currency,
  diff,
  trend,
  value,
}: DigitalWalletProps): React.JSX.Element {
  const chartHeight = 100;

  const data = dataRaw.map((item, index) => ({ name: index, value: item }));

  return (
    <Card>
      <Stack direction="row" spacing={3} sx={{ alignItems: 'flex-start', pt: 2, px: 2 }}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography color="text.secondary" variant="h6">
            <Typography color="text.primary" component="span" variant="inherit">
              {amount}
            </Typography>{' '}
            {currency}
          </Typography>
          <Typography color="text.secondary" variant="body2">
            {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)}
          </Typography>
        </Stack>
        <IconButton>
          <DotsThreeIcon weight="bold" />
        </IconButton>
      </Stack>
      <Box sx={{ pt: 3 }}>
        <NoSsr fallback={<Box sx={{ height: `${chartHeight}px` }} />}>
          <ResponsiveContainer height={chartHeight} width="100%">
            <AreaChart data={data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id={`area-wallet-${currency}`} x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0" stopColor={color} stopOpacity={0.1} />
                  <stop offset="100%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis axisLine={false} dataKey="name" hide type="category" />
              <YAxis axisLine={false} hide type="number" />
              <Area
                animationDuration={300}
                dataKey="value"
                fill={`url(#${`area-wallet-${currency}`})`}
                fillOpacity={1}
                name="Income"
                stroke={color}
                strokeWidth={2}
                type="monotone"
              />
            </AreaChart>
          </ResponsiveContainer>
        </NoSsr>
      </Box>
      <Box sx={{ pb: 2, px: 2 }}>
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
          <Box component="img" src={currencyIcons[currency]} sx={{ height: 'auto', flex: '0 0 auto', width: '40px' }} />
          <div>
            <Typography variant="subtitle2">{currency}/USD</Typography>
            <Stack
              direction="row"
              spacing={0.5}
              sx={{
                alignItems: 'center',
                color: trend === 'up' ? 'var(--mui-palette-success-main)' : 'var(--mui-palette-error-main)',
              }}
            >
              {trend === 'up' ? (
                <TrendUpIcon fontSize="var(--icon-fontSize-md)" />
              ) : (
                <TrendDownIcon fontSize="var(--icon-fontSize-md)" />
              )}
              <Typography color="inherit" variant="body2">
                {new Intl.NumberFormat('en-US', { style: 'percent', maximumFractionDigits: 2 }).format(diff / 100)}
              </Typography>
            </Stack>
          </div>
        </Stack>
      </Box>
    </Card>
  );
}
