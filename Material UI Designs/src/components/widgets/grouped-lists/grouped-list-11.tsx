'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { dayjs } from '@/lib/dayjs';
import { DataTable } from '@/components/core/data-table';
import type { ColumnDef } from '@/components/core/data-table';

interface Campaign {
  id: string;
  name: string;
  target: string;
  platform: string;
  clickRate: number;
  conversionRate: number;
  status: 'draft' | 'active' | 'stopped';
  createdAt: Date;
}

const campaigns = [
  {
    id: 'CMP-004',
    name: 'Summer Active Health',
    target: 'Men Group',
    platform: 'Google',
    clickRate: 6.32,
    conversionRate: 1.05,
    status: 'draft',
    createdAt: dayjs().subtract(1, 'hour').toDate(),
  },
  {
    id: 'CMP-003',
    name: 'New prospects blog',
    target: 'Woman Married Group',
    platform: 'Facebook',
    clickRate: 7.94,
    conversionRate: 0.31,
    status: 'active',
    createdAt: dayjs().subtract(5, 'day').toDate(),
  },
  {
    id: 'CMP-002',
    name: 'Amazon Gift Cards',
    target: 'Young Group',
    platform: 'Facebook',
    clickRate: 20.15,
    conversionRate: 2.1,
    status: 'stopped',
    createdAt: dayjs().subtract(7, 'day').toDate(),
  },
  {
    id: 'CMP-001',
    name: 'Best Marketing Course Online',
    target: 'Young Group',
    platform: 'Bing',
    clickRate: 7.94,
    conversionRate: 0.5,
    status: 'draft',
    createdAt: dayjs().subtract(8, 'day').toDate(),
  },
] satisfies Campaign[];

const columns = [
  {
    formatter: (row): React.JSX.Element => (
      <Stack spacing={1} sx={{ whiteSpace: 'nowrap' }}>
        <Typography sx={{ cursor: 'pointer' }} variant="subtitle2">
          {row.name}
        </Typography>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center', display: 'flex' }}>
          <Typography color="text.secondary" variant="body2">
            {row.platform}
          </Typography>
          <Box
            sx={{
              bgcolor: 'var(--mui-palette-text-secondary)',
              borderRadius: 4,
              flex: '0 0 auto',
              height: '4px',
              width: '4px',
            }}
          />
          <Typography color="text.secondary" variant="body2">
            {row.target}, {dayjs(row.createdAt).format('MMM D, YYYY')}
          </Typography>
        </Stack>
      </Stack>
    ),
    name: 'Details',
    width: '250px',
  },
  {
    formatter: (row): React.JSX.Element => {
      const mapping = {
        draft: { label: 'Draft', color: 'secondary' },
        active: { label: 'Active', color: 'success' },
        stopped: { label: 'Stopped', color: 'error' },
      } as const;
      const { label, color } = mapping[row.status] ?? { label: 'Unknown', color: 'secondary' };

      return <Chip color={color} label={label} size="small" variant="soft" />;
    },
    name: 'Status',
    width: '150px',
  },
  {
    formatter: (row): React.JSX.Element => (
      <Stack spacing={1}>
        <Typography variant="subtitle2">
          {new Intl.NumberFormat('en-US', { style: 'percent', maximumFractionDigits: 2 }).format(row.clickRate / 100)}
        </Typography>
        <Typography color="text.secondary" sx={{ whiteSpace: 'nowrap' }} variant="body2">
          Click Rate
        </Typography>
      </Stack>
    ),
    name: 'Click Rate',
    width: '150px',
  },
  {
    formatter: (row): React.JSX.Element => (
      <Stack spacing={1}>
        <Typography variant="subtitle2">
          {new Intl.NumberFormat('en-US', { style: 'percent', maximumFractionDigits: 2 }).format(
            row.conversionRate / 100
          )}
        </Typography>
        <Typography color="text.secondary" variant="body2">
          Conversions
        </Typography>
      </Stack>
    ),
    name: 'Conversions',
    width: '150px',
  },
  {
    formatter: (): React.JSX.Element => {
      return <Link>View</Link>;
    },
    name: 'Actions',
    hideName: true,
    width: '100px',
    align: 'right',
  },
] satisfies ColumnDef<Campaign>[];

export function GroupedList11(): React.JSX.Element {
  return (
    <Box sx={{ bgcolor: 'var(--mui-palette-background-level1)', p: 3 }}>
      <Card>
        <CardHeader title="Campaigns summary" />
        <Divider />
        <Box sx={{ overflowX: 'auto' }}>
          <DataTable<Campaign> columns={columns} rows={campaigns} />
        </Box>
      </Card>
    </Box>
  );
}
