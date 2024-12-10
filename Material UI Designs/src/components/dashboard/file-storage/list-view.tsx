'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { ItemRow } from './item-row';
import { StorageContext } from './storage-context';

export function ListView(): React.JSX.Element {
  const {
    items,
    deleteItem: onItemDelete,
    favoriteItem: onItemFavorite,
    setCurrentItemId,
  } = React.useContext(StorageContext);

  return (
    <Box sx={{ mx: -3, my: -6 }}>
      <Box sx={{ overflowX: 'auto', px: 3 }}>
        <Table sx={{ borderCollapse: 'separate', borderSpacing: '0 24px' }}>
          <TableHead sx={{ visibility: 'collapse' }}>
            <TableRow>
              <TableCell sx={{ width: '250px', minWidth: '250px', maxWidth: '250px' }} />
              <TableCell sx={{ width: '150px', minWidth: '150px', maxWidth: '150px' }} />
              <TableCell sx={{ width: '150px', minWidth: '150px', maxWidth: '150px' }} />
              <TableCell sx={{ width: '75px', minWidth: '75px', maxWidth: '75px' }} />
              <TableCell sx={{ width: '75px', minWidth: '75px', maxWidth: '75px' }} />
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.from(items.values()).map((item) => (
              <ItemRow
                item={item}
                key={item.id}
                onDelete={onItemDelete}
                onFavorite={onItemFavorite}
                onOpen={setCurrentItemId}
              />
            ))}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
}
