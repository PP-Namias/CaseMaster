'use client';

import * as React from 'react';
import Box from '@mui/material/Box';

import { ItemCard } from './item-card';
import { StorageContext } from './storage-context';

export function GridView(): React.JSX.Element {
  const {
    items,
    deleteItem: onItemDelete,
    favoriteItem: onItemFavorite,
    setCurrentItemId,
  } = React.useContext(StorageContext);

  return (
    <Box
      sx={{ display: 'grid', gap: 4, gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' } }}
    >
      {Array.from(items.values()).map((item) => (
        <ItemCard
          item={item}
          key={item.id}
          onDelete={onItemDelete}
          onFavorite={onItemFavorite}
          onOpen={setCurrentItemId}
        />
      ))}
    </Box>
  );
}
