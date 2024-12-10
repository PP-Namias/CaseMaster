'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { X as XIcon } from '@phosphor-icons/react/dist/ssr/X';

import { paths } from '@/paths';
import { useMediaQuery } from '@/hooks/use-media-query';
import { RouterLink } from '@/components/core/link';

import { DirectSearch } from './direct-search';
import { ThreadItem } from './thread-item';
import type { Contact, Message, Thread } from './types';

export interface SidebarProps {
  contacts: Contact[];
  currentThreadId?: string;
  messages: Map<string, Message[]>;
  onCloseMobile?: () => void;
  onSelectContact?: (contactId: string) => void;
  onSelectThread?: (threadType: string, threadId: string) => void;
  openDesktop?: boolean;
  openMobile?: boolean;
  threads: Thread[];
}

export function Sidebar({
  contacts,
  currentThreadId,
  messages,
  onCloseMobile,
  onSelectContact,
  onSelectThread,
  openDesktop,
  openMobile,
  threads,
}: SidebarProps): React.JSX.Element {
  const mdUp = useMediaQuery('up', 'md');

  const content = (
    <SidebarContent
      closeOnGroupClick={!mdUp}
      closeOnThreadSelect={!mdUp}
      contacts={contacts}
      currentThreadId={currentThreadId}
      messages={messages}
      onClose={onCloseMobile}
      onSelectContact={onSelectContact}
      onSelectThread={onSelectThread}
      threads={threads}
    />
  );

  if (mdUp) {
    return (
      <Box
        sx={{
          borderRight: '1px solid var(--mui-palette-divider)',
          flex: '0 0 auto',
          ml: openDesktop ? 0 : '-320px',
          position: 'relative',
          transition: 'margin 225ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
          width: '320px',
        }}
      >
        {content}
      </Box>
    );
  }

  return (
    <Drawer PaperProps={{ sx: { maxWidth: '100%', width: '320px' } }} onClose={onCloseMobile} open={openMobile}>
      {content}
    </Drawer>
  );
}

interface SidebarContentProps {
  closeOnGroupClick?: boolean;
  closeOnThreadSelect?: boolean;
  contacts: Contact[];
  currentThreadId?: string;
  messages: Map<string, Message[]>;
  onClose?: () => void;
  onSelectContact?: (contactId: string) => void;
  onSelectThread?: (threadType: string, threadId: string) => void;
  threads: Thread[];
}

function SidebarContent({
  closeOnGroupClick,
  closeOnThreadSelect,
  contacts,
  currentThreadId,
  messages,
  onClose,
  onSelectContact,
  onSelectThread,
  threads,
}: SidebarContentProps): React.JSX.Element {
  // If you want to persist the search states, you can move it to the Sidebar component or a context.
  // Otherwise, the search states will be reset when the window size changes between mobile and desktop.
  const [searchFocused, setSearchFocused] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [searchResults, setSearchResults] = React.useState<Contact[]>([]);

  const handleSearchChange = React.useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
      const { value } = event.target;

      setSearchQuery(value);

      if (!value) {
        setSearchResults([]);
        return;
      }

      const results = contacts.filter((contact) => {
        return contact.name.toLowerCase().includes(value.toLowerCase());
      });

      setSearchResults(results);
    },
    [contacts]
  );

  const handleSearchClickAway = React.useCallback(() => {
    if (searchFocused) {
      setSearchFocused(false);
      setSearchQuery('');
    }
  }, [searchFocused]);

  const handleSearchFocus = React.useCallback(() => {
    setSearchFocused(true);
  }, []);

  const handleSearchSelect = React.useCallback(
    (contact: Contact) => {
      onSelectContact?.(contact.id);

      setSearchFocused(false);
      setSearchQuery('');
    },
    [onSelectContact]
  );

  const handleThreadSelect = React.useCallback(
    (threadType: string, threadId: string) => {
      onSelectThread?.(threadType, threadId);

      if (closeOnThreadSelect) {
        onClose?.();
      }
    },
    [onSelectThread, onClose, closeOnThreadSelect]
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center', flex: '0 0 auto', p: 2 }}>
        <Typography sx={{ flex: '1 1 auto' }} variant="h5">
          Chats
        </Typography>
        <Button
          component={RouterLink}
          href={paths.dashboard.chat.compose}
          onClick={() => {
            if (closeOnGroupClick) {
              onClose?.();
            }
          }}
          startIcon={<PlusIcon />}
          variant="contained"
        >
          Group
        </Button>
        <IconButton onClick={onClose} sx={{ display: { md: 'none' } }}>
          <XIcon />
        </IconButton>
      </Stack>
      <Stack spacing={2} sx={{ flex: '1 1 auto', overflowY: 'auto', p: 2 }}>
        <DirectSearch
          isFocused={searchFocused}
          onChange={handleSearchChange}
          onClickAway={handleSearchClickAway}
          onFocus={handleSearchFocus}
          onSelect={handleSearchSelect}
          query={searchQuery}
          results={searchResults}
        />
        <Stack
          component="ul"
          spacing={1}
          sx={{ display: searchFocused ? 'none' : 'flex', listStyle: 'none', m: 0, p: 0 }}
        >
          {threads.map((thread) => (
            <ThreadItem
              active={currentThreadId === thread.id}
              key={thread.id}
              messages={messages.get(thread.id) ?? []}
              onSelect={() => {
                handleThreadSelect(thread.type, thread.id);
              }}
              thread={thread}
            />
          ))}
        </Stack>
      </Stack>
    </Box>
  );
}
