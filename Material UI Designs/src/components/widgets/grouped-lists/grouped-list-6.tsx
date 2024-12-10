'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { dayjs } from '@/lib/dayjs';
import { DataTable } from '@/components/core/data-table';
import type { ColumnDef } from '@/components/core/data-table';

interface Transaction {
  id: string;
  type: string;
  sender: string;
  currency: string;
  amount: number;
  createdAt: Date;
}

const transactions = [
  {
    id: 'TX-004',
    type: 'receive',
    sender: 'Devias',
    currency: 'USD',
    amount: 25000,
    createdAt: dayjs().subtract(5, 'minute').toDate(),
  },
  {
    id: 'TX-003',
    type: 'send',
    sender: 'Zimbru',
    currency: 'USD',
    amount: 6843,
    createdAt: dayjs().subtract(1, 'day').toDate(),
  },
  {
    id: 'TX-002',
    type: 'send',
    sender: 'Lotru',
    currency: 'USD',
    amount: 91823,
    createdAt: dayjs().subtract(1, 'day').toDate(),
  },
  {
    id: 'TX-001',
    type: 'receive',
    sender: 'Devias',
    currency: 'USD',
    amount: 49550,
    createdAt: dayjs().subtract(3, 'day').toDate(),
  },
] satisfies Transaction[];

const columns = [
  {
    formatter: (row): React.JSX.Element => (
      <Box
        sx={{
          bgcolor: 'var(--mui-palette-background-level1)',
          borderRadius: 1.5,
          flex: '0 0 auto',
          p: '4px 8px',
          textAlign: 'center',
        }}
      >
        <Typography variant="caption">{dayjs(row.createdAt).format('MMM').toUpperCase()}</Typography>
        <Typography variant="h6">{dayjs(row.createdAt).format('D')}</Typography>
      </Box>
    ),
    name: 'Date',
    width: '75px',
  },
  {
    formatter: (row): React.JSX.Element => (
      <div>
        <Typography sx={{ whiteSpace: 'nowrap' }} variant="subtitle2">
          {row.sender}
        </Typography>
        <Typography color="text.secondary" sx={{ whiteSpace: 'nowrap' }} variant="body2">
          {row.type === 'receive' ? 'Payment received' : 'Payment sent'}
        </Typography>
      </div>
    ),
    name: 'Sender',
  },
  {
    formatter: (row): React.JSX.Element => (
      <Typography
        color={row.type === 'receive' ? 'success.main' : 'error.main'}
        sx={{ whiteSpace: 'nowrap' }}
        variant="subtitle2"
      >
        {row.type === 'receive' ? '+' : '-'}
        {new Intl.NumberFormat('en-US', { style: 'currency', currency: row.currency }).format(row.amount)}
      </Typography>
    ),
    name: 'Amount',
    align: 'right',
  },
] satisfies ColumnDef<Transaction>[];

export function GroupedList6(): React.JSX.Element {
  return (
    <Box sx={{ bgcolor: 'var(--mui-palette-background-level1)', p: 3 }}>
      <Card>
        <CardHeader title="Latest transactions" />
        <Divider />
        <Box sx={{ overflowX: 'auto' }}>
          <DataTable<Transaction> columns={columns} hideHead rows={transactions} />
        </Box>
      </Card>
    </Box>
  );
}
