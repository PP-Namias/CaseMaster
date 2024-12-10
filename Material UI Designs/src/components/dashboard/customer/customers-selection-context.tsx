'use client';

import * as React from 'react';

import { useSelection } from '@/hooks/use-selection';
import type { Selection } from '@/hooks/use-selection';

import type { Customer } from './customers-table';

function noop(): void {
  return undefined;
}

export interface CustomersSelectionContextValue extends Selection {}

export const CustomersSelectionContext = React.createContext<CustomersSelectionContextValue>({
  deselectAll: noop,
  deselectOne: noop,
  selectAll: noop,
  selectOne: noop,
  selected: new Set(),
  selectedAny: false,
  selectedAll: false,
});

interface CustomersSelectionProviderProps {
  children: React.ReactNode;
  customers: Customer[];
}

export function CustomersSelectionProvider({
  children,
  customers = [],
}: CustomersSelectionProviderProps): React.JSX.Element {
  const customerIds = React.useMemo(() => customers.map((customer) => customer.id), [customers]);
  const selection = useSelection(customerIds);

  return <CustomersSelectionContext.Provider value={{ ...selection }}>{children}</CustomersSelectionContext.Provider>;
}

export function useCustomersSelection(): CustomersSelectionContextValue {
  return React.useContext(CustomersSelectionContext);
}
