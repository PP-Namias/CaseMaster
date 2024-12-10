'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { CheckCircle as CheckCircleIcon } from '@phosphor-icons/react/dist/ssr/CheckCircle';
import { Clock as ClockIcon } from '@phosphor-icons/react/dist/ssr/Clock';
import { Eye as EyeIcon } from '@phosphor-icons/react/dist/ssr/Eye';
import { Minus as MinusIcon } from '@phosphor-icons/react/dist/ssr/Minus';
import { XCircle as XCircleIcon } from '@phosphor-icons/react/dist/ssr/XCircle';

import { paths } from '@/paths';
import { dayjs } from '@/lib/dayjs';
import { DataTable } from '@/components/core/data-table';
import type { ColumnDef } from '@/components/core/data-table';
import { RouterLink } from '@/components/core/link';

import { useOrdersSelection } from './orders-selection-context';

export interface Order {
  id: string;
  customer: { name: string; avatar?: string; email: string };
  lineItems: number;
  paymentMethod?: { type: 'amex' | 'applepay' | 'googlepay' | 'mastercard' | 'visa'; last4?: string };
  currency: string;
  totalAmount: number;
  status: 'pending' | 'completed' | 'canceled' | 'rejected';
  createdAt: Date;
}

const columns = [
  {
    formatter: (row): React.JSX.Element => (
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
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
        <div>
          <Link
            color="text.primary"
            component={RouterLink}
            href={paths.dashboard.orders.preview('1')}
            sx={{ cursor: 'pointer' }}
            variant="subtitle2"
          >
            {row.id}
          </Link>
          <Typography color="text.secondary" variant="body2">
            {row.lineItems} products •{' '}
            <Box component="span" sx={{ whiteSpace: 'nowrap' }}>
              {new Intl.NumberFormat('en-US', { style: 'currency', currency: row.currency }).format(row.totalAmount)}
            </Box>
          </Typography>
        </div>
      </Stack>
    ),
    name: 'Order',
    width: '250px',
  },
  {
    formatter: (row): React.JSX.Element | null => {
      if (!row.paymentMethod) return null;

      const mapping = {
        mastercard: { name: 'Mastercard', logo: '/assets/payment-method-1.png' },
        visa: { name: 'Visa', logo: '/assets/payment-method-2.png' },
        amex: { name: 'American Express', logo: '/assets/payment-method-3.png' },
        applepay: { name: 'Apple Pay', logo: '/assets/payment-method-4.png' },
        googlepay: { name: 'Google Pay', logo: '/assets/payment-method-5.png' },
      } as const;
      const { name, logo } = mapping[row.paymentMethod.type] ?? { name: 'Unknown', logo: null };

      return (
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
          <Avatar sx={{ bgcolor: 'var(--mui-palette-background-paper)', boxShadow: 'var(--mui-shadows-8)' }}>
            <Box component="img" src={logo} sx={{ borderRadius: '50px', height: 'auto', width: '35px' }} />
          </Avatar>
          <div>
            <Typography variant="body2">{name}</Typography>
            {row.paymentMethod.last4 ? (
              <Typography color="text.secondary" variant="body2">
                **** {row.paymentMethod.last4}
              </Typography>
            ) : null}
          </div>
        </Stack>
      );
    },
    name: 'Payment Method',
    width: '200px',
  },
  {
    formatter: (row): React.JSX.Element => (
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
        <Avatar src={row.customer.avatar} />
        <div>
          <Typography variant="subtitle2">{row.customer.name}</Typography>
          <Typography color="text.secondary" variant="body2">
            {row.customer.email}
          </Typography>
        </div>
      </Stack>
    ),
    name: 'Customer',
    width: '250px',
  },
  {
    formatter: (row): React.JSX.Element => {
      const mapping = {
        pending: { label: 'Pending', icon: <ClockIcon color="var(--mui-palette-warning-main)" weight="fill" /> },
        completed: {
          label: 'Completed',
          icon: <CheckCircleIcon color="var(--mui-palette-success-main)" weight="fill" />,
        },
        canceled: { label: 'Canceled', icon: <XCircleIcon color="var(--mui-palette-error-main)" weight="fill" /> },
        rejected: { label: 'Rejected', icon: <MinusIcon color="var(--mui-palette-error-main)" /> },
      } as const;
      const { label, icon } = mapping[row.status] ?? { label: 'Unknown', icon: null };

      return <Chip icon={icon} label={label} size="small" variant="outlined" />;
    },
    name: 'Status',
    width: '100px',
  },
  {
    formatter: (): React.JSX.Element => (
      <IconButton component={RouterLink} href={paths.dashboard.orders.preview('1')}>
        <EyeIcon />
      </IconButton>
    ),
    name: 'Actions',
    hideName: true,
    width: '100px',
    align: 'right',
  },
] satisfies ColumnDef<Order>[];

export interface OrdersTableProps {
  rows: Order[];
}

export function OrdersTable({ rows }: OrdersTableProps): React.JSX.Element {
  const { selected, deselectAll, deselectOne, selectAll, selectOne } = useOrdersSelection();

  return (
    <React.Fragment>
      <DataTable<Order>
        columns={columns}
        onDeselectAll={deselectAll}
        onDeselectOne={(_, row) => {
          deselectOne(row.id);
        }}
        onSelectAll={selectAll}
        onSelectOne={(_, row) => {
          selectOne(row.id);
        }}
        rows={rows}
        selectable
        selected={selected}
      />
      {!rows.length ? (
        <Box sx={{ p: 3 }}>
          <Typography color="text.secondary" sx={{ textAlign: 'center' }} variant="body2">
            No orders found
          </Typography>
        </Box>
      ) : null}
    </React.Fragment>
  );
}
