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

import { dayjs } from '@/lib/dayjs';
import { DataTable } from '@/components/core/data-table';
import type { ColumnDef } from '@/components/core/data-table';

interface Event {
  id: string;
  description: string;
  ip: string;
  method: string;
  path: string;
  status: number;
  createdAt: Date;
}

const events = [
  {
    id: 'EV-005',
    description: 'Cart add',
    ip: '84.234.243.42',
    method: 'GET',
    path: '/api/products/PRD-001/add',
    status: 200,
    createdAt: dayjs().subtract(54, 'second').subtract(20, 'minute').subtract(2, 'hour').toDate(),
  },
  {
    id: 'EV-004',
    description: 'Cart add',
    ip: '84.234.243.42',
    method: 'GET',
    path: '/api/products/PRD-001/add',
    status: 200,
    createdAt: dayjs().subtract(16, 'second').subtract(34, 'minute').subtract(2, 'hour').toDate(),
  },
  {
    id: 'EV-003',
    description: 'Get product',
    ip: '84.234.243.42',
    method: 'GET',
    path: '/api/products/PRD-001',
    status: 200,
    createdAt: dayjs().subtract(30, 'second').subtract(54, 'minute').subtract(2, 'hour').toDate(),
  },
  {
    id: 'EV-002',
    description: 'List products',
    ip: '84.234.243.42',
    method: 'GET',
    path: '/api/products',
    status: 200,
    createdAt: dayjs().subtract(40, 'second').subtract(56, 'minute').subtract(2, 'hour').toDate(),
  },
  {
    id: 'EV-001',
    description: 'Login',
    ip: '84.234.243.42',
    method: 'POST',
    path: '/api/auth/login',
    status: 200,
    createdAt: dayjs().subtract(5, 'second').subtract(57, 'minute').subtract(2, 'hour').toDate(),
  },
] satisfies Event[];

const columns = [
  { field: 'method', name: 'Method', width: '150px' },
  {
    formatter(row): React.JSX.Element {
      return <Chip color={row.status < 400 ? 'success' : 'error'} label={row.status} size="small" variant="soft" />;
    },
    name: 'Status',
    width: '150px',
  },
  {
    formatter(row): React.JSX.Element {
      return (
        <Typography sx={{ whiteSpace: 'nowrap' }} variant="inherit">
          {row.path}
        </Typography>
      );
    },
    name: 'Path',
    width: '150px',
  },
  {
    formatter(row): React.JSX.Element {
      return (
        <Typography sx={{ whiteSpace: 'nowrap' }} variant="inherit">
          {row.description}
        </Typography>
      );
    },
    name: 'Event',
    width: '150px',
  },
  { field: 'ip', name: 'IP', width: '150px' },
  {
    formatter: (row): React.JSX.Element => {
      return (
        <Typography suppressHydrationWarning sx={{ whiteSpace: 'nowrap' }} variant="inherit">
          {dayjs(row.createdAt).format('MMM D, YYYY hh:mm:ss A')}
        </Typography>
      );
    },
    name: 'Date',
    width: '250px',
    align: 'right',
  },
] satisfies ColumnDef<Event>[];

export function Table9(): React.JSX.Element {
  return (
    <Box sx={{ bgcolor: 'var(--mui-palette-background-level1)', p: 3 }}>
      <Card>
        <CardHeader
          action={
            <IconButton>
              <DotsThreeIcon weight="bold" />
            </IconButton>
          }
          title="Events"
        />
        <Divider />
        <Box sx={{ overflowX: 'auto' }}>
          <DataTable<Event> columns={columns} rows={events} />
        </Box>
      </Card>
    </Box>
  );
}
