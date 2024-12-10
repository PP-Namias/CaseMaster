'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import InputAdornment from '@mui/material/InputAdornment';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import OutlinedInput from '@mui/material/OutlinedInput';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';

import { logger } from '@/lib/default-logger';

import type { Contact } from './types';

export interface GroupRecipientsProps {
  contacts: Contact[];
  onRecipientAdd?: (contact: Contact) => void;
  onRecipientRemove?: (recipientId: string) => void;
  recipients?: Contact[];
}

export function GroupRecipients({
  contacts,
  onRecipientAdd,
  onRecipientRemove,
  recipients = [],
}: GroupRecipientsProps): React.JSX.Element {
  const searchRef = React.useRef<HTMLDivElement | null>(null);
  const [searchFocused, setSearchFocused] = React.useState<boolean>(false);
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [searchResults, setSearchResults] = React.useState<Contact[]>([]);

  const showSearchResults = searchFocused && Boolean(searchQuery);
  const hasSearchResults = searchResults.length > 0;

  const handleSearchChange = React.useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
      const query = event.target.value;

      setSearchQuery(query);

      if (!query) {
        setSearchResults([]);
        return;
      }

      try {
        // This is where you would make an API request for a real search. For the sake of simplicity, we are just
        // filtering the data in the client.
        const results = contacts.filter((contact) => {
          // Filter already picked recipients
          if (recipients.find((recipient) => recipient.id === contact.id)) {
            return false;
          }

          return contact.name.toLowerCase().includes(query.toLowerCase());
        });

        setSearchResults(results);
      } catch (err) {
        logger.error(err);
      }
    },
    [contacts, recipients]
  );

  const handleSearchClickAway = React.useCallback(() => {
    if (showSearchResults) {
      setSearchFocused(false);
    }
  }, [showSearchResults]);

  const handleSearchFocus = React.useCallback(() => {
    setSearchFocused(true);
  }, []);

  const handleSearchSelect = React.useCallback(
    (contact: Contact) => {
      setSearchQuery('');
      onRecipientAdd?.(contact);
    },
    [onRecipientAdd]
  );

  return (
    <Stack direction="row" spacing={2} sx={{ alignItems: 'center', overflowX: 'auto', p: 2 }}>
      <ClickAwayListener onClickAway={handleSearchClickAway}>
        <div>
          <OutlinedInput
            onChange={handleSearchChange}
            onFocus={handleSearchFocus}
            placeholder="Search contacts"
            ref={searchRef}
            startAdornment={
              <InputAdornment position="start">
                <MagnifyingGlassIcon fontSize="var(--icon-fontSize-md)" />
              </InputAdornment>
            }
            sx={{ minWidth: '260px' }}
            value={searchQuery}
          />
          {showSearchResults ? (
            <Popper anchorEl={searchRef.current} open={searchFocused} placement="bottom-start">
              <Paper
                sx={{
                  border: '1px solid var(--mui-palette-divider)',
                  boxShadow: 'var(--mui-shadows-16)',
                  maxWidth: '100%',
                  mt: 1,
                  width: '320px',
                }}
              >
                {hasSearchResults ? (
                  <React.Fragment>
                    <Box sx={{ px: 3, py: 2 }}>
                      <Typography color="text.secondary" variant="subtitle2">
                        Contacts
                      </Typography>
                    </Box>
                    <List sx={{ p: 1, '& .MuiListItemButton-root': { borderRadius: 1 } }}>
                      {searchResults.map((contact) => (
                        <ListItem disablePadding key={contact.id}>
                          <ListItemButton
                            onClick={() => {
                              handleSearchSelect(contact);
                            }}
                          >
                            <ListItemAvatar>
                              <Avatar src={contact.avatar} sx={{ '--Avatar-size': '32px' }} />
                            </ListItemAvatar>
                            <ListItemText
                              disableTypography
                              primary={
                                <Typography noWrap variant="subtitle2">
                                  {contact.name}
                                </Typography>
                              }
                            />
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </List>
                  </React.Fragment>
                ) : (
                  <Stack spacing={1} sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h6">Nothing found</Typography>
                    <Typography color="text.secondary" variant="body2">
                      We couldn&apos;t find any matches for &quot;{searchQuery}&quot;. Try checking for typos or using
                      complete words.
                    </Typography>
                  </Stack>
                )}
              </Paper>
            </Popper>
          ) : null}
        </div>
      </ClickAwayListener>
      <Typography color="text.secondary" variant="body2">
        To:
      </Typography>
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center', overflowX: 'auto' }}>
        {recipients.map((recipient) => (
          <Chip
            avatar={<Avatar src={recipient.avatar} />}
            key={recipient.id}
            label={recipient.name}
            onDelete={() => {
              onRecipientRemove?.(recipient.id);
            }}
          />
        ))}
      </Stack>
    </Stack>
  );
}
