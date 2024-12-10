'use client';

import * as React from 'react';

import type { Label, Thread } from './types';

function noop(): void {
  return undefined;
}

export interface MailContextValue {
  labels: Label[];
  threads: Thread[];
  currentLabelId: string;
  openDesktopSidebar: boolean;
  setOpenDesktopSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  openMobileSidebar: boolean;
  setOpenMobileSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  openCompose: boolean;
  setOpenCompose: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MailContext = React.createContext<MailContextValue>({
  labels: [],
  threads: [],
  currentLabelId: 'inbox',
  openDesktopSidebar: true,
  setOpenDesktopSidebar: noop,
  openMobileSidebar: true,
  setOpenMobileSidebar: noop,
  openCompose: false,
  setOpenCompose: noop,
});

export interface MailProviderProps {
  children: React.ReactNode;
  labels: Label[];
  threads: Thread[];
  currentLabelId: string;
}

export function MailProvider({
  children,
  labels: initialLabels = [],
  threads: initialThreads = [],
  currentLabelId,
}: MailProviderProps): React.JSX.Element {
  const [labels, setLabels] = React.useState<Label[]>([]);
  const [threads, setThreads] = React.useState<Thread[]>([]);
  const [openDesktopSidebar, setOpenDesktopSidebar] = React.useState<boolean>(true);
  const [openMobileSidebar, setOpenMobileSidebar] = React.useState<boolean>(false);
  const [openCompose, setOpenCompose] = React.useState<boolean>(false);

  React.useEffect((): void => {
    setLabels(initialLabels);
  }, [initialLabels]);

  React.useEffect((): void => {
    setThreads(initialThreads);
  }, [initialThreads]);

  return (
    <MailContext.Provider
      value={{
        labels,
        threads,
        currentLabelId,
        openDesktopSidebar,
        setOpenDesktopSidebar,
        openMobileSidebar,
        setOpenMobileSidebar,
        openCompose,
        setOpenCompose,
      }}
    >
      {children}
    </MailContext.Provider>
  );
}
