'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import { Funnel as FunnelIcon } from '@phosphor-icons/react/dist/ssr/Funnel';

import { useMediaQuery } from '@/hooks/use-media-query';

import type { Filters } from './invoices-filters';
import { InvoicesFiltersModal } from './invoices-filters-modal';

interface InvoicesFiltersButtonProps {
  filters?: Filters;
  sortDir?: 'asc' | 'desc';
  view?: 'group' | 'list';
}

export function InvoicesFiltersButton({ filters, sortDir, view }: InvoicesFiltersButtonProps): React.JSX.Element {
  const lgDown = useMediaQuery('down', 'lg');

  const [open, setOpen] = React.useState<boolean>(false);

  const hasFilters = filters?.status || filters?.id || filters?.customer || filters?.startDate || filters?.endDate;

  return (
    <React.Fragment>
      <Button
        color={hasFilters ? 'primary' : 'secondary'}
        onClick={() => {
          setOpen((prevState) => !prevState);
        }}
        startIcon={<FunnelIcon />}
        sx={{ display: { lg: 'none' } }}
      >
        Filters
      </Button>
      <InvoicesFiltersModal
        filters={filters}
        onClose={() => {
          setOpen(false);
        }}
        open={lgDown ? open : false}
        sortDir={sortDir}
        view={view}
      />
    </React.Fragment>
  );
}
