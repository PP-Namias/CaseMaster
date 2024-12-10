'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import { Timer as TimerIcon } from '@phosphor-icons/react/dist/ssr/Timer';

import { dayjs } from '@/lib/dayjs';
import { DataTable } from '@/components/core/data-table';
import type { ColumnDef } from '@/components/core/data-table';

export interface Event {
  id: string;
  type: string;
  user: string;
  userAgent: string;
  createdAt: Date;
}

const columns = [
  {
    formatter: (row): React.JSX.Element => {
      return (
        <div>
          <Typography variant="subtitle2">{row.type}</Typography>
          <Typography color="text.secondary" variant="inherit">
            on {dayjs(row.createdAt).format('hh:mm A MMM D, YYYY')}
          </Typography>
        </div>
      );
    },
    name: 'Action',
    width: '250px',
  },
  { field: 'user', name: 'User Name', width: '150px' },
  { field: 'userAgent', name: 'User agent', width: '200px' },
] satisfies ColumnDef<Event>[];

export interface LoginHistoryProps {
  events: Event[];
}

export function LoginHistory({ events }: LoginHistoryProps): React.JSX.Element {
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar>
            <TimerIcon fontSize="var(--Icon-fontSize)" />
          </Avatar>
        }
        title="System Logs"
      />
      <CardContent>
        <Card sx={{ overflowX: 'auto' }} variant="outlined">
          <DataTable<Event> columns={columns} rows={events} />
        </Card>
      </CardContent>
    </Card>
  );
}
