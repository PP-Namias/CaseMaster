'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Path as PathIcon } from '@phosphor-icons/react/dist/ssr/Path';
import { Truck as TruckIcon } from '@phosphor-icons/react/dist/ssr/Truck';

import { DataTable } from '@/components/core/data-table';
import type { ColumnDef } from '@/components/core/data-table';

export interface Vehicle {
  id: string;
  endingRoute: string;
  startingRoute: string;
  status: 'success' | 'error' | 'warning';
  temperature: number;
  temperatureLabel: string;
  warning?: string;
}

const columns = [
  {
    formatter: (row): React.JSX.Element => (
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
        <Avatar sx={{ bgcolor: 'var(--mui-palette-background-level2)', color: 'var(--mui-palette-text-primary)' }}>
          <TruckIcon fontSize="var(--icon-fontSize-lg)" />
        </Avatar>
        <Typography variant="subtitle2">{row.id}</Typography>
      </Stack>
    ),
    name: 'Vehicle',
    width: '200px',
  },
  { field: 'startingRoute', name: 'Starting Route', width: '200px' },
  { field: 'endingRoute', name: 'Ending Route', width: '200px' },
  {
    formatter: (row): React.JSX.Element => (
      <Chip color={row.status} label={row.warning ?? 'No warnings'} size="small" variant="soft" />
    ),
    name: 'Warning',
    width: '200px',
  },
  {
    formatter: (row): React.JSX.Element => (
      <Stack spacing={2}>
        <LinearProgress value={row.temperature} variant="determinate" />
        <Stack
          direction="row"
          spacing={2}
          sx={{ alignItems: 'center', justifyContent: 'space-between', whiteSpace: 'nowrap' }}
        >
          <Typography variant="subtitle2">{row.temperatureLabel}</Typography>
          <Typography color="text.secondary" variant="inherit">
            {row.temperature}
            °C
          </Typography>
        </Stack>
      </Stack>
    ),
    name: 'Temperature',
    width: '200px',
    align: 'right',
  },
] satisfies ColumnDef<Vehicle>[];

export interface VehiclesTableProps {
  rows: Vehicle[];
}

export function VehiclesTable({ rows }: VehiclesTableProps): React.JSX.Element {
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar>
            <PathIcon fontSize="var(--Icon-fontSize)" />
          </Avatar>
        }
        title="On route vehicles"
      />
      <Divider />
      <Box sx={{ overflowX: 'auto' }}>
        <DataTable<Vehicle> columns={columns} rows={rows} />
      </Box>
    </Card>
  );
}
