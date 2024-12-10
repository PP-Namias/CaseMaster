'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { Info as InfoIcon } from '@phosphor-icons/react/dist/ssr/Info';

import { DataTable } from '@/components/core/data-table';
import type { ColumnDef } from '@/components/core/data-table';

interface Entry {
  url: string;
  visitors: number;
  uniqueVisits: number;
  bounceRate: number;
}

const entries = [
  { url: '/', visitors: 95847, uniqueVisits: 8584, bounceRate: 16 },
  { url: '/auth/login', visitors: 7500, uniqueVisits: 648, bounceRate: 5 },
  { url: '/dashboard', visitors: 85406, uniqueVisits: 568, bounceRate: 2 },
  { url: '/blog/top-5-react-frameworks', visitors: 75050, uniqueVisits: 12322, bounceRate: 12 },
  { url: '/blog/understand-programming-principles', visitors: 68003, uniqueVisits: 11645, bounceRate: 10 },
  { url: '/blog/design-patterns', visitors: 49510, uniqueVisits: 10259, bounceRate: 8 },
] satisfies Entry[];

const columns = [
  {
    formatter: (row): React.JSX.Element => (
      <Typography sx={{ whiteSpace: 'nowrap' }} variant="inherit">
        {row.url}
      </Typography>
    ),
    name: 'URL',
  },
  {
    formatter: (row): string => {
      return new Intl.NumberFormat('en-US').format(row.visitors);
    },
    name: 'Visitors',
    width: '150px',
  },
  {
    formatter: (row): string => {
      return new Intl.NumberFormat('en-US').format(row.uniqueVisits);
    },
    name: 'Unique Visits',
    width: '150px',
  },
  {
    formatter: (row): string => {
      return new Intl.NumberFormat('en-US', { style: 'percent', maximumFractionDigits: 2 }).format(
        row.bounceRate / 100
      );
    },
    name: 'Bounce Rate',
    width: '150px',
    align: 'right',
  },
] satisfies ColumnDef<Entry>[];

export function Table7(): React.JSX.Element {
  return (
    <Box sx={{ bgcolor: 'var(--mui-palette-background-level1)', p: 3 }}>
      <Card>
        <CardHeader
          action={
            <Tooltip title="Refresh rate is 24h">
              <InfoIcon />
            </Tooltip>
          }
          title="Most visited pages"
        />
        <Divider />
        <Box sx={{ overflowX: 'auto' }}>
          <DataTable<Entry> columns={columns} rows={entries} />
        </Box>
      </Card>
    </Box>
  );
}
