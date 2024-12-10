'use client';

import * as React from 'react';
import TablePagination from '@mui/material/TablePagination';

function noop(): void {
  return undefined;
}

interface ItemsPaginationProps {
  count: number;
  page: number;
}

export function ItemsPagination({ count, page }: ItemsPaginationProps): React.JSX.Element {
  return (
    <TablePagination
      component="div"
      count={count}
      onPageChange={noop}
      onRowsPerPageChange={noop}
      page={page}
      rowsPerPage={10}
      rowsPerPageOptions={[5, 10, 25]}
    />
  );
}
