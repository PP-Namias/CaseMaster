'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { GridView } from './grid-view';
import { ItemModal } from './item-modal';
import { ListView } from './list-view';
import { StorageContext } from './storage-context';

export interface StorageViewProps {
  view: 'grid' | 'list';
}

export function StorageView({ view }: StorageViewProps): React.JSX.Element {
  const { currentItemId, items, deleteItem, favoriteItem, setCurrentItemId } = React.useContext(StorageContext);

  const currentItem = currentItemId ? items.get(currentItemId) : undefined;

  return (
    <React.Fragment>
      {items.size ? (
        <React.Fragment>{view === 'grid' ? <GridView /> : <ListView />}</React.Fragment>
      ) : (
        <Box sx={{ p: 3 }}>
          <Typography color="text.secondary" sx={{ textAlign: 'center' }} variant="body2">
            No items found
          </Typography>
        </Box>
      )}
      {currentItem ? (
        <ItemModal
          item={currentItem}
          onClose={() => {
            setCurrentItemId(undefined);
          }}
          onDelete={(itemId) => {
            setCurrentItemId(undefined);
            deleteItem(itemId);
          }}
          onFavorite={favoriteItem}
          open
        />
      ) : null}
    </React.Fragment>
  );
}
