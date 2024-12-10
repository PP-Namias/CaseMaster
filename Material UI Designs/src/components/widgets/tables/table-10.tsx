'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { DataTable } from '@/components/core/data-table';
import type { ColumnDef } from '@/components/core/data-table';

interface LineItem {
  id: string;
  name: string;
  quantity: number;
  currency: string;
  unitAmount: number;
  totalAmount: number;
}

const lineItems = [
  { id: 'LI-019', name: 'Pro Subscription', quantity: 1, currency: 'USD', unitAmount: 14.99, totalAmount: 14.99 },
  { id: 'LI-020', name: 'Edge Functions', quantity: 1, currency: 'USD', unitAmount: 19.99, totalAmount: 19.99 },
] satisfies LineItem[];

const columns = [
  {
    formatter: (row): React.JSX.Element => (
      <Typography sx={{ whiteSpace: 'nowrap' }} variant="inherit">
        {row.name}
      </Typography>
    ),
    name: 'Name',
    width: '250px',
  },
  {
    formatter: (row): string => {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: row.currency }).format(row.unitAmount);
    },
    name: 'Unit Amount',
    width: '100px',
  },
  { field: 'quantity', name: 'Qty', width: '100px' },
  {
    formatter: (row): string => {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: row.currency }).format(row.totalAmount);
    },
    name: 'Amount',
    width: '100px',
    align: 'right',
  },
] satisfies ColumnDef<LineItem>[];

export function Table10(): React.JSX.Element {
  return (
    <Box sx={{ bgcolor: 'var(--mui-palette-background-level1)', p: 3 }}>
      <Card>
        <CardHeader title="Line items" />
        <Divider />
        <Box sx={{ overflowX: 'auto' }}>
          <DataTable<LineItem> columns={columns} rows={lineItems} />
        </Box>
      </Card>
    </Box>
  );
}
