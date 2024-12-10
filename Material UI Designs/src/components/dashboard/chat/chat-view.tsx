'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { List as ListIcon } from '@phosphor-icons/react/dist/ssr/List';
import { useNavigate } from 'react-router-dom';

import { paths } from '@/paths';
import { useMediaQuery } from '@/hooks/use-media-query';
import { usePathname } from '@/hooks/use-pathname';

import { ChatContext } from './chat-context';
import { Sidebar } from './sidebar';

export interface ChatViewProps {
  children: React.ReactNode;
}

export function ChatView({ children }: ChatViewProps): React.JSX.Element {
  const {
    contacts,
    threads,
    messages,
    createThread,
    openDesktopSidebar,
    setOpenDesktopSidebar,
    openMobileSidebar,
    setOpenMobileSidebar,
  } = React.useContext(ChatContext);

  const navigate = useNavigate();

  const pathname = usePathname();

  // The layout does not have a direct access to the current thread id param, we need to extract it from the pathname.
  const segments = pathname.split('/').filter(Boolean);
  const currentThreadId = segments.length === 4 ? segments[segments.length - 1] : undefined;

  const mdDown = useMediaQuery('down', 'md');

  const handleContactSelect = React.useCallback(
    (contactId: string) => {
      const threadId = createThread({ type: 'direct', recipientId: contactId });

      navigate(paths.dashboard.chat.thread('direct', threadId));
    },
    [navigate, createThread]
  );

  const handleThreadSelect = React.useCallback(
    (threadType: string, threadId: string) => {
      navigate(paths.dashboard.chat.thread(threadType, threadId));
    },
    [navigate]
  );

  return (
    <Box sx={{ display: 'flex', flex: '1 1 0', minHeight: 0 }}>
      <Sidebar
        contacts={contacts}
        currentThreadId={currentThreadId}
        messages={messages}
        onCloseMobile={() => {
          setOpenMobileSidebar(false);
        }}
        onSelectContact={handleContactSelect}
        onSelectThread={handleThreadSelect}
        openDesktop={openDesktopSidebar}
        openMobile={openMobileSidebar}
        threads={threads}
      />
      <Box sx={{ display: 'flex', flex: '1 1 auto', flexDirection: 'column', overflow: 'hidden' }}>
        <Box sx={{ borderBottom: '1px solid var(--mui-palette-divider)', display: 'flex', flex: '0 0 auto', p: 2 }}>
          <IconButton
            onClick={() => {
              if (mdDown) {
                setOpenMobileSidebar((prev) => !prev);
              } else {
                setOpenDesktopSidebar((prev) => !prev);
              }
            }}
          >
            <ListIcon />
          </IconButton>
        </Box>
        {children}
      </Box>
    </Box>
  );
}
