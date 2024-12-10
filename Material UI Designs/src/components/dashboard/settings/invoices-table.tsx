'use client';

import * as React from 'react';
import Link from '@mui/material/Link';

import { dayjs } from '@/lib/dayjs';
import { DataTable } from '@/components/core/data-table';
import type { ColumnDef } from '@/components/core/data-table';

export interface Invoice {
  id: string;
  currency: string;
  totalAmount: number;
  issueDate: Date;
}

const columns = [
  { field: 'id', name: 'ID', width: '200px' },
  {
    formatter: (row): string => {
      return dayjs(row.issueDate).format('MMM D, YYYY');
    },
    name: 'Issue Date',
    width: '250px',
  },
  {
    formatter: (row): string => {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: row.currency }).format(row.totalAmount);
    },
    name: 'Total (incl. tax)',
    width: '150px',
  },
  {
    formatter: (): React.JSX.Element => (
      <Link color="inherit" underline="always">
        View
      </Link>
    ),
    name: 'Actions',
    hideName: true,
    width: '100px',
    align: 'right',
  },
] satisfies ColumnDef<Invoice>[];

export interface InvoicesTableProps {
  rows: Invoice[];
}

export function InvoicesTable({ rows }: InvoicesTableProps): React.JSX.Element {
  return <DataTable<Invoice> columns={columns} rows={rows} />;
}
