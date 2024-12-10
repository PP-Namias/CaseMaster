'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import InputAdornment from '@mui/material/InputAdornment';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';

import { Tip } from '@/components/core/tip';

import type { Contact } from './types';

export interface DirectSearchProps {
  isFocused?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClickAway?: () => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onSelect?: (result: Contact) => void;
  query?: string;
  results?: Contact[];
}

export const DirectSearch = React.forwardRef<HTMLDivElement, DirectSearchProps>(function ChatSidebarSearch(
  {
    isFocused,
    onChange,
    onClickAway = () => {
      // noop
    },
    onFocus,
    onSelect,
    query = '',
    results = [],
  },
  ref
) {
  const handleSelect = React.useCallback(
    (result: Contact) => {
      onSelect?.(result);
    },
    [onSelect]
  );

  const showTip = isFocused && !query;
  const showResults = isFocused && query;
  const hasResults = results.length > 0;

  return (
    <ClickAwayListener onClickAway={onClickAway}>
      <Stack ref={ref} spacing={2} tabIndex={-1}>
        <OutlinedInput
          onChange={onChange}
          onFocus={onFocus}
          placeholder="Search contacts"
          startAdornment={
            <InputAdornment position="start">
              <MagnifyingGlassIcon fontSize="var(--icon-fontSize-md)" />
            </InputAdornment>
          }
          value={query}
        />
        {showTip ? <Tip message="Enter a contact name" /> : null}
        {showResults ? (
          <React.Fragment>
            {hasResults ? (
              <Stack spacing={1}>
                <Typography color="text.secondary" variant="subtitle2">
                  Contacts
                </Typography>
                <List disablePadding sx={{ '& .MuiListItemButton-root': { borderRadius: 1 } }}>
                  {results.map((contact) => (
                    <ListItem disablePadding key={contact.id}>
                      <ListItemButton
                        onClick={() => {
                          handleSelect(contact);
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
              </Stack>
            ) : (
              <div>
                <Typography color="text.secondary" variant="body2">
                  We couldn&apos;t find any matches for &quot;{query}&quot;. Try checking for typos or using complete
                  words.
                </Typography>
              </div>
            )}
          </React.Fragment>
        ) : null}
      </Stack>
    </ClickAwayListener>
  );
});
