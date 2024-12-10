'use client';

import * as React from 'react';
import TablePagination from '@mui/material/TablePagination';

function noop(): void {
  return undefined;
}

interface CustomersPaginationProps {
  count: number;
  page: number;
}

export function CustomersPagination({ count, page }: CustomersPaginationProps): React.JSX.Element {
  // You should implement the pagination using a similar logic as the filters.
  // Note that when page change, you should keep the filter search params.

  return (
    <TablePagination
      component="div"
      count={count}
      onPageChange={noop}
      onRowsPerPageChange={noop}
      page={page}
      rowsPerPage={5}
      rowsPerPageOptions={[5, 10, 25]}
    />
  );
}
