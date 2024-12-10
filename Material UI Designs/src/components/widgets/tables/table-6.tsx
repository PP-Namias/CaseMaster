'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Link from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';
import { PencilSimple as PencilSimpleIcon } from '@phosphor-icons/react/dist/ssr/PencilSimple';

import { dayjs } from '@/lib/dayjs';
import type { ColumnDef } from '@/components/core/data-table';
import { DataTable } from '@/components/core/data-table';
import { Option } from '@/components/core/option';

interface Invoice {
  id: string;
  customer: { name: string; email: string };
  currency: string;
  totalAmount: number;
  status: 'pending' | 'paid' | 'canceled';
  issueDate: Date;
}

const invoices = [
  {
    id: 'INV-004',
    customer: { name: 'Iulia Albu', email: 'iulia.albu@domain.com' },
    currency: 'USD',
    totalAmount: 55.5,
    status: 'paid',
    issueDate: dayjs().subtract(1, 'hour').toDate(),
  },
  {
    id: 'INV-003',
    customer: { name: 'Fran Perez', email: 'fran.perez@domain.com' },
    currency: 'USD',
    totalAmount: 19.76,
    status: 'pending',
    issueDate: dayjs().subtract(2, 'hour').subtract(2, 'day').toDate(),
  },
  {
    id: 'INV-002',
    customer: { name: 'Jie Yan', email: 'jie.yan@domain.com' },
    currency: 'USD',
    totalAmount: 781.5,
    status: 'canceled',
    issueDate: dayjs().subtract(4, 'hour').subtract(6, 'day').toDate(),
  },
  {
    id: 'INV-001',
    customer: { name: 'Nasimiyu Danai', email: 'nasimiyu.danai@domain.com' },
    currency: 'USD',
    totalAmount: 96.64,
    status: 'paid',
    issueDate: dayjs().subtract(2, 'hour').subtract(15, 'day').toDate(),
  },
] satisfies Invoice[];

const columns = [
  {
    formatter: (row): React.JSX.Element => (
      <div>
        <Link color="text.primary" sx={{ whiteSpace: 'nowrap' }} underline="none" variant="subtitle2">
          {row.customer.name}
        </Link>
        <Typography color="text.secondary" variant="body2">
          {row.customer.email}
        </Typography>
      </div>
    ),
    name: 'Customer',
    width: '250px',
  },
  {
    formatter: (row): React.JSX.Element => {
      const mapping = {
        canceled: { label: 'Canceled', color: 'error' },
        paid: { label: 'Paid', color: 'success' },
        pending: { label: 'Pending', color: 'warning' },
      } as const;
      const { label, color } = mapping[row.status] ?? { label: 'Unknown', color: 'secondary' };

      return <Chip color={color} label={label} size="small" variant="soft" />;
    },
    name: 'Status',
    width: '150px',
  },
  { field: 'id', name: 'ID', width: '150px' },
  {
    formatter: (row): string => {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: row.currency }).format(row.totalAmount);
    },
    name: 'Total Amount',
    width: '150px',
  },
  {
    formatter: (row): string => {
      return dayjs(row.issueDate).format('MMM D, YYYY');
    },
    name: 'Issue Date',
    width: '150px',
  },
  {
    formatter: (): React.JSX.Element => (
      <IconButton>
        <PencilSimpleIcon />
      </IconButton>
    ),
    name: 'Actions',
    hideName: true,
    width: '100px',
    align: 'right',
  },
] satisfies ColumnDef<Invoice>[];

export function Table6(): React.JSX.Element {
  return (
    <Box sx={{ bgcolor: 'var(--mui-palette-background-level1)', p: 3 }}>
      <Card>
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center', flexWrap: 'wrap', p: 3 }}>
          <OutlinedInput
            placeholder="Search invoices"
            startAdornment={
              <InputAdornment position="start">
                <MagnifyingGlassIcon fontSize="var(--icon-fontSize-md)" />
              </InputAdornment>
            }
            sx={{ flex: '1 1 auto' }}
          />
          <Select defaultValue="desc" name="sort" sx={{ maxWidth: '100%', width: '120px' }}>
            <Option value="desc">Newest</Option>
            <Option value="asc">Oldest</Option>
          </Select>
          <Select defaultValue="all" name="sort" sx={{ maxWidth: '100%', width: '120px' }}>
            <Option value="all">All</Option>
            <Option value="paid">Paid</Option>
            <Option value="pending">Pending</Option>
            <Option value="canceled">Canceled</Option>
          </Select>
        </Stack>
        <Divider />
        <Box sx={{ overflowX: 'auto' }}>
          <DataTable<Invoice> columns={columns} rows={invoices} selectable />
        </Box>
      </Card>
    </Box>
  );
}
