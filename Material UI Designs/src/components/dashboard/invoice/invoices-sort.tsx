'use client';

import * as React from 'react';
import Select from '@mui/material/Select';
import type { SelectChangeEvent } from '@mui/material/Select';
import { useNavigate } from 'react-router-dom';

import { paths } from '@/paths';
import { Option } from '@/components/core/option';

import type { Filters } from './invoices-filters';

type SortDir = 'asc' | 'desc';

export interface InvoicesSortProps {
  filters?: Filters;
  sortDir?: SortDir;
  view?: 'group' | 'list';
}

export function InvoicesSort({ filters = {}, sortDir = 'desc', view }: InvoicesSortProps): React.JSX.Element {
  const navigate = useNavigate();

  const updateSearchParams = React.useCallback(
    (newSortDir: SortDir): void => {
      const searchParams = new URLSearchParams();

      // Make sure to keep the search params when changing the sort.
      // For the sake of simplicity, we keep only the view search param on sort change.

      if (view) {
        searchParams.set('view', view);
      }

      if (newSortDir === 'asc') {
        searchParams.set('sortDir', newSortDir);
      }

      if (filters.status) {
        searchParams.set('status', filters.status);
      }

      if (filters.id) {
        searchParams.set('id', filters.id);
      }

      if (filters.customer) {
        searchParams.set('customer', filters.customer);
      }

      if (filters.startDate) {
        searchParams.set('startDate', filters.startDate);
      }

      if (filters.endDate) {
        searchParams.set('endDate', filters.endDate);
      }

      navigate(`${paths.dashboard.invoices.list}?${searchParams.toString()}`);
    },
    [navigate, view, filters]
  );

  const handleSortChange = React.useCallback(
    (event: SelectChangeEvent) => {
      updateSearchParams(event.target.value as SortDir);
    },
    [updateSearchParams]
  );

  return (
    <Select name="sort" onChange={handleSortChange} sx={{ maxWidth: '100%', width: '120px' }} value={sortDir}>
      <Option value="desc">Newest</Option>
      <Option value="asc">Oldest</Option>
    </Select>
  );
}
