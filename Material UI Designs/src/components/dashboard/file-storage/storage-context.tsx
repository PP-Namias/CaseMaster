'use client';

import * as React from 'react';

import type { Item } from './types';

function noop(): void {
  return undefined;
}

export interface StorageContextValue {
  items: Map<string, Item>;
  currentItemId?: string;
  setCurrentItemId: (itemId?: string) => void;
  deleteItem: (itemId: string) => void;
  favoriteItem: (itemId: string, value: boolean) => void;
}

export const StorageContext = React.createContext<StorageContextValue>({
  items: new Map(),
  setCurrentItemId: noop,
  deleteItem: noop,
  favoriteItem: noop,
});

export interface StorageProviderProps {
  children: React.ReactNode;
  items: Item[];
}

export function StorageProvider({ children, items: initialItems = [] }: StorageProviderProps): React.JSX.Element {
  const [items, setItems] = React.useState(new Map<string, Item>());
  const [currentItemId, setCurrentItemId] = React.useState<string>();

  React.useEffect((): void => {
    setItems(new Map(initialItems.map((item) => [item.id, item])));
  }, [initialItems]);

  const handleDeleteItem = React.useCallback(
    (itemId: string) => {
      const item = items.get(itemId);

      // Item might no longer exist
      if (!item) {
        return;
      }

      const updatedItems = new Map<string, Item>(items);

      // Delete item
      updatedItems.delete(itemId);

      // Dispatch update
      setItems(updatedItems);
    },
    [items]
  );

  const handleFavoriteItem = React.useCallback(
    (itemId: string, value: boolean) => {
      const item = items.get(itemId);

      // Item might no longer exist
      if (!item) {
        return;
      }

      const updatedItems = new Map<string, Item>(items);

      // Update item
      updatedItems.set(itemId, { ...item, isFavorite: value });

      // Dispatch update
      setItems(updatedItems);
    },
    [items]
  );

  return (
    <StorageContext.Provider
      value={{ items, currentItemId, setCurrentItemId, deleteItem: handleDeleteItem, favoriteItem: handleFavoriteItem }}
    >
      {children}
    </StorageContext.Provider>
  );
}

export const StorageConsumer = StorageContext.Consumer;
