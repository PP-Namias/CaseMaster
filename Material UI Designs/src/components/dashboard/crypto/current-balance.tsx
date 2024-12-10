'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ArrowDownRight as ArrowDownRightIIcon } from '@phosphor-icons/react/dist/ssr/ArrowDownRight';
import { ArrowUpRight as ArrowUpRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowUpRight';
import { Wallet as WalletIcon } from '@phosphor-icons/react/dist/ssr/Wallet';
import { Cell, Pie, PieChart, Tooltip } from 'recharts';

import { NoSsr } from '@/components/core/no-ssr';

export type CurrencyCode = 'BTC' | 'ETH' | 'BNB' | 'USD';

const currencyNames: Record<CurrencyCode, string> = {
  BTC: 'Bitcoin',
  ETH: 'Ethereum',
  BNB: 'Binance',
  USD: 'US Dollar',
};

export interface CurrentBalanceProps {
  data: { name: CurrencyCode; value: number; color: string }[];
}

export function CurrentBalance({ data }: CurrentBalanceProps): React.JSX.Element {
  const chartSize = 200;
  const chartTickness = 30;

  const total = data.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar>
            <WalletIcon fontSize="var(--Icon-fontSize)" />
          </Avatar>
        }
        subheader="Balance across all your accounts"
        title="Current balance"
      />
      <CardContent>
        <Stack direction="row" spacing={3} sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
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
          <Stack spacing={3} sx={{ flex: '1 1 auto' }}>
            <Stack spacing={1}>
              <Typography color="text.secondary" variant="overline">
                Total balance
              </Typography>
              <Typography variant="h4">
                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(total)}
              </Typography>
            </Stack>
            <Stack spacing={1}>
              <Typography color="text.secondary" variant="overline">
                Available currency
              </Typography>
              <Stack component="ul" spacing={2} sx={{ listStyle: 'none', m: 0, p: 0 }}>
                {data.map((entry) => (
                  <Stack component="li" direction="row" key={entry.name} spacing={1} sx={{ alignItems: 'center' }}>
                    <Box sx={{ bgcolor: entry.color, borderRadius: '2px', height: '4px', width: '16px' }} />
                    <Typography sx={{ flex: '1 1 auto' }} variant="subtitle2">
                      {currencyNames[entry.name]}
                    </Typography>
                    <Typography color="text.secondary">
                      {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(entry.value)}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
      <Divider />
      <CardActions>
        <Button color="secondary" endIcon={<ArrowUpRightIcon />} size="small">
          Add funds
        </Button>
        <Button color="secondary" endIcon={<ArrowDownRightIIcon />} size="small">
          Transfer funds
        </Button>
      </CardActions>
    </Card>
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
                <Typography sx={{ whiteSpace: 'nowrap' }}>{currencyNames[entry.name as CurrencyCode]}</Typography>
              </Stack>
              <Typography color="text.secondary" variant="body2">
                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(entry.value)}
              </Typography>
            </Stack>
          )
        )}
      </Stack>
    </Paper>
  );
}
