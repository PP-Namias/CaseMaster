'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { ShoppingCartSimple as ShoppingCartSimpleIcon } from '@phosphor-icons/react/dist/ssr/ShoppingCartSimple';

import { dayjs } from '@/lib/dayjs';
import type { ColumnDef } from '@/components/core/data-table';
import { DataTable } from '@/components/core/data-table';

export interface Payment {
  currency: string;
  amount: number;
  invoiceId: string;
  status: 'pending' | 'completed' | 'canceled' | 'refunded';
  createdAt: Date;
}

const columns = [
  {
    formatter: (row): React.JSX.Element => (
      <Typography sx={{ whiteSpace: 'nowrap' }} variant="subtitle2">
        {new Intl.NumberFormat('en-US', { style: 'currency', currency: row.currency }).format(row.amount)}
      </Typography>
    ),
    name: 'Amount',
    width: '200px',
  },
  {
    formatter: (row): React.JSX.Element => {
      const mapping = {
        pending: { label: 'Pending', color: 'warning' },
        completed: { label: 'Completed', color: 'success' },
        canceled: { label: 'Canceled', color: 'error' },
        refunded: { label: 'Refunded', color: 'error' },
      } as const;
      const { label, color } = mapping[row.status] ?? { label: 'Unknown', color: 'secondary' };

      return <Chip color={color} label={label} size="small" variant="soft" />;
    },
    name: 'Status',
    width: '200px',
  },
  {
    formatter: (row): React.JSX.Element => {
      return <Link variant="inherit">{row.invoiceId}</Link>;
    },
    name: 'Invoice ID',
    width: '150px',
  },
  {
    formatter: (row): React.JSX.Element => (
      <Typography sx={{ whiteSpace: 'nowrap' }} variant="inherit">
        {dayjs(row.createdAt).format('MMM D, YYYY hh:mm A')}
      </Typography>
    ),
    name: 'Date',
    align: 'right',
  },
] satisfies ColumnDef<Payment>[];

export interface PaymentsProps {
  ordersValue: number;
  payments: Payment[];
  refundsValue: number;
  totalOrders: number;
}

export function Payments({ ordersValue, payments = [], refundsValue, totalOrders }: PaymentsProps): React.JSX.Element {
  return (
    <Card>
      <CardHeader
        action={
          <Button color="secondary" startIcon={<PlusIcon />}>
            Create Payment
          </Button>
        }
        avatar={
          <Avatar>
            <ShoppingCartSimpleIcon fontSize="var(--Icon-fontSize)" />
          </Avatar>
        }
        title="Payments"
      />
      <CardContent>
        <Stack spacing={3}>
          <Card sx={{ borderRadius: 1 }} variant="outlined">
            <Stack
              direction="row"
              divider={<Divider flexItem orientation="vertical" />}
              spacing={3}
              sx={{ justifyContent: 'space-between', p: 2 }}
            >
              <div>
                <Typography color="text.secondary" variant="overline">
                  Total orders
                </Typography>
                <Typography variant="h6">{new Intl.NumberFormat('en-US').format(totalOrders)}</Typography>
              </div>
              <div>
                <Typography color="text.secondary" variant="overline">
                  Orders value
                </Typography>
                <Typography variant="h6">
                  {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(ordersValue)}
                </Typography>
              </div>
              <div>
                <Typography color="text.secondary" variant="overline">
                  Refunds
                </Typography>
                <Typography variant="h6">
                  {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(refundsValue)}
                </Typography>
              </div>
            </Stack>
          </Card>
          <Card sx={{ borderRadius: 1 }} variant="outlined">
            <Box sx={{ overflowX: 'auto' }}>
              <DataTable<Payment> columns={columns} rows={payments} />
            </Box>
          </Card>
        </Stack>
      </CardContent>
    </Card>
  );
}
