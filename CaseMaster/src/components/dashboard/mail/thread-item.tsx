'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { BookmarkSimple as BookmarkSimpleIcon } from '@phosphor-icons/react/dist/ssr/BookmarkSimple';
import { Paperclip as PaperclipIcon } from '@phosphor-icons/react/dist/ssr/Paperclip';
import { Star as StarIcon } from '@phosphor-icons/react/dist/ssr/Star';

import dayjs from 'dayjs';
import { RouterLink } from '../../core/link';

import type { Thread } from './types';

export interface ThreadItemProps {
  href: string;
  onDeselect?: () => void;
  onSelect?: () => void;
  selected: boolean;
  thread: Thread;
}

export function ThreadItem({ thread, onDeselect, onSelect, selected, href }: ThreadItemProps): React.JSX.Element {
  const hasAnyAttachments = (thread.attachments ?? []).length > 0;
  const hasManyAttachments = (thread.attachments ?? []).length > 1;

  const handleSelectToggle = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        onSelect?.();
      } else {
        onDeselect?.();
      }
    },
    [onSelect, onDeselect]
  );

  return (
    <Box
      sx={{
        alignItems: 'center',
        borderBottom: '1px solid var(--mui-palette-divider)',
        display: 'flex',
        gap: 1,
        p: 2,
        ...(!thread.isUnread && {
          position: 'relative',
          '&::before': {
            bgcolor: 'var(--mui-palette-primary-main)',
            bottom: 0,
            content: '" "',
            left: 0,
            position: 'absolute',
            top: 0,
            width: '4px',
          },
        }),
        ...(selected && { bgcolor: 'var(--mui-palette-primary-selected)' }),
        '&:hover': { ...(!selected && { bgcolor: 'var(--mui-palette-action-hover)' }) },
      }}
    >
      <Box sx={{ alignItems: 'center', display: { md: 'flex', xs: 'none' }, flex: '0 0 auto' }}>
        <Checkbox checked={selected} onChange={handleSelectToggle} />
        <Tooltip title="Starred">
          <IconButton>
            <StarIcon
              color={thread.isStarred ? 'var(--mui-palette-warning-main)' : undefined}
              weight={thread.isStarred ? 'fill' : undefined}
            />
          </IconButton>
        </Tooltip>
        <Tooltip title="Important">
          <IconButton>
            <BookmarkSimpleIcon
              color={thread.isImportant ? 'var(--mui-palette-warning-main)' : undefined}
              weight={thread.isImportant ? 'fill' : undefined}
            />
          </IconButton>
        </Tooltip>
      </Box>
      <Box
        component={RouterLink}
        href={href}
        sx={{
          alignItems: 'center',
          color: 'var(--mui-palette-text-primary)',
          cursor: 'pointer',
          display: 'flex',
          flex: '1 1 auto',
          flexWrap: { xs: 'wrap', md: 'nowrap' },
          gap: 2,
          minWidth: 0,
          textDecoration: 'none',
        }}
      >
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center', display: 'flex' }}>
          <Avatar src={thread.from.avatar} />
          <Typography noWrap sx={{ width: '120px' }} variant={thread.isUnread ? 'body2' : 'subtitle2'}>
            {thread.from.name}
          </Typography>
        </Stack>
        <Stack spacing={1} sx={{ flex: '1 1 auto', overflow: 'hidden', width: { xs: '100%', md: 'auto' } }}>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center', maxWidth: '800px', width: '100%' }}>
            <Typography noWrap sx={{ minWidth: '100px', maxWidth: '400px' }} variant="subtitle2">
              {thread.subject}
            </Typography>
            <Typography color="text.secondary" noWrap variant="body2">
              —{thread.message}
            </Typography>
          </Stack>
          {hasAnyAttachments ? (
            <Stack direction="row" spacing={1}>
              <Chip icon={<PaperclipIcon />} label={thread.attachments![0].name} size="small" variant="outlined" />
              {hasManyAttachments ? <Chip label="+1" size="small" variant="outlined" /> : null}
            </Stack>
          ) : null}
        </Stack>
        <Typography
          color="text.secondary"
          sx={{ display: 'block', textAlign: { xs: 'left', md: 'right' }, whiteSpace: 'nowrap', width: '100px' }}
          variant="caption"
        >
          {dayjs(thread.createdAt).format('DD MMM')}
        </Typography>
      </Box>
    </Box>
  );
}
