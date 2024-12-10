'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { DotsThree as DotsThreeIcon } from '@phosphor-icons/react/dist/ssr/DotsThree';
import { PencilSimple as PencilSimpleIcon } from '@phosphor-icons/react/dist/ssr/PencilSimple';

import { dayjs } from '@/lib/dayjs';
import { DataTable } from '@/components/core/data-table';
import type { ColumnDef } from '@/components/core/data-table';

interface Order {
  id: string;
  customer: { name: string; email: string };
  paymentMethod: string;
  currency: string;
  totalAmount: number;
  status: 'pending' | 'completed' | 'canceled';
  createdAt: Date;
}

const orders = [
  {
    id: 'ORD-005',
    customer: { name: 'Cj Juliane', email: 'carson.darrin@domain.com' },
    paymentMethod: 'CreditCard',
    currency: 'USD',
    totalAmount: 78.1,
    status: 'pending',
    createdAt: dayjs().subtract(23, 'second').subtract(32, 'minute').toDate(),
  },
  {
    id: 'ORD-004',
    customer: { name: 'Fran Perez', email: 'fran.perez@domain.com' },
    paymentMethod: 'PayPal',
    currency: 'USD',
    totalAmount: 110.39,
    status: 'completed',
    createdAt: dayjs().subtract(51, 'second').subtract(36, 'minute').toDate(),
  },
  {
    id: 'ORD-003',
    customer: { name: 'Jie Yan', email: 'jie.yan@domain.com' },
    paymentMethod: 'CreditCard',
    currency: 'USD',
    totalAmount: 25.58,
    status: 'pending',
    createdAt: dayjs().subtract(55, 'second').subtract(38, 'minute').toDate(),
  },
  {
    id: 'ORD-002',
    customer: { name: 'Siegbert Gottfried', email: 'siegbert.gottfried@domain.com' },
    paymentMethod: 'PayPal',
    currency: 'USD',
    totalAmount: 89.41,
    status: 'completed',
    createdAt: dayjs().subtract(3, 'second').subtract(40, 'minute').toDate(),
  },
  {
    id: 'ORD-001',
    customer: { name: 'Miron Vitold', email: 'miron.vitold@domain.com' },
    paymentMethod: 'CreditCard',
    currency: 'USD',
    totalAmount: 19.99,
    status: 'completed',
    createdAt: dayjs().subtract(32, 'second').subtract(45, 'minute').toDate(),
  },
] satisfies Order[];

const columns = [
  {
    formatter: (row): React.JSX.Element => (
      <div>
        <Typography variant="subtitle2">{row.id}</Typography>
        <Typography color="text.secondary" suppressHydrationWarning sx={{ whiteSpace: 'nowrap' }} variant="body2">
          {dayjs(row.createdAt).format('MMM D, YYYY hh:mm A')}
        </Typography>
      </div>
    ),
    name: 'Number',
    width: '150px',
  },
  {
    formatter: (row): React.JSX.Element => (
      <div>
        <Typography sx={{ whiteSpace: 'nowrap' }} variant="subtitle2">
          {row.customer.name}
        </Typography>
        <Typography color="text.secondary" variant="body2">
          {row.customer.email}
        </Typography>
      </div>
    ),
    name: 'Customer',
    width: '250px',
  },
  { field: 'paymentMethod', name: 'Payment Method', width: '150px' },
  {
    formatter: (row): string => {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: row.currency }).format(row.totalAmount);
    },
    name: 'Total Amount',
    width: '150px',
  },
  {
    formatter: (row): React.JSX.Element => {
      const mapping = {
        pending: { label: 'Pending', color: 'warning' },
        completed: { label: 'Completed', color: 'success' },
        canceled: { label: 'Canceled', color: 'error' },
      } as const;
      const { label, color } = mapping[row.status] ?? { label: 'Unknown', color: 'secondary' };

      return <Chip color={color} label={label} size="small" variant="soft" />;
    },
    name: 'Status',
    width: '150px',
  },
  {
    formatter: (): React.JSX.Element => {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton>
            <PencilSimpleIcon />
          </IconButton>
        </Box>
      );
    },
    name: 'Actions',
    hideName: true,
    width: '100px',
    align: 'right',
  },
] satisfies ColumnDef<Order>[];

export function Table4(): React.JSX.Element {
  return (
    <Box sx={{ bgcolor: 'var(--mui-palette-background-level1)', p: 3 }}>
      <Card>
        <CardHeader
          action={
            <IconButton>
              <DotsThreeIcon weight="bold" />
            </IconButton>
          }
          title="Orders"
        />
        <Divider />
        <Box sx={{ overflowX: 'auto' }}>
          <DataTable<Order> columns={columns} rows={orders} />
        </Box>
      </Card>
    </Box>
  );
}
