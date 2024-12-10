'use client';

import * as React from 'react';

import { useSelection } from '@/hooks/use-selection';
import type { Selection } from '@/hooks/use-selection';

import type { Order } from './orders-table';

function noop(): void {
  return undefined;
}

export interface OrdersSelectionContextValue extends Selection {}

export const OrdersSelectionContext = React.createContext<OrdersSelectionContextValue>({
  deselectAll: noop,
  deselectOne: noop,
  selectAll: noop,
  selectOne: noop,
  selected: new Set(),
  selectedAny: false,
  selectedAll: false,
});

interface OrdersSelectionProviderProps {
  children: React.ReactNode;
  orders: Order[];
}

export function OrdersSelectionProvider({ children, orders = [] }: OrdersSelectionProviderProps): React.JSX.Element {
  const orderIds = React.useMemo(() => orders.map((order) => order.id), [orders]);
  const selection = useSelection(orderIds);

  return <OrdersSelectionContext.Provider value={{ ...selection }}>{children}</OrdersSelectionContext.Provider>;
}

export function useOrdersSelection(): OrdersSelectionContextValue {
  return React.useContext(OrdersSelectionContext);
}
