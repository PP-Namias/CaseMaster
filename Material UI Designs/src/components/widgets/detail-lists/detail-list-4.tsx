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
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { EnvelopeSimple as EnvelopeSimpleIcon } from '@phosphor-icons/react/dist/ssr/EnvelopeSimple';

import { dayjs } from '@/lib/dayjs';
import type { ColumnDef } from '@/components/core/data-table';
import { DataTable } from '@/components/core/data-table';
import { Option } from '@/components/core/option';

interface Notification {
  id: string;
  type: string;
  status: 'delivered' | 'pending' | 'failed';
  createdAt: Date;
}

const notifications = [
  {
    id: 'EV-002',
    type: 'Refund request approved',
    status: 'pending',
    createdAt: dayjs().subtract(34, 'minute').subtract(5, 'hour').subtract(3, 'day').toDate(),
  },
  {
    id: 'EV-001',
    type: 'Order confirmation',
    status: 'delivered',
    createdAt: dayjs().subtract(49, 'minute').subtract(11, 'hour').subtract(4, 'day').toDate(),
  },
] satisfies Notification[];

const columns = [
  {
    formatter: (row): React.JSX.Element => (
      <Typography sx={{ whiteSpace: 'nowrap' }} variant="inherit">
        {row.type}
      </Typography>
    ),
    name: 'Type',
  },
  {
    formatter: (row): React.JSX.Element => {
      const mapping = {
        delivered: { label: 'Delivered', color: 'success' },
        pending: { label: 'Pending', color: 'warning' },
        failed: { label: 'Failed', color: 'error' },
      } as const;
      const { label, color } = mapping[row.status] ?? { label: 'Unknown', color: 'secondary' };

      return <Chip color={color} label={label} size="small" variant="soft" />;
    },
    name: 'Status',
    width: '200px',
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
] satisfies ColumnDef<Notification>[];

export function DetailList4(): React.JSX.Element {
  return (
    <Box sx={{ bgcolor: 'var(--mui-palette-background-level1)', p: 3 }}>
      <Card>
        <CardHeader
          avatar={
            <Avatar>
              <EnvelopeSimpleIcon fontSize="var(--Icon-fontSize)" />
            </Avatar>
          }
          title="Notifications"
        />
        <CardContent>
          <Stack spacing={2}>
            <Select defaultValue="last_invoice" name="type" sx={{ maxWidth: '100%', width: '320px' }}>
              <Option value="last_invoice">Resend last invoice</Option>
              <Option value="password_reset">Send password reset</Option>
              <Option value="verification">Send verification</Option>
            </Select>
            <div>
              <Button startIcon={<EnvelopeSimpleIcon />} variant="contained">
                Send email
              </Button>
            </div>
          </Stack>
        </CardContent>
        <Divider />
        <Box sx={{ overflowX: 'auto' }}>
          <DataTable<Notification> columns={columns} rows={notifications} />
        </Box>
      </Card>
    </Box>
  );
}
