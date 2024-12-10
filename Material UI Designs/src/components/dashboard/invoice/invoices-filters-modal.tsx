'use client';

import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { X as XIcon } from '@phosphor-icons/react/dist/ssr/X';

import { InvoicesFilters } from './invoices-filters';
import type { Filters } from './invoices-filters';

export interface InvoicesFiltersModalProps {
  filters?: Filters;
  onClose?: () => void;
  open: boolean;
  sortDir?: 'asc' | 'desc';
  view?: 'group' | 'list';
}

export function InvoicesFiltersModal({
  filters,
  onClose,
  open,
  sortDir,
  view,
}: InvoicesFiltersModalProps): React.JSX.Element {
  return (
    <Dialog
      maxWidth="sm"
      onClose={onClose}
      open={open}
      sx={{ '& .MuiDialog-paper': { height: '100%', width: '100%' } }}
    >
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', minHeight: 0, p: 0 }}>
        <Stack spacing={3} sx={{ p: 3 }}>
          <Stack direction="row" sx={{ alignItems: 'center', flex: '0 0 auto', justifyContent: 'space-between' }}>
            <Typography variant="h5">Filters</Typography>
            <IconButton onClick={onClose}>
              <XIcon />
            </IconButton>
          </Stack>
          <InvoicesFilters
            filters={filters}
            onFiltersApplied={onClose}
            onFiltersCleared={onClose}
            sortDir={sortDir}
            view={view}
          />
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
