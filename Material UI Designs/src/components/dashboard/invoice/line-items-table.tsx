'use client';

import * as React from 'react';

import { DataTable } from '@/components/core/data-table';
import type { ColumnDef } from '@/components/core/data-table';

export interface LineItem {
  id: string;
  name: string;
  quantity: number;
  currency: string;
  unitAmount: number;
  totalAmount: number;
}

const columns = [
  { field: 'name', name: 'Name', width: '250px' },
  {
    formatter: (row): string => {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: row.currency }).format(row.unitAmount);
    },
    name: 'Unit Amount',
    width: '100px',
  },
  { field: 'quantity', name: 'Qty', width: '100px' },
  {
    formatter: (row): string => {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: row.currency }).format(row.totalAmount);
    },
    name: 'Amount',
    width: '100px',
    align: 'right',
  },
] satisfies ColumnDef<LineItem>[];

export interface LineItemsTableProps {
  rows: LineItem[];
}

export function LineItemsTable({ rows }: LineItemsTableProps): React.JSX.Element {
  return <DataTable<LineItem> columns={columns} rows={rows} />;
}
