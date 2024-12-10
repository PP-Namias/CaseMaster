'use client';

import * as React from 'react';
import Box from '@mui/material/Box';

import { Composer } from './composer';
import { MailContext } from './mail-context';
import { Sidebar } from './sidebar';

export interface MailViewProps {
  children: React.ReactNode;
}

export function MailView({ children }: MailViewProps): React.JSX.Element {
  const {
    labels,
    currentLabelId,
    openDesktopSidebar,
    openMobileSidebar,
    setOpenMobileSidebar,
    openCompose,
    setOpenCompose,
  } = React.useContext(MailContext);

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', flex: '1 1 0', minHeight: 0 }}>
        <Sidebar
          currentLabelId={currentLabelId}
          labels={labels}
          onCloseMobile={() => {
            setOpenMobileSidebar(false);
          }}
          onCompose={() => {
            setOpenCompose(true);
          }}
          openDesktop={openDesktopSidebar}
          openMobile={openMobileSidebar}
        />
        <Box sx={{ display: 'flex', flex: '1 1 auto', flexDirection: 'column', overflow: 'hidden' }}>{children}</Box>
      </Box>
      <Composer
        onClose={() => {
          setOpenCompose(false);
        }}
        open={openCompose}
      />
    </React.Fragment>
  );
}
