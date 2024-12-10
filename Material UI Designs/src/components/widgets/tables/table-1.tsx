'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { CaretRight as CaretRightIcon } from '@phosphor-icons/react/dist/ssr/CaretRight';
import { DotsThree as DotsThreeIcon } from '@phosphor-icons/react/dist/ssr/DotsThree';

import { dayjs } from '@/lib/dayjs';
import { DataTable } from '@/components/core/data-table';
import type { ColumnDef } from '@/components/core/data-table';

interface Order {
  id: string;
  customer: { name: string; email: string };
  lineItems: number;
  currency: string;
  totalAmount: number;
  status: 'pending' | 'completed' | 'canceled';
  createdAt: Date;
}

const orders = [
  {
    id: 'ORD-005',
    customer: { email: 'carson.darrin@domain.com', name: 'Cj Juliane' },
    lineItems: 8,
    currency: 'USD',
    totalAmount: 693,
    status: 'completed',
    createdAt: dayjs().subtract(50, 'second').subtract(12, 'minute').subtract(2, 'hour').toDate(),
  },
  {
    id: 'ORD-004',
    customer: { name: 'Fran Perez', email: 'fran.perez@domain.com' },
    lineItems: 4,
    currency: 'USD',
    totalAmount: 215,
    status: 'canceled',
    createdAt: dayjs().subtract(12, 'second').subtract(39, 'minute').subtract(5, 'hour').toDate(),
  },
  {
    id: 'ORD-003',
    customer: { name: 'Jie Yan', email: 'jie.yan@domain.com' },
    lineItems: 1,
    currency: 'USD',
    totalAmount: 25,
    status: 'pending',
    createdAt: dayjs().subtract(21, 'second').subtract(46, 'minute').subtract(5, 'hour').toDate(),
  },
  {
    id: 'ORD-002',
    customer: { name: 'Siegbert Gottfried', email: 'siegbert.gottfried@domain.com' },
    lineItems: 5,
    currency: 'USD',
    totalAmount: 535,
    status: 'completed',
    createdAt: dayjs().subtract(54, 'second').subtract(19, 'minute').subtract(8, 'hour').toDate(),
  },
  {
    id: 'ORD-001',
    customer: { name: 'Miron Vitold', email: 'miron.vitold@domain.com' },
    lineItems: 2,
    currency: 'USD',
    totalAmount: 19.99,
    status: 'completed',
    createdAt: dayjs().subtract(12, 'second').subtract(45, 'minute').subtract(1, 'day').toDate(),
  },
] satisfies Order[];

const columns = [
  { field: 'id', name: 'ID', width: '100px' },
  {
    formatter: (row): React.JSX.Element => (
      <div>
        <Typography sx={{ whiteSpace: 'nowrap' }} variant="inherit">
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
  { field: 'lineItems', name: 'Items', width: '100px' },
  {
    formatter: (row): string => {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: row.currency }).format(row.totalAmount);
    },
    name: 'Total',
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
  },
  {
    formatter: (row): React.JSX.Element => (
      <Typography suppressHydrationWarning sx={{ whiteSpace: 'nowrap' }} variant="inherit">
        {dayjs(row.createdAt).format('MMM D, YYYY hh:mm A')}
      </Typography>
    ),
    name: 'Date',
    align: 'right',
  },
] satisfies ColumnDef<Order>[];

export function Table1(): React.JSX.Element {
  return (
    <Box sx={{ bgcolor: 'var(--mui-palette-background-level1)', p: 3 }}>
      <Card>
        <CardHeader
          action={
            <IconButton>
              <DotsThreeIcon weight="bold" />
            </IconButton>
          }
          title="Latest orders"
        />
        <Divider />
        <Box sx={{ overflowX: 'auto' }}>
          <DataTable<Order> columns={columns} rows={orders} />
        </Box>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button color="secondary" endIcon={<CaretRightIcon />} size="small">
            See all
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
